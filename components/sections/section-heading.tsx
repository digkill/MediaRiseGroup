"use client";
import { useI18n } from "@/components/locale-provider";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  const { t } = useI18n();
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? <Badge>{t(eyebrow)}</Badge> : null}
      <h2 className="mt-4 font-display text-3xl font-semibold tracking-normal text-white text-balance md:text-5xl">{t(title)}</h2>
      {description ? <p className="mt-5 text-base leading-8 text-white/58 md:text-lg">{t(description)}</p> : null}
    </div>
  );
}
