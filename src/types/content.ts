export interface SeoMeta {
  title: string;
  description: string;
  ogImage?: string;
}

export interface ContentImage {
  src: string;
  alt: string;
}

export interface LinkItem {
  label: string;
  href: string;
}

export interface CtaBlock {
  heading: string;
  subtext: string;
  primaryCta: LinkItem;
  secondaryCta?: LinkItem;
  trustBullets?: string[];
}

export interface HeroContent {
  eyebrow?: string;
  heading: string;
  subtitle: string;
  primaryCta?: LinkItem;
  secondaryCta?: LinkItem;
  stats?: Array<{ value: string; label: string }>;
}

export interface StatItem {
  value: string;
  label: string;
  detail?: string;
}

export interface CollectionOption {
  id: string;
  label: string;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: CollectionOption[];
}

export interface ValueCard {
  iconName: string;
  title: string;
  description: string;
  bullets?: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  relation: string;
  location?: string;
  rating: number;
  badge?: string;
  featured?: boolean;
  programSlugs?: string[];
  testPrepSlugs?: string[];
  source?: "google" | "direct";
  time?: number;
  profilePhotoUrl?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CategorizedFAQItem extends FAQItem {
  category: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  credentials?: string[];
  bio: string;
  image?: ContentImage;
}

export interface LocationContent {
  id: string;
  name: string;
  addressLine1: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  hours: Array<{ label: string; time: string }>;
  serviceAreas: string[];
  transportationAvailable?: boolean;
  mapUrl?: string;
  image?: ContentImage;
}

export interface PricingTier {
  id: string;
  name: string;
  priceLabel: string;
  cadence: string;
  description: string;
  features: string[];
  badge?: string;
  highlighted?: boolean;
}

export interface SectionShellContent {
  eyebrow: string;
  heading: string;
  subtitle?: string;
}

export interface CardGridSectionContent extends SectionShellContent {
  cardLinkLabel: string;
}

export interface ProcessStepContent {
  number: string;
  title: string;
  description: string;
}

export interface ProcessSectionContent extends SectionShellContent {
  steps: ProcessStepContent[];
}

export interface FAQShellContent {
  eyebrow: string;
  headingTemplate: string;
}

export interface RelatedLinksSectionContent {
  eyebrow: string;
  heading: string;
  linkLabel: string;
}

export interface StorySectionContent {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  missionTitle: string;
  missionText: string;
  valuesTitle: string;
  values: string[];
}

export interface AboutPageContent {
  seo: SeoMeta;
  hero: HeroContent;
  story: StorySectionContent;
  stats: StatItem[];
  differentiators: SectionShellContent & {
    items: ValueCard[];
  };
  teamSection: SectionShellContent;
  finalCta: CtaBlock;
}

export interface ReviewsPageContent {
  seo: SeoMeta;
  hero: HeroContent;
  stats: StatItem[];
  filters: SectionShellContent & {
    groups: FilterGroup[];
  };
  finalCta: CtaBlock;
}

export interface FaqPageContent {
  seo: SeoMeta;
  hero: HeroContent;
  faqSection: SectionShellContent;
  categories: string[];
  finalCta: CtaBlock;
}

export interface LocationsPageContent {
  seo: SeoMeta;
  hero: HeroContent;
  intro: SectionShellContent & {
    paragraphs: string[];
    transportationNote: string;
  };
  locationsSection: SectionShellContent;
  finalCta: CtaBlock;
}

export interface PricingPageContent {
  seo: SeoMeta;
  hero: HeroContent;
  intro: SectionShellContent & {
    paragraphs: string[];
  };
  comparisonNote: SectionShellContent & {
    body: string;
    highlights: string[];
  };
  tiersSection: SectionShellContent;
  allPlansInclude: SectionShellContent & {
    items: string[];
    footnote?: string;
  };
  faqSection: SectionShellContent & {
    items: FAQItem[];
  };
  finalCta: CtaBlock;
}

export interface BookAssessmentPageContent {
  seo: SeoMeta;
  hero: HeroContent;
  heroImage: ContentImage;
  formIntro: SectionShellContent & {
    reassurance: string;
    responsePromise: string;
  };
  stepsSection: SectionShellContent & {
    items: Array<{
      iconName: string;
      title: string;
      description: string;
    }>;
  };
  trustSignals: string[];
  testimonialIds: string[];
  faqSection: SectionShellContent & {
    items: FAQItem[];
  };
  closing: {
    heading: string;
    body: string;
    highlights: string[];
  };
}

export interface ComparisonRow {
  name: string;
  highlighted?: boolean;
  values: string[];
}

export interface ValuePropCard {
  iconName: string;
  title: string;
  description: string;
  bullets?: string[];
}

export interface WhyUsPageContent {
  seo: SeoMeta;
  hero: HeroContent;
  intro: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  comparison: SectionShellContent & {
    columns: string[];
    rows: ComparisonRow[];
  };
  reasons: SectionShellContent & {
    items: string[];
  };
  valueProps: SectionShellContent & {
    items: ValuePropCard[];
  };
  finalCta: CtaBlock;
}

export interface SummerPackage {
  id: string;
  name: string;
  description: string;
  badge?: string;
  highlighted?: boolean;
  features: string[];
}

export interface SummerField {
  iconName: string;
  title: string;
  description: string;
}

export interface SummerProgramsPageContent {
  seo: SeoMeta;
  hero: HeroContent;
  intro: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  packages: SectionShellContent & {
    items: SummerPackage[];
  };
  fields: SectionShellContent & {
    items: SummerField[];
  };
  finalCta: CtaBlock;
}

export interface FreeTrialTrack {
  id: string;
  name: string;
  description: string;
  badge?: string;
  highlighted?: boolean;
  features: string[];
}

export interface FreeTrialReassurance {
  iconName: string;
  title: string;
  description: string;
}

export interface FreeTrialPageContent {
  seo: SeoMeta;
  hero: HeroContent;
  intro: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  booking: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    calendlyUrl: string;
    fallbackPhone: string;
  };
  tracks: SectionShellContent & {
    items: FreeTrialTrack[];
  };
  reassurance: {
    eyebrow: string;
    heading: string;
    items: FreeTrialReassurance[];
  };
  finalCta: CtaBlock;
}

export interface ContactDetail {
  iconName: string;
  label: string;
  primary: string;
  secondary?: string;
  href?: string;
}

export interface ContactHour {
  label: string;
  time: string;
}

export interface ContactPageContent {
  seo: SeoMeta;
  hero: HeroContent;
  contactCard: {
    heading: string;
    details: ContactDetail[];
    hoursHeading: string;
    hours: ContactHour[];
    mapEmbedUrl?: string;
  };
  cities: SectionShellContent & {
    items: string[];
  };
  finalCta: CtaBlock;
}

export interface ProgramContent {
  slug: string;
  title: string;
  shortTitle: string;
  shortDescription: string;
  iconName: string;
  grades: string;
  tags: string[];
  seo: SeoMeta;
  hero: HeroContent;
  problem: { heading: string; paragraphs: string[] };
  approach: { heading: string; paragraphs: string[]; bullets: string[] };
  outcomes: { heading: string; items: string[] };
  faq: FAQItem[];
  testimonialIds?: string[];
  relatedPrograms: string[];
  cta: CtaBlock;
}

export interface ProgramDetailPageContent {
  problemEyebrow: string;
  approachEyebrow: string;
  process: ProcessSectionContent;
  outcomesEyebrow: string;
  testimonials: SectionShellContent;
  faq: FAQShellContent;
  related: RelatedLinksSectionContent;
  ctaTrustBullets: string[];
}

export interface ProgramsHubPageContent {
  seo: SeoMeta;
  hero: HeroContent;
  programsSection: CardGridSectionContent;
  finalCta: CtaBlock;
  detailPage: ProgramDetailPageContent;
}

export interface TestPrepContent {
  slug: string;
  title: string;
  shortTitle: string;
  shortDescription: string;
  iconName: string;
  grades: string;
  seo: SeoMeta;
  hero: HeroContent;
  idealFor: string[];
  focusAreas: string[];
  format: string[];
  outcomes: string[];
  faq: FAQItem[];
  testimonialIds?: string[];
  relatedTests: string[];
  cta: CtaBlock;
}

export interface TestPrepDetailPageContent {
  idealFor: SectionShellContent;
  focusAreas: SectionShellContent;
  process: ProcessSectionContent;
  format: SectionShellContent;
  outcomes: SectionShellContent;
  testimonials: SectionShellContent;
  faq: FAQShellContent;
  related: RelatedLinksSectionContent;
  ctaTrustBullets: string[];
}

export interface TestPrepHubPageContent {
  seo: SeoMeta;
  hero: HeroContent;
  testPrepSection: CardGridSectionContent;
  finalCta: CtaBlock;
  detailPage: TestPrepDetailPageContent;
}

export interface HomePageContent {
  seo: SeoMeta;
  hero: HeroContent;
  proofBar: Array<{ iconName: string; label: string }>;
  programsSection: { eyebrow: string; heading: string; subtitle: string };
  testimonialsSection: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    featuredIds: string[];
  };
  howItWorks: {
    eyebrow: string;
    heading: string;
    steps: Array<{ number: string; title: string; description: string }>;
  };
  whyCedar: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    items: Array<{
      iconName: string;
      title: string;
      description: string;
      checks?: string[];
    }>;
  };
  finalCta: CtaBlock;
}
