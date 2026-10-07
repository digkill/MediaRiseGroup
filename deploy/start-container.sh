#!/bin/sh
set -eu
cd /backend
# Additive migrations only. The seed inserts missing projects, never overwrites
# edits or restores archived projects during a rolling deployment.
php artisan migrate --force
php artisan db:seed --class=PortfolioSeeder --force
php artisan config:cache
php artisan view:cache
chown -R www-data:www-data storage bootstrap/cache
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/mediarise.conf
