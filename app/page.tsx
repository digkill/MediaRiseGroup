import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { HeroScene } from "@/components/3d/hero-scene";
import { Reveal } from "@/components/motion/reveal";
import { FeaturedProjectCard } from "@/components/sections/project-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { ServiceCard } from "@/components/sections/service-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { featuredProjects, services, stats, testimonials, whyUs } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <section className="noise relative flex min-h-screen items-center overflow-hidden pt-28">
        <HeroScene />
        <div className="container relative z-10 grid min-h-[calc(100vh-7rem)] items-center py-16">
          <div className="max-w-4xl">
            <Reveal>
              <Badge>Mobile, AI, Robotics, IoT, Web Platforms</Badge>
              <h1 className="mt-6 max-w-[23rem] font-display text-4xl font-semibold leading-tight tracking-normal text-white text-balance sm:max-w-4xl sm:text-5xl md:text-7xl lg:text-8xl">
                Premium technology for products that need to feel inevitable.
              </h1>
              <p className="mt-6 max-w-[23rem] text-base leading-7 text-white/64 sm:max-w-2xl md:text-xl md:leading-8">
                MediaRiseGroup designs and engineers native apps, complex platforms, AI systems, robotics interfaces, and connected digital infrastructure.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Get Consultation <ArrowRight />
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="/projects">View Projects</Link>
                </Button>
              </div>
            </Reveal>
          </div>
          <div className="grid gap-3 pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.05}>
                <div className="glass rounded-lg p-5">
                  <div className="font-display text-3xl font-semibold text-white">{stat.value}</div>
                  <div className="mt-1 text-sm text-white/52">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="One senior team for the full technology surface."
            description="From consumer mobile apps to applied AI and robotics operations, each capability is designed to integrate cleanly with the rest of your business."
          />
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] py-24">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Featured work"
              title="Selected systems with serious product depth."
              description="Portfolio concepts represent the type of design, engineering, and product architecture MediaRiseGroup delivers."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <Reveal key={project.title}>
                <FeaturedProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <SectionHeading
              eyebrow="Why us"
              title="Built for founders, operators, and teams with non-trivial technology goals."
              description="We compress strategy, design, architecture, and implementation into a single accountable delivery model."
            />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {whyUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={index * 0.05}>
                  <Card className="h-full bg-white/[0.045] p-6">
                    <Icon className="size-6 text-red-300" />
                    <h3 className="mt-5 font-display text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/58">{item.description}</p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container pb-24">
        <Reveal>
          <SectionHeading eyebrow="Testimonials" title="Senior teams choose clarity, speed, and polish." />
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.05}>
              <Card className="h-full bg-white/[0.045] p-6">
                <p className="text-base leading-7 text-foreground/[0.76] dark:text-white/[0.76]">&quot;{testimonial.quote}&quot;</p>
                <div className="mt-6 border-t border-white/10 pt-5">
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="mt-1 text-sm text-white/46">{testimonial.role}</div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container pb-24">
        <Reveal>
          <div className="premium-border overflow-hidden rounded-lg bg-[radial-gradient(circle_at_20%_20%,rgba(255,0,51,.28),transparent_30%),linear-gradient(135deg,#171717,#050505)] p-8 md:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <Badge variant="secondary">Next build sprint</Badge>
                <h2 className="mt-4 font-display text-3xl font-semibold text-[#ffffff] md:text-5xl">Design the system. Ship the product. Scale the business.</h2>
                <div className="mt-6 grid gap-3 text-sm text-[rgba(255,255,255,0.66)] sm:grid-cols-3">
                  {["Product strategy", "Senior engineering", "Launch support"].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-red-300" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <Button asChild size="lg">
                <Link href="/contact">
                  Start a project <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
