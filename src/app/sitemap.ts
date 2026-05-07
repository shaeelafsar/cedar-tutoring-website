import type { MetadataRoute } from "next";

import { getAllPrograms } from "@/lib/content/programs";
import { getAllTestPrep } from "@/lib/content/testPrep";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

const staticRoutes = [
  "/",
  "/about",
  "/reviews",
  "/faq",
  "/locations",
  "/pricing",
  "/book-assessment",
  "/test-prep",
  "/programs",
  "/why-us",
  "/summer-programs",
  "/contact-us",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route, index) => ({
    url: absoluteUrl(route),
    lastModified,
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : index < 3 ? 0.9 : 0.8,
  }));

  const programEntries: MetadataRoute.Sitemap = getAllPrograms().map((program) => ({
    url: absoluteUrl(`/programs/${program.slug}`),
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const testPrepEntries: MetadataRoute.Sitemap = getAllTestPrep().map((program) => ({
    url: absoluteUrl(`/test-prep/${program.slug}`),
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...programEntries, ...testPrepEntries];
}
