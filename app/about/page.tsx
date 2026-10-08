import { getI18n } from "@/lib/i18n/server";
import { BrainCircuit, Globe2, Rocket, ShieldCheck } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";

export async function generateMetadata() { return createMetadata({
  title: "About",
  description: "Learn about MediaRise, a premium technology company building mobile apps, web platforms, AI systems, robotics automation, and IoT solutions.",
  path: "/about",
}); }

const values = [
  { title: "Product clarity", icon: Rocket, text: "We turn ambiguous business goals into focused product systems with measurable launch paths." },
  { title: "Technical depth", icon: BrainCircuit, text: "We handle AI, robotics, mobile, web, cloud, data, and device workflows as one connected platform." },
  { title: "Global delivery", icon: Globe2, text: "A remote-first operating model lets us work with ambitious teams across markets and time zones." },
  { title: "Trust and resilience", icon: ShieldCheck, text: "Security, privacy, observability, and operational readiness are treated as core product features." },
];

export default async function AboutPage() {
  const { t } = await getI18n();
  return (
    <>
      <section className="container pt-36 pb-20">
        <Reveal>
          <Badge>{t("About MediaRise")}</Badge>
          <h1 className="mt-6 max-w-5xl font-display text-5xl font-semibold tracking-normal text-white text-balance md:text-7xl">{t("A senior technology studio for products with real complexity.")}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/62">{t("MediaRise partners with founders and operators to design, build, and scale software that crosses mobile, web, AI, robotics, automation, and IoT.")}</p>
        </Reveal>
      </section>

      <section className="container pb-24">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Reveal key={value.title} delay={index * 0.05}>
                <Card className="h-full bg-white/4.5 p-6">
                  <Icon className="size-6 text-red-300" />
                  <h2 className="mt-5 font-display text-xl font-semibold text-white">{t(value.title)}</h2>
                  <p className="mt-3 text-sm leading-6 text-white/58">{t(value.text)}</p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/2.5 py-24">
        <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionHeading
              eyebrow={t("How we work")}
              title={t("Small senior teams, strong ownership, visible progress.")}
              description={t("We keep communication direct, prototypes tangible, architecture documented, and every milestone tied to a product outcome.")}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-lg border border-white/10 bg-black/32 p-6 md:p-8">
              <div className="grid gap-6">
                {["Discover the highest-value release", "Design the full experience and system map", "Build production software with weekly demos", "Launch, monitor, learn, and improve"].map((step, index) => (
                  <div key={step} className="grid grid-cols-[auto_1fr] gap-4">
                    <div className="flex size-9 items-center justify-center rounded-md bg-red-500/12 text-sm font-semibold text-red-200">
                      {t(index + 1)}
                    </div>
                    <div className="border-b border-white/10 pb-6 text-white/72 last:border-0 last:pb-0">{t(step)}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
