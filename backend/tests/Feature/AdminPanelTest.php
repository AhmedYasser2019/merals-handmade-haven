<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\Reservation;
use App\Models\User;
use Filament\Auth\Pages\Login;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Livewire\Livewire;
use Tests\TestCase;

class AdminPanelTest extends TestCase
{
    use RefreshDatabase;

    private function user(bool $isAdmin): User
    {
        return User::create([
            'name' => $isAdmin ? 'Meral Admin' : 'Meral Customer',
            'email' => $isAdmin ? 'admin@example.test' : 'customer@example.test',
            'password' => 'password',
            'is_admin' => $isAdmin,
        ]);
    }

    public function test_guests_are_sent_to_the_login_page(): void
    {
        $this->get('/admin')->assertRedirect('/admin/login');
        $this->get('/admin/login')->assertSuccessful();
    }

    public function test_an_admin_can_sign_in_with_their_password(): void
    {
        $admin = $this->user(isAdmin: true);

        Livewire::test(Login::class)
            ->fillForm(['email' => $admin->email, 'password' => 'password'])
            ->call('authenticate')
            ->assertHasNoFormErrors();

        $this->assertAuthenticatedAs($admin);
    }

    public function test_a_wrong_password_is_rejected(): void
    {
        $admin = $this->user(isAdmin: true);

        Livewire::test(Login::class)
            ->fillForm(['email' => $admin->email, 'password' => 'not-the-password'])
            ->call('authenticate')
            ->assertHasFormErrors(['email']);

        $this->assertGuest();
    }

    public function test_a_storefront_customer_cannot_open_the_dashboard(): void
    {
        $this->actingAs($this->user(isAdmin: false))->get('/admin')->assertForbidden();
    }

    public function test_every_resource_page_renders_for_an_admin(): void
    {
        $category = Category::create(['slug' => 'bags', 'name_en' => 'Bags', 'name_ar' => 'حقائب']);
        $product = Product::create([
            'slug' => 'clutch', 'category_id' => $category->id,
            'title_en' => 'Clutch', 'title_ar' => 'كلتش', 'price' => 100,
        ]);
        $customer = $this->user(isAdmin: false);
        $reservation = $customer->reservations()->create([
            'full_name' => 'Meral Customer', 'phone' => '01000000000', 'total' => 100,
        ]);
        $reservation->items()->create([
            'product_id' => $product->id, 'title' => 'Clutch', 'unit_price' => 100, 'quantity' => 1,
        ]);

        $this->actingAs($this->user(isAdmin: true));

        foreach ([
            '/admin',
            '/admin/products',
            '/admin/products/create',
            "/admin/products/{$product->id}/edit",
            '/admin/categories',
            '/admin/reservations',
            "/admin/reservations/{$reservation->id}",
            "/admin/reservations/{$reservation->id}/edit",
            '/admin/users',
            '/admin/contact-messages',
            '/admin/subscribers',
        ] as $url) {
            $this->get($url)->assertSuccessful();
        }

        $this->assertSame(1, Reservation::count());
    }
}
