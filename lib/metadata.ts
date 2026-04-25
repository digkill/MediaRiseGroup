import type { Metadata } from "next";

import { siteUrl } from "@/lib/site";

export function createMetadata({
  title,
  description,
  path = "",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = `${siteUrl}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "MediaRiseGroup",
      type: "website",
      images: [
        {
          url: `${siteUrl}/images/og.svg`,
          width: 1200,
          height: 630,
          alt: "MediaRiseGroup premium technology studio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/images/og.svg`],
    },
  };
}
