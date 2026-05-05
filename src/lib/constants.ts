import "server-only";

import type { NavItem } from "./content/site";
import { getSiteMetadata } from "./content/site";

const siteMetadata = getSiteMetadata();

export const SITE_CONFIG = siteMetadata.site;
export const NAV_ITEMS: NavItem[] = siteMetadata.navigation;
export const FOOTER_NAV = siteMetadata.footerNav;
