# Storefront API

Base URL: `{APP_URL}/api` — `http://localhost:8000/api` in development.

Auth uses Sanctum personal access tokens. Send them as
`Authorization: Bearer <token>`. Endpoints marked 🔒 require one.

Every response is JSON. Validation failures return `422` with
`{"message": ..., "errors": {"field": ["..."]}}`.

Rate limits: register/login share one bucket of 10 per minute per IP, and the
two public forms share another. They are separate on purpose — form spam must
not be able to lock a visitor out of signing in.

## Catalogue

### `GET /products`

Active products, ordered by the dashboard's sort order.

Optional `?category=<slug>` filters by category slug.

```json
{
  "data": [
    {
      "id": "embroidered-clutch",
      "slug": "embroidered-clutch",
      "title": { "en": "Embroidered Floral Clutch", "ar": "كلتش مطرز بالزهور" },
      "description": { "en": "...", "ar": "..." },
      "category": { "slug": "bags", "name": { "en": "Bags", "ar": "حقائب" } },
      "price": 1450,
      "compareAt": 1800,
      "rating": 4.8,
      "reviews": 36,
      "image": "http://localhost:8000/storage/products/bags-collection.jpg",
      "comingSoon": false
    }
  ]
}
```

`id` is the slug, not the numeric key — carts and order lines are keyed by it,
so it stays stable and readable. `price`, `compareAt` and `rating` are `null`
for coming-soon products.

### `GET /products/{slug}`

One product, same shape. `404` if it is hidden or missing.

### `GET /categories`

```json
{ "data": [{ "slug": "bags", "name": { "en": "Bags", "ar": "حقائب" } }] }
```

## Accounts

### `POST /auth/register` → `201`

```json
{ "name": "...", "email": "...", "phone": "optional", "password": "min 8 chars" }
```

Returns `{ "user": {...}, "token": "..." }`.

### `POST /auth/login`

```json
{ "email": "...", "password": "..." }
```

Returns `{ "user": {...}, "token": "..." }`. Wrong credentials return `422`
with one generic message, so the endpoint cannot be used to discover which
emails have accounts.

### 🔒 `GET /auth/me`

Returns `{ "user": { "id", "name", "email", "phone" } }`.

### 🔒 `POST /auth/logout`

Revokes the token used to make the call.

## Reservations

### 🔒 `POST /reservations` → `201`

```json
{
  "fullName": "...",
  "phone": "...",
  "address": "optional",
  "note": "optional",
  "items": [{ "productId": "embroidered-clutch", "quantity": 2 }]
}
```

The total is calculated server-side from the current database prices — any
`total` sent in the body is ignored. Reserving a hidden or coming-soon product
returns `422`. Each line stores the title and unit price as sold, so later
edits to a product never rewrite order history.

Returns the reservation with its items and `"status": "pending"`.

### 🔒 `GET /reservations`

The signed-in customer's own reservations, newest first, items included.

## Forms

### `POST /contact` → `201`

`{ "name", "email", "subject": optional, "message" }` — lands in the dashboard
inbox with an unread badge.

### `POST /subscribers` → `201`

`{ "email", "name": optional }` — the cosmetics launch waitlist. Signing up
twice is not an error.
