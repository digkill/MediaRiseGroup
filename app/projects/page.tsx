import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectsFilter } from "@/components/sections/projects-filter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProjects } from "@/lib/portfolio-data";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ title: "Portfolio — MediaRise products and development", description: "Explore MediaRise apps, education platforms, AI services, games and system software. Product features, real interfaces and development status.", path: "/projects" });

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getProjects();
  const categoryCount = new Set(projects.map(project => project.category)).size;
  return <div lang="en">
    <section className="container pb-12 pt-32 md:pt-40">
      <Badge>MediaRise portfolio</Badge>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_300px] lg:items-end">
        <div><h1 className="max-w-4xl font-display text-4xl font-semibold leading-[1.12] tracking-tight md:text-6xl">Products built<br /><span className="text-red-600 dark:text-red-400">to be used.</span></h1><p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/65">Apps, working platforms and independent developments. Explore what each project does, its capabilities and its current status.</p></div>
        <div className="flex gap-10 border-l-2 border-red-500/70 pl-6"><div><p className="font-display text-4xl font-semibold">{projects.length}</p><p className="mt-2 text-sm text-foreground/50">projects in the catalogue</p></div><div><p className="font-display text-4xl font-semibold">{categoryCount}</p><p className="mt-2 text-sm text-foreground/50">disciplines</p></div></div>
      </div>
    </section>
    <section className="container pb-20" aria-label="Project catalogue"><ProjectsFilter projects={projects} /></section>
    <section className="container pb-24"><div className="flex flex-col items-start justify-between gap-8 rounded-xl border border-foreground/10 bg-foreground/[0.03] p-8 md:flex-row md:items-center md:p-12"><div><h2 className="font-display text-2xl font-semibold md:text-3xl">Let’s discuss your project</h2><p className="mt-3 max-w-xl leading-7 text-foreground/60">We can help define your product, design the system and bring it to launch.</p></div><Button asChild size="lg"><Link href="/contact">Contact MediaRise<ArrowUpRight /></Link></Button></div></section>
  </div>;
}
