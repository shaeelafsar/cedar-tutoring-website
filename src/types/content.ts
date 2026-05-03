/** MDX frontmatter for program pages */
export interface ProgramFrontmatter {
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
  grades: string;
  tags: string[];
  relatedPrograms: string[];
  seo: {
    title: string;
    description: string;
    ogImage?: string;
  };
  faq: { question: string; answer: string }[];
}

/** Full program page data — canonical source for hub cards, individual pages, and homepage */
export interface ProgramPageData {
  slug: string;
  title: string;
  shortTitle: string;
  shortDescription: string;
  icon: string;
  grades: string;
  tags: string[];
  relatedPrograms: string[];
  seo: {
    title: string;
    description: string;
  };
  hero: {
    heading: string;
    subtitle: string;
  };
  problem: {
    heading: string;
    paragraphs: string[];
  };
  approach: {
    heading: string;
    paragraphs: string[];
    bullets: string[];
  };
  outcomes: {
    heading: string;
    items: string[];
  };
  testimonials: {
    quote: string;
    author: string;
    relation: string;
    rating: number;
    badge?: string;
  }[];
  faq: { question: string; answer: string }[];
  cta: {
    heading: string;
    description: string;
    buttonText: string;
  };
}

/** MDX frontmatter for test prep pages */
export interface TestPrepFrontmatter {
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
  relatedTests: string[];
  seo: {
    title: string;
    description: string;
    ogImage?: string;
  };
  faq: { question: string; answer: string }[];
}

/** Single testimonial entry */
export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  relation: string;
  rating: number;
  highlight?: string;
  program?: string;
  featured: boolean;
  source: "google" | "direct" | "other";
}

/** FAQ entry */
export interface FAQEntry {
  id: string;
  category: "programs" | "logistics" | "pricing" | "enrollment" | "test-prep";
  question: string;
  answer: string;
  order: number;
}

/** Location entry */
export interface Location {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    full: string;
  };
  phone: string;
  email: string;
  hours: {
    label: string;
    time: string;
  }[];
  coordinates: { lat: number; lng: number };
  mapUrl: string;
  serviceArea: string[];
  image?: string;
}

/** Site-wide metadata defaults */
export interface SiteMetadata {
  siteName: string;
  siteUrl: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultOgImage: string;
  socialLinks: { platform: string; url: string }[];
  phone: string;
  email: string;
}
