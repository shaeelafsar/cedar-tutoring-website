import type {
  AboutPageContent,
  BookAssessmentPageContent,
  ContactPageContent,
  FaqPageContent,
  FreeTrialPageContent,
  HomePageContent,
  LocationsPageContent,
  PricingPageContent,
  ProgramsHubPageContent,
  ReviewsPageContent,
  SummerProgramsPageContent,
  TestPrepHubPageContent,
  WhyUsPageContent,
} from "@/types/content";

import {
  getFirstParagraph,
  getParagraphs,
  getSection,
  parseMarkdownPage,
  readMarkdownFile,
} from "./markdown";
import {
  aboutPageContentSchema,
  aboutStatsFrontmatterSchema,
  aboutStoryFrontmatterSchema,
  aboutTeamFrontmatterSchema,
  aboutValuesFrontmatterSchema,
  bookAssessmentPageContentSchema,
  bookAssessmentPageFrontmatterSchema,
  assessmentTrustFrontmatterSchema,
  contactPageContentSchema,
  contactPageFrontmatterSchema,
  ctaFrontmatterSchema,
  faqPageContentSchema,
  faqPageFrontmatterSchema,
  freeTrialPageContentSchema,
  freeTrialPageFrontmatterSchema,
  homeHeroFrontmatterSchema,
  homePageContentSchema,
  homeTestimonialsFrontmatterSchema,
  locationsPageContentSchema,
  locationsPageFrontmatterSchema,
  pricingPageContentSchema,
  pricingPageFrontmatterSchema,
  programsHubFrontmatterSchema,
  programsHubPageContentSchema,
  proofBarFrontmatterSchema,
  reviewsPageContentSchema,
  reviewsPageFrontmatterSchema,
  sectionHeadingFrontmatterSchema,
  stepsFrontmatterSchema,
  summerProgramsPageContentSchema,
  summerProgramsPageFrontmatterSchema,
  testPrepHubFrontmatterSchema,
  testPrepHubPageContentSchema,
  whyCedarFrontmatterSchema,
  whyUsPageContentSchema,
  whyUsPageFrontmatterSchema,
} from "./schemas";

function readCta(path: string) {
  const doc = readMarkdownFile(path, ctaFrontmatterSchema);
  const page = parseMarkdownPage(doc.content);

  return {
    heading: page.heading,
    subtext: getFirstParagraph(page.intro),
    primaryCta: doc.data.primaryCta,
    secondaryCta: doc.data.secondaryCta,
    trustBullets: doc.data.trustBullets,
  };
}

function readSimpleSection(path: string, schema = sectionHeadingFrontmatterSchema) {
  const doc = readMarkdownFile(path, schema);
  const page = parseMarkdownPage(doc.content);

  return {
    data: doc.data,
    heading: page.heading,
    subtitle: getFirstParagraph(page.intro),
  };
}

export function getHomePageContent(): HomePageContent {
  const heroDoc = readMarkdownFile("pages/home/hero.md", homeHeroFrontmatterSchema);
  const heroPage = parseMarkdownPage(heroDoc.content);
  const programsSection = readSimpleSection("pages/home/programs.md");
  const testimonialsDoc = readMarkdownFile(
    "pages/home/testimonials.md",
    homeTestimonialsFrontmatterSchema,
  );
  const testimonialsPage = parseMarkdownPage(testimonialsDoc.content);
  const howItWorksDoc = readMarkdownFile(
    "pages/home/how-it-works.md",
    stepsFrontmatterSchema,
  );
  const howItWorksPage = parseMarkdownPage(howItWorksDoc.content);
  const whyCedarDoc = readMarkdownFile(
    "pages/home/why-cedar.md",
    whyCedarFrontmatterSchema,
  );
  const whyCedarPage = parseMarkdownPage(whyCedarDoc.content);

  return homePageContentSchema.parse({
    seo: heroDoc.data.seo,
    hero: {
      eyebrow: heroDoc.data.eyebrow,
      heading: heroPage.heading,
      subtitle: getFirstParagraph(heroPage.intro),
      primaryCta: heroDoc.data.primaryCta,
      secondaryCta: heroDoc.data.secondaryCta,
      stats: heroDoc.data.stats,
    },
    proofBar: readMarkdownFile("pages/home/proof-bar.md", proofBarFrontmatterSchema).data
      .items,
    programsSection: {
      eyebrow: programsSection.data.eyebrow,
      heading: programsSection.heading,
      subtitle: programsSection.subtitle,
    },
    testimonialsSection: {
      eyebrow: testimonialsDoc.data.eyebrow,
      heading: testimonialsPage.heading,
      subtitle: getFirstParagraph(testimonialsPage.intro),
      featuredIds: testimonialsDoc.data.featuredIds,
    },
    howItWorks: {
      eyebrow: howItWorksDoc.data.eyebrow,
      heading: howItWorksPage.heading,
      steps: howItWorksDoc.data.steps,
    },
    whyCedar: {
      eyebrow: whyCedarDoc.data.eyebrow,
      heading: whyCedarPage.heading,
      subtitle: getFirstParagraph(whyCedarPage.intro),
      items: whyCedarDoc.data.items,
    },
    finalCta: readCta("pages/home/cta.md"),
  });
}

export function getLocationsPageContent(): LocationsPageContent {
  const doc = readMarkdownFile("pages/locations/_page.md", locationsPageFrontmatterSchema);
  const page = parseMarkdownPage(doc.content);
  const introSection = page.sections[0];
  const locationsSection = page.sections[1];

  return locationsPageContentSchema.parse({
    seo: doc.data.seo,
    hero: {
      eyebrow: doc.data.eyebrow,
      heading: page.heading,
      subtitle: getFirstParagraph(page.intro),
    },
    intro: {
      eyebrow: doc.data.introEyebrow,
      heading: introSection.title,
      subtitle: doc.data.introSubtitle,
      paragraphs: getParagraphs(introSection.content),
      transportationNote: doc.data.transportationNote,
    },
    locationsSection: {
      eyebrow: doc.data.locationsEyebrow,
      heading: locationsSection.title,
      subtitle: getFirstParagraph(locationsSection.content),
    },
    finalCta: doc.data.finalCta,
  });
}

export function getPricingPageContent(): PricingPageContent {
  const doc = readMarkdownFile("pages/pricing/_page.md", pricingPageFrontmatterSchema);
  const page = parseMarkdownPage(doc.content);
  const introSection = page.sections[0];
  const comparisonSection = page.sections[1];
  const tiersSection = page.sections[2];
  const allPlansSection = page.sections[3];
  const rawFaqSection = page.sections[4];

  return pricingPageContentSchema.parse({
    seo: doc.data.seo,
    hero: {
      eyebrow: doc.data.eyebrow,
      heading: page.heading,
      subtitle: getFirstParagraph(page.intro),
    },
    intro: {
      eyebrow: doc.data.introEyebrow,
      heading: introSection.title,
      subtitle: doc.data.introSubtitle,
      paragraphs: getParagraphs(introSection.content),
    },
    comparisonNote: {
      eyebrow: doc.data.comparisonEyebrow,
      heading: comparisonSection.title,
      body: getFirstParagraph(comparisonSection.content),
      highlights: doc.data.comparisonHighlights,
    },
    tiersSection: {
      eyebrow: doc.data.tiersEyebrow,
      heading: tiersSection.title,
      subtitle: getFirstParagraph(tiersSection.content),
    },
    allPlansInclude: {
      eyebrow: doc.data.allPlansEyebrow,
      heading: allPlansSection.title,
      subtitle: getFirstParagraph(allPlansSection.content),
      items: doc.data.allPlansItems,
      footnote: doc.data.allPlansFootnote,
    },
    ...(rawFaqSection && doc.data.faqItems
      ? {
          faqSection: {
            eyebrow: doc.data.faqEyebrow,
            heading: rawFaqSection.title,
            subtitle: getFirstParagraph(rawFaqSection.content),
            items: doc.data.faqItems,
          },
        }
      : {}),
    finalCta: doc.data.finalCta,
  });
}

export function getProgramsHubPageContent(): ProgramsHubPageContent {
  const doc = readMarkdownFile("programs/_hub.md", programsHubFrontmatterSchema);
  const page = parseMarkdownPage(doc.content);
  const programsSection = page.sections[0];

  return programsHubPageContentSchema.parse({
    seo: doc.data.seo,
    hero: {
      heading: page.heading,
      subtitle: getFirstParagraph(page.intro),
    },
    programsSection: {
      eyebrow: doc.data.sectionEyebrow,
      heading: programsSection?.title ?? "Programs",
      subtitle: getFirstParagraph(programsSection?.content ?? ""),
      cardLinkLabel: doc.data.cardLinkLabel,
    },
    finalCta: doc.data.finalCta,
    detailPage: doc.data.detailPage,
  });
}

export function getTestPrepHubPageContent(): TestPrepHubPageContent {
  const doc = readMarkdownFile("pages/test-prep/_hub.md", testPrepHubFrontmatterSchema);
  const page = parseMarkdownPage(doc.content);
  const section = page.sections[0];

  return testPrepHubPageContentSchema.parse({
    seo: doc.data.seo,
    hero: {
      heading: page.heading,
      subtitle: getFirstParagraph(page.intro),
    },
    testPrepSection: {
      eyebrow: doc.data.sectionEyebrow,
      heading: section?.title ?? "Test Prep",
      subtitle: getFirstParagraph(section?.content ?? ""),
      cardLinkLabel: doc.data.cardLinkLabel,
    },
    finalCta: doc.data.finalCta,
    detailPage: doc.data.detailPage,
  });
}

export function getAboutPageContent(): AboutPageContent {
  const heroDoc = readMarkdownFile("pages/about/hero.md", homeHeroFrontmatterSchema);
  const heroPage = parseMarkdownPage(heroDoc.content);
  const storyDoc = readMarkdownFile("pages/about/story.md", aboutStoryFrontmatterSchema);
  const storyPage = parseMarkdownPage(storyDoc.content);
  const valuesDoc = readMarkdownFile("pages/about/values.md", aboutValuesFrontmatterSchema);
  const valuesPage = parseMarkdownPage(valuesDoc.content);
  const teamDoc = readMarkdownFile("pages/about/team.md", aboutTeamFrontmatterSchema);
  const teamPage = parseMarkdownPage(teamDoc.content);

  return aboutPageContentSchema.parse({
    seo: heroDoc.data.seo,
    hero: {
      eyebrow: heroDoc.data.eyebrow,
      heading: heroPage.heading,
      subtitle: getFirstParagraph(heroPage.intro),
    },
    story: {
      eyebrow: storyDoc.data.eyebrow,
      heading: storyPage.heading,
      paragraphs: getParagraphs(storyPage.intro),
      missionTitle: storyDoc.data.missionTitle,
      missionText: storyDoc.data.missionText,
      valuesTitle: storyDoc.data.valuesTitle,
      values: storyDoc.data.values,
    },
    stats: readMarkdownFile("pages/about/stats.md", aboutStatsFrontmatterSchema).data
      .stats,
    differentiators: {
      eyebrow: valuesDoc.data.eyebrow,
      heading: valuesPage.heading,
      subtitle: getFirstParagraph(valuesPage.intro),
      items: valuesDoc.data.items,
    },
    teamSection: {
      eyebrow: teamDoc.data.eyebrow,
      heading: teamPage.heading,
      subtitle: getFirstParagraph(teamPage.intro),
    },
    finalCta: readCta("pages/about/cta.md"),
  });
}

export function getBookAssessmentPageContent(): BookAssessmentPageContent {
  const pageDoc = readMarkdownFile(
    "pages/book-assessment/_page.md",
    bookAssessmentPageFrontmatterSchema,
  );
  const page = parseMarkdownPage(pageDoc.content);
  const formSection = getSection(page.sections, "Tell us about your child.");
  const faqSection = getSection(page.sections, "Questions parents ask before booking.");
  const trustDoc = readMarkdownFile(
    "pages/book-assessment/trust.md",
    assessmentTrustFrontmatterSchema,
  );
  const trustPage = parseMarkdownPage(trustDoc.content);

  return bookAssessmentPageContentSchema.parse({
    seo: pageDoc.data.seo,
    hero: {
      eyebrow: pageDoc.data.heroEyebrow,
      heading: page.heading,
      subtitle: getFirstParagraph(page.intro),
    },
    heroImage: pageDoc.data.heroImage,
    formIntro: {
      eyebrow: pageDoc.data.formEyebrow,
      heading: formSection.title,
      subtitle: getFirstParagraph(formSection.content),
      reassurance: pageDoc.data.formReassurance,
      responsePromise: pageDoc.data.responsePromise,
    },
    stepsSection: pageDoc.data.stepsSection,
    trustSignals: trustDoc.data.trustSignals,
    testimonialIds: pageDoc.data.testimonialIds,
    faqSection: {
      eyebrow: pageDoc.data.faqEyebrow,
      heading: faqSection.title,
      subtitle: getFirstParagraph(faqSection.content),
      items: pageDoc.data.faqItems,
    },
    closing: {
      heading: trustPage.heading,
      body: getFirstParagraph(trustPage.intro),
      highlights: trustDoc.data.highlights,
    },
  });
}

export function getReviewsPageContent(): ReviewsPageContent {
  const doc = readMarkdownFile("pages/reviews/_page.md", reviewsPageFrontmatterSchema);
  const page = parseMarkdownPage(doc.content);
  const filtersSection = page.sections[0];

  return reviewsPageContentSchema.parse({
    seo: doc.data.seo,
    hero: {
      eyebrow: doc.data.eyebrow,
      heading: page.heading,
      subtitle: getFirstParagraph(page.intro),
    },
    stats: doc.data.stats,
    filters: {
      eyebrow: doc.data.filtersEyebrow,
      heading: filtersSection?.title ?? "Filters",
      subtitle: getFirstParagraph(filtersSection?.content ?? ""),
      groups: doc.data.filterGroups,
    },
    finalCta: doc.data.finalCta,
  });
}

export function getFaqPageContent(): FaqPageContent {
  const doc = readMarkdownFile("pages/faq/_page.md", faqPageFrontmatterSchema);
  const page = parseMarkdownPage(doc.content);
  const faqSection = page.sections[0];

  return faqPageContentSchema.parse({
    seo: doc.data.seo,
    hero: {
      eyebrow: doc.data.eyebrow,
      heading: page.heading,
      subtitle: getFirstParagraph(page.intro),
    },
    faqSection: {
      eyebrow: doc.data.faqEyebrow,
      heading: faqSection?.title ?? "FAQ",
      subtitle: getFirstParagraph(faqSection?.content ?? ""),
    },
    categories: doc.data.categories,
    finalCta: doc.data.finalCta,
  });
}

export function getWhyUsPageContent(): WhyUsPageContent {
  const doc = readMarkdownFile("pages/why-us/_page.md", whyUsPageFrontmatterSchema);
  const page = parseMarkdownPage(doc.content);

  return whyUsPageContentSchema.parse({
    seo: doc.data.seo,
    hero: {
      eyebrow: doc.data.eyebrow,
      heading: page.heading,
      subtitle: getFirstParagraph(page.intro),
    },
    intro: {
      eyebrow: doc.data.introEyebrow,
      heading: doc.data.introHeading,
      paragraphs: doc.data.introParagraphs,
    },
    comparison: {
      eyebrow: doc.data.comparisonEyebrow,
      heading: doc.data.comparisonHeading,
      subtitle: doc.data.comparisonSubtitle,
      columns: doc.data.comparisonColumns,
      rows: doc.data.comparisonRows,
    },
    reasons: {
      eyebrow: doc.data.reasonsEyebrow,
      heading: doc.data.reasonsHeading,
      subtitle: doc.data.reasonsSubtitle,
      items: doc.data.reasons,
    },
    valueProps: {
      eyebrow: doc.data.valuePropsEyebrow,
      heading: doc.data.valuePropsHeading,
      items: doc.data.valueProps,
    },
    finalCta: doc.data.finalCta,
  });
}

export function getSummerProgramsPageContent(): SummerProgramsPageContent {
  const doc = readMarkdownFile(
    "pages/summer-programs/_page.md",
    summerProgramsPageFrontmatterSchema,
  );
  const page = parseMarkdownPage(doc.content);

  return summerProgramsPageContentSchema.parse({
    seo: doc.data.seo,
    hero: {
      eyebrow: doc.data.eyebrow,
      heading: page.heading,
      subtitle: getFirstParagraph(page.intro),
    },
    intro: {
      eyebrow: doc.data.introEyebrow,
      heading: doc.data.introHeading,
      paragraphs: doc.data.introParagraphs,
    },
    packages: {
      eyebrow: doc.data.packagesEyebrow,
      heading: doc.data.packagesHeading,
      subtitle: doc.data.packagesSubtitle,
      items: doc.data.packages,
    },
    fields: {
      eyebrow: doc.data.fieldsEyebrow,
      heading: doc.data.fieldsHeading,
      subtitle: doc.data.fieldsSubtitle,
      items: doc.data.fields,
    },
    finalCta: doc.data.finalCta,
  });
}

export function getFreeTrialPageContent(): FreeTrialPageContent {
  const doc = readMarkdownFile(
    "pages/free-trial/_page.md",
    freeTrialPageFrontmatterSchema,
  );
  const page = parseMarkdownPage(doc.content);

  return freeTrialPageContentSchema.parse({
    seo: doc.data.seo,
    hero: {
      eyebrow: doc.data.eyebrow,
      heading: page.heading,
      subtitle: getFirstParagraph(page.intro),
    },
    intro: {
      eyebrow: doc.data.introEyebrow,
      heading: doc.data.introHeading,
      paragraphs: doc.data.introParagraphs,
    },
    booking: {
      eyebrow: doc.data.bookingEyebrow,
      heading: doc.data.bookingHeading,
      subtitle: doc.data.bookingSubtitle,
      calendlyUrl: doc.data.bookingCalendlyUrl,
      fallbackPhone: doc.data.bookingFallbackPhone,
    },
    tracks: {
      eyebrow: doc.data.tracksEyebrow,
      heading: doc.data.tracksHeading,
      subtitle: doc.data.tracksSubtitle,
      items: doc.data.tracks,
    },
    reassurance: {
      eyebrow: doc.data.reassuranceEyebrow,
      heading: doc.data.reassuranceHeading,
      items: doc.data.reassurances,
    },
    finalCta: doc.data.finalCta,
  });
}

export function getContactPageContent(): ContactPageContent {
  const doc = readMarkdownFile(
    "pages/contact-us/_page.md",
    contactPageFrontmatterSchema,
  );
  const page = parseMarkdownPage(doc.content);

  return contactPageContentSchema.parse({
    seo: doc.data.seo,
    hero: {
      eyebrow: doc.data.eyebrow,
      heading: page.heading,
      subtitle: getFirstParagraph(page.intro),
    },
    contactCard: {
      heading: doc.data.contactCardHeading,
      details: doc.data.contactDetails,
      hoursHeading: doc.data.hoursHeading,
      hours: doc.data.hours,
      mapEmbedUrl: doc.data.mapEmbedUrl,
    },
    cities: {
      eyebrow: doc.data.citiesEyebrow,
      heading: doc.data.citiesHeading,
      subtitle: doc.data.citiesSubtitle,
      items: doc.data.cities,
    },
    finalCta: doc.data.finalCta,
  });
}
