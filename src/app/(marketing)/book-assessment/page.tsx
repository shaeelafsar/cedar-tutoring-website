import type { Metadata } from "next";

import { getLocations, getTestimonialsByIds } from "@/lib/content/collections";
import { getBookAssessmentPageContent } from "@/lib/content/pages";
import { getAllPrograms } from "@/lib/content/programs";
import { getAllTestPrep } from "@/lib/content/testPrep";

import { BookAssessmentPageClient } from "./BookAssessmentPageClient";

const pageContent = getBookAssessmentPageContent();
const testimonials = getTestimonialsByIds(pageContent.testimonialIds);
const locations = getLocations();
const programOptions = [
  ...getAllPrograms().map((program) => ({
    id: program.slug,
    label: program.shortTitle,
  })),
  ...getAllTestPrep().map((program) => ({
    id: program.slug,
    label: program.title,
  })),
];

function buildPageMetadata(): Metadata {
  return {
    title: pageContent.seo.title,
    description: pageContent.seo.description,
    openGraph: {
      title: pageContent.seo.title,
      description: pageContent.seo.description,
    },
  };
}

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata();
}

export default function BookAssessmentPage() {
  return (
    <BookAssessmentPageClient
      pageContent={pageContent}
      locations={locations}
      programOptions={programOptions}
      testimonials={testimonials}
    />
  );
}
