import type { Metadata } from "next";

import { getTestimonialsByIds } from "@/lib/content/collections";
import { getBookAssessmentPageContent, getFreeTrialPageContent } from "@/lib/content/pages";
import { SITE_CONFIG } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo";

import { BookAssessmentCalendlyClient } from "./BookAssessmentCalendlyClient";

const pageContent = getBookAssessmentPageContent();
const testimonials = getTestimonialsByIds(pageContent.testimonialIds);

// Calendly URL lives in the free-trial content until Wave 3 consolidates it.
const calendlyUrl = getFreeTrialPageContent().booking.calendlyUrl;

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: pageContent.seo.title,
    description: pageContent.seo.description,
    path: "/book-assessment",
  });
}

export default function BookAssessmentPage() {
  return (
    <BookAssessmentCalendlyClient
      pageContent={pageContent}
      siteConfig={SITE_CONFIG}
      testimonials={testimonials}
      calendlyUrl={calendlyUrl}
    />
  );
}
