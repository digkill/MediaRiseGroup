import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { navItems, services } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40">
      <div className="container grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3 font-display text-xl font-semibold text-white">
            <span className="flex size-11 items-center justify-center overflow-hidden rounded-md border border-red-400/25 bg-white">
              <Image
                src="/images/mediarisegroup-mark.png"
                alt=""
                width={512}
                height={512}
                className="size-full object-cover"
              />
            </span>
            <span>
              Media<span className="text-red-400">Rise</span>Group
            </span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/58">
            Premium software engineering for mobile apps, AI platforms, robotics systems, IoT networks, and digital transformation.
          </p>
          <Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-red-200 hover:text-white">
            Start a project <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">Navigation</h2>
          <div className="mt-4 grid gap-3">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-white/58 hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">Capabilities</h2>
          <div className="mt-4 grid gap-3">
            {services.slice(0, 5).map((service) => (
              <Link key={service.title} href={service.href} className="text-sm text-white/58 hover:text-white">
                {service.title}
              </Link>
            ))}
            <Link href="/privacy" className="text-sm text-white/58 hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
      <div className="container border-t border-white/10 py-5 text-xs text-white/42">
        (c) {new Date().getFullYear()} MediaRiseGroup. All rights reserved.
      </div>
    </footer>
  );
}
