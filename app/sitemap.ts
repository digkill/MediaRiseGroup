import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { locales, languageTags, localePath } from "@/lib/i18n/config";
import { getProjects } from "@/lib/portfolio-data";
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
 const paths = ["/", "/services", "/services/mobile", "/mobile", "/android", "/about", "/contact", "/privacy", "/plantpal", "/vibe-video", "/mobile/android/privacy/plantpal", "/projects", ...(await getProjects()).map(p => `/projects/${p.slug}`)];
 return paths.flatMap(path => locales.map(locale => ({url: `${siteUrl}${localePath(path, locale)}`, alternates: {languages: Object.fromEntries(locales.map(code => [languageTags[code], `${siteUrl}${localePath(path, code)}`]))}})));
}
