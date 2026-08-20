<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seeds the catalogue the storefront shipped with as hard-coded data, so the
     * dashboard and the API have something real to serve from a fresh database.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@meral.test'],
            ['name' => 'Meral Admin', 'password' => 'password', 'is_admin' => true],
        );

        $categories = [
            'bags' => ['Bags', 'حقائب'],
            'wedding-handkerchiefs' => ['Wedding Handkerchiefs', 'مناديل الزفاف'],
            'bespoke' => ['Bespoke', 'تصميم خاص'],
            'cosmetics' => ['Cosmetics', 'مستحضرات التجميل'],
        ];

        $sort = 0;
        foreach ($categories as $slug => [$en, $ar]) {
            Category::updateOrCreate(
                ['slug' => $slug],
                ['name_en' => $en, 'name_ar' => $ar, 'sort_order' => $sort++],
            );
        }

        $bags = 'products/bags-collection.jpg';
        $hankies = 'products/handkerchiefs-collection.jpg';
        $cosmetics = 'products/cosmetics-teaser.jpg';

        $products = [
            [
                'slug' => 'embroidered-clutch',
                'category' => 'bags',
                'title_en' => 'Embroidered Floral Clutch',
                'title_ar' => 'كلتش مطرز بالزهور',
                'description_en' => 'A hand-embroidered clutch in soft blush tones with delicate floral details. Perfect for weddings and elegant evenings.',
                'description_ar' => 'كلتش مطرز يدويًا بدرجات وردية ناعمة وتفاصيل زهرية رقيقة. مثالي للأعراس والسهرات الأنيقة.',
                'price' => 1450,
                'compare_at_price' => 1800,
                'rating' => 4.8,
                'reviews_count' => 36,
                'image' => $bags,
            ],
            [
                'slug' => 'linen-pouch',
                'category' => 'bags',
                'title_en' => 'Linen Embroidery Pouch',
                'title_ar' => 'محفظة كتان مطرزة',
                'description_en' => 'A compact linen pouch with hand-stitched florals. Made to carry your everyday essentials beautifully.',
                'description_ar' => 'محفظة كتان صغيرة بتطريز يدوي زهري، لحمل أساسياتك اليومية بأناقة.',
                'price' => 850,
                'rating' => 4.6,
                'reviews_count' => 21,
                'image' => $bags,
            ],
            [
                'slug' => 'monogram-handkerchief',
                'category' => 'wedding-handkerchiefs',
                'title_en' => 'Personalised Monogram Handkerchief',
                'title_ar' => 'منديل مطرز بالأحرف الأولى',
                'description_en' => 'A soft linen handkerchief embroidered with an initial and surrounded by delicate flowers. A keepsake for weddings and anniversaries.',
                'description_ar' => 'منديل كتان ناعم مطرز بحرف محاط بزهور رقيقة. تذكار للأعراس والذكرى السنوية.',
                'price' => 650,
                'compare_at_price' => 820,
                'rating' => 5.0,
                'reviews_count' => 54,
                'image' => $hankies,
            ],
            [
                'slug' => 'bridal-handkerchief',
                'category' => 'wedding-handkerchiefs',
                'title_en' => 'Bridal Floral Handkerchief',
                'title_ar' => 'منديل العروس الزهري',
                'description_en' => 'Hand-embroidered wedding handkerchief with lace trim and a floral wreath. Designed for the bride and her loved ones.',
                'description_ar' => 'منديل زفاف مطرز يدويًا بحواف دانتيل وإكليل من الزهور، للعروس وأحبتها.',
                'price' => 990,
                'rating' => 4.9,
                'reviews_count' => 42,
                'image' => $hankies,
            ],
            [
                'slug' => 'custom-order',
                'category' => 'bespoke',
                'title_en' => 'Custom Embroidery Order',
                'title_ar' => 'طلب تطريز مخصص',
                'description_en' => 'Work with us to create a custom piece — a special motif, a name, a date, or a colour that holds meaning for you.',
                'description_ar' => 'نصمم معك قطعة خاصة — رسمة، اسم، تاريخ، أو لون يحمل معنى خاصًا لك.',
                'price' => 1600,
                'rating' => 4.9,
                'reviews_count' => 18,
                'image' => $bags,
            ],
            [
                'slug' => 'cosmetics-soon',
                'category' => 'cosmetics',
                'title_en' => 'Natural Cosmetics — Coming Soon',
                'title_ar' => 'مستحضرات طبيعية — قريبًا',
                'description_en' => 'Our upcoming line of gentle, handcrafted skincare and beauty products made with natural ingredients.',
                'description_ar' => 'خطنا القادم من منتجات العناية والجمال المصنوعة يدويًا بمكونات طبيعية.',
                'is_coming_soon' => true,
                'image' => $cosmetics,
            ],
        ];

        foreach ($products as $sort => $product) {
            $slug = $product['slug'];
            $category = Category::where('slug', $product['category'])->firstOrFail();
            unset($product['slug'], $product['category']);

            Product::updateOrCreate(
                ['slug' => $slug],
                $product + ['category_id' => $category->id, 'sort_order' => $sort],
            );
        }
    }
}
