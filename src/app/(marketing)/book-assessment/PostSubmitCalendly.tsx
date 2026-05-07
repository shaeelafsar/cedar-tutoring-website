"use client";

/**
 * PostSubmitCalendly — Calendly fast-track section shown after form submission.
 *
 * ISOLATION GUARANTEE (Constraint B from Shaeel):
 * This component is intentionally self-contained. Removing Cedar's Calendly
 * integration later requires only:
 *   1. Delete this file
 *   2. Remove the <PostSubmitCalendly> import + JSX in BookAssessmentPageClient.tsx
 *   3. No changes to form logic, success state, or validation
 *
 * The form success state (green checkmark, "Thanks [Name]!", what-happens-next
 * block) renders independently of this component.
 *
 * TODO(Asmah): If the Cedar Calendly event type has custom questions, map
 * additional form fields via the CalendlyInline url query params. The
 * CalendlyInline component accepts a `url` prop — append prefill params to the
 * Calendly URL before passing it in, e.g.:
 *   ?name=...&email=...&a1=StudentName&a2=GradeLevel
 * Calendly's prefill docs: https://help.calendly.com/hc/en-us/articles/223147027
 */

import { CalendlyInline } from "@/components/shared/CalendlyInline";

interface PostSubmitCalendlyProps {
  /** Calendly event URL, e.g. "https://calendly.com/cedartutoring" */
  calendlyUrl: string;
  form: {
    parentName: string;
    email: string;
    studentName: string;
    gradeLevel: string;
  };
}

/**
 * Build a Calendly URL with name + email prefilled to avoid duplicate data
 * entry (Constraint A from Shaeel). Student name and grade are passed as
 * custom answer slots a1/a2.
 *
 * TODO: Confirm Cedar's Calendly event type has custom questions a1 (Student
 * Name) and a2 (Grade Level) enabled. If not, remove customAnswers params —
 * Calendly silently ignores unknown params but they clutter the URL.
 */
function buildPrefillUrl(
  baseUrl: string,
  form: PostSubmitCalendlyProps["form"]
): string {
  try {
    const url = new URL(baseUrl);
    if (form.parentName) url.searchParams.set("name", form.parentName);
    if (form.email) url.searchParams.set("email", form.email);
    // Custom question slots — verify these match Cedar's Calendly event config
    if (form.studentName) url.searchParams.set("a1", form.studentName);
    if (form.gradeLevel) url.searchParams.set("a2", form.gradeLevel);
    return url.toString();
  } catch {
    return baseUrl;
  }
}

export function PostSubmitCalendly({ calendlyUrl, form }: PostSubmitCalendlyProps) {
  const prefillUrl = buildPrefillUrl(calendlyUrl, form);

  return (
    <section
      aria-labelledby="post-submit-calendly-heading"
      className="bg-muted/20 px-4 py-12 md:px-6 lg:px-8 lg:py-16"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-bold tracking-[0.14em] text-[hsl(var(--primary-text))] uppercase">
            Optional — fast track
          </p>
          <h2
            id="post-submit-calendly-heading"
            className="text-foreground mt-3 text-2xl font-bold tracking-tight md:text-3xl"
          >
            Or pick a time now
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-xl text-base leading-7">
            See open slots for free assessments this week. You can book a time
            directly—or we&apos;ll reach out within 24 hours. Your choice.
          </p>
        </div>

        <CalendlyInline
          url={prefillUrl}
          fallbackPhone="+1 708 890-4400"
          className="mx-auto max-w-3xl"
        />

        <p className="text-muted-foreground mt-6 text-center text-sm">
          Can&apos;t find a time that works? No worries — Cedar will call you
          within 24 hours of your submission.
        </p>
      </div>
    </section>
  );
}
