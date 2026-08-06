import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "./globals.css";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Providers } from "@/components/providers";
import { organizationJsonLd } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
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

export const viewport: Viewport = {
  themeColor: "#FAFAFA",
  colorScheme: "light dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Providers>
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
          />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
