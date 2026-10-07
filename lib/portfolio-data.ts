import "server-only";
import { cache } from "react";
import seed from "@/lib/portfolio-seed.en.json";
import type { PortfolioProject } from "@/lib/portfolio";

/** Never fall back to seed data when the CMS is configured: doing so could
 * republish a project an editor has deliberately hidden. */
export const getProjects = cache(async (): Promise<PortfolioProject[]> => {
  const base = process.env.PORTFOLIO_API_URL;
  if (!base) return seed as PortfolioProject[];
  const response = await fetch(`${base.replace(/\/$/, "")}/api/portfolio`, {
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`Portfolio API returned ${response.status}`);
  const body = await response.json();
  if (!Array.isArray(body.data)) throw new Error("Invalid portfolio API response");
  return body.data;
});
