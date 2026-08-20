# Meral Haven — backend

Laravel 13 + Filament 5. Runs the admin dashboard at `/admin` and the JSON API
the storefront reads at `/api`.

## Setup

```sh
composer install
cp .env.example .env && php artisan key:generate   # if .env is missing
php artisan migrate --seed
php artisan storage:link
php artisan serve      # http://localhost:8000
```

The seeder loads the catalogue the storefront previously hard-coded (4
categories, 6 products, images included) and creates one dashboard admin:

| email | password |
| --- | --- |
| `admin@meral.test` | `password` |

**Change that password before this goes anywhere near production.** Only users
with `is_admin = true` can open `/admin`; everyone else is a storefront
customer.

## Database

MySQL, database `merals_haven`, configured in `.env`.

| table | holds |
| --- | --- |
| `categories` | Bags, Wedding Handkerchiefs, Bespoke, Cosmetics — bilingual names |
| `products` | bilingual title/description, price, compare-at price, rating, image, visibility |
| `reservations` / `reservation_items` | customer orders; items keep the title and price as sold |
| `contact_messages` | contact-form submissions |
| `subscribers` | cosmetics launch waitlist |
| `users` | storefront customers + dashboard admins (`is_admin`) |

## Tests

```sh
php artisan test
```

Covers the money path: reservation totals are recomputed from the database, a
tampered `total` in the request body is ignored, and coming-soon products
cannot be reserved.

See [API.md](API.md) for the endpoints.
