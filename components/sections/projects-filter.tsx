"use client";
import { useI18n } from "@/components/locale-provider";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { PortfolioCard } from "@/components/sections/project-card";
import { Button } from "@/components/ui/button";
import type { PortfolioProject } from "@/lib/portfolio";

export function ProjectsFilter({ projects }: { projects: PortfolioProject[] }) {
  const { t } = useI18n();
  const projectFilters = ["All projects", ...Array.from(new Set(projects.map(project => project.category)))];
  const [active, setActive] = useState("All projects");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => projects.filter(project =>
    (active === "All projects" || project.category === active) &&
    [project.title, project.type, project.description, ...project.features, ...project.stack].join(" ").toLocaleLowerCase("en").includes(query.trim().toLocaleLowerCase("en")),
  ), [active, query, projects]);
  return (
    <div>
      <div className="flex flex-col gap-6 border-y border-foreground/10 py-6">
        <div className="flex flex-wrap gap-2" role="group" aria-label={t("Project categories")}>
          {projectFilters.map(filter => <Button key={filter} variant={active === filter ? "default" : "secondary"} size="sm" onClick={() => setActive(filter)} aria-pressed={active === filter}>{t(filter)}<span className="ml-1 opacity-55">{t(filter === "All projects" ? projects.length : projects.filter(p => p.category === filter).length)}</span></Button>)}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-foreground/50" aria-live="polite">{t("Showing ")}{t(filtered.length)}{t(" of ")}{t(projects.length)}</p>
          <div className="relative w-full sm:w-80"><Search className="pointer-events-none absolute left-3 top-3 size-4 text-foreground/40" /><input aria-label={t("Search projects")} type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={t("Name, feature or technology")} className="h-10 w-full rounded-lg border border-foreground/15 bg-background pl-10 pr-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20" /></div>
        </div>
      </div>
      {filtered.length ? <div className="mt-8 grid gap-6 md:grid-cols-2">{filtered.map(project => <PortfolioCard key={project.slug} project={project} />)}</div> : <div className="py-24 text-center"><h2 className="text-xl font-semibold">{t("No projects found")}</h2><p className="mt-3 text-foreground/60">{t("Try another search or select all categories.")}</p><Button variant="secondary" className="mt-6" onClick={() => { setActive("All projects"); setQuery(""); }}><X className="size-4" />{t("Reset filters")}</Button></div>}
    </div>
  );
}
