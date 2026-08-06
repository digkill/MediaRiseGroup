# MediaRise Website

Premium multi-page website for MediaRise built with Next.js 16 App Router, TypeScript, Tailwind CSS v4, shadcn/ui-style primitives, Framer Motion, next-themes, Lucide icons, Three.js, `@react-three/fiber`, and `@react-three/drei`.

Yarn is the package manager for this repo — `yarn.lock` is the single source of truth.

## Run Locally

```bash
yarn install
yarn dev
```

Open `http://localhost:3000`.

## Backend

Laravel backend is installed in `backend/` and configured for MySQL.

```bash
cd backend
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve --port=8001
```

Set remote MySQL credentials in `backend/.env` before running migrations:

```env
DB_HOST=remote-mysql-host
DB_PORT=3306
DB_DATABASE=mediarise
DB_USERNAME=remote-mysql-user
DB_PASSWORD=remote-mysql-password
```

API health check:

```bash
curl http://127.0.0.1:8001/api/health
```

## Build

```bash
yarn build
yarn lint
```

## Structure

- `app/` - App Router routes, metadata, layout, and page transitions
- `components/` - Layout, UI primitives, motion wrappers, sections, and 3D scenes
- `lib/` - Shared content, metadata helpers, and utilities
- `public/` - Static image and model placeholders, including the provided MediaRise logo

## Routes

- `/`
- `/services`
- `/mobile`
- `/mobile/android/privacy/plantpal`
- `/services/mobile`
- `/android`
- `/projects`
- `/plantpal`
- `/about`
- `/privacy`
- `/contact`
