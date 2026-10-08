"use client";
import { useI18n } from "@/components/locale-provider";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "@/components/locale-link";

import { navItems, services } from "@/lib/content";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-white/10 bg-black/40">
      <div className="container grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3 font-display text-xl font-semibold text-white">
            <span className="flex size-11 items-center justify-center overflow-hidden rounded-md border border-red-400/25 bg-white">
              <Image
                src="/images/mediarise-mark.png"
                alt=""
                width={512}
                height={512}
                className="size-full object-cover"
              />
            </span>
            <span>{t("Media")}<span className="text-red-400">{t("Rise")}</span>
            </span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/58">{t("Premium software engineering for mobile apps, AI platforms, robotics systems, IoT networks, and digital transformation.")}</p>
          <Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-red-200 hover:text-white">{t("Start a project")}<ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">{t("Navigation")}</h2>
          <div className="mt-4 grid gap-3">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-white/58 hover:text-white">
                {t(item.label)}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">{t("Capabilities")}</h2>
          <div className="mt-4 grid gap-3">
            {services.slice(0, 5).map((service) => (
              <Link key={service.title} href={service.href} className="text-sm text-white/58 hover:text-white">
                {t(service.title)}
              </Link>
            ))}
            <Link href="/privacy" className="text-sm text-white/58 hover:text-white">{t("Privacy Policy")}</Link>
          </div>
        </div>
      </div>
      <div className="container border-t border-white/10 py-5 text-xs text-white/42">{t("(c)")}{t(new Date().getFullYear())}{t("MediaRise. All rights reserved.")}</div>
    </footer>
  );
}
