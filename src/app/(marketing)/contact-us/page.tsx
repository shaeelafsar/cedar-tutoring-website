import type { Metadata } from "next";
import { Clock3, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";

import { CTASection } from "@/components/shared/CTASection";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { getContactPageContent } from "@/lib/content/pages";
import { SITE_CONFIG } from "@/lib/constants";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

const contactContent = getContactPageContent();

const iconMap: Record<string, LucideIcon> = {
  MapPin,
  Phone,
  Mail,
};

const contactStructuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: contactContent.seo.title,
  description: contactContent.seo.description,
  url: absoluteUrl("/contact-us"),
  mainEntity: {
    "@type": "EducationalOrganization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.state,
      postalCode: SITE_CONFIG.address.zip,
      addressCountry: "US",
    },
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: contactContent.seo.title,
    description: contactContent.seo.description,
    path: "/contact-us",
  });
}

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactStructuredData} />
      <PageHero
        eyebrow={contactContent.hero.eyebrow}
        heading={contactContent.hero.heading}
        subtitle={contactContent.hero.subtitle}
        breadcrumbs={[{ label: "Contact" }]}
      />

      <section className="px-4 py-16 md:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <SectionHeading
              eyebrow="Reach us"
              heading={contactContent.contactCard.heading}
              align="left"
            />
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-3">
            {contactContent.contactCard.details.map((detail, index) => {
              const Icon = iconMap[detail.iconName] ?? MapPin;
              const inner = (
                <>
                  <div className="bg-primary/10 text-primary inline-flex h-12 w-12 items-center justify-center rounded-2xl">
                    <Icon className="size-5" />
                  </div>
                  <p className="text-muted-foreground mt-4 text-xs font-bold uppercase tracking-[0.14em]">
                    {detail.label}
                  </p>
                  <p className="text-foreground mt-2 text-base font-semibold leading-7">
                    {detail.primary}
                  </p>
                  {detail.secondary ? (
                    <p className="text-muted-foreground text-sm leading-6">
                      {detail.secondary}
                    </p>
                  ) : null}
                </>
              );

              return (
                <Reveal key={detail.label} delay={index * 0.05} className="h-full">
                  {detail.href ? (
                    <a
                      href={detail.href}
                      className="border-border bg-card hover:border-primary/30 flex h-full flex-col rounded-3xl border p-6 shadow-sm transition-colors sm:p-7"
                      target={detail.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        detail.href.startsWith("http") ? "noopener noreferrer" : undefined
                      }
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="border-border bg-card flex h-full flex-col rounded-3xl border p-6 shadow-sm sm:p-7">
                      {inner}
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.1}>
            <div className="border-border bg-card mt-8 rounded-3xl border p-6 shadow-sm sm:p-8">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 text-primary inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
                  <Clock3 className="size-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-foreground text-lg font-bold">
                    {contactContent.contactCard.hoursHeading}
                  </h3>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {contactContent.contactCard.hours.map((entry) => (
                      <li
                        key={entry.label}
                        className="bg-muted/50 flex items-center justify-between gap-3 rounded-xl px-4 py-3"
                      >
                        <span className="text-foreground text-sm font-semibold">
                          {entry.label}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          {entry.time}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-muted/35 px-4 py-16 md:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow={contactContent.cities.eyebrow}
            heading={contactContent.cities.heading}
            subtitle={contactContent.cities.subtitle}
          />

          <Reveal>
            <ul className="flex flex-wrap justify-center gap-2">
              {contactContent.cities.items.map((city) => (
                <li
                  key={city}
                  className="border-border bg-card text-foreground rounded-full border px-4 py-2 text-sm font-medium shadow-sm"
                >
                  {city}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CTASection
        heading={contactContent.finalCta.heading}
        subtext={contactContent.finalCta.subtext}
        primaryCta={contactContent.finalCta.primaryCta}
        secondaryCta={contactContent.finalCta.secondaryCta}
        trustBullets={contactContent.finalCta.trustBullets}
      />
    </>
  );
}
