import { createMetadata } from "@/lib/metadata";
import { getI18n } from "@/lib/i18n/server";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "@/components/locale-link";

import { HeroScene } from "@/components/3d/hero-scene";
import { Reveal } from "@/components/motion/reveal";
import { FeaturedProjectCard } from "@/components/sections/project-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { ServiceCard } from "@/components/sections/service-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { services, stats, testimonials, whyUs } from "@/lib/content";

import { getProjects } from "@/lib/portfolio-data";

export async function generateMetadata() { return createMetadata({ title: "MediaRise | Premium Software, AI, Robotics & Mobile Apps", description: "MediaRise builds premium mobile apps, complex web platforms, AI and machine learning systems, robotics automation, IoT solutions, and digital transformation programs.", path: "/" }); }

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { t } = await getI18n();
  const featuredProjects = (await getProjects()).filter(project => project.featured);
  return (
    <>
      <section className="noise relative flex min-h-screen items-center overflow-hidden pt-28">
        <HeroScene />
        <div className="container relative z-10 grid min-h-[calc(100vh-7rem)] items-center py-16">
          <div className="max-w-4xl">
            <Reveal>
              <Badge>{t("Mobile, AI, Robotics, IoT, Web Platforms")}</Badge>
              <h1 className="mt-6 max-w-92 font-display text-4xl font-semibold leading-tight tracking-normal text-white text-balance sm:max-w-4xl sm:text-5xl md:text-7xl lg:text-8xl">{t("Premium technology. Exceptional products.")}</h1>
              <p className="mt-6 max-w-92 text-base leading-7 text-white/64 sm:max-w-2xl md:text-xl md:leading-8">{t("MediaRise designs and engineers native apps, complex platforms, AI systems, robotics interfaces, and connected digital infrastructure.")}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/contact">{t("Get Consultation")}<ArrowRight />
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="/projects">{t("View Projects")}</Link>
                </Button>
              </div>
            </Reveal>
          </div>
          <div className="grid gap-3 pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.05}>
                <div className="glass rounded-lg p-5">
                  <div className="font-display text-3xl font-semibold text-white">{t(stat.value)}</div>
                  <div className="mt-1 text-sm text-white/52">{t(stat.label)}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-24">
        <Reveal>
          <SectionHeading
            eyebrow={t("Services")}
            title={t("One senior team for the full technology surface.")}
            description={t("From consumer mobile apps to applied AI and robotics operations, each capability is designed to integrate cleanly with the rest of your business.")}
          />
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </section>

      {featuredProjects.length > 0 && <section className="border-y border-white/10 bg-white/2.5 py-24">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow={t("Portfolio")}
              title={t("Applications and platforms by MediaRise.")}
              description={t("Product capabilities, real interfaces and the work behind them.")}
            />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <Reveal key={project.title}>
                <FeaturedProjectCard project={project} />
              </Reveal>
            ))}
          </div>
          <Button asChild variant="secondary" className="mt-8"><Link href="/projects">{t("All projects ")}<ArrowRight /></Link></Button>
        </div>
      </section>}

      <section className="container py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <SectionHeading
              eyebrow={t("Why us")}
              title={t("Built for founders, operators, and teams with non-trivial technology goals.")}
              description={t("We compress strategy, design, architecture, and implementation into a single accountable delivery model.")}
            />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {whyUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={index * 0.05}>
                  <Card className="h-full bg-white/4.5 p-6">
                    <Icon className="size-6 text-red-300" />
                    <h3 className="mt-5 font-display text-xl font-semibold text-white">{t(item.title)}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/58">{t(item.description)}</p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container pb-24">
        <Reveal>
          <SectionHeading eyebrow={t("Testimonials")} title={t("Senior teams choose clarity, speed, and polish.")} />
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.05}>
              <Card className="h-full bg-white/4.5 p-6">
                <p className="text-base leading-7 text-foreground/76 dark:text-white/76">{t("\"")}{t(testimonial.quote)}{t("\"")}</p>
                <div className="mt-6 border-t border-white/10 pt-5">
                  <div className="font-semibold text-white">{t(testimonial.name)}</div>
                  <div className="mt-1 text-sm text-white/46">{t(testimonial.role)}</div>
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
                <Badge variant="secondary">{t("Next build sprint")}</Badge>
                <h2 className="mt-4 font-display text-3xl font-semibold text-[#ffffff] md:text-5xl">{t("Design the system. Ship the product. Scale the business.")}</h2>
                <div className="mt-6 grid gap-3 text-sm text-[rgba(255,255,255,0.66)] sm:grid-cols-3">
                  {["Product strategy", "Senior engineering", "Launch support"].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-red-300" />
                      {t(item)}
                    </div>
                  ))}
                </div>
              </div>
              <Button asChild size="lg">
                <Link href="/contact">{t("Start a project")}<ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
