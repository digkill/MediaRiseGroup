import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectsFilter } from "@/components/sections/projects-filter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects, projectFilters } from "@/lib/portfolio";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ title: "Портфолио — продукты и разработки MediaRise", description: "Приложения, образовательные платформы, AI-сервисы, игры и системное ПО MediaRise. Возможности проектов, реальные интерфейсы и статус разработки.", path: "/projects" });

export default function ProjectsPage() {
  return <div lang="ru">
    <section className="container pb-12 pt-32 md:pt-40">
      <Badge>Портфолио MediaRise</Badge>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_300px] lg:items-end">
        <div><h1 className="max-w-4xl font-display text-4xl font-semibold leading-[1.12] tracking-tight md:text-6xl">Продукты, которыми<br /><span className="text-red-600 dark:text-red-400">можно пользоваться.</span></h1><p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/65">Приложения, рабочие платформы и собственные разработки. В каждом проекте — его назначение, реализованные возможности и текущий статус.</p></div>
        <div className="flex gap-10 border-l-2 border-red-500/70 pl-6"><div><p className="font-display text-4xl font-semibold">{projects.length}</p><p className="mt-2 text-sm text-foreground/50">проект в каталоге</p></div><div><p className="font-display text-4xl font-semibold">{projectFilters.length - 1}</p><p className="mt-2 text-sm text-foreground/50">направлений</p></div></div>
      </div>
    </section>
    <section className="container pb-20" aria-label="Каталог проектов"><ProjectsFilter /></section>
    <section className="container pb-24"><div className="flex flex-col items-start justify-between gap-8 rounded-xl border border-foreground/10 bg-foreground/[0.03] p-8 md:flex-row md:items-center md:p-12"><div><h2 className="font-display text-2xl font-semibold md:text-3xl">Обсудим ваш проект</h2><p className="mt-3 max-w-xl leading-7 text-foreground/60">Поможем определить состав продукта, спроектировать систему и довести её до запуска.</p></div><Button asChild size="lg"><Link href="/contact">Связаться с MediaRise<ArrowUpRight /></Link></Button></div></section>
  </div>;
}
