"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

import type { PricingSubTier } from "@/types/content";

interface PricingCardInteractiveProps {
  name: string;
  cadence: string;
  description: string;
  features: string[];
  badge?: string;
  highlighted?: boolean;
  subTiers: PricingSubTier[];
  defaultSubTierIndex?: number;
}

export function PricingCardInteractive({
  name,
  cadence,
  description,
  features,
  badge,
  highlighted = false,
  subTiers,
  defaultSubTierIndex = 0,
}: PricingCardInteractiveProps) {
  const [selectedIndex, setSelectedIndex] = useState(defaultSubTierIndex);
  const selected = subTiers[selectedIndex];

  return (
    <article
      className={[
        "bg-card relative flex h-full flex-col rounded-3xl border p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8",
        highlighted
          ? "border-accent/70 ring-accent/30 shadow-accent/10 ring-2"
          : "border-border",
      ].join(" ")}
    >
      {badge ? (
        <span
          className={[
            "mb-5 inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold uppercase",
            highlighted
              ? "bg-[hsl(var(--brand-red))] text-white"
              : "bg-primary/10 text-[hsl(var(--primary-text))]",
          ].join(" ")}
        >
          {badge}
        </span>
      ) : null}

      <div>
        <h2 className="text-foreground text-2xl font-bold">{name}</h2>

        <div
          className="mt-4 flex flex-wrap gap-2"
          role="group"
          aria-label="Sessions per week"
        >
          {subTiers.map((tier, index) => (
            <button
              key={tier.sessionsPerWeek}
              type="button"
              onClick={() => setSelectedIndex(index)}
              aria-pressed={index === selectedIndex}
              className={[
                "rounded-full px-3 py-1.5 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
                index === selectedIndex
                  ? highlighted
                    ? "bg-primary text-primary-foreground focus-visible:ring-primary"
                    : "bg-foreground text-background focus-visible:ring-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/70 focus-visible:ring-foreground",
              ].join(" ")}
            >
              {tier.sessionsPerWeek}/week
            </button>
          ))}
        </div>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-foreground text-4xl font-bold tracking-tight">
            {selected.price}
          </span>
          <span className="text-muted-foreground text-sm font-medium">
            {cadence}
          </span>
        </div>
        <p className="text-muted-foreground mt-1 text-sm">
          {selected.sessionsPerWeek} sessions / week
        </p>

        <p className="text-muted-foreground mt-4 text-sm leading-7 sm:text-base">
          {description}
        </p>
      </div>

      <ul className="mt-6 space-y-3">
        {features.map((feature) => (
          <li
            key={feature}
            className="text-muted-foreground flex items-start gap-3 text-sm leading-6"
          >
            <Check
              className={[
                "mt-1 size-4 shrink-0",
                highlighted ? "text-[hsl(var(--brand-red))]" : "text-primary",
              ].join(" ")}
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <a
          href="/book-assessment/"
          className={[
            "inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition-all",
            highlighted
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "border-border bg-background text-foreground hover:border-primary/25 border hover:text-[hsl(var(--primary-text))]",
          ].join(" ")}
        >
          Book a Free Assessment
          <ArrowRight className="size-4" />
        </a>
      </div>
    </article>
  );
}
