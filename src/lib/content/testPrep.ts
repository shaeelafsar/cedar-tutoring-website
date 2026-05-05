import fs from "node:fs";
import path from "node:path";

import type { TestPrepContent } from "@/types/content";

import {
  getListItems,
  getParagraphs,
  getSection,
  parseMarkdownPage,
  readMarkdownFile,
} from "./markdown";
import {
  testPrepContentSchema,
  testPrepContentsSchema,
  testPrepFrontmatterSchema,
} from "./schemas";

const TEST_PREP_DIR = path.join(process.cwd(), "content", "pages", "test-prep");

function getTestPrepPaths(): string[] {
  return fs
    .readdirSync(TEST_PREP_DIR)
    .filter((file) => file.endsWith(".md") && file !== "_hub.md")
    .sort()
    .map((file) => `pages/test-prep/${file}`);
}

function parseTestPrep(relativePath: string): TestPrepContent {
  const doc = readMarkdownFile(relativePath, testPrepFrontmatterSchema);
  const page = parseMarkdownPage(doc.content);

  return testPrepContentSchema.parse({
    slug: doc.data.slug,
    title: doc.data.title,
    shortTitle: doc.data.shortTitle,
    shortDescription: doc.data.shortDescription,
    iconName: doc.data.iconName,
    grades: doc.data.grades,
    seo: doc.data.seo,
    hero: {
      heading: page.heading,
      subtitle: getFirstParagraph(page.intro),
    },
    idealFor: getListItems(getSection(page.sections, "Ideal For").content),
    focusAreas: getListItems(getSection(page.sections, "Focus Areas").content),
    format: getListItems(getSection(page.sections, "Format").content),
    outcomes: getListItems(getSection(page.sections, "Outcomes").content),
    faq: doc.data.faq,
    testimonialIds: doc.data.testimonialIds,
    relatedTests: doc.data.relatedTests,
    cta: doc.data.cta,
  });
}

function getFirstParagraph(markdown: string): string {
  return getParagraphs(markdown)[0] ?? "";
}

export function getAllTestPrep(): TestPrepContent[] {
  return testPrepContentsSchema.parse(getTestPrepPaths().map(parseTestPrep));
}

export function getAllTestPrepSlugs(): string[] {
  return getAllTestPrep().map((program) => program.slug);
}

export function getTestPrepBySlug(slug: string): TestPrepContent | undefined {
  return getAllTestPrep().find((program) => program.slug === slug);
}

export function getRelatedTestPrep(slug: string): TestPrepContent[] {
  const program = getTestPrepBySlug(slug);
  if (!program) {
    return [];
  }

  const testPrepPrograms = getAllTestPrep();

  return program.relatedTests
    .map((relatedSlug) => testPrepPrograms.find((item) => item.slug === relatedSlug))
    .filter((relatedProgram): relatedProgram is TestPrepContent => relatedProgram !== undefined);
}
