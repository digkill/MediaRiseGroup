import "server-only";
import { headers } from "next/headers";
import { cache } from "react";
import { isLocale, translator, type Locale, type Messages } from "./config";
const loaders = {
  en: async () => ({} as Messages),
  ru: async () => (await import("./messages/ru.json")).default,
  zh: async () => (await import("./messages/zh.json")).default,
  ko: async () => (await import("./messages/ko.json")).default,
  th: async () => (await import("./messages/th.json")).default,
  ja: async () => (await import("./messages/ja.json")).default,
};
export const getLocale = cache(async (): Promise<Locale> => {
  const value = (await headers()).get("x-site-locale") ?? "en";
  return isLocale(value) ? value : "en";
});
export const getI18n = cache(async () => {
  const locale = await getLocale();
  const messages: Messages = await loaders[locale]();
  return { locale, messages, t: translator(messages) };
});
