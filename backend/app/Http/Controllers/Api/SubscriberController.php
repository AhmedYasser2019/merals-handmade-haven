<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Subscriber;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SubscriberController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
        ]);

        // Signing up twice is not an error the visitor should ever see.
        Subscriber::updateOrCreate(['email' => $data['email']], $data);

        return response()->json(['message' => 'Subscribed.'], 201);
    }
}
