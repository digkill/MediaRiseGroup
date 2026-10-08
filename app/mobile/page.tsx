import { getI18n } from "@/lib/i18n/server";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "@/components/locale-link";

import { Reveal } from "@/components/motion/reveal";
import { PhoneMockup } from "@/components/sections/phone-mockup";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";

export async function generateMetadata() { return createMetadata({
  title: "Native Mobile App Development",
  description: "Native iOS and Android development by MediaRise with Swift, Kotlin, React Native, Flutter, product strategy, and launch support.",
  path: "/mobile",
}); }

const technologies = ["Swift", "SwiftUI", "Kotlin", "Jetpack Compose", "React Native", "Flutter", "Firebase", "RevenueCat"];
const benefits = ["Native performance and polished UX", "Secure authentication and data storage", "Analytics, subscriptions, and push systems", "Store launch, QA, and growth readiness"];
const cases = ["PlantPal AI plant care", "Fintech onboarding app", "Healthcare habit tracker"];

export default async function MobilePage() {
  const { t } = await getI18n();
  return (
    <>
      <section className="container grid gap-12 pt-36 pb-20 lg:grid-cols-[1fr_420px] lg:items-center">
        <Reveal>
          <Badge>{t("Native Mobile Development")}</Badge>
          <h1 className="mt-6 font-display text-5xl font-semibold tracking-normal text-white text-balance md:text-7xl">{t("iOS and Android apps with premium product feel.")}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/62">{t("We build mobile products that launch cleanly, perform under pressure, and keep users coming back.")}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">{t("Build an app")}<ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/android">{t("Android expertise")}</Link>
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <PhoneMockup />
        </Reveal>
      </section>

      <section className="container pb-24">
        <Reveal>
          <SectionHeading eyebrow={t("Technology")} title={t("Native where it matters. Cross-platform where it wins.")} />
        </Reveal>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {technologies.map((tech) => (
            <Card key={tech} className="bg-white/4.5 p-5 text-center font-semibold text-white">
              {t(tech)}
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/2.5 py-24">
        <div className="container grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow={t("Process")}
              title={t("From prototype to App Store release.")}
              description={t("We define the core user journey, build the design system, wire production analytics, and prepare every release artifact.")}
            />
          </Reveal>
          <div className="grid gap-4">
            {benefits.map((benefit) => (
              <Card key={benefit} className="flex items-center gap-4 bg-white/4.5 p-5">
                <CheckCircle2 className="size-5 shrink-0 text-red-300" />
                <span className="text-white/72">{t(benefit)}</span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-24">
        <Reveal>
          <SectionHeading eyebrow={t("Case studies")} title={t("Mobile products designed around retention and trust.")} />
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {cases.map((item) => (
            <Card key={item} className="min-h-48 bg-[radial-gradient(circle_at_25%_20%,rgba(255,0,51,.22),transparent_36%),rgba(255,255,255,.045)] p-6">
              <h3 className="font-display text-2xl font-semibold text-white">{t(item)}</h3>
              <p className="mt-4 text-sm leading-6 text-white/58">{t("Product strategy, mobile UX, app architecture, analytics, and launch systems.")}</p>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
