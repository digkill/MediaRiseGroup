# syntax=docker/dockerfile:1
ARG NODE_IMAGE=node:22-bookworm-slim
FROM ${NODE_IMAGE} AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --network-timeout 600000

FROM ${NODE_IMAGE} AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG SITE_URL=https://mediarise.org
ENV SITE_URL=${SITE_URL}
RUN yarn build

FROM php:8.4-fpm-bookworm AS php-base
RUN apt-get update \
 && apt-get install -y --no-install-recommends libonig-dev libzip-dev curl nginx supervisor libatomic1 unzip \
 && docker-php-ext-install pdo_mysql mbstring zip opcache \
 && rm -rf /var/lib/apt/lists/*

FROM php-base AS backend-builder
COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer
WORKDIR /backend
COPY backend/ ./
RUN mkdir -p storage/framework/cache/data storage/framework/sessions storage/framework/views storage/logs bootstrap/cache \
 && composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

FROM php-base AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 \
    APP_ENV=production APP_DEBUG=false LOG_CHANNEL=stderr \
    SESSION_DRIVER=database CACHE_STORE=database QUEUE_CONNECTION=sync \
    SESSION_SECURE_COOKIE=true PORTFOLIO_API_URL=http://127.0.0.1:3000 \
    PORTFOLIO_PUBLIC_PATH=/app/public
COPY --from=builder /usr/local/bin/node /usr/local/bin/node
COPY --from=builder --chown=www-data:www-data /app/.next/standalone ./
COPY --from=builder --chown=www-data:www-data /app/.next/static ./.next/static
COPY --from=builder --chown=www-data:www-data /app/public ./public
COPY --from=backend-builder --chown=www-data:www-data /backend /backend
COPY deploy/nginx.conf /etc/nginx/nginx.conf
COPY deploy/supervisord.conf /etc/supervisor/conf.d/mediarise.conf
COPY deploy/start-container.sh /usr/local/bin/start-mediarise
RUN chmod +x /usr/local/bin/start-mediarise \
 && printf 'upload_max_filesize=6M\npost_max_size=8M\nexpose_php=Off\n' > /usr/local/etc/php/conf.d/portfolio.ini
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
 CMD curl -fsS http://127.0.0.1:3000/api/cms-health && curl -fsS http://127.0.0.1:3000/api/health || exit 1
CMD ["/usr/local/bin/start-mediarise"]
