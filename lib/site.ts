/** Публичный origin сайта (metadata, JSON-LD). Задаётся в `.env` как `SITE_URL`. */
export const siteUrl = (process.env.SITE_URL ?? "https://mediarise.org").replace(/\/$/, "");
