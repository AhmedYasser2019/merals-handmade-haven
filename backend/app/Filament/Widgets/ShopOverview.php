<?php

namespace App\Filament\Widgets;

use App\Models\Product;
use App\Models\Reservation;
use App\Models\Subscriber;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class ShopOverview extends StatsOverviewWidget
{
    protected static ?int $sort = -1;

    protected function getStats(): array
    {
        $pending = Reservation::where('status', 'pending')->count();

        $revenue = Reservation::whereIn('status', ['confirmed', 'shipped', 'completed'])
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->sum('total');

        return [
            Stat::make('Pending reservations', $pending)
                ->description($pending > 0 ? 'Waiting for you to confirm' : 'All caught up')
                ->color($pending > 0 ? 'warning' : 'success'),
            Stat::make('Confirmed this month', 'EGP '.number_format((float) $revenue, 2))
                ->description('Excludes pending and cancelled'),
            Stat::make('Products live', Product::where('is_active', true)->count())
                ->description(Product::count().' total'),
            Stat::make('Cosmetics waitlist', Subscriber::count()),
        ];
    }
}
