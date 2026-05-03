import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface CTAAction {
  label: string;
  href: string;
}

interface CTASectionProps {
  heading: string;
  subtext: string;
  primaryCta: CTAAction;
  secondaryCta?: CTAAction;
  trustBullets?: string[];
}

function CTAActionLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

export function CTASection({
  heading,
  subtext,
  primaryCta,
  secondaryCta,
  trustBullets,
}: CTASectionProps) {
  const fallbackSecondaryCta = {
    label: `Call ${SITE_CONFIG.phone}`,
    href: `tel:+1${SITE_CONFIG.phone.replace(/\D/g, "")}`,
  };
  const resolvedSecondaryCta = secondaryCta ?? fallbackSecondaryCta;

  return (
    <section className="bg-background px-4 py-14 sm:py-20 md:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="via-primary relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a5a8a] to-[#2ea8dc] px-4 py-10 text-center text-white sm:px-8 sm:py-14 md:px-12 md:py-16">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full border border-white/12" />
            <div className="absolute -bottom-10 -left-8 h-32 w-32 rounded-full border border-white/10" />
            <div className="bg-accent/12 absolute right-[18%] bottom-0 h-56 w-56 rounded-full blur-3xl" />
            <div className="absolute top-[18%] left-[12%] h-28 w-28 rounded-full bg-white/8 blur-3xl" />
          </div>

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.14em] text-white/90 uppercase">
              <span className="bg-accent h-1.5 w-1.5 rounded-full" />
              Get started
            </span>
            <h2 className="font-heading mt-5 text-[1.75rem] leading-8 font-bold tracking-[-0.03em] sm:text-4xl sm:leading-tight lg:text-5xl">
              {heading}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/80 md:text-lg">
              {subtext}
            </p>

            <div className="mt-7 flex flex-col items-stretch gap-3 sm:mt-9 sm:flex-row sm:items-center sm:justify-center">
              <CTAActionLink
                href={primaryCta.href}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-accent text-accent-foreground shadow-accent/25 hover:bg-accent/90 w-full justify-center px-7 font-bold shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"
                )}
              >
                {primaryCta.label}
                <ArrowRight className="size-4" />
              </CTAActionLink>
              <CTAActionLink
                href={resolvedSecondaryCta.href}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "w-full justify-center border-white/25 bg-white/5 px-7 font-semibold text-white backdrop-blur-sm hover:bg-white/15 hover:text-white sm:w-auto"
                )}
              >
                {resolvedSecondaryCta.label}
              </CTAActionLink>
            </div>

            {trustBullets?.length ? (
              <div className="mt-7 grid gap-2 text-left text-sm text-white/85 sm:mt-10 sm:grid-cols-2 sm:gap-3">
                {trustBullets.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2.5 rounded-xl bg-white/8 px-3 py-2.5 backdrop-blur-sm sm:px-4 sm:py-3"
                  >
                    <Check className="text-accent mt-0.5 size-4 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
