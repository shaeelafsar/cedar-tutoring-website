import type { Metadata } from "next";
import {
  Atom,
  BookOpen,
  Calculator,
  Check,
  Cpu,
  Hammer,
  type LucideIcon,
} from "lucide-react";

import { CTASection } from "@/components/shared/CTASection";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { getSummerProgramsPageContent } from "@/lib/content/pages";
import { SITE_CONFIG } from "@/lib/constants";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

const summerContent = getSummerProgramsPageContent();

const iconMap: Record<string, LucideIcon> = {
  Calculator,
  BookOpen,
  Hammer,
  Cpu,
  Atom,
};

const summerStructuredData = {
  "@context": "https://schema.org",
  "@type": "EducationEvent",
  name: "Cedar Tutoring Academy Summer Programs",
  description: summerContent.seo.description,
  url: absoluteUrl("/summer-programs"),
  organizer: {
    "@type": "EducationalOrganization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
  },
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: summerContent.seo.title,
    description: summerContent.seo.description,
    path: "/summer-programs",
  });
}

export default function SummerProgramsPage() {
  return (
    <>
      <JsonLd data={summerStructuredData} />
      <PageHero
        eyebrow={summerContent.hero.eyebrow}
        heading={summerContent.hero.heading}
        subtitle={summerContent.hero.subtitle}
        breadcrumbs={[{ label: "Summer Programs" }]}
      />

      <section className="px-4 py-16 md:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <SectionHeading
              eyebrow={summerContent.intro.eyebrow}
              heading={summerContent.intro.heading}
              align="left"
            />
            <div className="text-muted-foreground space-y-5 text-base leading-8 md:text-lg">
              {summerContent.intro.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-muted/35 px-4 py-16 md:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow={summerContent.packages.eyebrow}
            heading={summerContent.packages.heading}
            subtitle={summerContent.packages.subtitle}
          />

          <div className="grid gap-6 md:grid-cols-2 lg:items-stretch">
            {summerContent.packages.items.map((pkg, index) => {
              const isHighlighted = Boolean(pkg.highlighted);
              return (
                <Reveal key={pkg.id} delay={index * 0.05} className="h-full">
                  <article
                    className={[
                      "bg-card relative flex h-full flex-col rounded-3xl border p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8",
                      isHighlighted
                        ? "border-accent/70 ring-accent/30 shadow-accent/10 ring-2"
                        : "border-border",
                    ].join(" ")}
                  >
                    {pkg.badge ? (
                      <span
                        className={[
                          "mb-5 inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold uppercase",
                          isHighlighted
                            ? "bg-[hsl(var(--brand-red))] text-white"
                            : "bg-primary/10 text-[hsl(var(--primary-text))]",
                        ].join(" ")}
                      >
                        {pkg.badge}
                      </span>
                    ) : null}

                    <h3 className="text-foreground text-2xl font-bold">
                      {pkg.name}
                    </h3>
                    <p className="text-muted-foreground mt-4 text-sm leading-7 sm:text-base">
                      {pkg.description}
                    </p>

                    <ul className="mt-6 space-y-3">
                      {pkg.features.map((feature) => (
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
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow={summerContent.fields.eyebrow}
            heading={summerContent.fields.heading}
            subtitle={summerContent.fields.subtitle}
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {summerContent.fields.items.map((field, index) => {
              const Icon = iconMap[field.iconName] ?? BookOpen;
              return (
                <Reveal key={field.title} delay={index * 0.04} className="h-full">
                  <article className="border-border bg-card flex h-full flex-col rounded-3xl border p-6 shadow-sm sm:p-7">
                    <div className="bg-primary/10 text-primary inline-flex h-11 w-11 items-center justify-center rounded-2xl">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="text-foreground mt-4 text-lg font-bold">
                      {field.title}
                    </h3>
                    <p className="text-muted-foreground mt-2 text-sm leading-7">
                      {field.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        heading={summerContent.finalCta.heading}
        subtext={summerContent.finalCta.subtext}
        primaryCta={summerContent.finalCta.primaryCta}
        secondaryCta={summerContent.finalCta.secondaryCta}
        trustBullets={summerContent.finalCta.trustBullets}
      />
    </>
  );
}
