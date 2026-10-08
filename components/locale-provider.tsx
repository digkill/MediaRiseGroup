"use client";
import { createContext, useContext, useMemo, type ReactNode } from "react";
import { translator, type Locale, type Messages } from "@/lib/i18n/config";
const Context = createContext({ locale: "en" as Locale, t: translator({}) });
export function LocaleProvider({ locale, messages, children }: { locale: Locale; messages: Messages; children: ReactNode }) {
  const value = useMemo(() => ({ locale, t: translator(messages) }), [locale, messages]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useI18n() { return useContext(Context); }
