"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

import { PortfolioCard } from "@/components/sections/project-card";
import { Button } from "@/components/ui/button";
import { projectFilters, projects } from "@/lib/content";

export function ProjectsFilter() {
  const [active, setActive] = useState("All");
  const filtered = useMemo(() => (active === "All" ? projects : projects.filter((project) => project.category === active)), [active]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {projectFilters.map((filter) => (
          <Button key={filter} variant={active === filter ? "default" : "secondary"} size="sm" onClick={() => setActive(filter)}>
            {filter}
          </Button>
        ))}
      </div>
      <motion.div layout className="mt-10 grid gap-5 md:grid-cols-2">
        {filtered.map((project) => (
          <motion.div key={project.title} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <PortfolioCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
