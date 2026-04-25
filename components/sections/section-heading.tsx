import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? <Badge>{eyebrow}</Badge> : null}
      <h2 className="mt-4 font-display text-3xl font-semibold tracking-normal text-white text-balance md:text-5xl">{title}</h2>
      {description ? <p className="mt-5 text-base leading-8 text-white/58 md:text-lg">{description}</p> : null}
    </div>
  );
}
