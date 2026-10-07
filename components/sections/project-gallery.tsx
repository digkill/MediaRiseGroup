"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Expand, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import type { ProjectShot } from "@/lib/portfolio";

export function ProjectGallery({ shots, title }: { shots: ProjectShot[]; title: string }) {
  const [selected, setSelected] = useState<number | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  if (!shots.length) return null;
  const current = shots[selected ?? 0];
  return (
    <section className="mt-16" aria-label={`Screenshots of ${title}`}>
      <h2 className="font-display text-2xl font-semibold">{shots.every(s => s.kind === "illustration") ? "Project overview" : "Interface and features"}</h2>
      <p className="mt-3 text-sm text-foreground/60">Select an image to take a closer look.</p>
      <Dialog.Root open={selected !== null} onOpenChange={open => { if (!open) setSelected(null); }}>
        <div className="mt-7 grid gap-6 sm:grid-cols-2">
          {shots.map((shot, index) => <figure key={shot.src} className={index === 0 ? "sm:col-span-2" : ""}>
            <button onClick={event => { opener.current = event.currentTarget; setSelected(index); }} className="group relative block w-full overflow-hidden rounded-xl border border-foreground/10 bg-foreground/[0.035] p-4 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500" aria-label={`Enlarge: ${shot.caption}`}>
              <div className={`relative ${index === 0 ? "h-[300px] sm:h-[560px]" : "h-[300px] sm:h-[400px]"}`}><Image src={shot.src} alt={shot.alt} fill sizes={index === 0 ? "(min-width: 1280px) 1200px, 95vw" : "(min-width: 768px) 45vw, 95vw"} className="object-contain" priority={index === 0} /></div>
              <span className="absolute bottom-4 right-4 rounded-full border border-foreground/10 bg-background/90 p-2.5 transition group-hover:bg-red-500 group-hover:text-white"><Expand className="size-4" /></span>
            </button><figcaption className="mt-3 text-sm leading-6 text-foreground/60">{shot.caption}</figcaption>
          </figure>)}
        </div>
        <Dialog.Portal><Dialog.Overlay className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-sm" /><Dialog.Content className="fixed inset-3 z-[90] flex flex-col rounded-xl border border-white/15 bg-[#111] p-4 shadow-2xl outline-none sm:inset-8 sm:p-6" onCloseAutoFocus={event => { event.preventDefault(); opener.current?.focus(); }}>
          <div className="flex items-start justify-between gap-4"><div><Dialog.Title className="text-lg font-semibold text-white">{title}</Dialog.Title><Dialog.Description className="mt-1 text-sm text-white/65">{current.caption}</Dialog.Description></div><Dialog.Close className="rounded-lg p-2 text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white" aria-label="Close image"><X /></Dialog.Close></div>
          <div className="relative mt-5 min-h-0 flex-1"><Image src={current.src} alt={current.alt} fill sizes="95vw" className="object-contain" /></div>
          {shots.length > 1 && <div className="mt-4 flex flex-wrap justify-center gap-2" aria-label="Select image">{shots.map((shot, index) => <button key={shot.src} onClick={() => setSelected(index)} aria-label={`Image ${index + 1}: ${shot.caption}`} aria-pressed={selected === index} className={`rounded-md px-4 py-2 text-sm ${selected === index ? "bg-red-600 text-white" : "bg-white/10 text-white/70 hover:bg-white/20"}`}>{index + 1}</button>)}</div>}
        </Dialog.Content></Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
