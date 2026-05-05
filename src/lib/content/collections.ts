import type {
  CategorizedFAQItem,
  LocationContent,
  PricingTier,
  TeamMember,
  Testimonial,
} from "@/types/content";

import { readMarkdownFile } from "./markdown";
import {
  aboutTeamFrontmatterSchema,
  faqPageFrontmatterSchema,
  locationsPageFrontmatterSchema,
  pricingPageFrontmatterSchema,
  testimonialsCollectionFrontmatterSchema,
} from "./schemas";

export function getTestimonials(): Testimonial[] {
  return readMarkdownFile(
    "pages/reviews/testimonials.md",
    testimonialsCollectionFrontmatterSchema,
  ).data.testimonials;
}

export function getTestimonialsByIds(ids: string[]): Testimonial[] {
  const testimonialMap = new Map(
    getTestimonials().map((testimonial) => [testimonial.id, testimonial]),
  );

  return ids
    .map((id) => testimonialMap.get(id))
    .filter(
      (testimonial): testimonial is Testimonial => testimonial !== undefined,
    );
}

export function getTeamMembers(): TeamMember[] {
  return readMarkdownFile("pages/about/team.md", aboutTeamFrontmatterSchema).data
    .members;
}

export function getFaqItems(): CategorizedFAQItem[] {
  return readMarkdownFile("pages/faq/_page.md", faqPageFrontmatterSchema).data
    .faqItems;
}

export function getLocations(): LocationContent[] {
  return readMarkdownFile("pages/locations/_page.md", locationsPageFrontmatterSchema)
    .data.locations;
}

export function getPricingTiers(): PricingTier[] {
  return readMarkdownFile("pages/pricing/_page.md", pricingPageFrontmatterSchema)
    .data.pricingTiers;
}
