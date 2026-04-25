import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { services } from "@/lib/content";

type Service = (typeof services)[number];

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;

  return (
    <Reveal delay={index * 0.05}>
      <Link href={service.href} className="group block h-full">
        <Card className="premium-border relative h-full overflow-hidden bg-white/[0.045] transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07] hover:shadow-glow">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-400/70 to-transparent" />
          <CardHeader>
            <div className="mb-5 flex items-center justify-between">
              <div className="flex size-11 items-center justify-center rounded-md border border-red-400/30 bg-red-500/10 text-red-200">
                <Icon className="size-5" />
              </div>
              <ArrowUpRight className="size-4 text-white/34 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
            </div>
            <CardTitle>{service.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-6 text-white/58">{service.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </Link>
    </Reveal>
  );
}
