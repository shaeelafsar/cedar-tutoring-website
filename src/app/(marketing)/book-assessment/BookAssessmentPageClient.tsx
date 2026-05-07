"use client";

import Image from "next/image";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
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
  LocationContent,
  Testimonial,
} from "@/types/content";

import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { SiteConfig } from "@/lib/content/site";
import { imagePath } from "@/lib/image-path";
import { cn } from "@/lib/utils";

import { PostSubmitCalendly } from "./PostSubmitCalendly";

const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";

interface ProgramOption {
  id: string;
  label: string;
}

interface BookAssessmentPageClientProps {
  pageContent: BookAssessmentPageContent;
  locations: LocationContent[];
  programOptions: ProgramOption[];
  siteConfig: SiteConfig;
  testimonials: Testimonial[];
  calendlyUrl: string;
}

type ContactMethod = "phone" | "email" | "either";

type FormState = {
  parentName: string;
  email: string;
  phone: string;
  studentName: string;
  gradeLevel: string;
  programInterests: string[];
  preferredLocation: string;
  additionalNotes: string;
  preferredContactMethod: ContactMethod;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const gradeOptions = [
  "Kindergarten",
  "1st Grade",
  "2nd Grade",
  "3rd Grade",
  "4th Grade",
  "5th Grade",
  "6th Grade",
  "7th Grade",
  "8th Grade",
  "9th Grade",
  "10th Grade",
  "11th Grade",
  "12th Grade",
];

const initialFormState: FormState = {
  parentName: "",
  email: "",
  phone: "",
  studentName: "",
  gradeLevel: "",
  programInterests: [],
  preferredLocation: "",
  additionalNotes: "",
  preferredContactMethod: "either",
};

const stepIconMap: Record<string, LucideIcon> = {
  "file-pen-line": FilePenLine,
  "phone-call": PhoneCall,
  "clipboard-check": ClipboardCheck,
  sparkles: Sparkles,
};

function getInputClassName(hasError: boolean) {
  return cn(
    "focus-visible:ring-primary/35 focus-visible:border-primary block w-full rounded-2xl border bg-white px-4 py-3.5 text-base text-foreground shadow-sm outline-none transition placeholder:text-muted-foreground/80 focus-visible:ring-4",
    hasError
      ? "border-destructive/70 bg-destructive/5"
      : "border-border hover:border-primary/25"
  );
}

function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validatePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10;
}

function formatPhoneHref(value: string) {
  return `tel:+1${value.replace(/\D/g, "")}`;
}

function validateForm(form: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!form.parentName.trim()) {
    errors.parentName = "Please enter a parent or guardian name.";
  }

  if (!form.email.trim()) {
    errors.email = "Please enter an email address.";
  } else if (!validateEmail(form.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!form.phone.trim()) {
    errors.phone = "Please enter a phone number.";
  } else if (!validatePhone(form.phone.trim())) {
    errors.phone = "Enter a valid phone number with area code.";
  }

  if (!form.studentName.trim()) {
    errors.studentName = "Please enter your student's name.";
  }

  if (!form.gradeLevel) {
    errors.gradeLevel = "Please choose a grade level.";
  }

  if (form.programInterests.length === 0) {
    errors.programInterests = "Select at least one area of interest.";
  }

  return errors;
}

function normalizeSubmission(form: FormState): FormState {
  return {
    ...form,
    parentName: form.parentName.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    studentName: form.studentName.trim(),
    additionalNotes: form.additionalNotes.trim(),
  };
}

export function BookAssessmentPageClient({
  pageContent,
  locations,
  programOptions,
  siteConfig,
  testimonials,
  calendlyUrl,
}: BookAssessmentPageClientProps) {
  const prefersReducedMotion = useReducedMotion();
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);
  const parentNameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const studentNameRef = useRef<HTMLInputElement | null>(null);
  const gradeLevelRef = useRef<HTMLSelectElement | null>(null);
  const programInterestsRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isSubmitted) {
      successRef.current?.focus();
    }
  }, [isSubmitted]);

  function focusField(field: keyof FormState) {
    switch (field) {
      case "parentName":
        parentNameRef.current?.focus();
        break;
      case "email":
        emailRef.current?.focus();
        break;
      case "phone":
        phoneRef.current?.focus();
        break;
      case "studentName":
        studentNameRef.current?.focus();
        break;
      case "gradeLevel":
        gradeLevelRef.current?.focus();
        break;
      case "programInterests":
        programInterestsRef.current?.focus();
        break;
      default:
        break;
    }
  }

  function updateField<K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) {
    setFormState((current) => ({ ...current, [field]: value }));

    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  }

  function toggleProgramInterest(programId: string) {
    setFormState((current) => {
      const alreadySelected = current.programInterests.includes(programId);
      const programInterests = alreadySelected
        ? current.programInterests.filter((item) => item !== programId)
        : [...current.programInterests, programId];

      return { ...current, programInterests };
    });

    if (errors.programInterests) {
      setErrors((current) => ({ ...current, programInterests: undefined }));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitAttempted(true);
    setSubmitError(null);

    const normalized = normalizeSubmission(formState);
    const nextErrors = validateForm(normalized);

    setFormState(normalized);
    setErrors(nextErrors);

    const firstErrorField = Object.keys(nextErrors)[0] as
      | keyof FormState
      | undefined;

    if (firstErrorField) {
      focusField(firstErrorField);
      return;
    }

    setIsSubmitting(true);

    try {
      if (!WEB3FORMS_ACCESS_KEY) {
        setSubmitError(
          "Form temporarily unavailable — please call us at +1 708 890-4400 or email Info@cedartutoring.com"
        );
        return;
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "Cedar Tutoring — Free Assessment Request",
          from_name: "Cedar Tutoring Website",
          name: normalized.parentName,
          email: normalized.email,
          phone: normalized.phone,
          student_name: normalized.studentName,
          grade_level: normalized.gradeLevel,
          program_interests: normalized.programInterests.join(", "),
          preferred_location: normalized.preferredLocation || "No preference",
          preferred_contact_method: normalized.preferredContactMethod,
          additional_notes: normalized.additionalNotes || "None",
          botcheck: "",
        }),
      });

      const data = (await response.json()) as { success: boolean; message?: string };

      if (response.ok && data.success) {
        setIsSubmitted(true);
        setErrors({});
      } else {
        setSubmitError(
          data.message ??
            "Something went wrong. Please call us at +1 708 890-4400 or email Info@cedartutoring.com"
        );
      }
    } catch {
      setSubmitError(
        "Unable to submit — please call us at +1 708 890-4400 or email Info@cedartutoring.com"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow={pageContent.hero.eyebrow}
        heading={pageContent.hero.heading}
        subtitle={pageContent.hero.subtitle}
        breadcrumbs={[{ label: "Book Assessment" }]}
      />

      <section className="bg-muted/30 px-4 py-16 md:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:items-start">
          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="xl:order-2"
          >
            <section
              aria-labelledby="assessment-form-heading"
              className="border-border bg-card rounded-[2rem] border p-6 shadow-sm sm:p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold tracking-[0.14em] text-[hsl(var(--primary-text))] uppercase">
                    {pageContent.formIntro.eyebrow}
                  </p>
                  <h2
                    id="assessment-form-heading"
                    className="text-foreground mt-3 text-3xl font-bold tracking-tight"
                  >
                    {pageContent.formIntro.heading}
                  </h2>
                  <p className="text-muted-foreground mt-3 max-w-2xl text-base leading-7">
                    {pageContent.formIntro.subtitle}
                  </p>
                </div>
                <div className="bg-accent/18 text-foreground inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
                  <BadgeCheck className="size-4 text-[hsl(var(--primary-text))]" />
                  {pageContent.formIntro.responsePromise}
                </div>
              </div>

              <div className="border-primary/20 bg-primary/5 text-muted-foreground mt-6 rounded-2xl border p-4 text-sm leading-6">
                <p>
                  <span className="text-foreground font-semibold">
                    {pageContent.formIntro.reassurance}
                  </span>{" "}
                  <a
                    href={formatPhoneHref(siteConfig.phone)}
                    className="font-semibold text-[hsl(var(--primary-text))] underline-offset-4 hover:underline"
                  >
                    {siteConfig.phone}
                  </a>
                </p>
              </div>

              {isSubmitted ? (
                <motion.div
                  ref={successRef}
                  tabIndex={-1}
                  role="status"
                  aria-live="polite"
                  initial={
                    prefersReducedMotion ? undefined : { opacity: 0, y: 16 }
                  }
                  animate={
                    prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
                  }
                  className="border-success/25 bg-success/8 mt-8 rounded-[1.75rem] border p-6 shadow-sm outline-none sm:p-8"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    <div className="bg-success/14 text-success flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl">
                      <CheckCircle2 className="size-7" />
                    </div>
                    <div>
                      <p className="text-success text-sm font-bold tracking-[0.14em] uppercase">
                        Request received
                      </p>
                      <h3 className="text-foreground mt-3 text-3xl font-bold tracking-tight">
                        Thanks,{" "}
                        {formState.parentName
                          ? formState.parentName.split(" ")[0]
                          : ""}
                        ! We&apos;ll be in touch within 24 hours.
                      </h3>
                      <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-7">
                        We&apos;ve received your assessment request for{" "}
                        {formState.studentName || "your student"}. Here&apos;s
                        what happens next:
                      </p>

                      <ol className="mt-6 space-y-3">
                        {[
                          {
                            step: "1",
                            text: "Cedar reviews your submission and prepares for your child's needs.",
                          },
                          {
                            step: "2",
                            text: "A Cedar team member contacts you within 24 hours using your preferred method.",
                          },
                          {
                            step: "3",
                            text: "You schedule a free 30-minute assessment at a time that works for you.",
                          },
                          {
                            step: "4",
                            text: "We share a personalized learning plan — no pressure, no obligation.",
                          },
                        ].map((item) => (
                          <li
                            key={item.step}
                            className="bg-card/80 flex items-start gap-3 rounded-2xl border border-white/40 px-4 py-3 text-sm leading-6"
                          >
                            <span className="bg-success/20 text-success flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                              {item.step}
                            </span>
                            <span className="text-muted-foreground">
                              {item.text}
                            </span>
                          </li>
                        ))}
                      </ol>

                      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <a
                          href={formatPhoneHref(siteConfig.phone)}
                          className="bg-accent hover:bg-accent/90 text-accent-foreground inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-colors"
                        >
                          Call Cedar now
                          <PhoneCall className="size-4" />
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            setFormState(initialFormState);
                            setIsSubmitted(false);
                            setSubmitAttempted(false);
                            setSubmitError(null);
                          }}
                          className="border-border bg-background text-foreground hover:border-primary/25 inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold transition-colors hover:text-[hsl(var(--primary-text))]"
                        >
                          Submit another request
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <form
                  noValidate
                  onSubmit={handleSubmit}
                  className="mt-8 space-y-6"
                >
                  {/* Web3Forms honeypot anti-spam field — must be empty on submission */}
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} aria-hidden="true" tabIndex={-1} />
                  {submitAttempted && Object.keys(errors).length > 0 ? (
                    <div
                      role="alert"
                      className="border-destructive/20 bg-destructive/6 text-destructive rounded-2xl border px-4 py-3 text-sm leading-6"
                    >
                      Please fix the highlighted fields and try again.
                    </div>
                  ) : null}
                  {submitError ? (
                    <div
                      role="alert"
                      className="border-destructive/20 bg-destructive/6 text-destructive rounded-2xl border px-4 py-3 text-sm leading-6"
                    >
                      {submitError}
                    </div>
                  ) : null}

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <label
                        htmlFor="parentName"
                        className="text-foreground mb-2 block text-sm font-semibold"
                      >
                        Parent/Guardian name <span aria-hidden="true">*</span>
                      </label>
                      <input
                        ref={parentNameRef}
                        id="parentName"
                        name="parentName"
                        type="text"
                        autoComplete="name"
                        value={formState.parentName}
                        onChange={(event) =>
                          updateField("parentName", event.target.value)
                        }
                        aria-invalid={Boolean(errors.parentName)}
                        aria-describedby={
                          errors.parentName ? "parentName-error" : undefined
                        }
                        className={getInputClassName(
                          Boolean(errors.parentName)
                        )}
                        placeholder="Your full name"
                      />
                      {errors.parentName ? (
                        <p
                          id="parentName-error"
                          className="text-destructive mt-2 text-sm"
                        >
                          {errors.parentName}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="text-foreground mb-2 block text-sm font-semibold"
                      >
                        Email <span aria-hidden="true">*</span>
                      </label>
                      <input
                        ref={emailRef}
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        value={formState.email}
                        onChange={(event) =>
                          updateField("email", event.target.value)
                        }
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={
                          errors.email ? "email-error" : undefined
                        }
                        className={getInputClassName(Boolean(errors.email))}
                        placeholder="parent@example.com"
                      />
                      {errors.email ? (
                        <p
                          id="email-error"
                          className="text-destructive mt-2 text-sm"
                        >
                          {errors.email}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="text-foreground mb-2 block text-sm font-semibold"
                      >
                        Phone <span aria-hidden="true">*</span>
                      </label>
                      <input
                        ref={phoneRef}
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        value={formState.phone}
                        onChange={(event) =>
                          updateField("phone", event.target.value)
                        }
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={
                          errors.phone ? "phone-error" : undefined
                        }
                        className={getInputClassName(Boolean(errors.phone))}
                        placeholder="(708) 890-4400"
                      />
                      {errors.phone ? (
                        <p
                          id="phone-error"
                          className="text-destructive mt-2 text-sm"
                        >
                          {errors.phone}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="studentName"
                        className="text-foreground mb-2 block text-sm font-semibold"
                      >
                        Student name <span aria-hidden="true">*</span>
                      </label>
                      <input
                        ref={studentNameRef}
                        id="studentName"
                        name="studentName"
                        type="text"
                        autoComplete="off"
                        value={formState.studentName}
                        onChange={(event) =>
                          updateField("studentName", event.target.value)
                        }
                        aria-invalid={Boolean(errors.studentName)}
                        aria-describedby={
                          errors.studentName ? "studentName-error" : undefined
                        }
                        className={getInputClassName(
                          Boolean(errors.studentName)
                        )}
                        placeholder="Your child's name"
                      />
                      {errors.studentName ? (
                        <p
                          id="studentName-error"
                          className="text-destructive mt-2 text-sm"
                        >
                          {errors.studentName}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="gradeLevel"
                        className="text-foreground mb-2 block text-sm font-semibold"
                      >
                        Student grade level <span aria-hidden="true">*</span>
                      </label>
                      <select
                        ref={gradeLevelRef}
                        id="gradeLevel"
                        name="gradeLevel"
                        value={formState.gradeLevel}
                        onChange={(event) =>
                          updateField("gradeLevel", event.target.value)
                        }
                        aria-invalid={Boolean(errors.gradeLevel)}
                        aria-describedby={
                          errors.gradeLevel ? "gradeLevel-error" : undefined
                        }
                        className={getInputClassName(
                          Boolean(errors.gradeLevel)
                        )}
                      >
                        <option value="">Select a grade</option>
                        {gradeOptions.map((grade) => (
                          <option key={grade} value={grade}>
                            {grade}
                          </option>
                        ))}
                      </select>
                      {errors.gradeLevel ? (
                        <p
                          id="gradeLevel-error"
                          className="text-destructive mt-2 text-sm"
                        >
                          {errors.gradeLevel}
                        </p>
                      ) : null}
                    </div>

                    <div className="md:col-span-2">
                      <fieldset
                        aria-invalid={Boolean(errors.programInterests)}
                        aria-describedby={
                          errors.programInterests
                            ? "programInterests-error"
                            : undefined
                        }
                      >
                        <legend className="text-foreground mb-3 block text-sm font-semibold">
                          Program interest <span aria-hidden="true">*</span>
                        </legend>
                        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                          {programOptions.map((option, index) => {
                            const isChecked =
                              formState.programInterests.includes(option.id);

                            return (
                              <label
                                key={option.id}
                                className={cn(
                                  "flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3 transition-colors",
                                  isChecked
                                    ? "border-primary bg-primary/6"
                                    : "border-border bg-background hover:border-primary/25"
                                )}
                              >
                                <input
                                  ref={
                                    index === 0
                                      ? programInterestsRef
                                      : undefined
                                  }
                                  type="checkbox"
                                  name="programInterests"
                                  value={option.id}
                                  checked={isChecked}
                                  onChange={() =>
                                    toggleProgramInterest(option.id)
                                  }
                                  className="border-border text-primary focus-visible:ring-primary/35 mt-1 h-4 w-4 rounded focus-visible:ring-2"
                                />
                                <span className="text-foreground text-sm leading-6 font-medium">
                                  {option.label}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                        {errors.programInterests ? (
                          <p
                            id="programInterests-error"
                            className="text-destructive mt-2 text-sm"
                          >
                            {errors.programInterests}
                          </p>
                        ) : null}
                      </fieldset>
                    </div>

                    <div>
                      <label
                        htmlFor="preferredLocation"
                        className="text-foreground mb-2 block text-sm font-semibold"
                      >
                        Preferred location
                      </label>
                      <select
                        id="preferredLocation"
                        name="preferredLocation"
                        value={formState.preferredLocation}
                        onChange={(event) =>
                          updateField("preferredLocation", event.target.value)
                        }
                        className={getInputClassName(false)}
                      >
                        <option value="">Help me choose</option>
                        {locations.map((location) => (
                          <option key={location.id} value={location.name}>
                            {location.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <fieldset>
                        <legend className="text-foreground mb-2 block text-sm font-semibold">
                          Preferred contact method
                        </legend>
                        <div className="grid gap-3 sm:grid-cols-3">
                          {[
                            { value: "phone", label: "Phone" },
                            { value: "email", label: "Email" },
                            { value: "either", label: "Either" },
                          ].map((option) => {
                            const isChecked =
                              formState.preferredContactMethod === option.value;

                            return (
                              <label
                                key={option.value}
                                className={cn(
                                  "flex cursor-pointer items-center justify-center rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors",
                                  isChecked
                                    ? "border-primary bg-primary/6 text-[hsl(var(--primary-text))]"
                                    : "border-border bg-background text-foreground hover:border-primary/25"
                                )}
                              >
                                <input
                                  type="radio"
                                  name="preferredContactMethod"
                                  value={option.value}
                                  checked={isChecked}
                                  onChange={(event) =>
                                    updateField(
                                      "preferredContactMethod",
                                      event.target.value as ContactMethod
                                    )
                                  }
                                  className="sr-only"
                                />
                                {option.label}
                              </label>
                            );
                          })}
                        </div>
                      </fieldset>
                    </div>

                    <div className="md:col-span-2">
                      <label
                        htmlFor="additionalNotes"
                        className="text-foreground mb-2 block text-sm font-semibold"
                      >
                        Additional notes
                      </label>
                      <textarea
                        id="additionalNotes"
                        name="additionalNotes"
                        rows={5}
                        value={formState.additionalNotes}
                        onChange={(event) =>
                          updateField("additionalNotes", event.target.value)
                        }
                        className={cn(getInputClassName(false), "resize-y")}
                        placeholder="Tell us about academic goals, recent challenges, scheduling needs, or anything you'd like us to know before we call."
                      />
                    </div>
                  </div>

                  <div className="border-border flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-muted-foreground max-w-xl text-sm leading-6">
                      By submitting this form, you&apos;re requesting a
                      follow-up from Cedar. No payment information is required,
                      and there is no obligation to enroll.
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-accent text-accent-foreground shadow-accent/25 hover:bg-accent/90 inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-bold shadow-lg transition-all hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
                    >
                      {isSubmitting
                        ? "Saving your request..."
                        : "Book free assessment"}
                      <ArrowRight className="size-4" />
                    </button>
                  </div>
                </form>
              )}
            </section>
          </motion.div>

          <div className="space-y-6 xl:order-1">
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
                      “{testimonial.quote}”
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

      {/* Post-submit Calendly fast-track — additive, self-contained.
          To remove Calendly: delete PostSubmitCalendly.tsx + this block.
          The success state above is fully independent of this section. */}
      {isSubmitted && (
        <PostSubmitCalendly
          calendlyUrl={calendlyUrl}
          form={{
            parentName: formState.parentName,
            email: formState.email,
            studentName: formState.studentName,
            gradeLevel: formState.gradeLevel,
          }}
        />
      )}
    </>
  );
}
