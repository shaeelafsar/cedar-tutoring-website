"use client";

// Calendly-only /book-assessment page client.
// Wave 3 will replace this with BookAssessmentPageClient.tsx (form + custom calendar + Resend
// backend together as a coherent Calendly phase-out). Until then, this is the canonical renderer.
// See .squad/decisions/inbox/coordinator-pivot-calendly-only.md for the pivot rationale.

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  BadgeCheck,
  ClipboardCheck,
  FilePenLine,
  Mail,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Star,
  type LucideIcon,
} from "lucide-react";

import type {
  BookAssessmentPageContent,
  Testimonial,
} from "@/types/content";

import { CalendlyInline } from "@/components/shared/CalendlyInline";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { SiteConfig } from "@/lib/content/site";
import { imagePath } from "@/lib/image-path";

interface BookAssessmentCalendlyClientProps {
  pageContent: BookAssessmentPageContent;
  siteConfig: SiteConfig;
  testimonials: Testimonial[];
  calendlyUrl: string;
}

const stepIconMap: Record<string, LucideIcon> = {
  "file-pen-line": FilePenLine,
  "phone-call": PhoneCall,
  "clipboard-check": ClipboardCheck,
  sparkles: Sparkles,
};

function formatPhoneHref(value: string) {
  return `tel:+1${value.replace(/\D/g, "")}`;
}

export function BookAssessmentCalendlyClient({
  pageContent,
  siteConfig,
  testimonials,
  calendlyUrl,
}: BookAssessmentCalendlyClientProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <PageHero
        eyebrow={pageContent.hero.eyebrow}
        heading={pageContent.hero.heading}
        subtitle={pageContent.hero.subtitle}
        breadcrumbs={[{ label: "Book Assessment" }]}
      />

      <section className="bg-muted/30 px-4 py-16 md:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] xl:items-start">

          {/* Primary: Calendly inline embed */}
          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="xl:order-1"
          >
            <div className="mb-8">
              <p className="text-sm font-bold tracking-[0.14em] text-[hsl(var(--primary-text))] uppercase">
                Free assessment · No obligation · Personalized plan
              </p>
              <h2 className="text-foreground mt-3 text-3xl font-bold tracking-tight">
                Pick a time that works for your family
              </h2>
              <p className="text-muted-foreground mt-3 max-w-2xl text-base leading-7">
                Choose any open slot below. Calendly confirms your booking
                instantly — no payment information required. Can&apos;t find a
                time?{" "}
                <a
                  href={formatPhoneHref(siteConfig.phone)}
                  className="font-semibold text-[hsl(var(--primary-text))] underline-offset-4 hover:underline"
                >
                  Call Cedar
                </a>{" "}
                and we&apos;ll sort it out.
              </p>
            </div>

            <CalendlyInline
              url={calendlyUrl}
              fallbackPhone={siteConfig.phone}
            />
          </motion.div>

          {/* Sidebar: image + trust signals, What to Expect, social proof, FAQ, closing CTA */}
          <div className="space-y-6 xl:order-2">

            {/* Hero image + trust signal pills */}
            <motion.aside
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
              className="border-border bg-card overflow-hidden rounded-[2rem] border shadow-sm"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#0a5a8a] via-[#0d8ecf] to-[#2ea8dc]">
                <Image
                  src={imagePath(pageContent.heroImage.src)}
                  alt={pageContent.heroImage.alt}
                  fill
                  sizes="(min-width: 1280px) 32vw, (min-width: 768px) 60vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-6 sm:p-8">
                <div className="grid gap-3 sm:grid-cols-3">
                  {pageContent.trustSignals.map((item, index) => {
                    const Icon =
                      [ShieldCheck, BadgeCheck, Sparkles][index] ?? BadgeCheck;

                    return (
                      <div
                        key={item}
                        className="border-border bg-muted/45 flex items-center gap-3 rounded-2xl border px-4 py-3"
                      >
                        <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                          <Icon className="size-4" />
                        </div>
                        <span className="text-foreground text-sm font-semibold">
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.aside>

            {/* What to Expect steps */}
            <motion.section
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
              className="border-border bg-card rounded-[2rem] border p-6 shadow-sm sm:p-8"
            >
              <SectionHeading
                eyebrow={pageContent.stepsSection.eyebrow}
                heading={pageContent.stepsSection.heading}
                subtitle={pageContent.stepsSection.subtitle}
                align="left"
                className="mb-8"
              />
              <div className="space-y-4">
                {pageContent.stepsSection.items.map((step, index) => {
                  const Icon = stepIconMap[step.iconName] ?? Sparkles;

                  return (
                    <div
                      key={step.title}
                      className="border-border bg-muted/35 flex gap-4 rounded-2xl border p-4"
                    >
                      <div className="bg-primary text-primary-foreground flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                        <Icon className="size-5" aria-hidden="true" />
                        <span className="sr-only">Step {index + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-foreground text-base font-semibold">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground mt-2 text-sm leading-6 sm:text-base">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.section>

            {/* Social proof: testimonials */}
            <motion.section
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
              className="border-border bg-card rounded-[2rem] border p-6 shadow-sm sm:p-8"
            >
              <SectionHeading
                eyebrow="Parent proof"
                heading="Why families feel confident booking with Cedar."
                subtitle="A few of the stories that reflect what the assessment process unlocks: clarity, calmer routines, and support that feels personal."
                align="left"
                className="mb-8"
              />
              <div className="space-y-4">
                {testimonials.map((testimonial) => (
                  <article
                    key={testimonial.id}
                    className="border-border bg-muted/35 rounded-2xl border p-5"
                  >
                    <div className="text-accent flex gap-1">
                      {Array.from({ length: testimonial.rating }).map(
                        (_, index) => (
                          <Star
                            key={`${testimonial.id}-${index}`}
                            className="size-4 fill-current"
                          />
                        )
                      )}
                    </div>
                    <p className="text-foreground mt-4 text-base leading-7">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div className="text-muted-foreground mt-4 text-sm leading-6">
                      <p className="text-foreground font-semibold">
                        {testimonial.author}
                      </p>
                      <p>{testimonial.relation}</p>
                      {testimonial.location ? (
                        <p>{testimonial.location}</p>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </motion.section>

            {/* FAQ */}
            <motion.section
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
              className="border-border bg-card rounded-[2rem] border p-6 shadow-sm sm:p-8"
            >
              <SectionHeading
                eyebrow={pageContent.faqSection.eyebrow}
                heading={pageContent.faqSection.heading}
                subtitle={pageContent.faqSection.subtitle}
                align="left"
                className="mb-8"
              />
              <FAQAccordion
                items={pageContent.faqSection.items}
                defaultOpen={0}
              />
            </motion.section>

            {/* Closing CTA */}
            <motion.section
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.25, ease: "easeOut" }}
              className="via-primary relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0a5a8a] to-[#2ea8dc] p-6 text-white shadow-sm sm:p-8"
            >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-10 -right-10 h-36 w-36 rounded-full bg-white/10 blur-3xl" />
                <div className="bg-accent/20 absolute bottom-0 left-0 h-44 w-44 rounded-full blur-3xl" />
              </div>
              <div className="relative">
                <p className="text-sm font-bold tracking-[0.14em] text-white/75 uppercase">
                  Final reassurance
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
                  {pageContent.closing.heading}
                </h2>
                <p className="mt-4 text-base leading-7 text-white/85">
                  {pageContent.closing.body}
                </p>

                <div className="mt-6 grid gap-3">
                  {pageContent.closing.highlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl bg-white/8 px-4 py-3 text-sm leading-6 text-white/90 backdrop-blur-sm"
                    >
                      <BadgeCheck className="text-accent mt-0.5 size-4 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={formatPhoneHref(siteConfig.phone)}
                    className="bg-accent text-accent-foreground hover:bg-accent/90 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-colors"
                  >
                    Call {siteConfig.phone}
                    <PhoneCall className="size-4" />
                  </a>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/14"
                  >
                    Email Cedar
                    <Mail className="size-4" />
                  </a>
                </div>
              </div>
            </motion.section>

          </div>
        </div>
      </section>
    </>
  );
}
