"use client";
import Link from "next/link";
import { forwardRef, type ComponentProps } from "react";
import { useI18n } from "./locale-provider";
import { localePath } from "@/lib/i18n/config";
export default forwardRef<HTMLAnchorElement, ComponentProps<typeof Link>>(function LocaleLink({ href, ...props }, ref) {
  const { locale } = useI18n();
  return <Link ref={ref} {...props} href={typeof href === "string" ? localePath(href, locale) : href} />;
});
