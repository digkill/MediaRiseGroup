import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { featuredProjects, projects } from "@/lib/content";
import { cn } from "@/lib/utils";

type Featured = (typeof featuredProjects)[number];
type Project = (typeof projects)[number];

export function FeaturedProjectCard({ project }: { project: Featured }) {
  return (
    <Link href={project.href} className="group block">
      <Card className="relative min-h-[360px] overflow-hidden bg-white/[0.045] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-glow">
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-90", project.accent)} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,.72))]" />
        <div className="relative flex h-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <Badge
              variant="outline"
              className="border-white/30 bg-white/10 text-white/90 dark:border-white/25 dark:bg-white/[0.08] dark:text-white/90"
            >
              {project.category}
            </Badge>
            <ArrowUpRight className="size-5 text-white/54 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
          </div>
          <div className="mt-28">
            <h3 className="font-display text-2xl font-semibold text-white">{project.title}</h3>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/70">{project.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export function PortfolioCard({ project }: { project: Project }) {
  return (
    <Link href={project.href} className="group block">
      <Card className="h-full overflow-hidden bg-white/[0.045] p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07] hover:shadow-glow">
        <div className="aspect-[16/10] rounded-md border border-white/10 bg-[radial-gradient(circle_at_35%_25%,rgba(255,0,51,.36),transparent_32%),linear-gradient(135deg,rgba(255,255,255,.12),rgba(255,255,255,.02))]" />
        <div className="mt-5 flex items-center justify-between gap-4">
          <Badge>{project.category}</Badge>
          <ArrowUpRight className="size-4 text-white/40 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-semibold text-white">{project.title}</h3>
        <p className="mt-2 text-sm font-medium text-red-100/80">{project.type}</p>
        <p className="mt-4 text-sm leading-6 text-white/58">{project.description}</p>
        <div className="mt-5 grid gap-2">
          {project.metrics.map((metric) => (
            <div key={metric} className="rounded-md border border-white/10 bg-black/30 px-3 py-2 text-xs text-white/62">
              {metric}
            </div>
          ))}
        </div>
      </Card>
    </Link>
  );
}
