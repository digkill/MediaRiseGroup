import { getI18n } from "@/lib/i18n/server";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import Link from "@/components/locale-link";
import { notFound } from "next/navigation";
import { ProjectGallery } from "@/components/sections/project-gallery";
import { ProjectStatus } from "@/components/sections/project-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProjects } from "@/lib/portfolio-data";
import { createMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { t } = await getI18n();
  const { slug } = await params;
  const project = (await getProjects()).find(project => project.slug === slug);
  if (!project) return {};
  const metadata = await createMetadata({ title: `${project.title} — ${t("MediaRise portfolio")}`, description: project.description, path: `/projects/${slug}` });
  const cover = project.screenshots[0];
  if (cover) {
    metadata.openGraph = { ...metadata.openGraph, images: [{ url: cover.src, alt: cover.alt }] };
    metadata.twitter = { ...metadata.twitter, images: [cover.src] };
  }
  return metadata;
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { t } = await getI18n();
  const { slug } = await params;
  const project = (await getProjects()).find(project => project.slug === slug);
  if (!project) notFound();
  return <article  className="container pb-24 pt-28 md:pt-36">
    <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground"><ArrowLeft className="size-4" />{t("All projects")}</Link>
    <div className="mt-9 flex flex-wrap items-center gap-4"><Badge>{t(project.category)}</Badge><ProjectStatus status={project.status} /></div>
    <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_300px]">
      <div><h1 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">{t(project.title)}</h1><p className="mt-4 text-xl text-red-600 dark:text-red-300">{t(project.type)}</p><p className="mt-6 max-w-3xl text-lg leading-8 text-foreground/70">{t(project.description)}</p>
        {project.website && <Button asChild className="mt-7"><Link href={project.website} {...(project.website.startsWith("https://") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{t(project.websiteLabel ?? "Project website")}<ArrowUpRight className="size-4" /></Link></Button>}
      </div>
      <aside className="h-fit rounded-xl border border-foreground/10 bg-foreground/[0.025] p-6"><h2 className="text-xs font-medium uppercase tracking-widest text-foreground/45">{t("Who it is for")}</h2><p className="mt-3 text-sm leading-6">{t(project.audience)}</p><h2 className="mt-6 text-xs font-medium uppercase tracking-widest text-foreground/45">{t("Platforms")}</h2><p className="mt-3 text-sm leading-6">{t(project.platforms.map(platform => t(platform)).join(" · "))}</p><h2 className="mt-6 text-xs font-medium uppercase tracking-widest text-foreground/45">{t("Technology")}</h2><div className="mt-3 flex flex-wrap gap-2">{project.stack.map(item => <Badge key={item} variant="secondary">{t(item)}</Badge>)}</div></aside>
    </div>
    <section className="mt-14 border-t border-foreground/10 pt-10"><h2 className="font-display text-2xl font-semibold">{t("Features")}</h2><ul className="mt-6 grid gap-4 md:grid-cols-2">{project.features.map(feature => <li key={feature} className="flex items-start gap-3 rounded-lg border border-foreground/10 p-5 text-sm leading-6"><Check className="mt-0.5 size-4 shrink-0 text-red-500" />{t(feature)}</li>)}</ul></section>
    {project.note && <p className="mt-7 border-l-2 border-foreground/20 pl-4 text-sm leading-7 text-foreground/60">{t(project.note)}</p>}
    <ProjectGallery shots={project.screenshots} title={t(project.title)} />
    <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-foreground/10 pt-8"><Link href="/projects" className="inline-flex items-center gap-2 text-sm"><ArrowLeft className="size-4" />{t("Back to portfolio")}</Link><Link href="/contact" className="inline-flex items-center gap-2 text-sm font-medium text-red-600 dark:text-red-300">{t("Discuss a similar project")}<ArrowUpRight className="size-4" /></Link></div>
  </article>;
}
