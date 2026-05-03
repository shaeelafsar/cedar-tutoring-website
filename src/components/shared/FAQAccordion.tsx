"use client";

import { Fragment, useId, useState } from "react";
import { ChevronDown } from "lucide-react";

import type { FAQItem } from "@/types/content";

import { cn } from "@/lib/utils";

function renderAnswerBlocks(answer: string) {
  const blocks = answer
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  return blocks.map((block, index) => {
    const lines = block
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const isBulletList = lines.every((line) => line.startsWith("- "));

    if (isBulletList) {
      return (
        <ul key={index} className="space-y-2 pl-5 text-base leading-7 text-muted-foreground list-disc">
          {lines.map((line) => (
            <li key={line}>{line.replace(/^-\s*/, "")}</li>
          ))}
        </ul>
      );
    }

    return (
      <p key={index} className="text-base leading-7 text-muted-foreground">
        {lines.map((line, lineIndex) => (
          <Fragment key={`${index}-${lineIndex}`}>
            {line}
            {lineIndex < lines.length - 1 ? <br /> : null}
          </Fragment>
        ))}
      </p>
    );
  });
}

export function FAQAccordion({
  items,
  defaultOpen,
}: {
  items: FAQItem[];
  defaultOpen?: number;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    defaultOpen ?? null,
  );
  const baseId = useId();

  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-card/80 shadow-sm backdrop-blur-sm">
      {items.map((item, index) => {
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        const isOpen = openIndex === index;

        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                id={triggerId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="focus-visible:ring-primary/35 focus-visible:ring-offset-background flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-muted/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:px-6"
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span className="pr-2 text-base font-semibold text-foreground sm:text-lg">
                  {item.question}
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200",
                    isOpen && "rotate-180 text-[hsl(var(--primary-text))]",
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={cn(
                "grid transition-all duration-200 ease-in-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <div className="space-y-4 px-5 pb-5 sm:px-6 sm:pb-6">
                  {renderAnswerBlocks(item.answer)}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
