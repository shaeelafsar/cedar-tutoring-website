import faqJson from "@content/collections/faq.json";
import locationsJson from "@content/collections/locations.json";
import pricingTiersJson from "@content/collections/pricing-tiers.json";
import teamJson from "@content/collections/team.json";
import testimonialsJson from "@content/collections/testimonials.json";

import type {
  CategorizedFAQItem,
  LocationContent,
  PricingTier,
  TeamMember,
  Testimonial,
} from "@/types/content";

import {
  categorizedFaqItemsSchema,
  locationContentsSchema,
  pricingTiersSchema,
  teamMembersSchema,
  testimonialsSchema,
} from "./schemas";

export function getTestimonials(): Testimonial[] {
  return testimonialsSchema.parse(testimonialsJson);
}

export function getTestimonialsByIds(ids: string[]): Testimonial[] {
  const testimonialMap = new Map(
    getTestimonials().map((testimonial) => [testimonial.id, testimonial])
  );

  return ids
    .map((id) => testimonialMap.get(id))
    .filter(
      (testimonial): testimonial is Testimonial => testimonial !== undefined
    );
}

export function getTeamMembers(): TeamMember[] {
  return teamMembersSchema.parse(teamJson);
}

export function getFaqItems(): CategorizedFAQItem[] {
  return categorizedFaqItemsSchema.parse(faqJson);
}

export function getLocations(): LocationContent[] {
  return locationContentsSchema.parse(locationsJson);
}

export function getPricingTiers(): PricingTier[] {
  return pricingTiersSchema.parse(pricingTiersJson);
}
