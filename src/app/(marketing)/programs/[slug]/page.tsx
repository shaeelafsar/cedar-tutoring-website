import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, Check, Star } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import {
  PROGRAMS,
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
      {/* Hero */}
      <PageHero
        heading={program.hero.heading}
        subtitle={program.hero.subtitle}
        breadcrumbs={[
          { label: "Programs", href: "/programs" },
          { label: program.shortTitle },
        ]}
      />

      {/* The Problem */}
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
                className="text-base leading-relaxed text-muted-foreground"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
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
              className="mb-6 text-base leading-relaxed text-muted-foreground"
            >
              {p}
            </p>
          ))}
          <ul className="space-y-3">
            {program.approach.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                <span className="text-base text-muted-foreground">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process Steps */}
      <section className="px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="How it works"
            heading="A clear process from first visit to visible results."
          />
          <div className="relative grid gap-8 md:grid-cols-4">
            {/* Connecting line */}
            <div className="absolute top-8 right-8 left-8 hidden h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 md:block" />
            {STEPS.map((step) => (
              <div key={step.num} className="relative text-center">
                <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/20 bg-white text-xl font-bold text-primary">
                  {step.num}
                </div>
                <h3 className="mb-2 text-base font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
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
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                <span className="text-base text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonials */}
      {program.testimonials.length > 0 && (
        <section className="px-4 py-16 md:px-6 lg:px-8">
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
                  : "max-w-2xl mx-auto",
              )}
            >
              {program.testimonials.map((t, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-card p-6"
                >
                  <div className="mb-3 flex items-center gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="h-4 w-4 fill-accent text-accent"
                      />
                    ))}
                  </div>
                  <blockquote className="mb-4 text-base leading-relaxed text-muted-foreground">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {t.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {t.author}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t.relation}
                      </p>
                    </div>
                    {t.badge && (
                      <span className="ml-auto rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-secondary">
                        {t.badge}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {program.faq.length > 0 && (
        <section className="bg-muted/50 px-4 py-16 md:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              eyebrow="Common questions"
              heading={`Frequently asked questions about ${program.shortTitle.toLowerCase()}.`}
            />
            <FAQAccordion items={program.faq} defaultOpen={0} />
          </div>
        </section>
      )}

      {/* Related Programs */}
      {related.length > 0 && (
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
                    className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/8 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-bold text-foreground">
                      {rp.shortTitle}
                    </h3>
                    <span className="mt-1 text-xs text-muted-foreground">
                      Grades {rp.grades}
                    </span>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {rp.shortDescription}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      Learn more
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            {program.cta.heading}
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            {program.cta.description}
          </p>
          <Link
            href="/book-assessment"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-6 gap-2 bg-primary text-primary-foreground hover:bg-primary/90",
            )}
          >
            {program.cta.buttonText}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
