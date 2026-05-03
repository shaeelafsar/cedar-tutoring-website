import { cn } from "@/lib/utils";
import { Breadcrumbs } from "./Breadcrumbs";

interface PageHeroProps {
  eyebrow?: string;
  heading: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  decorative?: boolean;
  className?: string;
}

export function PageHero({
  eyebrow,
  heading,
  subtitle,
  breadcrumbs,
  decorative = true,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "via-primary relative overflow-hidden bg-gradient-to-br from-[#0a5a8a] to-[#2ea8dc] px-4 pt-10 pb-14 text-white md:px-6 md:pt-14 md:pb-20 lg:px-8",
        className
      )}
    >
      {decorative ? (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 -right-16 h-48 w-48 rounded-full bg-white/8 blur-3xl md:h-56 md:w-56" />
          <div className="bg-accent/15 absolute bottom-0 -left-12 h-40 w-40 rounded-full blur-3xl md:h-48 md:w-48" />
          <div className="absolute top-[24%] right-[14%] hidden h-28 w-28 rounded-full border border-white/12 md:block" />
        </div>
      ) : null}

      <div className="relative mx-auto max-w-4xl text-center">
        {breadcrumbs ? (
          <Breadcrumbs items={breadcrumbs} variant="inverse" />
        ) : null}

        {eyebrow ? (
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.14em] text-white/90 uppercase">
            <span className="bg-accent h-1.5 w-1.5 rounded-full" />
            {eyebrow}
          </span>
        ) : null}

        <h1 className="font-heading text-[clamp(2rem,4vw,3.5rem)] leading-[1.08] font-bold tracking-[-0.03em] text-white">
          {heading}
        </h1>

        {subtitle ? (
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
