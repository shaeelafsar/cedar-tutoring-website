import Link from "next/link";
import { TreePine, Phone, Mail, MapPin } from "lucide-react";
import { SITE_CONFIG, FOOTER_NAV, FOOTER_LEGAL_LINKS } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-foreground text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-3 no-underline"
            >
              <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-white/10">
                <TreePine className="h-6 w-6 text-white" />
              </span>
              <span>
                <strong className="block text-[0.95rem] tracking-wide">
                  {SITE_CONFIG.name}
                </strong>
                <span className="block text-[0.75rem] text-white/60">
                  {SITE_CONFIG.tagline}
                </span>
              </span>
            </Link>

            <div className="mt-6 space-y-1 text-sm text-white/70">
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/\D/g, "")}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-md py-2 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4" />
                {SITE_CONFIG.phone}
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-md py-2 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4" />
                {SITE_CONFIG.email}
              </a>
              <span className="flex min-h-11 items-center gap-2 py-2">
                <MapPin className="h-4 w-4 shrink-0" />
                {SITE_CONFIG.address.full}
              </span>
            </div>
          </div>

          {/* Programs Column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/90">
              Programs
            </h3>
            <ul className="space-y-0.5">
              {FOOTER_NAV.programs.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center rounded-md py-2 text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Test Prep Column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/90">
              Test Prep
            </h3>
            <ul className="space-y-0.5">
              {FOOTER_NAV.testPrep.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center rounded-md py-2 text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="mb-4 mt-8 text-sm font-semibold uppercase tracking-wider text-white/90">
              Company
            </h3>
            <ul className="space-y-0.5">
              {FOOTER_NAV.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center rounded-md py-2 text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / CTA Column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/90">
              Get Started
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-white/60">
              Book a free academic assessment for your child. We&apos;ll create
              a personalized learning plan tailored to their needs.
            </p>
            <Link
              href="/book-assessment"
              className="inline-flex w-full min-h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-white transition-all hover:bg-primary/90 hover:-translate-y-px md:w-auto"
            >
              Book a Free Assessment
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 md:flex-row">
          <span>
            © {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </span>
          {FOOTER_LEGAL_LINKS.length > 0 ? (
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {FOOTER_LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
