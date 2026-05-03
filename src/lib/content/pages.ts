import aboutPageJson from "@content/pages/about.json";
import bookAssessmentPageJson from "@content/pages/book-assessment.json";
import faqPageJson from "@content/pages/faq.json";
import homePageJson from "@content/pages/home.json";
import locationsPageJson from "@content/pages/locations.json";
import pricingPageJson from "@content/pages/pricing.json";
import programsHubPageJson from "@content/pages/programs-hub.json";
import reviewsPageJson from "@content/pages/reviews.json";
import testPrepHubPageJson from "@content/pages/test-prep-hub.json";

import type {
  AboutPageContent,
  BookAssessmentPageContent,
  FaqPageContent,
  HomePageContent,
  LocationsPageContent,
  PricingPageContent,
  ProgramsHubPageContent,
  ReviewsPageContent,
  TestPrepHubPageContent,
} from "@/types/content";

import {
  aboutPageContentSchema,
  bookAssessmentPageContentSchema,
  faqPageContentSchema,
  homePageContentSchema,
  locationsPageContentSchema,
  pricingPageContentSchema,
  programsHubPageContentSchema,
  reviewsPageContentSchema,
  testPrepHubPageContentSchema,
} from "./schemas";

export function getHomePageContent(): HomePageContent {
  return homePageContentSchema.parse(homePageJson);
}

export function getLocationsPageContent(): LocationsPageContent {
  return locationsPageContentSchema.parse(locationsPageJson);
}

export function getPricingPageContent(): PricingPageContent {
  return pricingPageContentSchema.parse(pricingPageJson);
}

export function getProgramsHubPageContent(): ProgramsHubPageContent {
  return programsHubPageContentSchema.parse(programsHubPageJson);
}

export function getTestPrepHubPageContent(): TestPrepHubPageContent {
  return testPrepHubPageContentSchema.parse(testPrepHubPageJson);
}

export function getAboutPageContent(): AboutPageContent {
  return aboutPageContentSchema.parse(aboutPageJson);
}

export function getBookAssessmentPageContent(): BookAssessmentPageContent {
  return bookAssessmentPageContentSchema.parse(bookAssessmentPageJson);
}

export function getReviewsPageContent(): ReviewsPageContent {
  return reviewsPageContentSchema.parse(reviewsPageJson);
}

export function getFaqPageContent(): FaqPageContent {
  return faqPageContentSchema.parse(faqPageJson);
}
