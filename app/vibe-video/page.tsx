import { Apple, ArrowRight, Globe2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { vibeVideo } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata = createMetadata({
  title: "Vibe Video — iOS and macOS Video Editor",
  description:
    "Vibe Video is a MediaRise short-form video editor for iPhone, iPad and Mac: multitrack timeline, green screen, stickers, music and one-tap export to TikTok, Reels, Shorts and YouTube.",
  path: "/vibe-video",
});

type Shot = { src: string; alt: string; caption: string; wide?: boolean };

function Screenshot({ shot, priority = false }: { shot: Shot; priority?: boolean }) {
  return (
    <figure>
      <div className="premium-border relative overflow-hidden rounded-lg border border-black/10 bg-white/4.5 dark:border-white/10">
        <Image
          src={shot.src}
          alt={shot.alt}
          width={1600}
          height={1000}
          priority={priority}
          sizes={shot.wide ? "(min-width: 768px) 80vw, 100vw" : "(min-width: 768px) 40vw, 100vw"}
          className="h-auto w-full"
        />
      </div>
      <figcaption className="mt-3 text-sm leading-6 text-foreground/58">{shot.caption}</figcaption>
    </figure>
  );
}

export default function VibeVideoPage() {
  return (
    <>
      <section className="container pt-36 pb-16">
        <Reveal>
          <Badge>Vibe Video</Badge>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-semibold tracking-normal text-white text-balance md:text-7xl">
            One short-form editor, native on iPhone, iPad and Mac.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/62">
            A single SwiftUI and AVFoundation codebase ships as a touch editor on iOS and a windowed, inspector-driven editor on macOS — multitrack
            timeline, green screen, stickers, music and one-tap export to every social format.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {vibeVideo.platforms.map((platform) => (
              <Badge key={platform} variant="outline">
                {platform}
              </Badge>
            ))}
          </div>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href={vibeVideo.appStoreUrl} target="_blank" rel="noopener noreferrer">
                <Apple /> View on the App Store
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <a href={vibeVideo.siteUrl} target="_blank" rel="noopener noreferrer">
                <Globe2 /> vibevideo.fun
              </a>
            </Button>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-white/10 bg-white/2.5 py-24">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="macOS"
              title="A desktop editor, not a phone app in a window."
              description="On the Mac the timeline gets full width, the inspector sits alongside the preview, and files can be dragged straight onto a lane."
            />
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {vibeVideo.mac.map((shot, index) => (
              // The span has to sit on the grid child, which is Reveal, not the figure.
              <Reveal key={shot.src} delay={index * 0.04} className={cn(shot.wide && "md:col-span-2")}>
                <Screenshot shot={shot} priority={index === 0} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-24">
        <Reveal>
          <SectionHeading
            eyebrow="iOS and iPadOS"
            title="The same project, reshaped for touch."
            description="Lanes, trimming and layer order work under a finger, the appearance follows the system theme, and iPad puts the inspector back beside the canvas."
          />
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {vibeVideo.mobile.map((shot, index) => (
            <Reveal key={shot.src} delay={index * 0.04} className={cn(shot.wide && "md:col-span-2")}>
              <Screenshot shot={shot} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/2.5 py-24">
        <div className="container">
          <Reveal>
            <SectionHeading eyebrow="Capabilities" title="What ships in the box." />
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {vibeVideo.features.map((feature, index) => (
              <Reveal key={feature} delay={index * 0.04}>
                <Card className="premium-border h-full bg-white/4.5 p-6">
                  <p className="text-sm leading-6 text-white/72">{feature}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Engineering"
            title="Shipped to the App Store on both platforms."
            description="Swift 5 with MainActor isolation, App Sandbox on, a custom AVFoundation compositor for chroma key and layered stickers, and a String Catalog covering six languages."
          />
          <Button asChild className="mt-8">
            <Link href="/contact">
              Build a product like this <ArrowRight />
            </Link>
          </Button>
        </Reveal>
      </section>
    </>
  );
}
