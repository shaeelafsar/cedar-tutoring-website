import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bus,
  Calendar,
  Check,
  GraduationCap,
  MapPin,
  Shield,
  Star,
  Users,
} from "lucide-react";

import { CTASection } from "@/components/shared/CTASection";
import { buttonVariants } from "@/components/ui/button";
import { PROGRAMS } from "@/content/programs/data";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

const PROGRAM_OUTCOMES: Record<string, string> = {
  reading: "Build confidence and stronger school performance.",
  math: "Fewer tears, stronger understanding, better grades.",
  writing: "Better structure, stronger clarity, less homework stress.",
  science: "Ideal for middle and high school support.",
  arabic: "Warm, guided language support for growing learners.",
  "homework-help": "Ideal for busy families who want better routines.",
};

const STEPS = [
  {
    num: 1,
    title: "Free assessment",
    desc: "We learn where your child is now, what feels hard, and what goals matter most to your family.",
  },
  {
    num: 2,
    title: "Custom plan",
    desc: "We recommend the right program, schedule, and level of support based on actual needs — not a generic package.",
  },
  {
    num: 3,
    title: "Targeted tutoring",
    desc: "Students get focused instruction, consistent encouragement, and practical strategies they can apply right away.",
  },
  {
    num: 4,
    title: "Progress reviews",
    desc: "Parents stay informed through thoughtful updates, visible wins, and clear next-step recommendations.",
  },
] as const;

const FEATURES = [
  {
    icon: Shield,
    title: "Trust-heavy experience",
    desc: "Parents are choosing Cedar with real stakes in mind. The brand should feel calm, credible, and serious without losing warmth.",
    checks: [
      "Strong reviews and local reputation",
      "Clear, parent-friendly information architecture",
    ],
  },
  {
    icon: Users,
    title: "Small-group attention",
    desc: "The 1:3 student-tutor ratio keeps instruction personal, attentive, and more responsive to actual learning gaps.",
    checks: [
      "More feedback, less blending into the crowd",
      "Ideal for both catch-up and staying on track",
    ],
  },
  {
    icon: BarChart3,
    title: "Progress parents can see",
    desc: "Assessment-led planning and progress reviews make Cedar feel like a measurable academic partner, not just extra time after school.",
    checks: [
      "Custom plans based on real needs",
      "Updates focused on growth and next steps",
    ],
  },
  {
    icon: Calendar,
    title: "Family-friendly logistics",
    desc: "Flexible scheduling and transportation make Cedar easier to fit into real life — a major differentiator parents remember.",
    checks: [
      "After-school and weekend options",
      "Transportation support within the service radius",
    ],
  },
] as const;

const TESTIMONIALS = [
  {
    quote:
      "Cedar changed our entire after-school routine. My daughter went from dreading homework to confidently finishing it on her own. The communication from her tutor was phenomenal.",
    author: "Layla H.",
    relation: "Parent of a 4th grader • Plano, TX",
    initials: "LH",
    badge: "Confidence growth",
    rating: 5,
  },
  {
    quote:
      "The flexible timing and transportation option made Cedar doable for our family. We finally found support that fit our schedule instead of adding more chaos to it.",
    author: "Maria R.",
    relation: "Parent of a middle school student • Plano, TX",
    initials: "MR",
    badge: null,
    rating: 5,
  },
  {
    quote:
      "We saw thoughtful communication, clearer study habits, and score improvement without the experience feeling overwhelming. Cedar felt strategic and genuinely caring.",
    author: "Samir K.",
    relation: "Parent of an 11th grader • Plano, TX",
    initials: "SK",
    badge: "Visible results",
    rating: 5,
  },
] as const;

const PROOF_ITEMS = [
  { icon: Star, label: "5.0 Google Rating" },
  { icon: GraduationCap, label: "K–12 Programs" },
  { icon: BarChart3, label: "1:3 Ratio" },
  { icon: Bus, label: "Transportation Available" },
  { icon: MapPin, label: "Plano, TX" },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="via-primary relative overflow-hidden bg-gradient-to-br from-[#0a5a8a] to-[#2ea8dc] px-4 pt-14 pb-12 text-white sm:py-24 md:px-6 md:py-28 lg:px-8 lg:py-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="bg-accent/10 absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-[360px] w-[360px] rounded-full bg-white/8 blur-3xl" />
          <div className="absolute top-[20%] right-[10%] hidden h-48 w-48 rounded-full border border-white/10 sm:block" />
          <div className="absolute bottom-[15%] left-[5%] hidden h-32 w-32 rounded-full border border-white/8 sm:block" />
        </div>

        <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.14em] text-white/90 uppercase backdrop-blur-sm">
            <span className="bg-accent h-1.5 w-1.5 rounded-full" />
            Plano, TX • K–12 tutoring &amp; test prep
          </span>

          <h1 className="font-heading mt-6 max-w-3xl text-[2.125rem] leading-[1.08] font-bold tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            Build skills, confidence, and results with tutoring that feels{" "}
            <span className="relative inline-block">
              personal
              <span className="bg-accent absolute -bottom-1 left-0 h-1 w-full rounded-full" />
            </span>
            .
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:mt-7 md:text-lg md:leading-8">
            Personalized support in reading, math, writing, science, Arabic,
            homework help, and test prep — with caring teachers, flexible
            scheduling, and progress parents can actually see.
          </p>

          <div className="mt-7 flex w-full flex-col items-stretch gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:items-center">
            <Link
              href="/book-assessment"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-accent text-accent-foreground shadow-accent/25 hover:bg-accent/90 hover:shadow-accent/30 w-full justify-center px-6 font-bold shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl sm:w-auto sm:px-7"
              )}
            >
              Book a Free Assessment
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/programs"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full justify-center border-white/25 bg-white/5 px-6 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/15 hover:text-white sm:w-auto sm:px-7"
              )}
            >
              Explore Programs
            </Link>
          </div>

          <div className="mt-10 grid w-full max-w-lg grid-cols-3 gap-2 sm:gap-4">
            {[
              { value: "5.0", label: "Google rating", color: "bg-accent" },
              { value: "1:3", label: "Tutor ratio", color: "bg-secondary" },
              { value: "K–12", label: "All grades", color: "bg-white" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-white/15 bg-white/8 px-3 py-3 backdrop-blur-sm sm:rounded-2xl sm:px-5 sm:py-5"
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className={cn("h-2 w-2 rounded-full", item.color)} />
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
        </div>
      </section>

      <section
        aria-label="Proof bar"
        className="bg-accent px-0 py-3 sm:px-4 sm:py-4 md:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="-mx-0 flex flex-nowrap gap-3 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:justify-between sm:gap-x-8 sm:gap-y-3 sm:overflow-visible sm:px-0">
            {PROOF_ITEMS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="text-accent-foreground flex min-h-[44px] shrink-0 items-center gap-2 rounded-full bg-black/8 px-3 py-3 text-sm font-semibold whitespace-nowrap sm:rounded-none sm:bg-transparent sm:px-0 sm:py-0"
              >
                <Icon className="size-4" />
                <span>{label}</span>
              </div>
            ))}
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
              Parent proof
            </span>
            <h2 className="font-heading mt-4 text-[1.75rem] leading-8 font-bold tracking-[-0.03em] sm:text-4xl sm:leading-tight lg:text-5xl">
              What families notice most: calmer routines, clearer progress, and
              growing confidence.
            </h2>
          </div>

          <div className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mt-12 md:mx-0 md:grid md:snap-none md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
            {TESTIMONIALS.map(
              ({ quote, author, relation, initials, badge, rating }) => (
                <article
                  key={author}
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
                      <p className="text-sm text-white/70">{relation}</p>
                    </div>
                  </div>
                </article>
              )
            )}
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
              Programs overview
            </span>
            <h2 className="font-heading text-foreground mt-4 text-[1.75rem] leading-8 font-bold tracking-[-0.03em] sm:text-4xl sm:leading-tight lg:text-5xl">
              Academic support designed for clarity, confidence, and steady
              progress.
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-7 md:text-lg">
              Explore the programs families use most often to close gaps, reduce
              stress, and build momentum.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {PROGRAMS.map((program) => {
              const Icon = getIcon(program.icon);
              const outcome = PROGRAM_OUTCOMES[program.slug] ?? "";

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
              How it works
            </span>
            <h2 className="font-heading text-foreground mt-4 text-[1.75rem] leading-8 font-bold tracking-[-0.03em] sm:text-4xl sm:leading-tight lg:text-5xl">
              A straightforward process for getting the right support in place.
            </h2>
          </div>

          <div className="relative mt-10 grid gap-6 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            <div className="from-primary/40 via-primary/40 to-primary/40 absolute top-8 right-[12.5%] left-[12.5%] hidden h-0.5 bg-gradient-to-r lg:block" />

            {STEPS.map(({ num, title, desc }) => (
              <article
                key={num}
                className="group border-border relative rounded-2xl border bg-white p-4 transition-all hover:-translate-y-1 hover:shadow-md sm:p-5 md:p-6"
              >
                <div className="from-primary shadow-primary/20 relative z-10 flex size-12 items-center justify-center rounded-full bg-gradient-to-br to-[#0a6da8] text-lg font-bold text-white shadow-md sm:size-14">
                  {num}
                </div>
                <h3 className="text-foreground mt-4 text-lg font-bold sm:mt-5 sm:text-xl">
                  {title}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-6 sm:mt-3">
                  {desc}
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
              Why Cedar
            </span>
            <h2 className="font-heading text-foreground mt-4 text-[1.75rem] leading-8 font-bold tracking-[-0.03em] sm:text-4xl sm:leading-tight lg:text-5xl">
              The value parents care about most, presented simply.
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-7 md:text-lg">
              Cedar combines academic support, thoughtful communication, and
              practical family logistics.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-6 lg:grid-cols-2">
            {FEATURES.map(({ icon: Icon, title, desc, checks }) => (
              <article
                key={title}
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
                        {title}
                      </h3>
                      <p className="text-muted-foreground mt-2 text-sm leading-6">
                        {desc}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-4 space-y-2.5 pl-0 sm:mt-5 sm:pl-16">
                    {checks.map((check) => (
                      <li
                        key={check}
                        className="text-muted-foreground flex items-start gap-2.5 text-sm leading-6"
                      >
                        <Check className="text-accent mt-0.5 size-4 shrink-0" />
                        <span>{check}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Ready to find the right support for your child?"
        subtext="Book a free assessment to identify learning gaps, match the right program, and plan clear next steps with confidence."
        primaryCta={{
          label: "Book a Free Assessment",
          href: "/book-assessment",
        }}
        trustBullets={[
          "Response within 24 hours",
          "No-pressure free assessment",
          "K–12 & test prep support",
          "Transportation available",
        ]}
      />
    </>
  );
}
