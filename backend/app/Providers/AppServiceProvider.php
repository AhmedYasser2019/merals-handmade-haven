<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Named limiters get their own bucket each. A bare `throttle:10,1` keys only
        // on domain + IP, so every route sharing it shares one counter — someone
        // spamming the contact form would lock the same visitor out of signing in.
        RateLimiter::for('auth', fn (Request $request) => Limit::perMinute(10)->by($request->ip()));
        RateLimiter::for('forms', fn (Request $request) => Limit::perMinute(10)->by($request->ip()));
    }
}
