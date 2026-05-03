import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, Check, Star } from "lucide-react";

import { CTASection } from "@/components/shared/CTASection";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { getTestimonialsByIds } from "@/lib/content/collections";
import { getTestPrepHubPageContent } from "@/lib/content/pages";
import {
  getAllTestPrepSlugs,
  getRelatedTestPrep,
  getTestPrepBySlug,
} from "@/lib/content/testPrep";
import { getIcon } from "@/lib/icons";
import { buildPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

const testPrepHubContent = getTestPrepHubPageContent();

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTestPrepSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = getTestPrepBySlug(slug);
  if (!program) return {};
  return buildPageMetadata({
    title: program.seo.title,
    description: program.seo.description,
    path: `/test-prep/${slug}`,
  });
}

function formatTestimonialMeta(relation: string, location?: string): string {
  return location ? `${relation} • ${location}` : relation;
}

function resolveHeadingTemplate(template: string, value: string): string {
  return template.replace("{{program}}", value);
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <Check className="text-secondary mt-0.5 h-5 w-5 shrink-0" />
          <span className="text-muted-foreground text-base">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function TestPrepDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = getTestPrepBySlug(slug);
  if (!program) notFound();

  const related = getRelatedTestPrep(slug);
  const testimonials = program.testimonialIds
    ? getTestimonialsByIds(program.testimonialIds)
    : [];
  const detailPageContent = testPrepHubContent.detailPage;

  return (
    <>
      <PageHero
        heading={program.hero.heading}
        subtitle={program.hero.subtitle}
        breadcrumbs={[
          { label: "Test Prep", href: "/test-prep" },
          { label: program.shortTitle },
        ]}
      />

      <section className="px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow={detailPageContent.idealFor.eyebrow}
            heading={detailPageContent.idealFor.heading}
            subtitle={detailPageContent.idealFor.subtitle}
            align="left"
          />
          <BulletList items={program.idealFor} />
        </div>
      </section>

      <section className="bg-muted/50 px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow={detailPageContent.focusAreas.eyebrow}
            heading={detailPageContent.focusAreas.heading}
            subtitle={detailPageContent.focusAreas.subtitle}
            align="left"
          />
          <BulletList items={program.focusAreas} />
        </div>
      </section>

      <section className="px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow={detailPageContent.process.eyebrow}
            heading={detailPageContent.process.heading}
            subtitle={detailPageContent.process.subtitle}
          />
          <div className="relative grid gap-6 md:grid-cols-4 md:gap-8">
            <div className="from-primary/40 via-primary/40 to-primary/40 absolute top-8 right-8 left-8 hidden h-0.5 bg-gradient-to-r md:block" />
            {detailPageContent.process.steps.map((step) => (
              <div key={step.number} className="relative text-center">
                <div className="bg-primary shadow-primary/20 relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold text-white shadow-lg">
                  {step.number}
                </div>
                <h3 className="text-foreground mb-2 text-base font-bold">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/50 px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow={detailPageContent.format.eyebrow}
            heading={detailPageContent.format.heading}
            subtitle={detailPageContent.format.subtitle}
            align="left"
          />
          <BulletList items={program.format} />
        </div>
      </section>

      <section className="px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow={detailPageContent.outcomes.eyebrow}
            heading={detailPageContent.outcomes.heading}
            subtitle={detailPageContent.outcomes.subtitle}
            align="left"
          />
          <BulletList items={program.outcomes} />
        </div>
      </section>

      {testimonials.length > 0 ? (
        <section className="bg-muted/50 px-4 py-16 md:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <SectionHeading
              eyebrow={detailPageContent.testimonials.eyebrow}
              heading={detailPageContent.testimonials.heading}
              subtitle={detailPageContent.testimonials.subtitle}
            />
            <div
              className={cn(
                "grid gap-6",
                testimonials.length > 1 ? "md:grid-cols-2" : "mx-auto max-w-2xl",
              )}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="border-border bg-card relative overflow-hidden rounded-xl border p-6 shadow-sm"
                >
                  <div className="from-primary via-accent absolute inset-x-0 top-0 h-1 bg-gradient-to-r to-[hsl(var(--brand-red))]" />
                  <div className="mb-3 flex items-center gap-1 pt-1">
                    {Array.from({ length: testimonial.rating }).map((_, index) => (
                      <Star
                        key={index}
                        className="fill-accent text-accent h-4 w-4"
                      />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground mb-4 text-base leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-[hsl(var(--primary-text))]">
                      {testimonial.author
                        .split(" ")
                        .map((name) => name[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-foreground text-sm font-semibold">
                        {testimonial.author}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {formatTestimonialMeta(
                          testimonial.relation,
                          testimonial.location,
                        )}
                      </p>
                    </div>
                    {testimonial.badge ? (
                      <span className="ml-auto rounded-full bg-[hsl(var(--brand-red)/0.12)] px-2.5 py-0.5 text-xs font-medium text-[hsl(var(--brand-red))]">
                        {testimonial.badge}
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
              eyebrow={detailPageContent.faq.eyebrow}
              heading={resolveHeadingTemplate(
                detailPageContent.faq.headingTemplate,
                program.shortTitle,
              )}
            />
            <FAQAccordion items={program.faq} defaultOpen={0} />
          </div>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="px-4 py-16 md:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <SectionHeading
              eyebrow={detailPageContent.related.eyebrow}
              heading={detailPageContent.related.heading}
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((relatedProgram) => {
                const Icon = getIcon(relatedProgram.iconName);
                return (
                  <Link
                    key={relatedProgram.slug}
                    href={`/test-prep/${relatedProgram.slug}`}
                    className="group border-border bg-card hover:border-primary/30 relative overflow-hidden rounded-xl border p-6 transition-all hover:shadow-md"
                  >
                    <div className="from-primary to-accent absolute inset-x-0 top-0 h-1 bg-gradient-to-r via-[hsl(var(--brand-red))]" />
                    <div className="from-primary to-accent absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="bg-primary/8 text-primary mb-3 flex h-10 w-10 items-center justify-center rounded-lg">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-foreground text-base font-bold">
                      {relatedProgram.shortTitle}
                    </h3>
                    <span className="text-muted-foreground mt-1 text-xs">
                      Grades {relatedProgram.grades}
                    </span>
                    <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
                      {relatedProgram.shortDescription}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[hsl(var(--primary-text))]">
                      {detailPageContent.related.linkLabel}
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
        subtext={program.cta.subtext}
        primaryCta={program.cta.primaryCta}
        secondaryCta={program.cta.secondaryCta}
        trustBullets={detailPageContent.ctaTrustBullets}
      />
    </>
  );
}
