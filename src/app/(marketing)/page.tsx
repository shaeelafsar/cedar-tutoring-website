import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bus,
  Calendar,
  Check,
  GraduationCap,
  Heart,
  MapPin,
  Shield,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

import { CTASection } from "@/components/shared/CTASection";
import { JsonLd } from "@/components/shared/JsonLd";
import { buttonVariants } from "@/components/ui/button";
import { getTestimonials } from "@/lib/content/collections";
import { getHomePageContent } from "@/lib/content/pages";
import { getAllPrograms } from "@/lib/content/programs";
import { SITE_CONFIG } from "@/lib/constants";
import { getIcon } from "@/lib/icons";
import { buildPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

const homePageContent = getHomePageContent();
const allTestimonials = getTestimonials();
const allPrograms = getAllPrograms();

const homeIconMap = {
  star: Star,
  "graduation-cap": GraduationCap,
  "bar-chart-3": BarChart3,
  bus: Bus,
  heart: Heart,
  "trending-up": TrendingUp,
  "map-pin": MapPin,
  shield: Shield,
  users: Users,
  calendar: Calendar,
} as const;

const featuredTestimonials = homePageContent.testimonialsSection.featuredIds
  .map((id) => allTestimonials.find((testimonial) => testimonial.id === id))
  .filter(
    (testimonial): testimonial is (typeof allTestimonials)[number] =>
      testimonial !== undefined,
  );

const statDotClasses = ["bg-accent", "bg-secondary", "bg-white"] as const;

export const metadata: Metadata = buildPageMetadata({
  title: homePageContent.seo.title,
  description: homePageContent.seo.description,
  path: "/",
});

const homePageStructuredData = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  description:
    "Personalized tutoring in Reading, Math, Writing, Science, Arabic, and Test Prep in the Dallas-Fort Worth area",
  areaServed: "Dallas-Fort Worth, Texas",
  telephone: SITE_CONFIG.phone,
  email: SITE_CONFIG.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE_CONFIG.address.street,
    addressLocality: SITE_CONFIG.address.city,
    addressRegion: SITE_CONFIG.address.state,
    postalCode: SITE_CONFIG.address.zip,
    addressCountry: "US",
  },
};

function formatTestimonialMeta(relation: string, location?: string): string {
  return location ? `${relation} • ${location}` : relation;
}

function splitHeroHeading(heading: string) {
  const match = /^(.*?)(\b[^\s.]+)([.!?])$/.exec(heading);

  if (!match) {
    return { prefix: heading, highlight: undefined, punctuation: "" };
  }

  const [, prefix, highlight, punctuation] = match;
  return { prefix: prefix.trimEnd(), highlight, punctuation };
}

export default function HomePage() {
  const heroHeading = splitHeroHeading(homePageContent.hero.heading);

  return (
    <>
      <JsonLd data={homePageStructuredData} />
      <section className="via-primary relative overflow-hidden bg-gradient-to-br from-[#0a5a8a] to-[#2ea8dc] px-4 pt-14 pb-12 text-white sm:py-24 md:px-6 md:py-28 lg:px-8 lg:py-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="bg-accent/10 absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-[360px] w-[360px] rounded-full bg-white/8 blur-3xl" />
          <div className="absolute top-[20%] right-[10%] hidden h-48 w-48 rounded-full border border-white/10 sm:block" />
          <div className="absolute bottom-[15%] left-[5%] hidden h-32 w-32 rounded-full border border-white/8 sm:block" />
        </div>

        <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
          {homePageContent.hero.eyebrow ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.14em] text-white/90 uppercase backdrop-blur-sm">
              <span className="bg-accent h-1.5 w-1.5 rounded-full" />
              {homePageContent.hero.eyebrow}
            </span>
          ) : null}

          <h1 className="font-heading mt-6 max-w-3xl text-[2.125rem] leading-[1.08] font-bold tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            {heroHeading.highlight ? (
              <>
                {heroHeading.prefix}{" "}
                <span className="relative inline-block">
                  {heroHeading.highlight}
                  <span className="bg-accent absolute -bottom-1 left-0 h-1 w-full rounded-full" />
                </span>
                {heroHeading.punctuation}
              </>
            ) : (
              homePageContent.hero.heading
            )}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:mt-7 md:text-lg md:leading-8">
            {homePageContent.hero.subtitle}
          </p>

          <div className="mt-7 flex w-full flex-col items-stretch gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:items-center">
            {homePageContent.hero.primaryCta ? (
              <Link
                href={homePageContent.hero.primaryCta.href}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-accent text-accent-foreground shadow-accent/25 hover:bg-accent/90 hover:shadow-accent/30 w-full justify-center px-6 font-bold shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl sm:w-auto sm:px-7"
                )}
              >
                {homePageContent.hero.primaryCta.label}
                <ArrowRight className="size-4" />
              </Link>
            ) : null}
            {homePageContent.hero.secondaryCta ? (
              <Link
                href={homePageContent.hero.secondaryCta.href}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "w-full justify-center border-white/25 bg-white/5 px-6 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/15 hover:text-white sm:w-auto sm:px-7"
                )}
              >
                {homePageContent.hero.secondaryCta.label}
              </Link>
            ) : null}
          </div>

          {homePageContent.hero.stats?.length ? (
            <div className="mt-10 grid w-full max-w-lg grid-cols-3 gap-2 sm:gap-4">
              {homePageContent.hero.stats.map((item, index) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/15 bg-white/8 px-3 py-3 backdrop-blur-sm sm:rounded-2xl sm:px-5 sm:py-5"
                >
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full",
                        statDotClasses[index] ?? statDotClasses[0]
                      )}
                    />
                    <p className="text-lg font-bold text-white sm:text-2xl">
                      {item.value}
                    </p>
                  </div>
                  <p className="mt-1 text-xs leading-4 text-white/60 sm:mt-2">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section
        aria-label="Proof bar"
        className="bg-accent px-0 py-3 sm:px-4 sm:py-4 md:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="-mx-0 flex flex-nowrap gap-3 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:justify-between sm:gap-x-8 sm:gap-y-3 sm:overflow-visible sm:px-0">
            {homePageContent.proofBar.map(({ iconName, label }) => {
              const Icon = homeIconMap[iconName as keyof typeof homeIconMap] ?? Star;

              return (
                <div
                  key={label}
                  className="text-accent-foreground flex min-h-[44px] shrink-0 items-center gap-2 rounded-full bg-black/8 px-3 py-3 text-sm font-semibold whitespace-nowrap sm:rounded-none sm:bg-transparent sm:px-0 sm:py-0"
                >
                  <Icon className="size-4" />
                  <span>{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="testimonials"
        className="bg-foreground relative overflow-hidden px-4 py-14 text-white sm:py-20 md:px-6 md:py-24 lg:px-8"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="bg-primary/15 absolute top-0 -right-20 h-64 w-64 rounded-full blur-3xl" />
          <div className="bg-accent/10 absolute bottom-0 -left-20 h-48 w-48 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-xs font-semibold tracking-[0.14em] text-white/80 uppercase">
              {homePageContent.testimonialsSection.eyebrow}
            </span>
            <h2 className="font-heading mt-4 text-[1.75rem] leading-8 font-bold tracking-[-0.03em] sm:text-4xl sm:leading-tight lg:text-5xl">
              {homePageContent.testimonialsSection.heading}
            </h2>
            <p className="mt-4 text-base leading-7 text-white/75 md:text-lg">
              {homePageContent.testimonialsSection.subtitle}
            </p>
          </div>

          <div className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mt-12 md:mx-0 md:grid md:snap-none md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
            {featuredTestimonials.map(({ id, quote, author, relation, location, badge, rating }) => {
              const initials = author
                .split(" ")
                .map((name) => name[0])
                .join("");

              return (
                <article
                  key={id}
                  className="relative min-w-[85%] max-w-[85%] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:min-w-[340px] sm:max-w-[340px] md:min-w-0 md:max-w-none md:p-6"
                >
                  <div className="from-primary via-accent to-secondary absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r" />

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="text-accent flex gap-1">
                      {Array.from({ length: rating }).map((_, index) => (
                        <Star key={index} className="size-4 fill-current" />
                      ))}
                    </div>
                    {badge ? (
                      <span className="bg-accent/20 text-accent rounded-full px-3 py-1 text-xs font-semibold">
                        {badge}
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-4 break-words text-sm leading-7 text-white/80 sm:mt-5">
                    &ldquo;{quote}&rdquo;
                  </p>

                  <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4 sm:mt-6 sm:pt-5">
                    <span className="from-primary to-secondary flex size-10 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-white sm:size-11">
                      {initials}
                    </span>
                    <div>
                      <p className="font-semibold text-white">{author}</p>
                      <p className="text-sm text-white/70">
                        {formatTestimonialMeta(relation, location)}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="programs"
        className="bg-background px-4 py-14 sm:py-20 md:px-6 md:py-24 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="bg-primary/10 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.14em] text-[hsl(var(--primary-text))] uppercase">
              {homePageContent.programsSection.eyebrow}
            </span>
            <h2 className="font-heading text-foreground mt-4 text-[1.75rem] leading-8 font-bold tracking-[-0.03em] sm:text-4xl sm:leading-tight lg:text-5xl">
              {homePageContent.programsSection.heading}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-7 md:text-lg">
              {homePageContent.programsSection.subtitle}
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {allPrograms.map((program) => {
              const Icon = getIcon(program.iconName);
              const outcome = program.outcomes.items[0] ?? "";

              return (
                <Link
                  key={program.slug}
                  href={`/programs/${program.slug}`}
                  className="group border-border bg-card hover:shadow-primary/8 relative mx-auto flex h-full w-full max-w-md flex-col overflow-hidden rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-lg sm:max-w-none"
                >
                  <div className="from-primary to-accent absolute inset-x-0 top-0 h-1 bg-gradient-to-r via-[hsl(var(--brand-red))]" />
                  <div className="from-primary to-accent absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-0 transition-opacity group-hover:opacity-100" />

                  <div className="flex flex-1 flex-col p-4 sm:p-5 md:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <span className="bg-primary/10 text-primary group-hover:bg-primary flex size-11 items-center justify-center rounded-xl transition-colors group-hover:text-white sm:size-12">
                        <Icon className="size-5" />
                      </span>
                      <span className="bg-accent/15 text-accent-foreground rounded-full px-3 py-1 text-xs font-bold">
                        {program.grades}
                      </span>
                    </div>

                    <h3 className="text-foreground mt-4 text-lg font-bold sm:mt-5 sm:text-xl">
                      {program.shortTitle}
                    </h3>
                    <p className="text-muted-foreground mt-2 flex-1 text-sm leading-6">
                      {program.shortDescription}
                    </p>

                    <div className="border-border mt-4 border-t pt-3 sm:mt-5 sm:pt-4">
                      <p className="text-foreground/70 text-sm leading-6">
                        {outcome}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[hsl(var(--primary-text))]">
                        Learn more
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="bg-primary/5 relative overflow-hidden px-4 py-14 sm:py-20 md:px-6 md:py-24 lg:px-8"
      >
        <div className="bg-primary/8 pointer-events-none absolute top-0 -right-40 h-80 w-80 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="bg-primary/10 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.14em] text-[hsl(var(--primary-text))] uppercase">
              {homePageContent.howItWorks.eyebrow}
            </span>
            <h2 className="font-heading text-foreground mt-4 text-[1.75rem] leading-8 font-bold tracking-[-0.03em] sm:text-4xl sm:leading-tight lg:text-5xl">
              {homePageContent.howItWorks.heading}
            </h2>
          </div>

          <div className="relative mt-10 grid gap-6 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            <div className="from-primary/40 via-primary/40 to-primary/40 absolute top-8 right-[12.5%] left-[12.5%] hidden h-0.5 bg-gradient-to-r lg:block" />

            {homePageContent.howItWorks.steps.map((step) => (
              <article
                key={step.number}
                className="group border-border relative rounded-2xl border bg-white p-4 transition-all hover:-translate-y-1 hover:shadow-md sm:p-5 md:p-6"
              >
                <div className="from-primary shadow-primary/20 relative z-10 flex size-12 items-center justify-center rounded-full bg-gradient-to-br to-[#0a6da8] text-lg font-bold text-white shadow-md sm:size-14">
                  {step.number}
                </div>
                <h3 className="text-foreground mt-4 text-lg font-bold sm:mt-5 sm:text-xl">
                  {step.title}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-6 sm:mt-3">
                  {step.description}
                </p>
                <div className="bg-accent mt-3 h-1 w-10 rounded-full sm:mt-4" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="why-cedar"
        className="bg-background px-4 py-14 sm:py-20 md:px-6 md:py-24 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="bg-primary/10 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.14em] text-[hsl(var(--primary-text))] uppercase">
              {homePageContent.whyCedar.eyebrow}
            </span>
            <h2 className="font-heading text-foreground mt-4 text-[1.75rem] leading-8 font-bold tracking-[-0.03em] sm:text-4xl sm:leading-tight lg:text-5xl">
              {homePageContent.whyCedar.heading}
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-7 md:text-lg">
              {homePageContent.whyCedar.subtitle}
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-6 lg:grid-cols-2">
            {homePageContent.whyCedar.items.map((item) => {
              const Icon = homeIconMap[item.iconName as keyof typeof homeIconMap] ?? Shield;

              return (
                <article
                  key={item.title}
                  className="group border-border bg-card relative overflow-hidden rounded-2xl border transition-all hover:shadow-md"
                >
                  <div className="bg-primary absolute inset-y-0 left-0 w-1" />

                  <div className="p-4 pl-5 sm:p-6 sm:pl-7">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
                      <span className="bg-primary flex size-11 shrink-0 items-center justify-center rounded-xl text-white sm:size-12">
                        <Icon className="size-5" />
                      </span>
                      <div className="flex-1">
                        <h3 className="text-foreground text-lg font-bold sm:text-xl">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground mt-2 text-sm leading-6">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {item.checks && item.checks.length > 0 && (
                    <ul className="mt-4 space-y-2.5 pl-0 sm:mt-5 sm:pl-16">
                      {item.checks.map((check) => (
                        <li
                          key={check}
                          className="text-muted-foreground flex items-start gap-2.5 text-sm leading-6"
                        >
                          <Check className="text-accent mt-0.5 size-4 shrink-0" />
                          <span>{check}</span>
                        </li>
                      ))}
                    </ul>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        heading={homePageContent.finalCta.heading}
        subtext={homePageContent.finalCta.subtext}
        primaryCta={homePageContent.finalCta.primaryCta}
        secondaryCta={homePageContent.finalCta.secondaryCta}
        trustBullets={homePageContent.finalCta.trustBullets}
      />
    </>
  );
}
