import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { CTASection } from "@/components/shared/CTASection";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PROGRAMS } from "@/content/programs/data";
import { getIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Academic Programs | Cedar Tutoring Academy",
  description:
    "Explore Cedar's K-12 tutoring programs: Math, Reading, Writing, Science, Arabic, and Homework Help. Small groups, real teachers, measurable progress in Plano, TX.",
};

export default function ProgramsHubPage() {
  return (
    <>
      <PageHero
        heading="Academic programs built around your child's real needs."
        subtitle="Every student learns differently. Cedar offers focused, small-group tutoring across core subjects — each built to meet students where they are and move them forward with confidence."
        breadcrumbs={[{ label: "Programs" }]}
      />

      <section className="px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Our programs"
            heading="Focused support across every core subject."
            subtitle="Each program is designed to close real skill gaps — not just cover curriculum. Students get personalized instruction in small groups of three or fewer, with assessment-led planning and progress parents can actually see."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROGRAMS.map((program) => {
              const Icon = getIcon(program.icon);
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
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        heading="Not sure which program is right?"
        subtext="Start with a free assessment. We'll learn where your child stands and recommend the right program, schedule, and level of support."
        primaryCta={{
          label: "Book a Free Assessment",
          href: "/book-assessment",
        }}
        trustBullets={[
          "Personalized recommendation",
          "No-pressure conversation",
          "Built for K–12 learning goals",
          "Flexible scheduling support",
        ]}
      />
    </>
  );
}
