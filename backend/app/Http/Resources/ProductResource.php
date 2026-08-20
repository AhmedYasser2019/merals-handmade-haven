<?php

namespace App\Http\Resources;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Product */
class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            // The storefront keys carts and order lines by slug, not by the numeric id.
            'id' => $this->slug,
            'slug' => $this->slug,
            'title' => ['en' => $this->title_en, 'ar' => $this->title_ar],
            'description' => ['en' => $this->description_en, 'ar' => $this->description_ar],
            'category' => new CategoryResource($this->whenLoaded('category')),
            'price' => $this->price === null ? null : (float) $this->price,
            'compareAt' => $this->compare_at_price === null ? null : (float) $this->compare_at_price,
            'rating' => $this->rating === null ? null : (float) $this->rating,
            'reviews' => $this->reviews_count,
            'image' => $this->imageUrl(),
            'comingSoon' => $this->is_coming_soon,
        ];
    }
}
