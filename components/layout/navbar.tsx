"use client";
import { LanguageSwitcher } from "./language-switcher";
import { stripLocale } from "@/lib/i18n/config";
import { useI18n } from "@/components/locale-provider";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "@/components/locale-link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { navItems } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

function Logo() {
  const { t } = useI18n();
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label={t("MediaRise home")}>
      <span className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md border border-red-400/25 bg-white shadow-glow">
        <Image
          src="/images/mediarise-mark.png"
          alt=""
          width={512}
          height={512}
          className="size-full object-cover"
          priority
        />
      </span>
      <span className="hidden font-display text-base font-semibold tracking-normal text-foreground min-[360px]:inline">{t("Media")}<span className="text-red-400">{t("Rise")}</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const { t } = useI18n();
  const pathname = stripLocale(usePathname());
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  useEffect(() => scrollY.on("change", (latest) => setScrolled(latest > 18)), [scrollY]);

  // Close the mobile menu whenever navigation happens.
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6">
      <nav
        className={cn(
          "mx-auto flex h-16 max-w-7xl items-center justify-between rounded-lg px-4 transition-all duration-300 md:px-5",
          scrolled
            ? "border border-black/10 bg-white/86 shadow-2xl shadow-black/10 backdrop-blur-2xl dark:border-white/10 dark:bg-black/76 dark:shadow-black/30"
            : "glass",
        )}
      >
        <Logo />
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium text-foreground/66 transition hover:bg-black/5 hover:text-foreground dark:text-white/66 dark:hover:bg-white/6 dark:hover:text-white",
                  active && "bg-black/5 text-foreground dark:bg-white/[0.07] dark:text-white",
                )}
              >
                {t(item.label)}
              </Link>
            );
          })}
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button asChild size="sm">
            <Link href="/contact">{t("Get Consultation")}</Link>
          </Button>
        </div>
        <div className="lg:hidden"><LanguageSwitcher /></div>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <Button variant="secondary" size="icon" className="lg:hidden" aria-label={t("Open menu")}>
              <Menu />
            </Button>
          </Dialog.Trigger>
          <AnimatePresence>
            {open ? (
              <Dialog.Portal forceMount>
                <Dialog.Overlay asChild>
                  <motion.div
                    className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs dark:bg-black/70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                </Dialog.Overlay>
                <Dialog.Content asChild>
                  <motion.div
                    className="fixed inset-x-3 top-3 z-50 rounded-lg border border-black/10 bg-white/96 p-4 shadow-2xl shadow-red-950/10 dark:border-white/10 dark:bg-[#0a0a0a]/96 dark:shadow-red-950/25"
                    initial={{ opacity: 0, y: -12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <Logo />
                      <Dialog.Close asChild>
                        <Button variant="secondary" size="icon" aria-label={t("Close menu")}>
                          <X />
                        </Button>
                      </Dialog.Close>
                    </div>
                    <div className="mt-6 grid gap-2">
                      {navItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="rounded-md px-3 py-3 text-base font-medium text-foreground/80 transition hover:bg-black/5 hover:text-foreground dark:text-white/80 dark:hover:bg-white/[0.07] dark:hover:text-white"
                        >
                          {t(item.label)}
                        </Link>
                      ))}
                      <div className="mt-3 flex gap-2">
                        <ThemeToggle />
                        <Button asChild className="flex-1">
                          <Link href="/contact">{t("Get Consultation")}</Link>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </Dialog.Content>
              </Dialog.Portal>
            ) : null}
          </AnimatePresence>
        </Dialog.Root>
      </nav>
    </header>
  );
}
