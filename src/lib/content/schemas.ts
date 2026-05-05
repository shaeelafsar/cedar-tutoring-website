import { z } from "zod";

const nonEmptyString = z.string().min(1);

export const linkItemSchema = z.object({
  label: nonEmptyString,
  href: nonEmptyString,
});

export const seoMetaSchema = z.object({
  title: nonEmptyString,
  description: nonEmptyString,
  ogImage: nonEmptyString.optional(),
});

export const contentImageSchema = z.object({
  src: nonEmptyString,
  alt: nonEmptyString,
});

export const ctaBlockSchema = z.object({
  heading: nonEmptyString,
  subtext: nonEmptyString,
  primaryCta: linkItemSchema,
  secondaryCta: linkItemSchema.optional(),
  trustBullets: z.array(nonEmptyString).optional(),
});

export const heroContentSchema = z.object({
  eyebrow: nonEmptyString.optional(),
  heading: nonEmptyString,
  subtitle: nonEmptyString,
  primaryCta: linkItemSchema.optional(),
  secondaryCta: linkItemSchema.optional(),
  stats: z
    .array(
      z.object({
        value: nonEmptyString,
        label: nonEmptyString,
      }),
    )
    .optional(),
});

export const statItemSchema = z.object({
  value: nonEmptyString,
  label: nonEmptyString,
  detail: nonEmptyString.optional(),
});

export const collectionOptionSchema = z.object({
  id: nonEmptyString,
  label: nonEmptyString,
});

export const filterGroupSchema = z.object({
  id: nonEmptyString,
  label: nonEmptyString,
  options: z.array(collectionOptionSchema),
});

export const valueCardSchema = z.object({
  iconName: nonEmptyString,
  title: nonEmptyString,
  description: nonEmptyString,
  bullets: z.array(nonEmptyString).optional(),
});

export const testimonialSchema = z.object({
  id: nonEmptyString,
  quote: nonEmptyString,
  author: nonEmptyString,
  relation: nonEmptyString,
  location: nonEmptyString.optional(),
  rating: z.number().int().min(1).max(5),
  badge: nonEmptyString.optional(),
  featured: z.boolean().optional(),
  programSlugs: z.array(nonEmptyString).optional(),
  testPrepSlugs: z.array(nonEmptyString).optional(),
  source: z.enum(["google", "direct"]).optional(),
  time: z.number().int().nonnegative().optional(),
  profilePhotoUrl: nonEmptyString.optional(),
});

export const testimonialsSchema = z.array(testimonialSchema);

export const faqItemSchema = z.object({
  question: nonEmptyString,
  answer: nonEmptyString,
});

export const categorizedFaqItemSchema = faqItemSchema.extend({
  category: nonEmptyString,
});

export const categorizedFaqItemsSchema = z.array(categorizedFaqItemSchema);

export const teamMemberSchema = z.object({
  id: nonEmptyString,
  name: nonEmptyString,
  role: nonEmptyString,
  credentials: z.array(nonEmptyString).optional(),
  bio: nonEmptyString,
  image: contentImageSchema.optional(),
});

export const teamMembersSchema = z.array(teamMemberSchema);

export const locationContentSchema = z.object({
  id: nonEmptyString,
  name: nonEmptyString,
  addressLine1: nonEmptyString,
  city: nonEmptyString,
  state: nonEmptyString,
  zip: nonEmptyString,
  phone: nonEmptyString,
  hours: z.array(
    z.object({
      label: nonEmptyString,
      time: nonEmptyString,
    }),
  ),
  serviceAreas: z.array(nonEmptyString),
  transportationAvailable: z.boolean().optional(),
  mapUrl: nonEmptyString.optional(),
  image: contentImageSchema.optional(),
});

export const locationContentsSchema = z.array(locationContentSchema);

export const pricingTierSchema = z.object({
  id: nonEmptyString,
  name: nonEmptyString,
  priceLabel: nonEmptyString,
  cadence: nonEmptyString,
  description: nonEmptyString,
  features: z.array(nonEmptyString),
  badge: nonEmptyString.optional(),
  highlighted: z.boolean().optional(),
});

export const pricingTiersSchema = z.array(pricingTierSchema);

export const sectionShellContentSchema = z.object({
  eyebrow: nonEmptyString,
  heading: nonEmptyString,
  subtitle: nonEmptyString.optional(),
});

export const cardGridSectionContentSchema = sectionShellContentSchema.extend({
  cardLinkLabel: nonEmptyString,
});

export const processStepContentSchema = z.object({
  number: nonEmptyString,
  title: nonEmptyString,
  description: nonEmptyString,
});

export const processSectionContentSchema = sectionShellContentSchema.extend({
  steps: z.array(processStepContentSchema),
});

export const faqShellContentSchema = z.object({
  eyebrow: nonEmptyString,
  headingTemplate: nonEmptyString,
});

export const relatedLinksSectionContentSchema = z.object({
  eyebrow: nonEmptyString,
  heading: nonEmptyString,
  linkLabel: nonEmptyString,
});

export const storySectionContentSchema = z.object({
  eyebrow: nonEmptyString,
  heading: nonEmptyString,
  paragraphs: z.array(nonEmptyString),
  missionTitle: nonEmptyString,
  missionText: nonEmptyString,
  valuesTitle: nonEmptyString,
  values: z.array(nonEmptyString),
});

export const aboutPageContentSchema = z.object({
  seo: seoMetaSchema,
  hero: heroContentSchema,
  story: storySectionContentSchema,
  stats: z.array(statItemSchema),
  differentiators: sectionShellContentSchema.extend({
    items: z.array(valueCardSchema),
  }),
  teamSection: sectionShellContentSchema,
  finalCta: ctaBlockSchema,
});

export const reviewsPageContentSchema = z.object({
  seo: seoMetaSchema,
  hero: heroContentSchema,
  stats: z.array(statItemSchema),
  filters: sectionShellContentSchema.extend({
    groups: z.array(filterGroupSchema),
  }),
  finalCta: ctaBlockSchema,
});

export const faqPageContentSchema = z.object({
  seo: seoMetaSchema,
  hero: heroContentSchema,
  faqSection: sectionShellContentSchema,
  categories: z.array(nonEmptyString),
  finalCta: ctaBlockSchema,
});

export const locationsPageContentSchema = z.object({
  seo: seoMetaSchema,
  hero: heroContentSchema,
  intro: sectionShellContentSchema.extend({
    paragraphs: z.array(nonEmptyString),
    transportationNote: nonEmptyString,
  }),
  locationsSection: sectionShellContentSchema,
  finalCta: ctaBlockSchema,
});

export const pricingPageContentSchema = z.object({
  seo: seoMetaSchema,
  hero: heroContentSchema,
  intro: sectionShellContentSchema.extend({
    paragraphs: z.array(nonEmptyString),
  }),
  comparisonNote: sectionShellContentSchema.extend({
    body: nonEmptyString,
    highlights: z.array(nonEmptyString),
  }),
  tiersSection: sectionShellContentSchema,
  allPlansInclude: sectionShellContentSchema.extend({
    items: z.array(nonEmptyString),
    footnote: nonEmptyString.optional(),
  }),
  faqSection: sectionShellContentSchema.extend({
    items: z.array(faqItemSchema),
  }),
  finalCta: ctaBlockSchema,
});

export const bookAssessmentPageContentSchema = z.object({
  seo: seoMetaSchema,
  hero: heroContentSchema,
  heroImage: contentImageSchema,
  formIntro: sectionShellContentSchema.extend({
    reassurance: nonEmptyString,
    responsePromise: nonEmptyString,
  }),
  stepsSection: sectionShellContentSchema.extend({
    items: z.array(
      z.object({
        iconName: nonEmptyString,
        title: nonEmptyString,
        description: nonEmptyString,
      }),
    ),
  }),
  trustSignals: z.array(nonEmptyString),
  testimonialIds: z.array(nonEmptyString),
  faqSection: sectionShellContentSchema.extend({
    items: z.array(faqItemSchema),
  }),
  closing: z.object({
    heading: nonEmptyString,
    body: nonEmptyString,
    highlights: z.array(nonEmptyString),
  }),
});

export const programContentSchema = z.object({
  slug: nonEmptyString,
  title: nonEmptyString,
  shortTitle: nonEmptyString,
  shortDescription: nonEmptyString,
  iconName: nonEmptyString,
  grades: nonEmptyString,
  tags: z.array(nonEmptyString),
  seo: seoMetaSchema,
  hero: heroContentSchema,
  problem: z.object({
    heading: nonEmptyString,
    paragraphs: z.array(nonEmptyString),
  }),
  approach: z.object({
    heading: nonEmptyString,
    paragraphs: z.array(nonEmptyString),
    bullets: z.array(nonEmptyString),
  }),
  outcomes: z.object({
    heading: nonEmptyString,
    items: z.array(nonEmptyString),
  }),
  faq: z.array(faqItemSchema),
  testimonialIds: z.array(nonEmptyString).optional(),
  relatedPrograms: z.array(nonEmptyString),
  cta: ctaBlockSchema,
});

export const programContentsSchema = z.array(programContentSchema);

export const programsHubPageContentSchema = z.object({
  seo: seoMetaSchema,
  hero: heroContentSchema,
  programsSection: cardGridSectionContentSchema,
  finalCta: ctaBlockSchema,
  detailPage: z.object({
    problemEyebrow: nonEmptyString,
    approachEyebrow: nonEmptyString,
    process: processSectionContentSchema,
    outcomesEyebrow: nonEmptyString,
    testimonials: sectionShellContentSchema,
    faq: faqShellContentSchema,
    related: relatedLinksSectionContentSchema,
    ctaTrustBullets: z.array(nonEmptyString),
  }),
});

export const testPrepContentSchema = z.object({
  slug: nonEmptyString,
  title: nonEmptyString,
  shortTitle: nonEmptyString,
  shortDescription: nonEmptyString,
  iconName: nonEmptyString,
  grades: nonEmptyString,
  seo: seoMetaSchema,
  hero: heroContentSchema,
  idealFor: z.array(nonEmptyString),
  focusAreas: z.array(nonEmptyString),
  format: z.array(nonEmptyString),
  outcomes: z.array(nonEmptyString),
  faq: z.array(faqItemSchema),
  testimonialIds: z.array(nonEmptyString).optional(),
  relatedTests: z.array(nonEmptyString),
  cta: ctaBlockSchema,
});

export const testPrepContentsSchema = z.array(testPrepContentSchema);

export const testPrepHubPageContentSchema = z.object({
  seo: seoMetaSchema,
  hero: heroContentSchema,
  testPrepSection: cardGridSectionContentSchema,
  finalCta: ctaBlockSchema,
  detailPage: z.object({
    idealFor: sectionShellContentSchema,
    focusAreas: sectionShellContentSchema,
    process: processSectionContentSchema,
    format: sectionShellContentSchema,
    outcomes: sectionShellContentSchema,
    testimonials: sectionShellContentSchema,
    faq: faqShellContentSchema,
    related: relatedLinksSectionContentSchema,
    ctaTrustBullets: z.array(nonEmptyString),
  }),
});

export const homePageContentSchema = z.object({
  seo: seoMetaSchema,
  hero: heroContentSchema,
  proofBar: z.array(
    z.object({
      iconName: nonEmptyString,
      label: nonEmptyString,
    }),
  ),
  programsSection: z.object({
    eyebrow: nonEmptyString,
    heading: nonEmptyString,
    subtitle: nonEmptyString,
  }),
  testimonialsSection: z.object({
    eyebrow: nonEmptyString,
    heading: nonEmptyString,
    subtitle: nonEmptyString,
    featuredIds: z.array(nonEmptyString),
  }),
  howItWorks: z.object({
    eyebrow: nonEmptyString,
    heading: nonEmptyString,
    steps: z.array(processStepContentSchema),
  }),
  whyCedar: z.object({
    eyebrow: nonEmptyString,
    heading: nonEmptyString,
    subtitle: nonEmptyString,
    items: z.array(
      z.object({
        iconName: nonEmptyString,
        title: nonEmptyString,
        description: nonEmptyString,
        checks: z.array(nonEmptyString),
      }),
    ),
  }),
  finalCta: ctaBlockSchema,
});

export const homeHeroFrontmatterSchema = z.object({
  component: nonEmptyString.optional(),
  order: z.number().int().optional(),
  eyebrow: nonEmptyString.optional(),
  seo: seoMetaSchema,
  primaryCta: linkItemSchema.optional(),
  secondaryCta: linkItemSchema.optional(),
  stats: z
    .array(
      z.object({
        value: nonEmptyString,
        label: nonEmptyString,
      }),
    )
    .optional(),
});

export const proofBarFrontmatterSchema = z.object({
  component: nonEmptyString.optional(),
  order: z.number().int().optional(),
  items: z.array(
    z.object({
      iconName: nonEmptyString,
      label: nonEmptyString,
    }),
  ),
});

export const sectionHeadingFrontmatterSchema = z.object({
  component: nonEmptyString.optional(),
  order: z.number().int().optional(),
  eyebrow: nonEmptyString,
});

export const ctaFrontmatterSchema = z.object({
  component: nonEmptyString.optional(),
  order: z.number().int().optional(),
  primaryCta: linkItemSchema,
  secondaryCta: linkItemSchema.optional(),
  trustBullets: z.array(nonEmptyString).optional(),
});

export const homeTestimonialsFrontmatterSchema = sectionHeadingFrontmatterSchema.extend({
  featuredIds: z.array(nonEmptyString),
});

export const stepsFrontmatterSchema = sectionHeadingFrontmatterSchema.extend({
  steps: z.array(processStepContentSchema),
});

export const whyCedarFrontmatterSchema = sectionHeadingFrontmatterSchema.extend({
  items: z.array(
    z.object({
      iconName: nonEmptyString,
      title: nonEmptyString,
      description: nonEmptyString,
      checks: z.array(nonEmptyString),
    }),
  ),
});

export const aboutStatsFrontmatterSchema = z.object({
  component: nonEmptyString.optional(),
  order: z.number().int().optional(),
  stats: z.array(statItemSchema),
});

export const aboutStoryFrontmatterSchema = sectionHeadingFrontmatterSchema.extend({
  missionTitle: nonEmptyString,
  missionText: nonEmptyString,
  valuesTitle: nonEmptyString,
  values: z.array(nonEmptyString),
});

export const aboutValuesFrontmatterSchema = sectionHeadingFrontmatterSchema.extend({
  items: z.array(valueCardSchema),
});

export const aboutTeamFrontmatterSchema = z.object({
  component: nonEmptyString.optional(),
  order: z.number().int().optional(),
  eyebrow: nonEmptyString,
  members: teamMembersSchema,
});

export const reviewsPageFrontmatterSchema = z.object({
  component: nonEmptyString.optional(),
  seo: seoMetaSchema,
  eyebrow: nonEmptyString,
  filtersEyebrow: nonEmptyString,
  stats: z.array(statItemSchema),
  filterGroups: z.array(filterGroupSchema),
  finalCta: ctaBlockSchema,
});

export const testimonialsCollectionFrontmatterSchema = z.object({
  component: nonEmptyString.optional(),
  testimonials: testimonialsSchema,
});

export const faqPageFrontmatterSchema = z.object({
  component: nonEmptyString.optional(),
  seo: seoMetaSchema,
  eyebrow: nonEmptyString,
  faqEyebrow: nonEmptyString,
  categories: z.array(nonEmptyString),
  faqItems: categorizedFaqItemsSchema,
  finalCta: ctaBlockSchema,
});

export const locationsPageFrontmatterSchema = z.object({
  component: nonEmptyString.optional(),
  seo: seoMetaSchema,
  eyebrow: nonEmptyString,
  introEyebrow: nonEmptyString,
  introSubtitle: nonEmptyString,
  locationsEyebrow: nonEmptyString,
  transportationNote: nonEmptyString,
  locations: locationContentsSchema,
  finalCta: ctaBlockSchema,
});

export const pricingPageFrontmatterSchema = z.object({
  component: nonEmptyString.optional(),
  seo: seoMetaSchema,
  eyebrow: nonEmptyString,
  introEyebrow: nonEmptyString,
  introSubtitle: nonEmptyString,
  comparisonEyebrow: nonEmptyString,
  comparisonHighlights: z.array(nonEmptyString),
  tiersEyebrow: nonEmptyString,
  pricingTiers: pricingTiersSchema,
  allPlansEyebrow: nonEmptyString,
  allPlansItems: z.array(nonEmptyString),
  allPlansFootnote: nonEmptyString.optional(),
  faqEyebrow: nonEmptyString,
  faqItems: z.array(faqItemSchema),
  finalCta: ctaBlockSchema,
});

export const bookAssessmentPageFrontmatterSchema = z.object({
  component: nonEmptyString.optional(),
  seo: seoMetaSchema,
  heroEyebrow: nonEmptyString,
  heroImage: contentImageSchema,
  formEyebrow: nonEmptyString,
  formReassurance: nonEmptyString,
  responsePromise: nonEmptyString,
  faqEyebrow: nonEmptyString,
  stepsSection: z.object({
    eyebrow: nonEmptyString,
    heading: nonEmptyString,
    subtitle: nonEmptyString,
    items: z.array(
      z.object({
        iconName: nonEmptyString,
        title: nonEmptyString,
        description: nonEmptyString,
      }),
    ),
  }),
  testimonialIds: z.array(nonEmptyString),
  faqItems: z.array(faqItemSchema),
});

export const assessmentTrustFrontmatterSchema = z.object({
  component: nonEmptyString.optional(),
  trustSignals: z.array(nonEmptyString),
  highlights: z.array(nonEmptyString),
});

export const programsHubFrontmatterSchema = z.object({
  component: nonEmptyString.optional(),
  sectionEyebrow: nonEmptyString,
  seo: seoMetaSchema,
  cardLinkLabel: nonEmptyString,
  detailPage: programsHubPageContentSchema.shape.detailPage,
  finalCta: ctaBlockSchema,
});

export const testPrepHubFrontmatterSchema = z.object({
  component: nonEmptyString.optional(),
  sectionEyebrow: nonEmptyString,
  seo: seoMetaSchema,
  cardLinkLabel: nonEmptyString,
  detailPage: testPrepHubPageContentSchema.shape.detailPage,
  finalCta: ctaBlockSchema,
});

export const programFrontmatterSchema = z.object({
  slug: nonEmptyString,
  title: nonEmptyString,
  shortTitle: nonEmptyString,
  shortDescription: nonEmptyString,
  iconName: nonEmptyString,
  grades: nonEmptyString,
  tags: z.array(nonEmptyString),
  seo: seoMetaSchema,
  testimonialIds: z.array(nonEmptyString).optional(),
  relatedPrograms: z.array(nonEmptyString),
  faq: z.array(faqItemSchema),
  cta: ctaBlockSchema,
});

export const testPrepFrontmatterSchema = z.object({
  slug: nonEmptyString,
  title: nonEmptyString,
  shortTitle: nonEmptyString,
  shortDescription: nonEmptyString,
  iconName: nonEmptyString,
  grades: nonEmptyString,
  seo: seoMetaSchema,
  testimonialIds: z.array(nonEmptyString).optional(),
  relatedTests: z.array(nonEmptyString),
  faq: z.array(faqItemSchema),
  cta: ctaBlockSchema,
});

type NavItemValue = {
  label: string;
  href: string;
  children?: NavItemValue[];
};

const navItemSchema: z.ZodType<NavItemValue> = z.lazy(() =>
  z.object({
    label: nonEmptyString,
    href: nonEmptyString,
    children: z.array(navItemSchema).optional(),
  }),
);

export const siteMetadataSchema = z.object({
  site: z.object({
    name: nonEmptyString,
    tagline: nonEmptyString,
    url: nonEmptyString,
    phone: nonEmptyString,
    email: nonEmptyString,
    address: z.object({
      street: nonEmptyString,
      city: nonEmptyString,
      state: nonEmptyString,
      zip: nonEmptyString,
      full: nonEmptyString,
    }),
  }),
  navigation: z.array(navItemSchema),
  footerNav: z.object({
    programs: z.array(navItemSchema),
    testPrep: z.array(navItemSchema),
    company: z.array(navItemSchema),
  }),
});
