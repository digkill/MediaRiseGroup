import { ArrowUpRight, Bot, BrainCircuit, Globe2, Layers3, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ComponentProps } from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { featuredProjects, projects } from "@/lib/content";
import { cn } from "@/lib/utils";

type Featured = (typeof featuredProjects)[number];
type Project = (typeof projects)[number];

const categoryIcons: Record<string, typeof Smartphone> = {
  Mobile: Smartphone,
  AI: BrainCircuit,
  Robotics: Bot,
  Web: Globe2,
};

/** Hairline accent shared with ServiceCard. */
function TopHairline() {
  return <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-400/70 to-transparent" />;
}

/** Opens off-site links in a new tab; internal routes behave as usual. */
function SmartLink({ href, ...props }: ComponentProps<typeof Link>) {
  const isExternal = typeof href === "string" && href.startsWith("http");
  return <Link href={href} {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...props} />;
}

const cardBase =
  "premium-border relative h-full overflow-hidden bg-white/4.5 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07] hover:shadow-glow";

export function FeaturedProjectCard({ project }: { project: Featured }) {
  return (
    <SmartLink href={project.href} className="group block h-full">
      <Card className={cn(cardBase, "flex min-h-[320px] flex-col p-6")}>
        <div className={cn("pointer-events-none absolute inset-0", project.accent)} />
        <div className="pointer-events-none absolute inset-0 bg-grid-fade-light bg-size-[26px_26px] dark:bg-grid-fade" />
        <TopHairline />

        <div className="relative flex flex-1 flex-col">
          <div className="flex items-center justify-between">
            <Badge variant="secondary">{project.category}</Badge>
            <ArrowUpRight className="size-5 text-foreground/40 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
          </div>
          <div className="mt-auto pt-16">
            <h3 className="font-display text-2xl font-semibold text-foreground">{project.title}</h3>
            <p className="mt-3 text-sm leading-6 text-foreground/64">{project.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </SmartLink>
  );
}

export function PortfolioCard({ project }: { project: Project }) {
  const Icon = categoryIcons[project.category] ?? Layers3;

  return (
    <SmartLink href={project.href} className="group block h-full">
      <Card className={cn(cardBase, "p-6")}>
        <TopHairline />

        {project.image ? (
          // A real screenshot carries more than the category icon would, so it
          // replaces the icon header rather than stacking on top of it.
          <div className="relative overflow-hidden rounded-md border border-black/10 dark:border-white/10">
            <Image
              src={project.image}
              alt={project.imageAlt ?? `${project.title} interface`}
              width={1600}
              height={1000}
              sizes="(min-width: 768px) 40vw, 100vw"
              className="aspect-16/10 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute right-2.5 top-2.5 flex size-8 items-center justify-center rounded-md bg-black/55 text-white backdrop-blur-xs">
              <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex size-11 items-center justify-center rounded-md border border-red-400/30 bg-red-500/10 text-red-600 dark:text-red-200">
              <Icon className="size-5" />
            </div>
            <ArrowUpRight className="size-4 text-foreground/40 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
          </div>
        )}

        <p className="mt-6 text-xs font-medium uppercase tracking-[0.14em] text-foreground/45">{project.category}</p>
        <h3 className="mt-2 font-display text-2xl font-semibold text-foreground">{project.title}</h3>
        <p className="mt-1.5 text-sm font-medium text-red-600 dark:text-red-200">{project.type}</p>
        <p className="mt-4 text-sm leading-6 text-foreground/64">{project.description}</p>

        <div className="mt-6 grid gap-2">
          {project.metrics.map((metric) => (
            <div
              key={metric}
              className="flex items-center gap-2.5 rounded-md border border-black/8 bg-black/[0.02] px-3 py-2 text-xs text-foreground/70 dark:border-white/10 dark:bg-white/5"
            >
              <span className="size-1.5 shrink-0 rounded-full bg-red-500" />
              {metric}
            </div>
          ))}
        </div>
      </Card>
    </SmartLink>
  );
}
