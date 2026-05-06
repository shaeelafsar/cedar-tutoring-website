import type { Metadata } from "next";
import {
  CalendarCheck,
  Check,
  ClipboardCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { CTASection } from "@/components/shared/CTASection";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { getFreeTrialPageContent } from "@/lib/content/pages";
import { SITE_CONFIG } from "@/lib/constants";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

const freeTrialContent = getFreeTrialPageContent();

const iconMap: Record<string, LucideIcon> = {
  CalendarCheck,
  ClipboardCheck,
  Sparkles,
};

const freeTrialStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: `${SITE_CONFIG.name} Free Trial`,
  description: freeTrialContent.seo.description,
  url: absoluteUrl("/free-trial"),
  provider: {
    "@type": "EducationalOrganization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: absoluteUrl("/free-trial"),
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: freeTrialContent.seo.title,
    description: freeTrialContent.seo.description,
    path: "/free-trial",
  });
}

export default function FreeTrialPage() {
  return (
    <>
      <JsonLd data={freeTrialStructuredData} />
      <PageHero
        eyebrow={freeTrialContent.hero.eyebrow}
        heading={freeTrialContent.hero.heading}
        subtitle={freeTrialContent.hero.subtitle}
        breadcrumbs={[{ label: "Free Trial" }]}
      />

      <section className="px-4 py-16 md:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <SectionHeading
              eyebrow={freeTrialContent.intro.eyebrow}
              heading={freeTrialContent.intro.heading}
              align="left"
            />
            <div className="text-muted-foreground space-y-5 text-base leading-8 md:text-lg">
              {freeTrialContent.intro.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-muted/35 px-4 py-16 md:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow={freeTrialContent.tracks.eyebrow}
            heading={freeTrialContent.tracks.heading}
            subtitle={freeTrialContent.tracks.subtitle}
          />

          <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
            {freeTrialContent.tracks.items.map((track, index) => {
              const isHighlighted = Boolean(track.highlighted);
              return (
                <Reveal key={track.id} delay={index * 0.05} className="h-full">
                  <article
                    className={[
                      "bg-card relative flex h-full flex-col rounded-3xl border p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8",
                      isHighlighted
                        ? "border-accent/70 ring-accent/30 shadow-accent/10 ring-2"
                        : "border-border",
                    ].join(" ")}
                  >
                    {track.badge ? (
                      <span
                        className={[
                          "mb-5 inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold uppercase",
                          isHighlighted
                            ? "bg-[hsl(var(--brand-red))] text-white"
                            : "bg-primary/10 text-[hsl(var(--primary-text))]",
                        ].join(" ")}
                      >
                        {track.badge}
                      </span>
                    ) : null}

                    <h3 className="text-foreground text-2xl font-bold">
                      {track.name}
                    </h3>
                    <p className="text-muted-foreground mt-4 text-sm leading-7 sm:text-base">
                      {track.description}
                    </p>

                    <ul className="mt-6 space-y-3">
                      {track.features.map((feature) => (
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
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow={freeTrialContent.reassurance.eyebrow}
            heading={freeTrialContent.reassurance.heading}
          />

          <div className="grid gap-5 md:grid-cols-3">
            {freeTrialContent.reassurance.items.map((item, index) => {
              const Icon = iconMap[item.iconName] ?? Sparkles;
              return (
                <Reveal key={item.title} delay={index * 0.05} className="h-full">
                  <div className="border-border bg-card flex h-full flex-col rounded-2xl border p-5 shadow-sm sm:p-6">
                    <div className="bg-primary/10 text-primary inline-flex h-10 w-10 items-center justify-center rounded-2xl">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="text-foreground mt-4 text-base font-bold">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground mt-2 text-sm leading-7">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        heading={freeTrialContent.finalCta.heading}
        subtext={freeTrialContent.finalCta.subtext}
        primaryCta={freeTrialContent.finalCta.primaryCta}
        secondaryCta={freeTrialContent.finalCta.secondaryCta}
        trustBullets={freeTrialContent.finalCta.trustBullets}
      />
    </>
  );
}
