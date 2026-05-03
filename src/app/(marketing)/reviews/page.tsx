import type { Metadata } from "next";

import { CTASection } from "@/components/shared/CTASection";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { getTestimonials } from "@/lib/content/collections";
import { getReviewsPageContent } from "@/lib/content/pages";
import { getAllPrograms } from "@/lib/content/programs";
import { getAllTestPrep } from "@/lib/content/testPrep";

import { ReviewsGrid } from "./ReviewsGrid";

const reviewsPageContent = getReviewsPageContent();
const testimonials = getTestimonials();
const programTagMap = Object.fromEntries([
  ...getAllPrograms().map((program) => [
    program.slug,
    { label: program.shortTitle, href: `/programs/${program.slug}` },
  ]),
  ...getAllTestPrep().map((program) => [
    program.slug,
    { label: program.shortTitle, href: `/test-prep/${program.slug}` },
  ]),
]);

function buildPageMetadata(): Metadata {
  return {
    title: reviewsPageContent.seo.title,
    description: reviewsPageContent.seo.description,
    openGraph: {
      title: reviewsPageContent.seo.title,
      description: reviewsPageContent.seo.description,
    },
  };
}

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata();
}

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow={reviewsPageContent.hero.eyebrow}
        heading={reviewsPageContent.hero.heading}
        subtitle={reviewsPageContent.hero.subtitle}
        breadcrumbs={[{ label: "Reviews" }]}
      />

      <section className="bg-foreground px-4 py-10 text-white md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {reviewsPageContent.stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.04}>
              <div className="rounded-2xl border border-white/10 bg-white/6 px-5 py-5 backdrop-blur-sm">
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="mt-2 text-sm font-semibold text-white/90">{stat.label}</p>
                {stat.detail ? (
                  <p className="mt-1 text-sm leading-6 text-white/65">{stat.detail}</p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-muted/35 px-4 py-16 md:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <ReviewsGrid
            filters={reviewsPageContent.filters}
            testimonials={testimonials}
            programTagMap={programTagMap}
          />
        </div>
      </section>

      <CTASection
        heading={reviewsPageContent.finalCta.heading}
        subtext={reviewsPageContent.finalCta.subtext}
        primaryCta={reviewsPageContent.finalCta.primaryCta}
        secondaryCta={reviewsPageContent.finalCta.secondaryCta}
        trustBullets={reviewsPageContent.finalCta.trustBullets}
      />
    </>
  );
}
