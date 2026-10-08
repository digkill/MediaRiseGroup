"use client";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { useI18n } from "@/components/locale-provider";
import { locales, languageNames, localePath, type Locale } from "@/lib/i18n/config";
export function LanguageSwitcher() {
  const { locale, t } = useI18n();
  const pathname = usePathname();
  return <label className="flex shrink-0 items-center gap-1 rounded-md border border-foreground/15 px-2 py-2 text-sm">
    <Languages className="size-4" aria-hidden="true" />
    <span className="sr-only">{t("Language")}</span>
    <select aria-label={t("Language")} value={locale} className="max-w-28 cursor-pointer bg-transparent outline-none [&>option]:bg-background [&>option]:text-foreground" onChange={event => {
      // A full navigation also refreshes the root server layout and HTML language.
      window.location.assign(localePath(pathname, event.target.value as Locale) + window.location.search + window.location.hash);
    }}>{locales.map(code => <option key={code} value={code} lang={code}>{languageNames[code]}</option>)}</select>
  </label>;
}
