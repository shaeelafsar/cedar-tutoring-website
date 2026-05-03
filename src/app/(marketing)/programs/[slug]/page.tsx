import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, Check, Star } from "lucide-react";

import { CTASection } from "@/components/shared/CTASection";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import {
  getProgramBySlug,
  getAllProgramSlugs,
  getRelatedPrograms,
} from "@/content/programs/data";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProgramSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) return {};
  return {
    title: program.seo.title,
    description: program.seo.description,
  };
}

const STEPS = [
  {
    num: 1,
    title: "Free assessment",
    desc: "We learn where your child is, what feels hard, and what goals matter most.",
  },
  {
    num: 2,
    title: "Custom plan",
    desc: "We recommend the right program, schedule, and level of support based on real needs.",
  },
  {
    num: 3,
    title: "Targeted tutoring",
    desc: "Students get focused instruction, consistent encouragement, and practical strategies.",
  },
  {
    num: 4,
    title: "Progress reviews",
    desc: "Parents stay informed through updates, visible wins, and clear next steps.",
  },
];

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) notFound();

  const related = getRelatedPrograms(slug);

  return (
    <>
      <PageHero
        heading={program.hero.heading}
        subtitle={program.hero.subtitle}
        breadcrumbs={[
          { label: "Programs", href: "/programs" },
          { label: program.shortTitle },
        ]}
      />

      <section className="px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="The challenge"
            heading={program.problem.heading}
            align="left"
          />
          <div className="space-y-4">
            {program.problem.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-muted-foreground text-base leading-relaxed"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/50 px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Our approach"
            heading={program.approach.heading}
            align="left"
          />
          {program.approach.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-muted-foreground mb-6 text-base leading-relaxed"
            >
              {p}
            </p>
          ))}
          <ul className="space-y-3">
            {program.approach.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="text-secondary mt-0.5 h-5 w-5 shrink-0" />
                <span className="text-muted-foreground text-base">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="How it works"
            heading="A clear process from first visit to visible results."
          />
          <div className="relative grid gap-6 md:grid-cols-4 md:gap-8">
            <div className="from-primary/40 via-primary/40 to-primary/40 absolute top-8 right-8 left-8 hidden h-0.5 bg-gradient-to-r md:block" />
            {STEPS.map((step) => (
              <div key={step.num} className="relative text-center">
                <div className="bg-primary shadow-primary/20 relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold text-white shadow-lg">
                  {step.num}
                </div>
                <h3 className="text-foreground mb-2 text-base font-bold">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/50 px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="What to expect"
            heading={program.outcomes.heading}
            align="left"
          />
          <ul className="space-y-3">
            {program.outcomes.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="text-secondary mt-0.5 h-5 w-5 shrink-0" />
                <span className="text-muted-foreground text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {program.testimonials.length > 0 ? (
        <section className="bg-muted/50 px-4 py-16 md:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <SectionHeading
              eyebrow="What parents say"
              heading="Real feedback from Cedar families."
            />
            <div
              className={cn(
                "grid gap-6",
                program.testimonials.length > 1
                  ? "md:grid-cols-2"
                  : "mx-auto max-w-2xl"
              )}
            >
              {program.testimonials.map((t, i) => (
                <div
                  key={i}
                  className="border-border bg-card relative overflow-hidden rounded-xl border p-6 shadow-sm"
                >
                  <div className="from-primary via-accent absolute inset-x-0 top-0 h-1 bg-gradient-to-r to-[hsl(var(--brand-red))]" />
                  <div className="mb-3 flex items-center gap-1 pt-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="fill-accent text-accent h-4 w-4"
                      />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground mb-4 text-base leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-[hsl(var(--primary-text))]">
                      {t.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-foreground text-sm font-semibold">
                        {t.author}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {t.relation}
                      </p>
                    </div>
                    {t.badge ? (
                      <span className="ml-auto rounded-full bg-[hsl(var(--brand-red)/0.12)] px-2.5 py-0.5 text-xs font-medium text-[hsl(var(--brand-red))]">
                        {t.badge}
                      </span>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {program.faq.length > 0 ? (
        <section className="bg-muted/50 px-4 py-16 md:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              eyebrow="Common questions"
              heading={`Frequently asked questions about ${program.shortTitle.toLowerCase()}.`}
            />
            <FAQAccordion items={program.faq} defaultOpen={0} />
          </div>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="px-4 py-16 md:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <SectionHeading
              eyebrow="Related programs"
              heading="Other programs your child might benefit from."
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rp) => {
                const Icon = getIcon(rp.icon);
                return (
                  <Link
                    key={rp.slug}
                    href={`/programs/${rp.slug}`}
                    className="group border-border bg-card hover:border-primary/30 relative overflow-hidden rounded-xl border p-6 transition-all hover:shadow-md"
                  >
                    <div className="from-primary to-accent absolute inset-x-0 top-0 h-1 bg-gradient-to-r via-[hsl(var(--brand-red))]" />
                    <div className="from-primary to-accent absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="bg-primary/8 text-primary mb-3 flex h-10 w-10 items-center justify-center rounded-lg">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-foreground text-base font-bold">
                      {rp.shortTitle}
                    </h3>
                    <span className="text-muted-foreground mt-1 text-xs">
                      Grades {rp.grades}
                    </span>
                    <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
                      {rp.shortDescription}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[hsl(var(--primary-text))]">
                      Learn more
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <CTASection
        heading={program.cta.heading}
        subtext={program.cta.description}
        primaryCta={{ label: program.cta.buttonText, href: "/book-assessment" }}
        trustBullets={[
          "Free assessment before you commit",
          "Personalized support plan",
          "Progress updates families can follow",
          "Flexible scheduling options",
        ]}
      />
    </>
  );
}
