# Meral — Handmade Haven

Storefront for Meral, a handmade brand: embroidered bags, wedding
handkerchiefs, and a cosmetics line coming later.

- `src/` — the storefront (TanStack Start + React 19 + Tailwind 4), Arabic/English, RTL by default.
- `backend/` — Laravel + Filament admin dashboard and the JSON API the storefront reads.

## Storefront

```sh
bun install
bun run dev      # http://localhost:5173
bun run build
```

## Backend

```sh
cd backend
composer install
php artisan serve   # http://localhost:8000, admin at /admin
```
