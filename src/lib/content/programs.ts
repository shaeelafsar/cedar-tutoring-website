import fs from "node:fs";
import path from "node:path";

import type { ProgramContent } from "@/types/content";

import {
  getListItems,
  getParagraphs,
  getSection,
  parseMarkdownPage,
  readMarkdownFile,
  splitSections,
} from "./markdown";
import {
  programContentSchema,
  programContentsSchema,
  programFrontmatterSchema,
} from "./schemas";

const PROGRAMS_DIR = path.join(process.cwd(), "content", "programs");

function getProgramPaths(): string[] {
  return fs
    .readdirSync(PROGRAMS_DIR)
    .filter((file) => file.endsWith(".md") && file !== "_hub.md")
    .sort()
    .map((file) => `programs/${file}`);
}

function parseProgram(relativePath: string): ProgramContent {
  const doc = readMarkdownFile(relativePath, programFrontmatterSchema);
  const page = parseMarkdownPage(doc.content);
  const problemSection = getSection(page.sections, "Problem");
  const approachSection = getSection(page.sections, "Approach");
  const outcomesSection = getSection(page.sections, "Outcomes");

  const problemHeading = splitSections(problemSection.content, 3)[0];
  const approachHeading = splitSections(approachSection.content, 3)[0];
  const outcomesHeading = splitSections(outcomesSection.content, 3)[0];

  return programContentSchema.parse({
    slug: doc.data.slug,
    title: doc.data.title,
    shortTitle: doc.data.shortTitle,
    shortDescription: doc.data.shortDescription,
    iconName: doc.data.iconName,
    grades: doc.data.grades,
    tags: doc.data.tags,
    seo: doc.data.seo,
    hero: {
      heading: page.heading,
      subtitle: getFirstParagraph(page.intro),
    },
    problem: {
      heading: problemHeading?.title ?? "Problem",
      paragraphs: getParagraphs(problemHeading?.content ?? ""),
    },
    approach: {
      heading: approachHeading?.title ?? "Approach",
      paragraphs: getParagraphs(approachHeading?.content ?? ""),
      bullets: getListItems(approachHeading?.content ?? ""),
    },
    outcomes: {
      heading: outcomesHeading?.title ?? "Outcomes",
      items: getListItems(outcomesHeading?.content ?? ""),
    },
    faq: doc.data.faq,
    testimonialIds: doc.data.testimonialIds,
    relatedPrograms: doc.data.relatedPrograms,
    cta: doc.data.cta,
  });
}

function getFirstParagraph(markdown: string): string {
  return getParagraphs(markdown)[0] ?? "";
}

export function getAllPrograms(): ProgramContent[] {
  return programContentsSchema.parse(getProgramPaths().map(parseProgram));
}

export function getAllProgramSlugs(): string[] {
  return getAllPrograms().map((program) => program.slug);
}

export function getProgramBySlug(slug: string): ProgramContent | undefined {
  return getAllPrograms().find((program) => program.slug === slug);
}

export function getRelatedPrograms(slug: string): ProgramContent[] {
  const program = getProgramBySlug(slug);
  if (!program) {
    return [];
  }

  const programs = getAllPrograms();

  return program.relatedPrograms
    .map((relatedSlug) => programs.find((item) => item.slug === relatedSlug))
    .filter((relatedProgram): relatedProgram is ProgramContent => relatedProgram !== undefined);
}
