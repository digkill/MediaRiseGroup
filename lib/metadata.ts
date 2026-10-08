import { getI18n } from "@/lib/i18n/server";
import { localePath, locales, languageTags } from "@/lib/i18n/config";
import type { Metadata } from "next";

import { siteUrl } from "@/lib/site";

export async function createMetadata({
  title,
  description,
  path = "",
}: {
  title: string;
  description: string;
  path?: string;
}): Promise<Metadata> {
  const { locale, t } = await getI18n();
  title = t(title); description = t(description);
  const url = `${siteUrl}${localePath(path || "/", locale)}`;

  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: { ...Object.fromEntries(locales.map(code => [languageTags[code], `${siteUrl}${localePath(path || "/", code)}`])), "x-default": `${siteUrl}${path || "/"}` },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "MediaRise",
      type: "website",
      images: [
        {
          url: `${siteUrl}/images/og.svg`,
          width: 1200,
          height: 630,
          alt: "MediaRise premium technology studio",
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
