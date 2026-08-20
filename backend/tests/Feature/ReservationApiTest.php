<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ReservationApiTest extends TestCase
{
    use RefreshDatabase;

    private function product(array $attributes = []): Product
    {
        $category = Category::firstOrCreate(
            ['slug' => 'bags'],
            ['name_en' => 'Bags', 'name_ar' => 'حقائب'],
        );

        return Product::create($attributes + [
            'slug' => 'clutch',
            'category_id' => $category->id,
            'title_en' => 'Clutch',
            'title_ar' => 'كلتش',
            'price' => 100,
        ]);
    }

    public function test_reservations_require_authentication(): void
    {
        $this->postJson('/api/reservations', [])->assertUnauthorized();
    }

    public function test_total_is_calculated_from_database_prices_not_the_request(): void
    {
        $this->product(['price' => 250]);
        Sanctum::actingAs(User::create([
            'name' => 'Meral Customer',
            'email' => 'customer@example.test',
            'password' => 'password',
        ]));

        $response = $this->postJson('/api/reservations', [
            'fullName' => 'Meral Customer',
            'phone' => '01000000000',
            'total' => 1, // a tampered total must be ignored
            'items' => [['productId' => 'clutch', 'quantity' => 3]],
        ]);

        $response->assertCreated();
        // json_encode drops the trailing .0, so compare numerically rather than by type.
        $this->assertSame(750.0, (float) $response->json('data.total'));
        $this->assertDatabaseHas('reservations', ['total' => 750, 'status' => 'pending']);
        $this->assertDatabaseHas('reservation_items', ['unit_price' => 250, 'quantity' => 3]);
    }

    public function test_coming_soon_products_cannot_be_reserved(): void
    {
        $this->product(['price' => null, 'is_coming_soon' => true]);
        Sanctum::actingAs(User::create([
            'name' => 'Meral Customer',
            'email' => 'customer@example.test',
            'password' => 'password',
        ]));

        $this->postJson('/api/reservations', [
            'fullName' => 'Meral Customer',
            'phone' => '01000000000',
            'items' => [['productId' => 'clutch', 'quantity' => 1]],
        ])->assertStatus(422);

        $this->assertDatabaseCount('reservations', 0);
    }

    public function test_registration_returns_a_usable_token(): void
    {
        $token = $this->postJson('/api/auth/register', [
            'name' => 'Meral Customer',
            'email' => 'new@example.test',
            'password' => 'password',
        ])->assertCreated()->json('token');

        $this->withToken($token)->getJson('/api/auth/me')
            ->assertOk()
            ->assertJsonPath('user.email', 'new@example.test');
    }

    public function test_hidden_products_are_not_listed(): void
    {
        $this->product(['slug' => 'visible']);
        $this->product(['slug' => 'hidden', 'is_active' => false]);

        $this->getJson('/api/products')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.id', 'visible');
    }
}
