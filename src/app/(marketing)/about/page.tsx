import type { Metadata } from "next";
import Image from "next/image";
import { Award, BarChart3, HeartHandshake, Users } from "lucide-react";

import { CTASection } from "@/components/shared/CTASection";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { getTeamMembers } from "@/lib/content/collections";
import { getAboutPageContent } from "@/lib/content/pages";
import { imagePath } from "@/lib/image-path";
import { buildPageMetadata } from "@/lib/seo";

const aboutPageContent = getAboutPageContent();
const teamMembers = getTeamMembers();

const iconMap = {
  users: Users,
  "heart-handshake": HeartHandshake,
  "bar-chart-3": BarChart3,
  award: Award,
} as const;

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: aboutPageContent.seo.title,
    description: aboutPageContent.seo.description,
    path: "/about",
  });
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={aboutPageContent.hero.eyebrow}
        heading={aboutPageContent.hero.heading}
        subtitle={aboutPageContent.hero.subtitle}
        breadcrumbs={[{ label: "About" }]}
      />

      <section className="bg-accent px-4 py-4 md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-3 md:grid-cols-2 xl:grid-cols-4">
          {aboutPageContent.stats.map((stat) => (
            <Reveal key={stat.label}>
              <div className="text-accent-foreground rounded-2xl bg-black/8 px-4 py-4">
                <p className="text-2xl font-bold sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-sm font-semibold">{stat.label}</p>
                {stat.detail ? (
                  <p className="mt-1 text-sm/6 text-black/65">{stat.detail}</p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 md:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <Reveal>
            <div>
              <SectionHeading
                eyebrow={aboutPageContent.story.eyebrow}
                heading={aboutPageContent.story.heading}
                align="left"
              />
              <div className="space-y-5 text-base leading-8 text-muted-foreground md:text-lg">
                {aboutPageContent.story.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-border bg-muted/50 p-6 shadow-sm sm:p-8">
              <div className="rounded-2xl bg-card p-5 shadow-sm sm:p-6">
                <p className="text-sm font-bold tracking-[0.14em] text-[hsl(var(--primary-text))] uppercase">
                  {aboutPageContent.story.missionTitle}
                </p>
                <p className="mt-3 text-base leading-8 text-muted-foreground">
                  {aboutPageContent.story.missionText}
                </p>
              </div>

              <div className="mt-5 rounded-2xl bg-card p-5 shadow-sm sm:p-6">
                <p className="text-sm font-bold tracking-[0.14em] text-[hsl(var(--primary-text))] uppercase">
                  {aboutPageContent.story.valuesTitle}
                </p>
                <ul className="mt-4 space-y-3">
                  {aboutPageContent.story.values.map((value) => (
                    <li key={value} className="flex items-start gap-3 text-base text-muted-foreground">
                      <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-muted/50 px-4 py-16 md:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow={aboutPageContent.differentiators.eyebrow}
            heading={aboutPageContent.differentiators.heading}
            subtitle={aboutPageContent.differentiators.subtitle}
          />

          <div className="grid gap-6 md:grid-cols-2">
            {aboutPageContent.differentiators.items.map((item, index) => {
              const Icon = iconMap[item.iconName as keyof typeof iconMap] ?? Users;

              return (
                <Reveal key={item.title} delay={index * 0.06}>
                  <article className="rounded-3xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md sm:p-7">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                    <p className="mt-3 text-base leading-7 text-muted-foreground">
                      {item.description}
                    </p>
                    {item.bullets?.length ? (
                      <ul className="mt-5 space-y-2.5">
                        {item.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[hsl(var(--brand-red))]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow={aboutPageContent.teamSection.eyebrow}
            heading={aboutPageContent.teamSection.heading}
            subtitle={aboutPageContent.teamSection.subtitle}
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {teamMembers.map((member, index) => (
              <Reveal key={member.id} delay={index * 0.05}>
                <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
                  <div className="relative aspect-[4/4.5] overflow-hidden bg-gradient-to-br from-[#0a5a8a] via-[#0d8ecf] to-[#2ea8dc]">
                    {member.image ? (
                      <Image
                        src={imagePath(member.image.src)}
                        alt={member.image.alt}
                        fill
                        sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="p-6">
                    <p className="text-sm font-semibold text-[hsl(var(--primary-text))]">
                      {member.role}
                    </p>
                    <h3 className="mt-1 text-xl font-bold text-foreground">{member.name}</h3>
                    {member.credentials?.length ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {member.credentials.map((credential) => (
                          <span
                            key={credential}
                            className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary"
                          >
                            {credential}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                      {member.bio}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading={aboutPageContent.finalCta.heading}
        subtext={aboutPageContent.finalCta.subtext}
        primaryCta={aboutPageContent.finalCta.primaryCta}
        secondaryCta={aboutPageContent.finalCta.secondaryCta}
        trustBullets={aboutPageContent.finalCta.trustBullets}
      />
    </>
  );
}
