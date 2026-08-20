<?php

namespace App\Filament\Resources\Reservations\RelationManagers;

use App\Models\Product;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ItemsRelationManager extends RelationManager
{
    protected static string $relationship = 'items';

    protected static ?string $title = 'Items';

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('product_id')
                    ->relationship('product', 'title_en')
                    ->searchable()
                    ->preload()
                    ->live()
                    // Title and price are copied onto the item so the order keeps
                    // what the customer actually saw, even if the product changes later.
                    ->afterStateUpdated(function (?string $state, Set $set): void {
                        $product = $state ? Product::find($state) : null;
                        if ($product) {
                            $set('title', $product->title_en);
                            $set('unit_price', $product->price);
                        }
                    }),
                TextInput::make('title')
                    ->required(),
                TextInput::make('unit_price')
                    ->required()
                    ->numeric()
                    ->minValue(0)
                    ->prefix('EGP'),
                TextInput::make('quantity')
                    ->required()
                    ->numeric()
                    ->minValue(1)
                    ->default(1),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('title')
            ->columns([
                TextColumn::make('title')->searchable(),
                TextColumn::make('unit_price')->money('EGP'),
                TextColumn::make('quantity')->numeric(),
                TextColumn::make('line_total')
                    ->label('Line total')
                    ->money('EGP')
                    ->state(fn ($record): float => (float) $record->unit_price * $record->quantity),
            ])
            ->headerActions([
                CreateAction::make(),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
