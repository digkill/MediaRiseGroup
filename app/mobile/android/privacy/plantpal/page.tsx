import { Camera, Database, Download, ShieldCheck, Smartphone, WalletCards } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "PlantPal Privacy Policy",
  description:
    "Privacy policy for PlantPal, a free houseplant care reminder app by MediaRise. PlantPal stores data locally and does not collect, sell, share, or transmit personal data.",
  path: "/mobile/android/privacy/plantpal",
});

const policySections = [
  {
    title: "Data Collection",
    icon: ShieldCheck,
    body: "PlantPal does not collect, sell, share, or transmit personal data to MediaRise or third parties.",
  },
  {
    title: "Local Data",
    icon: Database,
    body: "The app stores plant names, plant photos, care dates, care history, reminders, and notes locally on your device.",
  },
  {
    title: "Photos",
    icon: Camera,
    body: "If you add a plant photo, the image is stored locally inside the app storage on your device.",
  },
  {
    title: "Permissions",
    icon: Smartphone,
    body: "PlantPal may request camera permission only to let you take a plant photo, and notification permission only to send plant care reminders.",
  },
  {
    title: "Analytics and Advertising",
    icon: WalletCards,
    body: "PlantPal does not use analytics SDKs, advertising SDKs, tracking SDKs, or in-app purchases.",
  },
  {
    title: "Backups",
    icon: Download,
    body: "Automatic cloud backup is disabled. You can manually export or import a JSON backup from inside the app.",
  },
];

export default function PlantPalPrivacyPage() {
  return (
    <section className="container pt-36 pb-24">
      <div className="mx-auto max-w-4xl">
        <Badge>PlantPal Privacy Policy</Badge>
        <h1 className="mt-6 font-display text-5xl font-semibold tracking-normal text-white text-balance md:text-6xl">
          PlantPal Privacy Policy
        </h1>
        <p className="mt-5 text-sm text-white/48">Effective date: 2026-04-25</p>
        <p className="mt-8 text-lg leading-8 text-white/64">
          PlantPal is a free houseplant care reminder app.
        </p>

        <div className="mt-12 grid gap-5">
          {policySections.map((section) => {
            const Icon = section.icon;

            return (
              <Card key={section.title} className="bg-white/4.5 p-6">
                <div className="flex gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-md border border-red-400/30 bg-red-500/10 text-red-200">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-white">{section.title}</h2>
                    <p className="mt-3 text-base leading-8 text-white/62">{section.body}</p>
                  </div>
                </div>
              </Card>
            );
          })}

          <Card className="bg-white/4.5 p-6">
            <h2 className="font-display text-2xl font-semibold text-white">Contact</h2>
            <p className="mt-3 text-base leading-8 text-white/62">MediaRise.org</p>
          </Card>
        </div>
      </div>
    </section>
  );
}
