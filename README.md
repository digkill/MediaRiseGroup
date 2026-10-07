# MediaRise Website

Premium multi-page website for MediaRise built with Next.js 16 App Router, TypeScript, Tailwind CSS v4, shadcn/ui-style primitives, Framer Motion, next-themes, Lucide icons, Three.js, `@react-three/fiber`, and `@react-three/drei`.

Yarn is the package manager for this repo — `yarn.lock` is the single source of truth.

## Run Locally

```bash
yarn install
yarn dev
```

Open `http://localhost:3000`.

## Portfolio CMS

Public portfolio pages use English only. Russian copy is retained in the protected
editor. `/admin` requires an administrator account; there is no public registration.
The **Published** checkbox controls the catalog and project detail page. **On homepage**
controls the homepage independently, and only published projects can appear there.
Changes take effect on the next page load without rebuilding the site.

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
# Configure DB_* in backend/.env before migrating.
php artisan migrate
php artisan db:seed --class=PortfolioSeeder
php artisan portfolio:admin admin@example.com
php artisan serve --port=8001
```

Set `PORTFOLIO_API_URL=http://127.0.0.1:8001` in the root `.env.local` and run
`yarn dev`. Without this variable, the frontend uses the English seed in read-only
mode. With it configured, API failures never fall back to publishing seed records.

The editor manages English and Russian copy, features, technology, platforms,
status, links, order, image uploads, captions, publication, and homepage selection.
Deletion archives a project; restoring it creates a hidden draft. Simultaneous edits
are protected by a version check. Uploaded JPEG, PNG and WebP images are stored in
the database, so deployments do not remove them.

## Production

The Docker image runs nginx on port 3000, Next.js on internal port 3001, and PHP-FPM.
Nginx sends `/admin`, `/portfolio-media/*`, `/api/portfolio` and `/api/cms-health` to
Laravel. Next fetches the public CMS API server-side without caching.

Configure runtime environment variables in the hosting application:
`APP_KEY` (Laravel base64 key), `APP_URL=https://mediarise.org`, `DB_CONNECTION=mysql`,
`DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`, and
`SESSION_COOKIE=mediarise_admin_session`. Keep secrets outside the repository and
build arguments. Secure session cookies are enabled by the production image.

Startup runs migrations and inserts missing seed projects. It never overwrites
editor changes or restores archived records. Create the initial administrator in
the running container using `php artisan portfolio:admin EMAIL`; automated setup
can read a protected file using `--password-file=php://stdin`.

Back up the complete CMS database (including projects, translations, media and
users) and preserve `APP_KEY`. `/api/health` checks both the frontend and CMS;
`/api/cms-health` checks database availability without disclosing connection data.

Validation: `yarn lint`, `yarn build`, and `cd backend && php artisan test`.

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
