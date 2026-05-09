import type { Metadata } from "next";

import { BRAND_SOCIAL_IMAGE } from "@/lib/branding";
import { SITE_CONFIG } from "@/lib/constants";

export const SITE_URL = SITE_CONFIG.url;
export const SITE_NAME = SITE_CONFIG.name;
export const DEFAULT_OG_IMAGE = BRAND_SOCIAL_IMAGE;
export const DEFAULT_DESCRIPTION =
  "Explore personalized K-12 tutoring in reading, math, writing, science, Arabic, homework help, and test prep with caring teachers for families in Worth, IL and the South Suburbs of Chicago.";

export function withTrailingSlash(path: string): string {
  if (!path || path === "/") {
    return "/";
  }

  return path.endsWith("/") ? path : `${path}/`;
}

export function absoluteUrl(path: string): string {
  const base = SITE_URL.endsWith("/") ? SITE_URL : `${SITE_URL}/`;

  if (!path || path === "/") {
    return SITE_URL;
  }

  if (path.includes("?") || path.includes("#") || /\/[^/]+\.[a-z0-9]+$/i.test(path)) {
    return new URL(path.replace(/^\//, ""), base).toString();
  }

  return new URL(withTrailingSlash(path).replace(/^\//, ""), base).toString();
}

function normalizeTitle(title: string): string {
  if (title.includes(`| ${SITE_NAME}`)) {
    return title;
  }

  if (title.startsWith(`${SITE_NAME} | `)) {
    return `${title.replace(`${SITE_NAME} | `, "")} | ${SITE_NAME}`;
  }

  return `${title} | ${SITE_NAME}`;
}

interface BuildPageMetadataOptions {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}

export function buildPageMetadata({
  title,
  description,
  path,
  type = "website",
}: BuildPageMetadataOptions): Metadata {
  const fullTitle = normalizeTitle(title);
  const canonical = withTrailingSlash(path);
  const image = absoluteUrl(DEFAULT_OG_IMAGE);

  return {
    title: {
      absolute: fullTitle,
    },
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: absoluteUrl(canonical),
      siteName: SITE_NAME,
      type,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
