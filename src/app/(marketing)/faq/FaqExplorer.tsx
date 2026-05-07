"use client";

import { useMemo, useState } from "react";

import type { CategorizedFAQItem } from "@/types/content";

import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { cn } from "@/lib/utils";

interface FaqExplorerProps {
  categories: string[];
  items: CategorizedFAQItem[];
}

export function FaqExplorer({ categories, items }: FaqExplorerProps) {
  const [activeCategory, setActiveCategory] = useState(
    categories.includes("General") ? "General" : (categories[0] ?? "All"),
  );

  const visibleItems = useMemo(() => {
    if (activeCategory === "All") {
      return items;
    }

    return items.filter((item) => item.category === activeCategory);
  }, [activeCategory, items]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="FAQ categories">
        {categories.map((category) => {
          const isActive = activeCategory === category;

          return (
            <button
              key={category}
              type="button"
              role="tab"
              id={`faq-tab-${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              aria-selected={isActive}
              aria-controls={`faq-panel-${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "focus-visible:ring-primary/35 focus-visible:ring-offset-background rounded-full border px-4 py-2.5 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                isActive
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:text-[hsl(var(--primary-text))]",
              )}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`faq-panel-${activeCategory.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
        aria-labelledby={`faq-tab-${activeCategory.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
        className="space-y-4"
      >
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{visibleItems.length}</span> answers in {activeCategory}.
        </p>
        <FAQAccordion key={activeCategory} items={visibleItems} defaultOpen={0} />
      </div>
    </div>
  );
}
