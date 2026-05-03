import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  ArrowRight,
  Star,
  Clock,
  Bus,
  MapPin,
  GraduationCap,
  BarChart3,
  Shield,
  Users,
  Calendar,
  BookOpen,
  Calculator,
  PenTool,
  FlaskConical,
  Languages,
  BookMarked,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";

/* ─── Data ─────────────────────────────────────────────── */

const PROGRAMS = [
  {
    title: "Reading",
    grades: "K–8",
    desc: "Support for fluency, comprehension, vocabulary, and confidence when school reading starts to feel frustrating.",
    outcome: "Build confidence and stronger school performance.",
    icon: BookOpen,
    href: "/programs/reading",
  },
  {
    title: "Math",
    grades: "K–12",
    desc: "Step-by-step support from foundational arithmetic to algebra, geometry, and beyond — at the student's real level.",
    outcome: "Fewer tears, stronger understanding, better grades.",
    icon: Calculator,
    href: "/programs/math",
  },
  {
    title: "Writing",
    grades: "2–12",
    desc: "Coaching for sentence structure, grammar, organization, and clearer academic writing across grade levels.",
    outcome: "Better structure, stronger clarity, less homework stress.",
    icon: PenTool,
    href: "/programs/writing",
  },
  {
    title: "Science",
    grades: "5–12",
    desc: "Concept clarity, study strategies, and skill-building for students who need science to feel less overwhelming.",
    outcome: "Ideal for middle and high school support.",
    icon: FlaskConical,
    href: "/programs/science",
  },
  {
    title: "Arabic",
    grades: "K–12",
    desc: "Reading, writing, vocabulary, and comprehension support for children learning Arabic with structure and consistency.",
    outcome: "Warm, guided language support for growing learners.",
    icon: Languages,
    href: "/programs/arabic",
  },
  {
    title: "Homework Help",
    grades: "K–12",
    desc: "Guided accountability, calmer evenings, and structured support for students who need consistency after school.",
    outcome: "Ideal for busy families who want better routines.",
    icon: BookMarked,
    href: "/programs/homework-help",
  },
];

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
];

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
];

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
];

/* ─── Page ──────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      {/* ══════ HERO ══════ */}
      <section className="px-4 pt-10 pb-7 md:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-border/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(248,250,252,0.98))] shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          {/* Subtle gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(5,150,105,0.12),transparent_26%)]" />

          <div className="relative z-[1] grid items-center gap-10 p-8 md:p-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:p-20">
            {/* Copy */}
            <div className="max-w-[640px]">
              <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-primary">
                Plano, TX • K–12 tutoring &amp; test prep
              </span>

              <h1 className="font-heading text-[clamp(2.5rem,5vw,4.75rem)] leading-[1.08] font-extrabold tracking-[-0.03em] text-[#0f172a]">
                Build skills, confidence, and results with tutoring that feels{" "}
                <span className="text-primary">personal.</span>
              </h1>

              <p className="mt-5 text-lg leading-relaxed text-muted-foreground md:text-[1.125rem]">
                Personalized support in reading, math, writing, science, Arabic,
                homework help, and SAT/ACT prep — with caring teachers, flexible
                scheduling, and measurable progress parents can actually see.
              </p>

              {/* CTAs */}
              <div className="mt-7 flex flex-wrap gap-3.5">
                <Link
                  href="/book-assessment"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "bg-gradient-to-b from-primary to-[#1d4ed8] px-6 py-3 text-base font-semibold shadow-[0_10px_25px_rgba(37,99,235,0.18)] transition-all hover:-translate-y-px hover:shadow-[0_14px_30px_rgba(37,99,235,0.24)]"
                  )}
                >
                  Book a Free Assessment
                </Link>
                <Link
                  href="/programs"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "border-primary/22 bg-white/80 px-6 py-3 text-base font-semibold text-primary shadow-sm transition-all hover:-translate-y-px hover:border-primary hover:bg-primary hover:text-white"
                  )}
                >
                  Explore Programs
                </Link>
              </div>

              {/* Trust pills */}
              <div className="mt-7 flex flex-wrap gap-3">
                {[
                  { icon: Star, label: "122 Five-Star Reviews" },
                  { icon: Clock, label: "Flexible after-school scheduling" },
                  { icon: Bus, label: "Transportation available" },
                ].map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full border border-border/95 bg-white/84 px-3.5 py-2 text-sm font-semibold shadow-sm"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    {label}
                  </span>
                ))}
              </div>

              {/* Stat row */}
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  {
                    stat: "5.0 Google Rating",
                    detail:
                      "Trusted by local parents who want both warmth and results.",
                  },
                  {
                    stat: "1:3 Student-Tutor Ratio",
                    detail:
                      "Small-group support that stays personal and attentive.",
                  },
                  {
                    stat: "K–12 Programs",
                    detail:
                      "From elementary reading support to high school test prep.",
                  },
                ].map(({ stat, detail }) => (
                  <div
                    key={stat}
                    className="rounded-xl border border-border/95 bg-white/74 p-4 shadow-sm"
                  >
                    <strong className="block text-lg text-foreground">
                      {stat}
                    </strong>
                    <span className="text-[0.92rem] text-muted-foreground">
                      {detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual — decorative proof panel */}
            <div className="relative hidden min-h-[520px] lg:block" aria-hidden="true">
              {/* Dark gradient stage */}
              <div className="absolute inset-0 overflow-hidden rounded-[32px] bg-[linear-gradient(160deg,#0f172a_0%,#1d4ed8_45%,#059669_110%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_24px_80px_rgba(15,23,42,0.28)]">
                <div className="absolute -right-20 -top-[70px] h-[280px] w-[280px] rounded-full bg-white/8" />
                <div className="absolute -bottom-[90px] -left-20 h-[240px] w-[240px] rounded-full bg-white/8" />
              </div>

              {/* Rating card */}
              <div className="absolute left-20 top-8 z-10 flex items-center gap-3 rounded-3xl border border-white/60 bg-white/95 px-4 py-3.5 shadow-[0_24px_50px_rgba(15,23,42,0.18)] backdrop-blur-sm">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary/12 to-secondary/14 text-primary">
                  <Star className="h-5 w-5 fill-current" />
                </span>
                <div>
                  <strong className="block text-base">5.0 rating</strong>
                  <span className="text-sm text-muted-foreground">
                    Google Reviews
                  </span>
                </div>
              </div>

              {/* Lesson card */}
              <div className="absolute right-9 top-[52px] z-10 w-[min(100%,380px)] rounded-3xl border border-white/60 bg-white/93 p-6 shadow-[0_24px_50px_rgba(15,23,42,0.18)] backdrop-blur-sm">
                <div className="mb-5 flex items-center justify-between gap-3.5">
                  <div>
                    <div className="mb-2 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-secondary">
                      Today at Cedar
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      Free assessment → custom learning plan
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Parents get a calm, clear next step — not a confusing
                      sales pitch.
                    </p>
                  </div>
                  <div className="flex -space-x-2.5">
                    <span className="grid h-[42px] w-[42px] place-items-center rounded-full border-2 border-white bg-gradient-to-br from-primary to-blue-400 text-[0.82rem] font-bold text-white">
                      MA
                    </span>
                    <span className="grid h-[42px] w-[42px] place-items-center rounded-full border-2 border-white bg-gradient-to-br from-secondary to-emerald-400 text-[0.82rem] font-bold text-white">
                      RD
                    </span>
                    <span className="grid h-[42px] w-[42px] place-items-center rounded-full border-2 border-white bg-gradient-to-br from-accent to-amber-300 text-[0.82rem] font-bold text-accent-foreground">
                      WR
                    </span>
                  </div>
                </div>
                {/* Progress snapshot */}
                <div className="rounded-[20px] border border-primary/14 bg-gradient-to-b from-[#eef4ff] to-[#f8fbff] p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <strong className="text-sm">Progress snapshot</strong>
                    <span className="text-sm font-bold text-secondary">
                      On track
                    </span>
                  </div>
                  <div className="space-y-3">
                    {[82, 68, 91].map((pct) => (
                      <div
                        key={pct}
                        className="relative h-3 overflow-hidden rounded-full bg-primary/10"
                      >
                        <div
                          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-secondary"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Result card */}
              <div className="absolute bottom-[70px] left-6 z-10 w-[240px] rounded-3xl border border-white/60 bg-white/93 p-4.5 shadow-[0_24px_50px_rgba(15,23,42,0.18)] backdrop-blur-sm">
                <div className="mb-1 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-secondary">
                  Parent-friendly proof
                </div>
                <div className="mb-2.5 flex items-center justify-between">
                  <strong className="text-3xl leading-none text-foreground">
                    122+
                  </strong>
                  <div className="flex gap-1 text-accent">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-[0.85rem] text-muted-foreground">
                  Families consistently mention confidence growth, flexible
                  scheduling, safety, and thoughtful communication.
                </p>
              </div>

              {/* Schedule card (dark) */}
              <div className="absolute bottom-5 right-5 z-10 w-[190px] rounded-3xl border border-white/16 bg-[rgba(15,23,42,0.88)] p-4.5 shadow-[0_24px_50px_rgba(15,23,42,0.18)] backdrop-blur-sm">
                <h4 className="mb-2.5 text-sm font-semibold text-white/92">
                  Built for busy families
                </h4>
                <ul className="space-y-2 pl-4 text-[0.82rem] text-white/74">
                  <li>After-school and weekend options</li>
                  <li>Transportation within 5 miles</li>
                  <li>Progress updates parents can understand</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ PROOF BAR ══════ */}
      <section className="px-4 pb-2 md:px-6 lg:px-8" aria-label="Proof bar">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            {
              icon: Star,
              title: "5.0 Google Rating",
              desc: "Real parent reviews, not generic marketing copy.",
            },
            {
              icon: GraduationCap,
              title: "K–12 Programs",
              desc: "Support for foundational gaps, confidence, and growth.",
            },
            {
              icon: BarChart3,
              title: "1:3 Ratio",
              desc: "Small-group attention that still feels personal.",
            },
            {
              icon: Bus,
              title: "Transportation Available",
              desc: "Practical support that reduces after-school stress.",
            },
            {
              icon: MapPin,
              title: "Plano, TX",
              desc: "Local, community-rooted, and parent-trusted.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-3.5 rounded-xl border border-border/95 bg-white p-4 shadow-sm"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary/12 to-secondary/14 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <strong className="block text-sm text-foreground">
                  {title}
                </strong>
                <span className="text-[0.85rem] text-muted-foreground">
                  {desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ PROGRAMS ══════ */}
      <section
        id="programs"
        className="border-y border-border/70 bg-gradient-to-b from-[#f8fafc] to-[#f3f4f6] py-24"
      >
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-[720px] text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/8 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-primary">
              Programs overview
            </span>
            <h2 className="font-heading text-[clamp(2.25rem,4vw,3.25rem)] font-bold tracking-[-0.03em] text-foreground">
              Academic support designed for catch-up, confidence, and momentum.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Parents can self-identify quickly, compare options with ease, and
              move toward the right next step without feeling buried in dense
              copy.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROGRAMS.map(
              ({ title, grades, desc, outcome, icon: Icon, href }) => (
                <article
                  key={title}
                  className="group relative overflow-hidden rounded-2xl border border-border/95 bg-white/96 p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  {/* Top gradient bar on hover */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 transition-opacity group-hover:opacity-100" />

                  <div className="mb-4 flex items-start justify-between gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary/12 to-secondary/14 text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="inline-flex items-center rounded-full border border-secondary/16 bg-secondary/8 px-2.5 py-1 text-[0.76rem] font-bold text-secondary">
                      {grades}
                    </span>
                  </div>

                  <h3 className="mb-2.5 text-xl font-semibold text-foreground">
                    {title}
                  </h3>
                  <p className="mb-4 text-[0.95rem] text-muted-foreground">
                    {desc}
                  </p>

                  <div className="flex items-center justify-between gap-3 border-t border-border/80 pt-4 text-[0.9rem] text-muted-foreground">
                    <span>{outcome}</span>
                    <Link
                      href={href}
                      className="inline-flex shrink-0 items-center gap-2 font-semibold text-primary transition-all hover:gap-2.5"
                    >
                      Learn more
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              )
            )}
          </div>
        </div>
      </section>

      {/* ══════ HOW IT WORKS ══════ */}
      <section id="how-it-works" className="py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-[720px] text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/8 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-primary">
              How it works
            </span>
            <h2 className="font-heading text-[clamp(2.25rem,4vw,3.25rem)] font-bold tracking-[-0.03em] text-foreground">
              A simple enrollment journey that feels organized, supportive, and
              low-pressure.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Parents should know what happens next before they click. Clear
              process builds confidence and reduces hesitation.
            </p>
          </div>

          <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Connecting line (desktop only) */}
            <div className="pointer-events-none absolute left-[84px] right-[84px] top-[46px] hidden h-0.5 bg-gradient-to-r from-primary/20 to-secondary/22 lg:block" />

            {STEPS.map(({ num, title, desc }) => (
              <article
                key={num}
                className="relative z-[1] rounded-2xl border border-border/95 bg-gradient-to-b from-white to-[#f8fbff] p-7 shadow-sm"
              >
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-b from-primary to-[#1d4ed8] text-base font-extrabold text-white shadow-[0_10px_18px_rgba(37,99,235,0.18)]">
                  {num}
                </div>
                <h3 className="mb-2.5 text-xl font-semibold text-foreground">
                  {title}
                </h3>
                <p className="text-[0.95rem] text-muted-foreground">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ WHY CEDAR ══════ */}
      <section
        id="why-cedar"
        className="border-y border-border/70 bg-gradient-to-b from-[#f8fafc] to-[#f3f4f6] py-24"
      >
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-[720px] text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/8 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-primary">
              Why Cedar
            </span>
            <h2 className="font-heading text-[clamp(2.25rem,4vw,3.25rem)] font-bold tracking-[-0.03em] text-foreground">
              The differentiators parents actually care about, surfaced clearly
              and intentionally.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Cedar&apos;s strongest value is not just tutoring — it&apos;s the
              combination of warmth, structure, trust, and practical support for
              real family life.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map(({ icon: Icon, title, desc, checks }) => (
              <article
                key={title}
                className="rounded-2xl border border-border/95 bg-gradient-to-b from-white/98 to-[#f8fafc]/96 p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary/12 to-secondary/14 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mb-2.5 text-xl font-semibold text-foreground">
                  {title}
                </h3>
                <p className="text-[0.95rem] text-muted-foreground">{desc}</p>
                <ul className="mt-4 space-y-2.5">
                  {checks.map((c) => (
                    <li
                      key={c}
                      className="flex items-start gap-2.5 text-[0.95rem] text-muted-foreground"
                    >
                      <span className="mt-0.5 grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full bg-secondary/12 text-secondary">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ TESTIMONIALS ══════ */}
      <section id="testimonials" className="py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-[720px] text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/8 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-primary">
              Parent proof
            </span>
            <h2 className="font-heading text-[clamp(2.25rem,4vw,3.25rem)] font-bold tracking-[-0.03em] text-foreground">
              What parents describe most often: confidence, communication, and
              visible progress.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Cedar&apos;s testimonials are one of its strongest brand assets, so
              this section feels warm, specific, and grounded in real parent
              concerns.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map(
              ({ quote, author, relation, initials, badge, rating }) => (
                <article
                  key={author}
                  className="relative rounded-2xl border border-border/95 bg-gradient-to-b from-white/94 to-[#f8fafc]/94 p-7 shadow-sm"
                >
                  {/* Decorative quote mark */}
                  <span className="pointer-events-none absolute right-5 top-4 font-heading text-[5rem] leading-none text-primary/12 select-none">
                    &ldquo;
                  </span>

                  {/* Stars & badge */}
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex gap-1 text-accent">
                      {Array.from({ length: rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    {badge && (
                      <span className="rounded-full border border-accent/28 bg-accent/16 px-2.5 py-1 text-[0.75rem] font-bold text-accent-foreground">
                        {badge}
                      </span>
                    )}
                  </div>

                  <p className="mb-5 text-[0.95rem] leading-relaxed text-muted-foreground">
                    {quote}
                  </p>

                  <div className="flex items-center gap-3 border-t border-border/82 pt-4">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-bold text-white">
                      {initials}
                    </span>
                    <div>
                      <strong className="block text-sm text-foreground">
                        {author}
                      </strong>
                      <span className="text-[0.82rem] text-muted-foreground">
                        {relation}
                      </span>
                    </div>
                  </div>
                </article>
              )
            )}
          </div>
        </div>
      </section>

      {/* ══════ FINAL CTA ══════ */}
      <section
        id="contact"
        className="border-y border-border/70 bg-gradient-to-b from-[#f8fafc] to-[#f3f4f6] py-24"
      >
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#0f172a_0%,#1d4ed8_58%,#059669_140%)] p-10 shadow-[0_30px_80px_rgba(15,23,42,0.18)] md:p-12">
            {/* Decorative circles */}
            <div className="pointer-events-none absolute -right-20 -top-[120px] h-80 w-80 rounded-full bg-white/8" />
            <div className="pointer-events-none absolute -bottom-[100px] -left-[60px] h-[220px] w-[220px] rounded-full bg-white/8" />

            <div className="relative z-[1] grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              {/* Copy */}
              <div className="text-white">
                <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white/90">
                  Final call to action
                </span>
                <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] leading-tight">
                  Ready to find the right support for your child?
                </h2>
                <p className="mt-4 max-w-xl text-lg text-white/72">
                  Book a free assessment to identify learning gaps, recommend the
                  best-fit program, and map next steps with clarity.
                </p>
                <div className="mt-8 flex flex-wrap gap-3.5">
                  <Link
                    href="/book-assessment"
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "bg-white px-6 py-3 text-base font-semibold text-primary shadow-[0_10px_25px_rgba(37,99,235,0.18)] transition-all hover:-translate-y-px hover:bg-white/90"
                    )}
                  >
                    Book a Free Assessment
                  </Link>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "border-white/22 bg-transparent px-6 py-3 text-base font-semibold text-white transition-all hover:-translate-y-px hover:border-white/40 hover:bg-white/10"
                    )}
                  >
                    Email Cedar
                  </a>
                </div>
              </div>

              {/* Checklist card */}
              <aside className="rounded-3xl border border-white/16 bg-white/10 p-8 backdrop-blur-sm">
                <h3 className="mb-2 text-lg font-semibold text-white">
                  What families can expect next
                </h3>
                <p className="mb-6 text-sm text-white/60">
                  Designed to feel reassuring, practical, and easy to say yes
                  to.
                </p>
                <ul className="space-y-3">
                  {[
                    "Response within 24 hours",
                    "No obligation — just a free assessment",
                    "Support for K–12 programs, test prep, and homework help",
                    "Plano, TX center with transportation availability",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-white/80"
                    >
                      <span className="mt-0.5 grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full bg-white/12 text-white">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/12 pt-6">
                  <div>
                    <strong className="block text-sm text-white">
                      {SITE_CONFIG.email}
                    </strong>
                    <span className="text-xs text-white/50">
                      Email for availability and next steps
                    </span>
                  </div>
                  <div>
                    <strong className="block text-sm text-white">
                      {SITE_CONFIG.phone}
                    </strong>
                    <span className="text-xs text-white/50">
                      Call for immediate questions
                    </span>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
