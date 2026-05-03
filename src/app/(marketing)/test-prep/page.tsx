import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { CTASection } from "@/components/shared/CTASection";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { getTestPrepHubPageContent } from "@/lib/content/pages";
import { getAllTestPrep } from "@/lib/content/testPrep";
import { getIcon } from "@/lib/icons";

const testPrepPrograms = getAllTestPrep();
const testPrepHubContent = getTestPrepHubPageContent();

export const metadata: Metadata = {
  title: testPrepHubContent.seo.title,
  description: testPrepHubContent.seo.description,
};

export default function TestPrepHubPage() {
  return (
    <>
      <PageHero
        heading={testPrepHubContent.hero.heading}
        subtitle={testPrepHubContent.hero.subtitle}
        breadcrumbs={[{ label: "Test Prep" }]}
      />

      <section className="px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow={testPrepHubContent.testPrepSection.eyebrow}
            heading={testPrepHubContent.testPrepSection.heading}
            subtitle={testPrepHubContent.testPrepSection.subtitle}
          />

          <div className="grid gap-6 md:grid-cols-3">
            {testPrepPrograms.map((program) => {
              const Icon = getIcon(program.iconName);
              return (
                <Link
                  key={program.slug}
                  href={`/test-prep/${program.slug}`}
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
                    {testPrepHubContent.testPrepSection.cardLinkLabel}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        heading={testPrepHubContent.finalCta.heading}
        subtext={testPrepHubContent.finalCta.subtext}
        primaryCta={testPrepHubContent.finalCta.primaryCta}
        secondaryCta={testPrepHubContent.finalCta.secondaryCta}
        trustBullets={testPrepHubContent.finalCta.trustBullets}
      />
    </>
  );
}
