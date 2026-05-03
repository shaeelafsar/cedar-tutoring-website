import type { Metadata } from "next";
import { ArrowRight, Check, CircleDollarSign } from "lucide-react";

import { CTASection } from "@/components/shared/CTASection";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { getPricingTiers } from "@/lib/content/collections";
import { getPricingPageContent } from "@/lib/content/pages";
import { SITE_CONFIG } from "@/lib/constants";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

const pricingPageContent = getPricingPageContent();
const pricingTiers = getPricingTiers();

const pricingPageStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: `${SITE_CONFIG.name} Tutoring Services`,
  serviceType: "K-12 tutoring and test prep",
  provider: {
    "@type": "EducationalOrganization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
  },
  areaServed: "Dallas-Fort Worth, Texas",
  offers: pricingTiers.map((tier) => ({
    "@type": "Offer",
    name: tier.name,
    description: tier.description,
    price: tier.priceLabel.replace(/[^\d.]/g, ""),
    priceCurrency: "USD",
    url: absoluteUrl("/pricing"),
  })),
};

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: pricingPageContent.seo.title,
    description: pricingPageContent.seo.description,
    path: "/pricing",
  });
}

export default function PricingPage() {
  return (
    <>
      <JsonLd data={pricingPageStructuredData} />
      <PageHero
        eyebrow={pricingPageContent.hero.eyebrow}
        heading={pricingPageContent.hero.heading}
        subtitle={pricingPageContent.hero.subtitle}
        breadcrumbs={[{ label: "Pricing" }]}
      />

      <section className="px-4 py-16 md:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <Reveal>
            <div>
              <SectionHeading
                eyebrow={pricingPageContent.intro.eyebrow}
                heading={pricingPageContent.intro.heading}
                subtitle={pricingPageContent.intro.subtitle}
                align="left"
                className="mb-6"
              />
              <div className="text-muted-foreground space-y-5 text-base leading-8 md:text-lg">
                {pricingPageContent.intro.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <aside className="border-border bg-foreground rounded-3xl border p-6 text-white shadow-sm sm:p-8">
              <div className="flex items-start gap-4">
                <div className="text-accent flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                  <CircleDollarSign className="size-6" />
                </div>
                <div>
                  <p className="text-sm font-bold tracking-[0.14em] text-white/75 uppercase">
                    {pricingPageContent.comparisonNote.eyebrow}
                  </p>
                  <h2 className="mt-3 text-2xl font-bold text-white">
                    {pricingPageContent.comparisonNote.heading}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-white/75 sm:text-base">
                    {pricingPageContent.comparisonNote.body}
                  </p>
                </div>
              </div>

              <ul className="mt-6 space-y-3 rounded-2xl bg-white/6 p-4 sm:p-5">
                {pricingPageContent.comparisonNote.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-6 text-white/85"
                  >
                    <Check className="text-accent mt-1 size-4 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="bg-muted/35 px-4 py-16 md:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={pricingPageContent.tiersSection.eyebrow}
            heading={pricingPageContent.tiersSection.heading}
            subtitle={pricingPageContent.tiersSection.subtitle}
          />

          <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
            {pricingTiers.map((tier, index) => {
              const isHighlighted = Boolean(tier.highlighted);

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

                    <div className="mt-8 pt-2">
                      <a
                        href="/book-assessment"
                        className={[
                          "inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition-all",
                          isHighlighted
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : "border-border bg-background text-foreground hover:border-primary/25 border hover:text-[hsl(var(--primary-text))]",
                        ].join(" ")}
                      >
                        Book assessment
                        <ArrowRight className="size-4" />
                      </a>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-6 lg:px-8 lg:py-20">
        <div className="border-border bg-card mx-auto max-w-6xl rounded-[2rem] border p-6 shadow-sm sm:p-8 lg:p-10">
          <SectionHeading
            eyebrow={pricingPageContent.allPlansInclude.eyebrow}
            heading={pricingPageContent.allPlansInclude.heading}
            subtitle={pricingPageContent.allPlansInclude.subtitle}
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {pricingPageContent.allPlansInclude.items.map((item, index) => (
              <Reveal key={item} delay={index * 0.03}>
                <div className="bg-muted/50 flex h-full items-start gap-3 rounded-2xl p-4">
                  <div className="bg-primary/10 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
                    <Check className="size-4" />
                  </div>
                  <p className="text-muted-foreground text-sm leading-6 sm:text-base">
                    {item}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="text-muted-foreground mt-6 text-sm leading-6">
            {pricingPageContent.allPlansInclude.footnote}
          </p>
        </div>
      </section>

      <section className="bg-muted/35 px-4 py-16 md:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow={pricingPageContent.faqSection.eyebrow}
            heading={pricingPageContent.faqSection.heading}
            subtitle={pricingPageContent.faqSection.subtitle}
          />
          <FAQAccordion
            items={pricingPageContent.faqSection.items}
            defaultOpen={0}
          />
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
