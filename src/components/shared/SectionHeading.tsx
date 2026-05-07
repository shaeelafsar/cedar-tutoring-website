import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  headingId?: string;
}

export function SectionHeading({
  eyebrow,
  heading,
  subtitle,
  align = "center",
  className,
  headingId,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        align === "center" && "text-center",
        "mb-10 max-w-3xl",
        align === "center" && "mx-auto",
        className
      )}
    >
      {eyebrow ? (
        <span className="mb-3 inline-block text-xs font-bold tracking-[0.14em] text-[hsl(var(--primary-text))] uppercase">
          {eyebrow}
        </span>
      ) : null}
      <h2
        id={headingId}
        className="font-heading text-foreground text-3xl font-bold tracking-tight md:text-4xl"
      >
        {heading}
      </h2>
      {subtitle ? (
        <p className="text-muted-foreground mt-3 text-lg leading-relaxed">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
