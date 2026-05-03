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
