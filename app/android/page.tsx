import { ArrowRight, Gauge, Play, Shield, Smartphone } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { androidBenefits } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Android App Development",
  description: "Native Android development with Kotlin, Jetpack Compose, performance optimization, Play Store launch, and Android ecosystem expertise.",
  path: "/android",
});

const pillars = [
  { title: "Kotlin architecture", icon: Smartphone, description: "Modern Android architecture with clean modules, Compose UI, offline data, and robust background work." },
  { title: "Performance", icon: Gauge, description: "Cold start profiling, memory discipline, battery-aware sync, and smooth interactions across device classes." },
  { title: "Security", icon: Shield, description: "Encrypted storage, secure networking, auth flows, permissions, and privacy-compliant data handling." },
  { title: "Play Store growth", icon: Play, description: "Signing, tracks, staged rollout, policy readiness, crash monitoring, and optimization for discovery." },
];

export default function AndroidPage() {
  return (
    <>
      <section className="container pt-36 pb-20 text-zinc-950 dark:text-zinc-50">
        <Reveal>
          <Badge>Android Development</Badge>
          <h1 className="mt-6 max-w-5xl font-display text-5xl font-semibold tracking-normal text-white text-balance md:text-7xl">
            Native Android apps built for performance, polish, and Play Store growth.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/62">
            MediaRiseGroup builds Kotlin and Jetpack Compose products with the production details Android users notice immediately.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">
                Plan Android build <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/mobile">All mobile services</Link>
            </Button>
          </div>
        </Reveal>
      </section>

      <section className="container pb-24 text-zinc-950 dark:text-zinc-50">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.title} delay={index * 0.05}>
                <Card className="h-full bg-white/[0.045] p-6 text-white">
                  <Icon className="size-6 text-red-300" />
                  <h2 className="mt-5 font-display text-xl font-semibold text-white">{pillar.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-white/58">{pillar.description}</p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] py-24 text-zinc-950 dark:text-zinc-50">
        <div className="container grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Delivery"
              title="Android engineering with every launch detail covered."
              description="We build for real-world Android fragmentation, marketplace rules, analytics, crash reporting, and ongoing iteration."
            />
          </Reveal>
          <div className="grid gap-3">
            {androidBenefits.map((benefit) => (
              <Card key={benefit} className="bg-white/[0.045] p-5 text-sm leading-6 text-white/70">
                {benefit}
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
