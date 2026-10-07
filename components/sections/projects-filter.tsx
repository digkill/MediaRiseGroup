"use client";

import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { PortfolioCard } from "@/components/sections/project-card";
import { Button } from "@/components/ui/button";
import { projectFilters, projects } from "@/lib/portfolio";

export function ProjectsFilter() {
  const [active, setActive] = useState("Все проекты");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => projects.filter(project =>
    (active === "Все проекты" || project.category === active) &&
    [project.title, project.type, project.description, ...project.features, ...project.stack].join(" ").toLocaleLowerCase("ru").includes(query.trim().toLocaleLowerCase("ru")),
  ), [active, query]);
  return (
    <div>
      <div className="flex flex-col gap-6 border-y border-foreground/10 py-6">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Категории проектов">
          {projectFilters.map(filter => <Button key={filter} variant={active === filter ? "default" : "secondary"} size="sm" onClick={() => setActive(filter)} aria-pressed={active === filter}>{filter}<span className="ml-1 opacity-55">{filter === "Все проекты" ? projects.length : projects.filter(p => p.category === filter).length}</span></Button>)}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-foreground/50" aria-live="polite">Показано {filtered.length} из {projects.length}</p>
          <div className="relative w-full sm:w-80"><Search className="pointer-events-none absolute left-3 top-3 size-4 text-foreground/40" /><input aria-label="Поиск проектов" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Название, функция или технология" className="h-10 w-full rounded-lg border border-foreground/15 bg-background pl-10 pr-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20" /></div>
        </div>
      </div>
      {filtered.length ? <div className="mt-8 grid gap-6 md:grid-cols-2">{filtered.map(project => <PortfolioCard key={project.slug} project={project} />)}</div> : <div className="py-24 text-center"><h2 className="text-xl font-semibold">Проекты не найдены</h2><p className="mt-3 text-foreground/60">Попробуйте другой запрос или выберите все категории.</p><Button variant="secondary" className="mt-6" onClick={() => { setActive("Все проекты"); setQuery(""); }}><X className="size-4" />Сбросить фильтры</Button></div>}
    </div>
  );
}
