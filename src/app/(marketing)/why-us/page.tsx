import type { Metadata } from "next";
import {
  BadgeDollarSign,
  Check,
  GraduationCap,
  Star,
  Trophy,
  type LucideIcon,
} from "lucide-react";

import { CTASection } from "@/components/shared/CTASection";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { getWhyUsPageContent } from "@/lib/content/pages";
import { SITE_CONFIG } from "@/lib/constants";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

const whyUsContent = getWhyUsPageContent();

const iconMap: Record<string, LucideIcon> = {
  Trophy,
  BadgeDollarSign,
  GraduationCap,
};

const whyUsStructuredData = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: whyUsContent.seo.title,
  description: whyUsContent.seo.description,
  url: absoluteUrl("/why-us"),
  publisher: {
    "@type": "EducationalOrganization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: whyUsContent.seo.title,
    description: whyUsContent.seo.description,
    path: "/why-us",
  });
}

export default function WhyUsPage() {
  return (
    <>
      <JsonLd data={whyUsStructuredData} />
      <PageHero
        eyebrow={whyUsContent.hero.eyebrow}
        heading={whyUsContent.hero.heading}
        subtitle={whyUsContent.hero.subtitle}
        breadcrumbs={[{ label: "Why Us" }]}
      />

      <section className="px-4 py-16 md:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <SectionHeading
              eyebrow={whyUsContent.intro.eyebrow}
              heading={whyUsContent.intro.heading}
              align="left"
            />
            <div className="text-muted-foreground space-y-5 text-base leading-8 md:text-lg">
              {whyUsContent.intro.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-muted/35 px-4 py-16 md:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow={whyUsContent.comparison.eyebrow}
            heading={whyUsContent.comparison.heading}
            subtitle={whyUsContent.comparison.subtitle}
          />

          <Reveal>
            <div className="border-border bg-card overflow-hidden rounded-3xl border shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="bg-muted/60">
                      <th className="text-foreground px-4 py-4 text-xs font-bold uppercase tracking-[0.12em]">
                        Provider
                      </th>
                      {whyUsContent.comparison.columns.map((column) => (
                        <th
                          key={column}
                          className="text-foreground px-4 py-4 text-xs font-bold uppercase tracking-[0.12em]"
                        >
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {whyUsContent.comparison.rows.map((row) => (
                      <tr
                        key={row.name}
                        className={[
                          "border-border border-t",
                          row.highlighted
                            ? "bg-primary/5"
                            : "",
                        ].join(" ")}
                      >
                        <th
                          scope="row"
                          className={[
                            "px-4 py-4 align-top text-sm font-semibold",
                            row.highlighted
                              ? "text-[hsl(var(--primary-text))]"
                              : "text-foreground",
                          ].join(" ")}
                        >
                          {row.name}
                          {row.highlighted ? (
                            <span className="bg-accent/15 text-accent-foreground ml-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em]">
                              <Star className="size-3" />
                              Cedar
                            </span>
                          ) : null}
                        </th>
                        {row.values.map((value, idx) => (
                          <td
                            key={`${row.name}-${idx}`}
                            className="text-muted-foreground px-4 py-4 align-top text-sm"
                          >
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-16 md:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow={whyUsContent.reasons.eyebrow}
            heading={whyUsContent.reasons.heading}
            subtitle={whyUsContent.reasons.subtitle}
          />

          {/* Reasons grouped into 3 themes for easier scanning (Hick's Law) */}
          {[
            { theme: "Personalized Learning", indices: [0, 1, 2] },
            { theme: "Real Results", indices: [3, 4, 5] },
            { theme: "No-Strings Affordability", indices: [6, 7, 8, 9] },
          ].map(({ theme, indices }) => (
            <div key={theme} className="mb-10 last:mb-0">
              <Reveal>
                <h3 className="text-foreground mb-4 text-base font-bold tracking-wide text-[hsl(var(--primary-text))]">
                  {theme}
                </h3>
              </Reveal>
              <ol className="grid gap-3 md:grid-cols-2">
                {indices.map((idx) => {
                  const reason = whyUsContent.reasons.items[idx];
                  if (!reason) return null;
                  return (
                    <Reveal key={reason} delay={idx * 0.03}>
                      <li className="border-border bg-card flex items-start gap-3 rounded-2xl border p-4 shadow-sm">
                        <span className="bg-primary/10 text-primary inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                          {idx + 1}
                        </span>
                        <span className="text-foreground text-sm leading-7 sm:text-base">
                          {reason}
                        </span>
                      </li>
                    </Reveal>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted/35 px-4 py-16 md:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow={whyUsContent.valueProps.eyebrow}
            heading={whyUsContent.valueProps.heading}
          />

          <div className="grid gap-6 md:grid-cols-3">
            {whyUsContent.valueProps.items.map((item, index) => {
              const Icon = iconMap[item.iconName] ?? Trophy;
              return (
                <Reveal key={item.title} delay={index * 0.05} className="h-full">
                  <article className="border-border bg-card flex h-full flex-col rounded-3xl border p-6 shadow-sm sm:p-8">
                    <div className="bg-primary/10 text-primary inline-flex h-12 w-12 items-center justify-center rounded-2xl">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="text-foreground mt-5 text-xl font-bold">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground mt-3 text-sm leading-7 sm:text-base">
                      {item.description}
                    </p>
                    {item.bullets?.length ? (
                      <ul className="mt-5 space-y-2.5">
                        {item.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="text-muted-foreground flex items-start gap-2.5 text-sm leading-6"
                          >
                            <Check className="text-primary mt-1 size-4 shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        heading={whyUsContent.finalCta.heading}
        subtext={whyUsContent.finalCta.subtext}
        primaryCta={whyUsContent.finalCta.primaryCta}
        secondaryCta={whyUsContent.finalCta.secondaryCta}
        trustBullets={whyUsContent.finalCta.trustBullets}
      />
    </>
  );
}
