<?php

namespace App\Filament\Resources\Products;

use App\Filament\Resources\Products\Pages\CreateProduct;
use App\Filament\Resources\Products\Pages\EditProduct;
use App\Filament\Resources\Products\Pages\ListProducts;
use App\Models\Product;
use BackedEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static string|\UnitEnum|null $navigationGroup = 'Shop';

    protected static ?int $navigationSort = 1;

    protected static ?string $recordTitleAttribute = 'title_en';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title_en')
                    ->label('Title (EN)')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn (string $operation, ?string $state, Set $set) => $operation === 'create'
                        ? $set('slug', Str::slug((string) $state))
                        : null),
                TextInput::make('title_ar')
                    ->label('Title (AR)')
                    ->required(),
                TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->helperText('Used in the storefront URL and cart. Avoid changing it once orders exist.'),
                Select::make('category_id')
                    ->relationship('category', 'name_en')
                    ->required()
                    ->preload()
                    ->searchable(),
                Textarea::make('description_en')
                    ->label('Description (EN)')
                    ->rows(3)
                    ->columnSpanFull(),
                Textarea::make('description_ar')
                    ->label('Description (AR)')
                    ->rows(3)
                    ->columnSpanFull(),
                TextInput::make('price')
                    ->numeric()
                    ->minValue(0)
                    ->prefix('EGP')
                    ->helperText('Leave empty for "coming soon" products.'),
                TextInput::make('compare_at_price')
                    ->label('Compare-at price')
                    ->numeric()
                    ->minValue(0)
                    ->prefix('EGP')
                    ->helperText('Shown struck through next to the price.'),
                TextInput::make('rating')
                    ->numeric()
                    ->minValue(0)
                    ->maxValue(5)
                    ->step(0.1),
                TextInput::make('reviews_count')
                    ->required()
                    ->numeric()
                    ->minValue(0)
                    ->default(0),
                FileUpload::make('image')
                    ->image()
                    ->disk('public')
                    ->directory('products')
                    ->imageEditor()
                    ->columnSpanFull(),
                Toggle::make('is_active')
                    ->label('Visible on the site')
                    ->default(true),
                Toggle::make('is_coming_soon')
                    ->label('Coming soon'),
                TextInput::make('sort_order')
                    ->required()
                    ->numeric()
                    ->default(0),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('title_en')
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
            ->columns([
                ImageColumn::make('image')
                    ->disk('public')
                    ->label(''),
                TextColumn::make('title_en')
                    ->label('Title (EN)')
                    ->description(fn (Product $record): string => $record->slug)
                    ->searchable(),
                TextColumn::make('title_ar')
                    ->label('Title (AR)')
                    ->searchable(),
                TextColumn::make('category.name_en')
                    ->label('Category')
                    ->badge()
                    ->sortable(),
                TextColumn::make('price')
                    ->money('EGP')
                    ->sortable(),
                TextColumn::make('rating')
                    ->numeric(1)
                    ->description(fn (Product $record): string => $record->reviews_count.' reviews')
                    ->sortable(),
                IconColumn::make('is_active')
                    ->label('Visible')
                    ->boolean(),
                IconColumn::make('is_coming_soon')
                    ->label('Soon')
                    ->boolean(),
            ])
            ->filters([
                SelectFilter::make('category')
                    ->relationship('category', 'name_en')
                    ->preload(),
                TernaryFilter::make('is_active')->label('Visible on the site'),
                TernaryFilter::make('is_coming_soon')->label('Coming soon'),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListProducts::route('/'),
            'create' => CreateProduct::route('/create'),
            'edit' => EditProduct::route('/{record}/edit'),
        ];
    }
}
