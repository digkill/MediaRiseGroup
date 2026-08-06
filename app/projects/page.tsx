import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { PhoneMockup } from "@/components/sections/phone-mockup";
import { ProjectsFilter } from "@/components/sections/projects-filter";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Projects",
  description: "Explore MediaRise portfolio concepts across mobile, AI, robotics, and web platforms, including the PlantPal AI plant care app.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <section className="container pt-36 pb-16">
        <Reveal>
          <Badge>Projects</Badge>
          <h1 className="mt-6 max-w-5xl font-display text-5xl font-semibold tracking-normal text-white text-balance md:text-7xl">
            Portfolio systems across mobile, AI, robotics, and complex web.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/62">
            Products we designed and engineered end to end, from the first prototype through store release.
          </p>
        </Reveal>
      </section>

      <section className="container pb-24">
        <ProjectsFilter />
      </section>

      <section className="border-y border-white/10 bg-white/2.5 py-24">
        <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Flagship"
              title="PlantPal pairs calm consumer UX with practical AI."
              description="PlantPal recognizes plants, builds care plans, sends smart reminders, and helps users grow healthier indoor gardens."
            />
            <Button asChild className="mt-8">
              <Link href="/plantpal">Explore PlantPal</Link>
            </Button>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            <PhoneMockup variant="scan" />
            <PhoneMockup variant="community" className="sm:translate-y-10" />
          </div>
        </div>
      </section>
    </>
  );
}
