import Image from "next/image";
import type { Metadata } from "next";
import { Bus, CarFront, Clock3, MapPin, Phone } from "lucide-react";

import type { LocationContent } from "@/types/content";

import { CTASection } from "@/components/shared/CTASection";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { getLocations } from "@/lib/content/collections";
import { getLocationsPageContent } from "@/lib/content/pages";
import { imagePath } from "@/lib/image-path";

const locationsPageContent = getLocationsPageContent();
const locations = getLocations();

function buildPageMetadata(): Metadata {
  return {
    title: locationsPageContent.seo.title,
    description: locationsPageContent.seo.description,
    openGraph: {
      title: locationsPageContent.seo.title,
      description: locationsPageContent.seo.description,
    },
  };
}

function formatAddress(location: LocationContent): string {
  return `${location.addressLine1}, ${location.city}, ${location.state} ${location.zip}`;
}

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata();
}

export default function LocationsPage() {
  return (
    <>
      <PageHero
        eyebrow={locationsPageContent.hero.eyebrow}
        heading={locationsPageContent.hero.heading}
        subtitle={locationsPageContent.hero.subtitle}
        breadcrumbs={[{ label: "Locations" }]}
      />

      <section className="px-4 py-16 md:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <Reveal>
            <div>
              <SectionHeading
                eyebrow={locationsPageContent.intro.eyebrow}
                heading={locationsPageContent.intro.heading}
                subtitle={locationsPageContent.intro.subtitle}
                align="left"
                className="mb-6"
              />
              <div className="text-muted-foreground space-y-5 text-base leading-8 md:text-lg">
                {locationsPageContent.intro.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <aside className="border-border bg-muted/45 rounded-3xl border p-6 shadow-sm sm:p-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
                  <Bus className="size-6" />
                </div>
                <div>
                  <p className="text-sm font-bold tracking-[0.14em] text-[hsl(var(--primary-text))] uppercase">
                    Transportation support
                  </p>
                  <p className="text-muted-foreground mt-3 text-base leading-7">
                    {locationsPageContent.intro.transportationNote}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="bg-card rounded-2xl p-4 shadow-sm">
                  <p className="text-foreground text-sm font-semibold">
                    After-school hours
                  </p>
                  <p className="text-muted-foreground mt-2 text-sm leading-6">
                    Evening availability is built around real homework, sports,
                    and family schedules.
                  </p>
                </div>
                <div className="bg-card rounded-2xl p-4 shadow-sm">
                  <p className="text-foreground text-sm font-semibold">
                    Weekend options
                  </p>
                  <p className="text-muted-foreground mt-2 text-sm leading-6">
                    Select locations also offer Saturday or Sunday sessions for
                    tighter school-week routines.
                  </p>
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="bg-muted/35 px-4 py-16 md:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={locationsPageContent.locationsSection.eyebrow}
            heading={locationsPageContent.locationsSection.heading}
            subtitle={locationsPageContent.locationsSection.subtitle}
          />

          <div className="grid gap-6 xl:grid-cols-3">
            {locations.map((location, index) => {
              const address = formatAddress(location);

              return (
                <Reveal key={location.id} delay={index * 0.05}>
                  <article className="border-border bg-card flex h-full flex-col overflow-hidden rounded-3xl border shadow-sm transition-shadow hover:shadow-md">
                    <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-[#0a5a8a] via-[#0d8ecf] to-[#2ea8dc]">
                      {location.image ? (
                        <Image
                          src={imagePath(location.image.src)}
                          alt={location.image.alt}
                          fill
                          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover"
                        />
                      ) : null}
                    </div>

                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-[hsl(var(--primary-text))]">
                            {location.city}, {location.state}
                          </p>
                          <h2 className="text-foreground mt-1 text-2xl font-bold">
                            {location.name}
                          </h2>
                        </div>
                        <span className="bg-accent/20 text-foreground rounded-full px-3 py-1 text-xs font-semibold">
                          {location.transportationAvailable
                            ? "Transportation available"
                            : "Self-dropoff"}
                        </span>
                      </div>

                      <dl className="text-muted-foreground mt-6 space-y-4 text-sm">
                        <div className="flex items-start gap-3">
                          <MapPin className="text-primary mt-0.5 size-4 shrink-0" />
                          <div>
                            <dt className="text-foreground font-semibold">
                              Address
                            </dt>
                            <dd>{address}</dd>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Phone className="text-primary mt-0.5 size-4 shrink-0" />
                          <div>
                            <dt className="text-foreground font-semibold">
                              Contact
                            </dt>
                            <dd>
                              <a
                                href={`tel:${location.phone.replace(/[^\d+]/g, "")}`}
                                className="transition-colors hover:text-[hsl(var(--primary-text))]"
                              >
                                {location.phone}
                              </a>
                            </dd>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Clock3 className="text-primary mt-0.5 size-4 shrink-0" />
                          <div>
                            <dt className="text-foreground font-semibold">
                              Hours
                            </dt>
                            <dd>
                              <ul className="space-y-1.5">
                                {location.hours.map((entry) => (
                                  <li
                                    key={`${location.id}-${entry.label}`}
                                    className="flex gap-2"
                                  >
                                    <span className="text-foreground min-w-20 font-medium">
                                      {entry.label}
                                    </span>
                                    <span>{entry.time}</span>
                                  </li>
                                ))}
                              </ul>
                            </dd>
                          </div>
                        </div>
                      </dl>

                      <div className="mt-6">
                        <p className="text-foreground text-sm font-semibold">
                          Service areas
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {location.serviceAreas.map((area) => (
                            <span
                              key={area}
                              className="border-border bg-muted text-muted-foreground rounded-full border px-3 py-1 text-xs font-medium"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="border-primary/25 bg-primary/5 mt-6 rounded-2xl border border-dashed p-4">
                        <p className="text-foreground text-sm font-semibold">
                          Map preview
                        </p>
                        <p className="text-muted-foreground mt-2 text-sm leading-6">
                          {address}
                        </p>
                        <p className="text-muted-foreground mt-2 text-xs leading-5">
                          A full map embed can be added later. For now, use
                          directions to open this location in Google Maps.
                        </p>
                      </div>

                      <div className="bg-muted/50 text-muted-foreground mt-6 rounded-2xl p-4 text-sm leading-6">
                        <div className="flex items-start gap-3">
                          <CarFront className="text-primary mt-0.5 size-4 shrink-0" />
                          <p>
                            {location.transportationAvailable
                              ? "Ask about Cedar transportation support for select nearby neighborhoods."
                              : "This location is ideal for families who prefer direct drop-off and pickup on-site."}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <a
                          href={location.mapUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-full px-4 py-3 text-sm font-semibold transition-colors"
                        >
                          Open in Maps
                        </a>
                        <a
                          href={`tel:${location.phone.replace(/[^\d+]/g, "")}`}
                          className="border-border bg-background text-foreground hover:border-primary/25 inline-flex items-center justify-center rounded-full border px-4 py-3 text-sm font-semibold transition-colors hover:text-[hsl(var(--primary-text))]"
                        >
                          Call this location
                        </a>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        heading={locationsPageContent.finalCta.heading}
        subtext={locationsPageContent.finalCta.subtext}
        primaryCta={locationsPageContent.finalCta.primaryCta}
        secondaryCta={locationsPageContent.finalCta.secondaryCta}
        trustBullets={locationsPageContent.finalCta.trustBullets}
      />
    </>
  );
}
