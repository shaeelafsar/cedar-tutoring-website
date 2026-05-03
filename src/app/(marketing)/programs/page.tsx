import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { CTASection } from "@/components/shared/CTASection";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { getProgramsHubPageContent } from "@/lib/content/pages";
import { getAllPrograms } from "@/lib/content/programs";
import { getIcon } from "@/lib/icons";
import { buildPageMetadata } from "@/lib/seo";

const programs = getAllPrograms();
const programsHubContent = getProgramsHubPageContent();

export const metadata: Metadata = buildPageMetadata({
  title: programsHubContent.seo.title,
  description: programsHubContent.seo.description,
  path: "/programs",
});

export default function ProgramsHubPage() {
  return (
    <>
      <PageHero
        heading={programsHubContent.hero.heading}
        subtitle={programsHubContent.hero.subtitle}
        breadcrumbs={[{ label: "Programs" }]}
      />

      <section className="px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow={programsHubContent.programsSection.eyebrow}
            heading={programsHubContent.programsSection.heading}
            subtitle={programsHubContent.programsSection.subtitle}
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => {
              const Icon = getIcon(program.iconName);
              return (
                <Link
                  key={program.slug}
                  href={`/programs/${program.slug}`}
                  className="group border-border bg-card hover:border-primary/30 relative overflow-hidden rounded-xl border p-6 transition-all hover:shadow-md"
                >
                  <div className="from-primary to-accent absolute inset-x-0 top-0 h-1 bg-gradient-to-r via-[hsl(var(--brand-red))]" />
                  <div className="from-primary to-accent absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-0 transition-opacity group-hover:opacity-100" />

                  <div className="bg-primary/8 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-foreground text-lg font-bold">
                    {program.shortTitle}
                  </h3>

                  <span className="bg-muted text-muted-foreground mt-1 mb-2 inline-block w-fit rounded-full px-2.5 py-0.5 text-xs font-medium">
                    Grades {program.grades}
                  </span>

                  <p className="text-muted-foreground mb-4 flex-1 text-sm leading-relaxed">
                    {program.shortDescription}
                  </p>

                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-[hsl(var(--primary-text))] transition-all group-hover:gap-2">
                    {programsHubContent.programsSection.cardLinkLabel}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        heading={programsHubContent.finalCta.heading}
        subtext={programsHubContent.finalCta.subtext}
        primaryCta={programsHubContent.finalCta.primaryCta}
        secondaryCta={programsHubContent.finalCta.secondaryCta}
        trustBullets={programsHubContent.finalCta.trustBullets}
      />
    </>
  );
}
