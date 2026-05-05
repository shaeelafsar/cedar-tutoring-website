import type { z } from "zod";

import { readMarkdownFile } from "./markdown";
import { siteMetadataSchema } from "./schemas";

export interface SiteAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
  full: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  url: string;
  phone: string;
  email: string;
  address: SiteAddress;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface FooterNav {
  programs: NavItem[];
  testPrep: NavItem[];
  company: NavItem[];
}

export type SiteMetadataContent = z.infer<typeof siteMetadataSchema>;

export function getSiteMetadata(): SiteMetadataContent {
  return readMarkdownFile("site/metadata.md", siteMetadataSchema).data;
}
