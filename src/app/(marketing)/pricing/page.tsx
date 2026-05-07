import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { CTASection } from "@/components/shared/CTASection";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { getPricingTiers } from "@/lib/content/collections";
import { getPricingPageContent } from "@/lib/content/pages";
import { SITE_CONFIG } from "@/lib/constants";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";
import { PricingCardInteractive } from "./PricingCardInteractive";

const pricingPageContent = getPricingPageContent();
const pricingTiers = getPricingTiers();

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: `${SITE_CONFIG.name} Tutoring Services`,
  serviceType: "K-12 tutoring and homework help",
  provider: {
    "@type": "EducationalOrganization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
  },
  areaServed: "Worth, IL and the South Suburbs of Chicago",
  offers: pricingTiers.map((tier) => ({
    "@type": "Offer",
    name: tier.name,
    description: tier.description,
    price: tier.subTiers
      ? tier.subTiers[tier.defaultSubTierIndex ?? 0].price.replace(/[^\d.]/g, "")
      : tier.priceLabel.replace(/[^\d.]/g, ""),
    priceCurrency: "USD",
    url: absoluteUrl("/pricing"),
  })),
};

export const metadata: Metadata = buildPageMetadata({
  title: "Plans & Pricing | Cedar Tutoring Academy",
  description:
    "Choose the plan that fits your family. All plans include certified tutors, in-person sessions at our Worth, IL location, and a free initial assessment.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <JsonLd data={structuredData} />

      <PageHero
        eyebrow={pricingPageContent.hero.eyebrow}
        heading={pricingPageContent.hero.heading}
        subtitle={pricingPageContent.hero.subtitle}
        breadcrumbs={[{ label: "Pricing" }]}
      />

      {/* Intro */}
      <section className="px-4 py-12 md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-muted-foreground text-lg leading-8">
            Choose the plan that fits your family. All plans include certified
            tutors, in-person sessions at our Worth, IL location, and a free
            initial assessment.
          </p>
        </div>
      </section>

      {/* Pricing cards — 3 side-by-side on desktop, stacked on mobile */}
      <section className="bg-muted/35 px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3 md:items-stretch">
            {pricingTiers.map((tier, index) => {
              const isHighlighted = Boolean(tier.highlighted);

              if (tier.subTiers && tier.subTiers.length > 0) {
                return (
                  <Reveal key={tier.id} delay={index * 0.05} className="h-full">
                    <PricingCardInteractive
                      name={tier.name}
                      cadence={tier.cadence}
                      description={tier.description}
                      features={tier.features}
                      badge={tier.badge}
                      highlighted={isHighlighted}
                      subTiers={tier.subTiers}
                      defaultSubTierIndex={tier.defaultSubTierIndex ?? 0}
                    />
                  </Reveal>
                );
              }

              // Static card (no sub-tiers — As-Needed Tutoring)
              return (
                <Reveal key={tier.id} delay={index * 0.05} className="h-full">
                  <article
                    className={[
                      "bg-card relative flex h-full flex-col rounded-3xl border p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8",
                      isHighlighted
                        ? "border-accent/70 ring-accent/30 shadow-accent/10 ring-2"
                        : "border-border",
                    ].join(" ")}
                  >
                    {tier.badge ? (
                      <span
                        className={[
                          "mb-5 inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold uppercase",
                          isHighlighted
                            ? "bg-[hsl(var(--brand-red))] text-white"
                            : "bg-primary/10 text-[hsl(var(--primary-text))]",
                        ].join(" ")}
                      >
                        {tier.badge}
                      </span>
                    ) : null}

                    <div>
                      <h2 className="text-foreground text-2xl font-bold">
                        {tier.name}
                      </h2>
                      <div className="mt-4 flex items-baseline gap-2">
                        <span className="text-foreground text-4xl font-bold tracking-tight">
                          {tier.priceLabel}
                        </span>
                        <span className="text-muted-foreground text-sm font-medium">
                          {tier.cadence}
                        </span>
                      </div>
                      <p className="text-muted-foreground mt-4 text-sm leading-7 sm:text-base">
                        {tier.description}
                      </p>
                    </div>

                    <ul className="mt-6 space-y-3">
                      {tier.features.map((feature) => (
                        <li
                          key={feature}
                          className="text-muted-foreground flex items-start gap-3 text-sm leading-6"
                        >
                          <Check
                            className={[
                              "mt-1 size-4 shrink-0",
                              isHighlighted
                                ? "text-[hsl(var(--brand-red))]"
                                : "text-primary",
                            ].join(" ")}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-8">
                      <Link
                        href="/book-assessment/"
                        className={[
                          "inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition-all",
                          isHighlighted
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : "border-border bg-background text-foreground hover:border-primary/25 border hover:text-[hsl(var(--primary-text))]",
                        ].join(" ")}
                      >
                        Book a Free Assessment
                        <ArrowRight className="size-4" />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        heading={pricingPageContent.finalCta.heading}
        subtext={pricingPageContent.finalCta.subtext}
        primaryCta={pricingPageContent.finalCta.primaryCta}
        secondaryCta={pricingPageContent.finalCta.secondaryCta}
        trustBullets={pricingPageContent.finalCta.trustBullets}
      />
    </>
  );
}
