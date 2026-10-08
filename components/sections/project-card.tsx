"use client";
import { useI18n } from "@/components/locale-provider";
import { ArrowUpRight, Cpu, Layers3 } from "lucide-react";
import Image from "next/image";
import Link from "@/components/locale-link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { PortfolioProject } from "@/lib/portfolio";
import { cn } from "@/lib/utils";


export function FeaturedProjectCard({ project }: { project: PortfolioProject }) {
  const { t } = useI18n();
  const cover = project.screenshots[0];
  return (
    <Link href={`/projects/${project.slug}`} className="group block h-full">
      <Card className="premium-border relative flex h-full flex-col overflow-hidden bg-white/4.5 p-6 transition hover:-translate-y-1 hover:shadow-glow">
        <div className="relative flex items-center justify-between"><Badge variant="secondary">{t(project.category)}</Badge><ArrowUpRight className="size-5 text-foreground/50" /></div>
        {cover && <div className="relative mt-5 aspect-16/10 overflow-hidden rounded-lg border border-foreground/10 bg-background/50"><Image unoptimized={cover.src.startsWith("/portfolio-media/")} src={cover.src} alt={t(cover.alt)} fill sizes="(min-width: 768px) 45vw, 90vw" className="object-contain p-2" /></div>}
        <div className="relative mt-auto pt-6"><h3 className="font-display text-2xl font-semibold">{t(project.title)}</h3><p className="mt-3 text-sm leading-6 text-foreground/65">{t(project.description)}</p><div className="mt-5 flex flex-wrap gap-2">{project.stack.map(tag => <Badge key={tag} variant="outline">{t(tag)}</Badge>)}</div></div>
      </Card>
    </Link>
  );
}

export function ProjectStatus({ status }: { status: PortfolioProject["status"] }) {
  const { t } = useI18n();
  return <span className="inline-flex items-center gap-2 text-xs text-foreground/65"><span className={cn("size-1.5 rounded-full", status === "Live" ? "bg-emerald-500" : status === "Prototype" ? "bg-amber-500" : "bg-sky-500")} />{t(status)}</span>;
}

export function PortfolioCard({ project }: { project: PortfolioProject }) {
  const { t } = useI18n();
  const cover = project.screenshots[0];
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-foreground/10 bg-card transition duration-300 hover:border-red-500/35 hover:shadow-lg">
      <Link href={`/projects/${project.slug}`} className="relative block overflow-hidden border-b border-foreground/10 bg-foreground/[0.035]" aria-label={`${t("Details and screenshots for")} ${project.title}`}>
        {cover ? <div className="relative aspect-16/10 p-3 sm:p-5">
          <Image unoptimized={cover.src.startsWith("/portfolio-media/")} src={cover.src} alt={t(cover.alt)} fill sizes="(min-width: 1280px) 590px, (min-width: 768px) 48vw, 100vw" className="object-contain p-3 transition duration-500 group-hover:scale-[1.025] sm:p-5" />
        </div> : <div className="relative flex aspect-16/10 flex-col justify-between overflow-hidden bg-[radial-gradient(ellipse_at_top_right,rgba(255,0,51,0.12),transparent_70%)] p-7 sm:p-9">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-foreground/45"><Cpu className="size-4" />{t(" MediaRise / ")}{t(project.platforms[0])}</div>
          <div><Layers3 className="mb-5 size-8 text-red-500/65" /><p className="font-display text-3xl font-semibold sm:text-4xl">{t(project.title)}</p><p className="mt-3 max-w-sm text-sm text-foreground/55">{t(project.type)}</p></div>
          <span className="text-xs text-foreground/40">{t("Project overview")}</span>
        </div>}
        {cover?.kind === "illustration" && <span className="absolute left-3 top-3 rounded-md bg-background/90 px-2 py-1 text-xs">{t("Illustration")}</span>}
      </Link>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3"><span className="text-xs font-medium text-red-600 dark:text-red-300">{t(project.category)}</span><ProjectStatus status={project.status} /></div>
        <h2 className="mt-4 font-display text-2xl font-semibold"><Link href={`/projects/${project.slug}`} className="hover:text-red-500">{t(project.title)}</Link></h2>
        <p className="mt-1 text-sm text-foreground/50">{t(project.type)}</p>
        <p className="mt-4 text-sm leading-7 text-foreground/70">{t(project.description)}</p>
        <ul className="mt-5 space-y-2.5">{project.features.slice(0, 3).map(feature => <li key={feature} className="flex gap-2.5 text-sm leading-6 text-foreground/75"><span className="mt-2.5 size-1 shrink-0 rounded-full bg-red-500" />{t(feature)}</li>)}</ul>
        <div className="mt-auto pt-6">
          <div className="flex flex-wrap gap-2">{project.stack.slice(0, 4).map(tag => <Badge key={tag} variant="secondary">{t(tag)}</Badge>)}</div>
          <Link href={`/projects/${project.slug}`} className="mt-6 flex items-center justify-between border-t border-foreground/10 pt-4 text-sm font-medium">{t(project.screenshots.length ? "Details and screenshots" : "Explore the project")}<ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
        </div>
      </div>
    </article>
  );
}
