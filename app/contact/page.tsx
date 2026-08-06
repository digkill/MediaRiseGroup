import { Mail, MapPin, Send } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactCards } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Contact",
  description: "Contact MediaRise for mobile app development, AI systems, web platforms, robotics automation, IoT solutions, and digital transformation.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="container pt-36 pb-16">
        <Reveal>
          <Badge>Contact</Badge>
          <h1 className="mt-6 max-w-5xl font-display text-5xl font-semibold tracking-normal text-white text-balance md:text-7xl">
            Tell us what needs to exist next.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/62">
            Share the product, platform, AI, robotics, or IoT challenge you want to solve. We will respond with a clear next step.
          </p>
        </Reveal>
      </section>

      <section className="container grid gap-8 pb-24 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <Card className="bg-white/4.5 p-6 md:p-8">
            <form className="grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Your name" autoComplete="name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@company.com" autoComplete="email" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" name="company" placeholder="Company or product name" autoComplete="organization" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Project brief</Label>
                <Textarea id="message" name="message" placeholder="What are you building? What timeline matters?" />
              </div>
              <Button type="submit" className="w-full sm:w-fit">
                Send inquiry <Send />
              </Button>
            </form>
          </Card>
        </Reveal>
        <div className="grid gap-5">
          <Reveal delay={0.05}>
            <Card className="overflow-hidden bg-white/4.5">
              <div className="relative min-h-[310px] bg-[radial-gradient(circle_at_45%_45%,rgba(255,0,51,.28),transparent_24%),linear-gradient(135deg,#111,#050505)]">
                <div className="absolute inset-0 bg-grid-fade bg-size-[32px_32px] opacity-50" />
                <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                  <div className="flex size-14 items-center justify-center rounded-full bg-red-500 text-white shadow-glow">
                    <MapPin className="size-6" />
                  </div>
                  <p className="mt-4 rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white/72 backdrop-blur-sm">
                    Remote-first global studio
                  </p>
                </div>
              </div>
            </Card>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {contactCards.map((card) => (
              <Reveal key={card.title}>
                <Card className="bg-white/4.5 p-5">
                  <Mail className="size-5 text-red-300" />
                  <h2 className="mt-4 text-sm font-semibold text-white">{card.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-white/58">{card.value}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container pb-24">
        <Reveal>
          <SectionHeading eyebrow="Response window" title="We usually reply within one business day." />
        </Reveal>
      </section>
    </>
  );
}
