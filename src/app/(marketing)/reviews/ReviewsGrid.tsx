"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";

import type { FilterGroup, Testimonial } from "@/types/content";

import { cn } from "@/lib/utils";

interface ReviewTag {
  label: string;
  href: string;
}

interface ReviewsGridProps {
  filters: {
    eyebrow: string;
    heading: string;
    subtitle?: string;
    groups: FilterGroup[];
  };
  testimonials: Testimonial[];
  programTagMap: Record<string, ReviewTag>;
}

function getGradeLevelId(relation: string): string {
  const normalized = relation.toLowerCase();

  if (normalized.includes("middle school") || normalized.includes("8th") || normalized.includes("7th") || normalized.includes("6th")) {
    return "middle-school";
  }

  if (
    normalized.includes("high school") ||
    normalized.includes("12th") ||
    normalized.includes("11th") ||
    normalized.includes("10th") ||
    normalized.includes("9th") ||
    normalized.includes("sat") ||
    normalized.includes("act") ||
    normalized.includes("psat")
  ) {
    return "high-school";
  }

  if (
    normalized.includes("5th") ||
    normalized.includes("4th") ||
    normalized.includes("3rd") ||
    normalized.includes("2nd") ||
    normalized.includes("1st") ||
    normalized.includes("elementary")
  ) {
    return "elementary";
  }

  return "all-ages";
}

function formatMeta(relation: string, location?: string) {
  return location ? `${relation} • ${location}` : relation;
}

function getReviewTags(
  testimonial: Testimonial,
  programTagMap: Record<string, ReviewTag>,
) {
  return [...(testimonial.programSlugs ?? []), ...(testimonial.testPrepSlugs ?? [])]
    .map((slug) => programTagMap[slug])
    .filter((tag): tag is ReviewTag => tag !== undefined);
}

export function ReviewsGrid({
  filters,
  testimonials,
  programTagMap,
}: ReviewsGridProps) {
  const prefersReducedMotion = useReducedMotion();
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>(
    () =>
      Object.fromEntries(
        filters.groups.map((group) => [group.id, group.options[0]?.id ?? "all"]),
      ),
  );

  const filteredTestimonials = useMemo(() => {
    return testimonials.filter((testimonial) => {
      return filters.groups.every((group) => {
        const selected = selectedFilters[group.id] ?? "all";

        if (selected === "all") {
          return true;
        }

        if (group.id === "program") {
          return [
            ...(testimonial.programSlugs ?? []),
            ...(testimonial.testPrepSlugs ?? []),
          ].includes(selected);
        }

        if (group.id === "grade-level") {
          return getGradeLevelId(testimonial.relation) === selected;
        }

        return true;
      });
    });
  }, [filters.groups, selectedFilters, testimonials]);

  return (
    <div className="space-y-10">
      <div className="rounded-3xl border border-border bg-card/80 p-5 shadow-sm backdrop-blur-sm sm:p-6">
        <div className="max-w-3xl">
          <span className="inline-block text-xs font-bold tracking-[0.14em] text-[hsl(var(--primary-text))] uppercase">
            {filters.eyebrow}
          </span>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {filters.heading}
          </h2>
          {filters.subtitle ? (
            <p className="mt-3 text-base leading-7 text-muted-foreground md:text-lg">
              {filters.subtitle}
            </p>
          ) : null}
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
          {filters.groups.map((group) => (
            <div key={group.id} className="space-y-3">
              <p className="text-sm font-semibold text-foreground">{group.label}</p>
              <div className="flex flex-wrap gap-2">
                {group.options.map((option) => {
                  const isActive = selectedFilters[group.id] === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() =>
                        setSelectedFilters((current) => ({
                          ...current,
                          [group.id]: option.id,
                        }))
                      }
                      className={cn(
                        "focus-visible:ring-primary/35 focus-visible:ring-offset-background rounded-full border px-3.5 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                        isActive
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:text-[hsl(var(--primary-text))]",
                      )}
                      aria-pressed={isActive}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="rounded-2xl bg-muted/60 px-4 py-3 text-sm text-muted-foreground lg:justify-self-end">
            Showing <span className="font-semibold text-foreground">{filteredTestimonials.length}</span> of {testimonials.length} reviews
          </div>
        </div>
      </div>

      <div className="columns-1 gap-6 md:columns-2 xl:columns-3">
        {filteredTestimonials.map((testimonial, index) => {
          const tags = getReviewTags(testimonial, programTagMap);
          const initials = testimonial.author
            .split(" ")
            .map((part) => part[0])
            .join("");

          return (
            <motion.article
              key={testimonial.id}
              className="mb-6 break-inside-avoid rounded-3xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 18 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: prefersReducedMotion ? 0 : index * 0.03 }}
            >
              <div className="from-primary via-accent to-[hsl(var(--brand-red))] -mx-6 -mt-6 mb-5 h-1 rounded-t-3xl bg-gradient-to-r" />
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-1 text-accent">
                  {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                    <Star key={starIndex} className="size-4 fill-current" />
                  ))}
                </div>
                {testimonial.badge ? (
                  <span className="rounded-full bg-[hsl(var(--brand-red)/0.12)] px-2.5 py-1 text-xs font-semibold text-[hsl(var(--brand-red))]">
                    {testimonial.badge}
                  </span>
                ) : null}
              </div>

              <blockquote className="mt-4 text-base leading-8 text-muted-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {tags.length ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Link
                      key={`${testimonial.id}-${tag.href}`}
                      href={tag.href}
                      className="rounded-full bg-primary/8 px-3 py-1 text-xs font-semibold text-[hsl(var(--primary-text))] transition-colors hover:bg-primary/14"
                    >
                      {tag.label}
                    </Link>
                  ))}
                </div>
              ) : null}

              <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-[hsl(var(--primary-text))]">
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatMeta(testimonial.relation, testimonial.location)}
                  </p>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
