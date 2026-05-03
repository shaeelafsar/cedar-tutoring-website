import { z } from "zod";

import type {
  AboutPageContent,
  CategorizedFAQItem,
  ContentImage,
  CtaBlock,
  FAQItem,
  FaqPageContent,
  FilterGroup,
  HeroContent,
  HomePageContent,
  LinkItem,
  LocationContent,
  LocationsPageContent,
  PricingPageContent,
  PricingTier,
  ProgramContent,
  ProgramDetailPageContent,
  ProgramsHubPageContent,
  ReviewsPageContent,
  SeoMeta,
  TeamMember,
  Testimonial,
  TestPrepContent,
  TestPrepDetailPageContent,
  TestPrepHubPageContent,
  ValueCard,
} from "@/types/content";

const heroStatSchema = z.object({
  value: z.string(),
  label: z.string(),
  detail: z.string().optional(),
});

const hourSchema = z.object({
  label: z.string(),
  time: z.string(),
});

const proofBarItemSchema = z.object({
  iconName: z.string(),
  label: z.string(),
});

const howItWorksStepSchema = z.object({
  number: z.string(),
  title: z.string(),
  description: z.string(),
});

const whyCedarItemSchema = z.object({
  iconName: z.string(),
  title: z.string(),
  description: z.string(),
  checks: z.array(z.string()),
});

const valueCardSchema: z.ZodType<ValueCard> = z.object({
  iconName: z.string(),
  title: z.string(),
  description: z.string(),
  bullets: z.array(z.string()).optional(),
});

const richTextSectionSchema = z.object({
  heading: z.string(),
  paragraphs: z.array(z.string()),
});

const storySectionSchema = z.object({
  eyebrow: z.string(),
  heading: z.string(),
  paragraphs: z.array(z.string()),
  missionTitle: z.string(),
  missionText: z.string(),
  valuesTitle: z.string(),
  values: z.array(z.string()),
});

const approachSectionSchema = richTextSectionSchema.extend({
  bullets: z.array(z.string()),
});

const outcomesSectionSchema = z.object({
  heading: z.string(),
  items: z.array(z.string()),
});

const sectionShellSchema = z.object({
  eyebrow: z.string(),
  heading: z.string(),
  subtitle: z.string().optional(),
});

const cardGridSectionSchema = sectionShellSchema.extend({
  cardLinkLabel: z.string(),
});

const processSectionSchema = sectionShellSchema.extend({
  steps: z.array(howItWorksStepSchema),
});

const faqShellSchema = z.object({
  eyebrow: z.string(),
  headingTemplate: z.string(),
});

const relatedLinksSectionSchema = z.object({
  eyebrow: z.string(),
  heading: z.string(),
  linkLabel: z.string(),
});

const filterOptionSchema = z.object({
  id: z.string(),
  label: z.string(),
});

const filterGroupSchema: z.ZodType<FilterGroup> = z.object({
  id: z.string(),
  label: z.string(),
  options: z.array(filterOptionSchema),
});

export const seoMetaSchema: z.ZodType<SeoMeta> = z.object({
  title: z.string(),
  description: z.string(),
  ogImage: z.string().optional(),
});

export const contentImageSchema: z.ZodType<ContentImage> = z.object({
  src: z.string(),
  alt: z.string(),
});

export const linkItemSchema: z.ZodType<LinkItem> = z.object({
  label: z.string(),
  href: z.string(),
});

export const ctaBlockSchema: z.ZodType<CtaBlock> = z.object({
  heading: z.string(),
  subtext: z.string(),
  primaryCta: linkItemSchema,
  secondaryCta: linkItemSchema.optional(),
  trustBullets: z.array(z.string()).optional(),
});

export const heroContentSchema: z.ZodType<HeroContent> = z.object({
  eyebrow: z.string().optional(),
  heading: z.string(),
  subtitle: z.string(),
  primaryCta: linkItemSchema.optional(),
  secondaryCta: linkItemSchema.optional(),
  stats: z.array(heroStatSchema).optional(),
});

export const testimonialSchema: z.ZodType<Testimonial> = z.object({
  id: z.string(),
  quote: z.string(),
  author: z.string(),
  relation: z.string(),
  location: z.string().optional(),
  rating: z.number().int().min(1).max(5),
  badge: z.string().optional(),
  featured: z.boolean().optional(),
  programSlugs: z.array(z.string()).optional(),
  testPrepSlugs: z.array(z.string()).optional(),
  source: z.enum(["google", "direct"]).optional(),
});

const faqItemObjectSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const faqItemSchema: z.ZodType<FAQItem> = faqItemObjectSchema;

export const categorizedFaqItemSchema: z.ZodType<CategorizedFAQItem> =
  faqItemObjectSchema.extend({
    category: z.string(),
  });

export const teamMemberSchema: z.ZodType<TeamMember> = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  credentials: z.array(z.string()).optional(),
  bio: z.string(),
  image: contentImageSchema.optional(),
});

export const locationContentSchema: z.ZodType<LocationContent> = z.object({
  id: z.string(),
  name: z.string(),
  addressLine1: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  phone: z.string(),
  hours: z.array(hourSchema),
  serviceAreas: z.array(z.string()),
  transportationAvailable: z.boolean().optional(),
  mapUrl: z.string().optional(),
  image: contentImageSchema.optional(),
});

export const pricingTierSchema: z.ZodType<PricingTier> = z.object({
  id: z.string(),
  name: z.string(),
  priceLabel: z.string(),
  cadence: z.string(),
  description: z.string(),
  features: z.array(z.string()),
  badge: z.string().optional(),
  highlighted: z.boolean().optional(),
});

export const programContentSchema: z.ZodType<ProgramContent> = z.object({
  slug: z.string(),
  title: z.string(),
  shortTitle: z.string(),
  shortDescription: z.string(),
  iconName: z.string(),
  grades: z.string(),
  tags: z.array(z.string()),
  seo: seoMetaSchema,
  hero: heroContentSchema,
  problem: richTextSectionSchema,
  approach: approachSectionSchema,
  outcomes: outcomesSectionSchema,
  faq: z.array(faqItemSchema),
  testimonialIds: z.array(z.string()).optional(),
  relatedPrograms: z.array(z.string()),
  cta: ctaBlockSchema,
});

const programDetailPageContentSchema: z.ZodType<ProgramDetailPageContent> =
  z.object({
    problemEyebrow: z.string(),
    approachEyebrow: z.string(),
    process: processSectionSchema,
    outcomesEyebrow: z.string(),
    testimonials: sectionShellSchema,
    faq: faqShellSchema,
    related: relatedLinksSectionSchema,
    ctaTrustBullets: z.array(z.string()),
  });

export const programsHubPageContentSchema: z.ZodType<ProgramsHubPageContent> =
  z.object({
    seo: seoMetaSchema,
    hero: heroContentSchema,
    programsSection: cardGridSectionSchema,
    finalCta: ctaBlockSchema,
    detailPage: programDetailPageContentSchema,
  });

export const testPrepContentSchema: z.ZodType<TestPrepContent> = z.object({
  slug: z.string(),
  title: z.string(),
  shortTitle: z.string(),
  shortDescription: z.string(),
  iconName: z.string(),
  grades: z.string(),
  seo: seoMetaSchema,
  hero: heroContentSchema,
  idealFor: z.array(z.string()),
  focusAreas: z.array(z.string()),
  format: z.array(z.string()),
  outcomes: z.array(z.string()),
  faq: z.array(faqItemSchema),
  testimonialIds: z.array(z.string()).optional(),
  relatedTests: z.array(z.string()),
  cta: ctaBlockSchema,
});

const testPrepDetailPageContentSchema: z.ZodType<TestPrepDetailPageContent> =
  z.object({
    idealFor: sectionShellSchema,
    focusAreas: sectionShellSchema,
    process: processSectionSchema,
    format: sectionShellSchema,
    outcomes: sectionShellSchema,
    testimonials: sectionShellSchema,
    faq: faqShellSchema,
    related: relatedLinksSectionSchema,
    ctaTrustBullets: z.array(z.string()),
  });

export const testPrepHubPageContentSchema: z.ZodType<TestPrepHubPageContent> =
  z.object({
    seo: seoMetaSchema,
    hero: heroContentSchema,
    testPrepSection: cardGridSectionSchema,
    finalCta: ctaBlockSchema,
    detailPage: testPrepDetailPageContentSchema,
  });

export const homePageContentSchema: z.ZodType<HomePageContent> = z.object({
  seo: seoMetaSchema,
  hero: heroContentSchema,
  proofBar: z.array(proofBarItemSchema),
  programsSection: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    subtitle: z.string(),
  }),
  testimonialsSection: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    subtitle: z.string(),
    featuredIds: z.array(z.string()),
  }),
  howItWorks: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    steps: z.array(howItWorksStepSchema),
  }),
  whyCedar: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    subtitle: z.string(),
    items: z.array(whyCedarItemSchema),
  }),
  finalCta: ctaBlockSchema,
});

export const aboutPageContentSchema: z.ZodType<AboutPageContent> = z.object({
  seo: seoMetaSchema,
  hero: heroContentSchema,
  story: storySectionSchema,
  stats: z.array(heroStatSchema),
  differentiators: sectionShellSchema.extend({
    items: z.array(valueCardSchema),
  }),
  teamSection: sectionShellSchema,
  finalCta: ctaBlockSchema,
});

export const reviewsPageContentSchema: z.ZodType<ReviewsPageContent> = z.object(
  {
    seo: seoMetaSchema,
    hero: heroContentSchema,
    stats: z.array(heroStatSchema),
    filters: sectionShellSchema.extend({
      groups: z.array(filterGroupSchema),
    }),
    finalCta: ctaBlockSchema,
  }
);

export const faqPageContentSchema: z.ZodType<FaqPageContent> = z.object({
  seo: seoMetaSchema,
  hero: heroContentSchema,
  faqSection: sectionShellSchema,
  categories: z.array(z.string()),
  finalCta: ctaBlockSchema,
});

export const locationsPageContentSchema: z.ZodType<LocationsPageContent> =
  z.object({
    seo: seoMetaSchema,
    hero: heroContentSchema,
    intro: sectionShellSchema.extend({
      paragraphs: z.array(z.string()),
      transportationNote: z.string(),
    }),
    locationsSection: sectionShellSchema,
    finalCta: ctaBlockSchema,
  });

export const pricingPageContentSchema: z.ZodType<PricingPageContent> = z.object(
  {
    seo: seoMetaSchema,
    hero: heroContentSchema,
    intro: sectionShellSchema.extend({
      paragraphs: z.array(z.string()),
    }),
    comparisonNote: sectionShellSchema.extend({
      body: z.string(),
      highlights: z.array(z.string()),
    }),
    tiersSection: sectionShellSchema,
    allPlansInclude: sectionShellSchema.extend({
      items: z.array(z.string()),
      footnote: z.string().optional(),
    }),
    faqSection: sectionShellSchema.extend({
      items: z.array(faqItemSchema),
    }),
    finalCta: ctaBlockSchema,
  }
);

export const testimonialsSchema = z.array(testimonialSchema);
export const teamMembersSchema = z.array(teamMemberSchema);
export const categorizedFaqItemsSchema = z.array(categorizedFaqItemSchema);
export const locationContentsSchema = z.array(locationContentSchema);
export const pricingTiersSchema = z.array(pricingTierSchema);
export const programContentsSchema = z.array(programContentSchema);
export const testPrepContentsSchema = z.array(testPrepContentSchema);
