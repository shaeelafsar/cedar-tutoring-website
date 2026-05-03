import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PROGRAMS } from "@/content/programs/data";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Academic Programs | Cedar Tutoring Academy",
  description:
    "Explore Cedar's K-12 tutoring programs: Math, Reading, Writing, Science, Arabic, and Homework Help. Small groups, real teachers, measurable progress in Plano, TX.",
};

export default function ProgramsHubPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        heading="Academic programs built around your child's real needs."
        subtitle="Every student learns differently. Cedar offers focused, small-group tutoring across core subjects — each built to meet students where they are and move them forward with confidence."
        breadcrumbs={[{ label: "Programs" }]}
      />

      {/* Programs Grid */}
      <section className="px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Our programs"
            heading="Focused support across every core subject."
            subtitle="Each program is designed to close real skill gaps — not just cover curriculum. Students get personalized instruction in groups of three or fewer."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROGRAMS.map((program) => {
              const Icon = getIcon(program.icon);
              return (
                <Link
                  key={program.slug}
                  href={`/programs/${program.slug}`}
                  className="group relative flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
                >
                  {/* Hover gradient bar */}
                  <div className="absolute inset-x-0 bottom-0 h-1 rounded-b-xl bg-gradient-to-r from-primary to-secondary opacity-0 transition-opacity group-hover:opacity-100" />

                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/8 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-lg font-bold text-foreground">
                    {program.shortTitle}
                  </h3>

                  <span className="mt-1 mb-2 inline-block w-fit rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    Grades {program.grades}
                  </span>

                  <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {program.shortDescription}
                  </p>

                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all group-hover:gap-2">
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How Cedar Is Different */}
      <section className="bg-muted/50 px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="Why Cedar"
            heading="What makes Cedar different from other tutoring centers."
          />

          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "Small groups, not classrooms",
                desc: "Our 1:3 student-to-tutor ratio means every student gets personal attention, real-time feedback, and instruction adjusted to their pace.",
              },
              {
                title: "Assessment-led planning",
                desc: "We start by understanding where your child actually is — not where their grade says they should be. Every plan is custom-built from day one.",
              },
              {
                title: "Progress parents can see",
                desc: "Regular updates, clear milestones, and honest communication so you always know what's working and what comes next.",
              },
              {
                title: "Flexible scheduling + transportation",
                desc: "After-school and weekend sessions, plus transportation support within our service area — because logistics shouldn't stop learning.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-6"
              >
                <h3 className="mb-2 text-base font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            Not sure which program is right?
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Start with a free assessment. We&apos;ll learn where your child
            stands and recommend the right program, schedule, and level of
            support.
          </p>
          <Link
            href="/book-assessment"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-6 gap-2 bg-primary text-primary-foreground hover:bg-primary/90",
            )}
          >
            Book a Free Assessment
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
