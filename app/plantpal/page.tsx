import { Apple, ArrowRight, Bell, Camera, Leaf, MessageCircle, Play, Sparkles } from "lucide-react";
import Link from "next/link";

import { ProjectOrb } from "@/components/3d/project-orb";
import { Reveal } from "@/components/motion/reveal";
import { PhoneMockup } from "@/components/sections/phone-mockup";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { plantPalFeatures, testimonials } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "PlantPal AI Plant Care App",
  description: "PlantPal is MediaRiseGroup's flagship AI plant care mobile app with plant identification, care reminders, diagnostics, and community features.",
  path: "/plantpal",
});

const featureIcons = [Camera, Bell, Sparkles, MessageCircle, Leaf, Apple];

export default function PlantPalPage() {
  return (
    <>
      <section className="container grid gap-12 pt-36 pb-20 lg:grid-cols-[1fr_520px] lg:items-center">
        <Reveal>
          <Badge>PlantPal</Badge>
          <h1 className="mt-6 font-display text-5xl font-semibold tracking-normal text-white text-balance md:text-7xl">
            AI-powered plant care that feels effortless.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/62">
            Identify plants, understand their needs, recover struggling leaves, and build a living collection with smart reminders and community support.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button size="lg">
              <Apple /> App Store
            </Button>
            <Button variant="secondary" size="lg">
              <Play /> Google Play
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <ProjectOrb />
        </Reveal>
      </section>

      <section className="container pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          <PhoneMockup />
          <PhoneMockup variant="scan" className="md:translate-y-12" />
          <PhoneMockup variant="community" />
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] py-24">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Features"
              title="Everything plant owners need after the first scan."
              description="PlantPal combines computer vision, care logic, reminders, and social progress loops in a premium mobile interface."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {plantPalFeatures.map((feature, index) => {
              const Icon = featureIcons[index];
              return (
                <Reveal key={feature} delay={index * 0.04}>
                  <Card className="h-full bg-white/[0.045] p-6">
                    <Icon className="size-6 text-emerald-200" />
                    <h2 className="mt-5 font-display text-xl font-semibold text-white">{feature}</h2>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Product system"
              title="Built as a flagship consumer app, not a novelty demo."
              description="The PlantPal architecture includes user profiles, device sync, model evaluation, reminder scheduling, premium entitlements, and growth analytics."
            />
            <Button asChild className="mt-8">
              <Link href="/contact">
                Build a product like this <ArrowRight />
              </Link>
            </Button>
          </Reveal>
          <div className="grid gap-4">
            {["AI recognition pipeline", "Personalized care engine", "Cross-platform mobile UX", "Subscriptions and retention analytics"].map((item) => (
              <Card key={item} className="bg-white/[0.045] p-5 text-white/72">
                {item}
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container pb-24">
        <Reveal>
          <SectionHeading eyebrow="PlantPal users" title="A calmer way to care for living things." />
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="bg-white/[0.045] p-6">
              <p className="text-sm leading-7 text-white/72">&quot;{testimonial.quote}&quot;</p>
              <p className="mt-5 text-sm font-semibold text-white">{testimonial.name}</p>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
