export const locales = ["en", "ru", "zh", "ko", "th", "ja"] as const;
export type Locale = (typeof locales)[number];
export const languageNames: Record<Locale, string> = { en: "English", ru: "Русский", zh: "简体中文", ko: "한국어", th: "ไทย", ja: "日本語" };
export const languageTags: Record<Locale, string> = { en: "en", ru: "ru", zh: "zh-Hans", ko: "ko", th: "th", ja: "ja" };
export function isLocale(value: string): value is Locale { return locales.includes(value as Locale); }
export function stripLocale(path: string) { return path.replace(/^\/(en|ru|zh|ko|th|ja)(?=[/\?#]|$)/, "") || "/"; }
export function localePath(path: string, locale: Locale): string {
  if (!path.startsWith("/") || path.startsWith("//") || /^\/(api|admin|images|portfolio-media|_next)(\/|$)/.test(path)) return path;
  const bare = stripLocale(path);
  return locale === "en" ? bare : `/${locale}${bare === "/" ? "" : bare}`;
}
export type Messages = Record<string, string>;
export function translator(messages: Messages) {
  return function t<T>(value: T): T {
    if (typeof value !== "string") return value;
    const key = value.trim().replace(/\s+/g, " ");
    const translated = messages[key];
    if (!translated?.trim()) return value;
    return (value.match(/^\s*/)?.[0] + translated + value.match(/\s*$/)?.[0]) as T;
  };
}
