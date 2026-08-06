# syntax=docker/dockerfile:1

# Debian slim rather than Alpine: Next ships a native sharp binary for image
# optimisation, and the musl variants are a recurring source of build breakage.
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
# Every route is statically prerendered, so the public origin is baked into the
# HTML at build time (canonical URLs, Open Graph, JSON-LD). Setting this only at
# runtime would leave the wrong origin in the markup.
ARG SITE_URL=https://mediarise.org
ENV SITE_URL=${SITE_URL}
RUN yarn build

FROM ${NODE_IMAGE} AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    # Must bind all interfaces — 127.0.0.1 would be unreachable from the proxy.
    HOSTNAME=0.0.0.0

# Coolify replaces the container healthcheck with its own probe, which shells out
# to curl or wget — neither ships in the slim image, so the container would be
# reported unhealthy and rolled back even though the server started fine.
RUN apt-get update \
 && apt-get install -y --no-install-recommends curl \
 && rm -rf /var/lib/apt/lists/*

RUN groupadd --system --gid 1001 nodejs \
 && useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD curl -fsS "http://127.0.0.1:${PORT}/api/health" || exit 1

CMD ["node", "server.js"]
