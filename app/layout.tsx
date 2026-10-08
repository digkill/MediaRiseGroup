import { getI18n } from "@/lib/i18n/server";
import { LocaleProvider } from "@/components/locale-provider";
import { languageTags } from "@/lib/i18n/config";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "./globals.css";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Providers } from "@/components/providers";
import { organizationJsonLd } from "@/lib/content";
import { siteUrl } from "@/lib/site";

const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MediaRise | Premium Software, AI, Robotics & Mobile Apps",
    template: "%s | MediaRise",
  },
  description:
    "MediaRise builds premium mobile apps, complex web platforms, AI and machine learning systems, robotics automation, IoT solutions, and digital transformation programs.",
  keywords: [
    "MediaRise",
    "mobile app development",
    "Android development",
    "iOS development",
    "AI development",
    "robotics automation",
    "IoT solutions",
    "web platform development",
  ],
  authors: [{ name: "MediaRise" }],
  creator: "MediaRise",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "MediaRise",
    title: "MediaRise | Premium Software, AI, Robotics & Mobile Apps",
    description:
      "Premium engineering studio for mobile apps, complex platforms, AI systems, robotics automation, IoT, and digital transformation.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const { t, locale } = await getI18n();
  return { ...baseMetadata,
    title: { default: t("MediaRise | Premium Software, AI, Robotics & Mobile Apps"), template: "%s | MediaRise" },
    description: t(baseMetadata.description ?? ""),
    openGraph: { ...baseMetadata.openGraph, locale: languageTags[locale], title: t("MediaRise | Premium Software, AI, Robotics & Mobile Apps"), description: t("Premium engineering studio for mobile apps, complex platforms, AI systems, robotics automation, IoT, and digital transformation.") },
  };
}

export const viewport: Viewport = {
  themeColor: "#FAFAFA",
  colorScheme: "light dark",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const { locale, messages, t } = await getI18n();
  return (
    <html lang={languageTags[locale]} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <LocaleProvider locale={locale} messages={messages}><Providers>
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...organizationJsonLd, description: t(organizationJsonLd.description) }) }}
          />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers></LocaleProvider>
      </body>
    </html>
  );
}
