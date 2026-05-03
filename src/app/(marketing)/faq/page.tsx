import type { Metadata } from "next";

import { CTASection } from "@/components/shared/CTASection";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { getFaqItems } from "@/lib/content/collections";
import { getFaqPageContent } from "@/lib/content/pages";
import { buildPageMetadata } from "@/lib/seo";

import { FaqExplorer } from "./FaqExplorer";

const faqPageContent = getFaqPageContent();
const faqItems = getFaqItems();

const faqPageStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer.replace(/\n+/g, " "),
    },
  })),
};

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: faqPageContent.seo.title,
    description: faqPageContent.seo.description,
    path: "/faq",
  });
}

export default function FAQPage() {
  return (
    <>
      <JsonLd data={faqPageStructuredData} />
      <PageHero
        eyebrow={faqPageContent.hero.eyebrow}
        heading={faqPageContent.hero.heading}
        subtitle={faqPageContent.hero.subtitle}
        breadcrumbs={[{ label: "FAQ" }]}
      />

      <section className="px-4 py-16 md:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow={faqPageContent.faqSection.eyebrow}
            heading={faqPageContent.faqSection.heading}
            subtitle={faqPageContent.faqSection.subtitle}
          />
          <FaqExplorer
            categories={faqPageContent.categories}
            items={faqItems}
          />
        </div>
      </section>

      <CTASection
        heading={faqPageContent.finalCta.heading}
        subtext={faqPageContent.finalCta.subtext}
        primaryCta={faqPageContent.finalCta.primaryCta}
        secondaryCta={faqPageContent.finalCta.secondaryCta}
        trustBullets={faqPageContent.finalCta.trustBullets}
      />
    </>
  );
}
