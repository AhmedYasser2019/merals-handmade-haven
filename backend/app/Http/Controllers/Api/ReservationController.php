<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReservationResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class ReservationController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $reservations = $request->user()
            ->reservations()
            ->with('items.product')
            ->latest()
            ->get();

        return ReservationResource::collection($reservations);
    }

    public function store(Request $request): ReservationResource
    {
        $data = $request->validate([
            'fullName' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:40'],
            'address' => ['nullable', 'string', 'max:500'],
            'note' => ['nullable', 'string', 'max:2000'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.productId' => ['required', 'string', Rule::exists('products', 'slug')],
            'items.*.quantity' => ['required', 'integer', 'min:1', 'max:99'],
        ]);

        $products = Product::active()
            ->whereIn('slug', collect($data['items'])->pluck('productId'))
            ->get()
            ->keyBy('slug');

        $reservation = DB::transaction(function () use ($request, $data, $products) {
            $reservation = $request->user()->reservations()->create([
                'full_name' => $data['fullName'],
                'phone' => $data['phone'],
                'address' => $data['address'] ?? null,
                'note' => $data['note'] ?? null,
                'total' => 0,
            ]);

            $total = 0.0;

            foreach ($data['items'] as $index => $item) {
                $product = $products->get($item['productId']);

                // Prices come from the database, never from the request body, and a
                // product that is hidden or not yet for sale cannot be reserved at all.
                if (! $product || $product->is_coming_soon || $product->price === null) {
                    throw ValidationException::withMessages([
                        "items.{$index}.productId" => ['This product is not available for reservation.'],
                    ]);
                }

                $reservation->items()->create([
                    'product_id' => $product->id,
                    'title' => $product->title_en,
                    'unit_price' => $product->price,
                    'quantity' => $item['quantity'],
                ]);

                $total += (float) $product->price * $item['quantity'];
            }

            $reservation->update(['total' => $total]);

            return $reservation;
        });

        return new ReservationResource($reservation->load('items.product'));
    }
}
