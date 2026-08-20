<?php

namespace App\Http\Resources;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Reservation */
class ReservationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'fullName' => $this->full_name,
            'phone' => $this->phone,
            'address' => $this->address,
            'note' => $this->note,
            'total' => (float) $this->total,
            'status' => $this->status,
            'createdAt' => $this->created_at?->toIso8601String(),
            'items' => $this->whenLoaded('items', fn () => $this->items->map(fn ($item) => [
                'productId' => $item->product?->slug,
                'title' => $item->title,
                'unitPrice' => (float) $item->unit_price,
                'quantity' => $item->quantity,
            ])),
        ];
    }
}
