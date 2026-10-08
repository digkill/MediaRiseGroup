import { getI18n } from "@/lib/i18n/server";
import { ArrowRight, Check } from "lucide-react";
import Link from "@/components/locale-link";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { process, serviceDetails } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

export async function generateMetadata() { return createMetadata({
  title: "Services",
  description: "Explore MediaRise services across mobile apps, web platforms, AI, machine learning, robotics, automation, and IoT solutions.",
  path: "/services",
}); }

export default async function ServicesPage() {
  const { t } = await getI18n();
  return (
    <>
      <section className="container pt-36 pb-16">
        <Reveal>
          <Badge>{t("Services")}</Badge>
          <h1 className="mt-6 max-w-5xl font-display text-5xl font-semibold tracking-normal text-white text-balance md:text-7xl">{t("Digital product engineering for ambitious technical roadmaps.")}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/62">{t("MediaRise covers the full lifecycle: product strategy, UX systems, application engineering, AI integration, robotics interfaces, IoT architecture, and launch support.")}</p>
        </Reveal>
      </section>

      <section className="container pb-24">
        <div className="grid gap-5">
          {serviceDetails.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.id} delay={index * 0.04}>
                <Card id={service.id} className="scroll-mt-28 overflow-hidden bg-white/4.5 p-6 md:p-8">
                  <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                    <div>
                      <div className="flex size-12 items-center justify-center rounded-md border border-red-400/30 bg-red-500/10 text-red-200">
                        <Icon className="size-6" />
                      </div>
                      <p className="mt-6 text-sm font-semibold uppercase text-red-200/80">{t(service.kicker)}</p>
                      <h2 className="mt-3 font-display text-3xl font-semibold text-white md:text-4xl">{t(service.title)}</h2>
                      <p className="mt-4 text-base leading-7 text-white/58">{t(service.description)}</p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {service.capabilities.map((capability) => (
                        <div key={capability} className="flex gap-3 rounded-md border border-white/10 bg-black/28 p-4">
                          <Check className="mt-0.5 size-4 shrink-0 text-red-300" />
                          <span className="text-sm leading-6 text-white/68">{t(capability)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/2.5 py-24">
        <div className="container">
          <Reveal>
            <SectionHeading eyebrow={t("Process")} title={t("A delivery model that keeps strategy and engineering connected.")} />
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {process.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <Card className="h-full bg-white/4.5 p-6">
                  <div className="text-sm font-semibold text-red-200">{t("0")}{t(index + 1)}</div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-white">{t(item.title)}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/58">{t(item.description)}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-24">
        <Reveal>
          <div className="rounded-lg border border-red-400/20 bg-red-500/10 p-8 md:p-10">
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2 className="font-display text-3xl font-semibold text-white">{t("Need a focused product team?")}</h2>
                <p className="mt-3 text-white/60">{t("Tell us what you are building and we will map the fastest credible path to launch.")}</p>
              </div>
              <Button asChild>
                <Link href="/contact">{t("Get Consultation")}<ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
