import { cn } from "@/lib/utils";
import { Breadcrumbs } from "./Breadcrumbs";

interface PageHeroProps {
  heading: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  className?: string;
}

export function PageHero({
  heading,
  subtitle,
  breadcrumbs,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-[linear-gradient(180deg,rgba(248,250,252,1),rgba(255,255,255,1))] px-4 pt-8 pb-12 md:px-6 md:pt-12 md:pb-16 lg:px-8",
        className,
      )}
    >
      {/* Decorative gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.06),transparent_50%)]" />

      <div className="relative mx-auto max-w-4xl text-center">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}

        <h1 className="font-heading text-[clamp(2rem,4vw,3.5rem)] leading-[1.12] font-bold tracking-[-0.02em] text-foreground">
          {heading}
        </h1>

        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
