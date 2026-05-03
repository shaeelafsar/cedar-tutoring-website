import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Users, Star, Bus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/[0.08] via-secondary/[0.06] to-accent/[0.06] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/8 px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary">
              <GraduationCap className="h-4 w-4" />
              K-12 Tutoring in Plano, TX
            </span>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Where Every Student{" "}
              <span className="text-primary">Thrives</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
              Personalized academic support in Math, Reading, Writing, Science,
              and Test Prep. Small groups, real teachers, measurable results.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/book-assessment"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-gradient-to-b from-primary to-primary/90 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-px transition-all text-base"
                )}
              >
                Book a Free Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/programs"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-primary/20 text-primary hover:bg-primary hover:text-white transition-all text-base"
                )}
              >
                Explore Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Bar */}
      <section className="border-y border-border bg-white py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-4 text-sm md:justify-between md:gap-4 md:px-6 lg:px-8">
          {[
            { icon: Star, label: "5.0 Google Rating" },
            { icon: Users, label: "122+ Reviews" },
            { icon: GraduationCap, label: "K-12 All Subjects" },
            { icon: Users, label: "1:3 Student-Tutor Ratio" },
            { icon: Bus, label: "Free Transportation" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <Icon className="h-4 w-4 text-primary" />
              <span className="font-medium">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Programs Preview Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/8 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
              Our Programs
            </span>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Academic Programs That{" "}
              <span className="text-primary">Deliver Results</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              From foundational skills to advanced test prep, we build
              confidence and competence in every subject.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Math", desc: "Arithmetic to calculus, grade-level mastery" },
              { title: "Reading", desc: "Comprehension, fluency, and critical analysis" },
              { title: "Writing", desc: "Grammar, essays, and creative expression" },
              { title: "Science", desc: "Concepts, labs, and exam preparation" },
              { title: "Test Prep", desc: "SAT, ACT, and PSAT score improvement" },
              { title: "Arabic", desc: "Language fundamentals and advanced literacy" },
            ].map(({ title, desc }) => (
              <div
                key={title}
                className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-foreground">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                <Link
                  href="/programs"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center md:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
            Ready to See Your Child Succeed?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
            Start with a free academic assessment. We&apos;ll create a
            personalized plan tailored to your child&apos;s needs.
          </p>
          <Link
            href="/book-assessment"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "mt-8 border-white/30 bg-white text-primary hover:bg-white/90 text-base font-semibold"
            )}
          >
            Book a Free Assessment
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
