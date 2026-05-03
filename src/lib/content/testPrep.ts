import actJson from "@content/test-prep/act.json";
import psatJson from "@content/test-prep/psat.json";
import satJson from "@content/test-prep/sat.json";

import type { TestPrepContent } from "@/types/content";

import { testPrepContentSchema, testPrepContentsSchema } from "./schemas";

const testPrepFiles = [satJson, actJson, psatJson];

export function getAllTestPrep(): TestPrepContent[] {
  return testPrepContentsSchema.parse(testPrepFiles);
}

export function getAllTestPrepSlugs(): string[] {
  return getAllTestPrep().map((program) => program.slug);
}

export function getTestPrepBySlug(slug: string): TestPrepContent | undefined {
  const program = testPrepFiles.find((item) => item.slug === slug);
  return program ? testPrepContentSchema.parse(program) : undefined;
}

export function getRelatedTestPrep(slug: string): TestPrepContent[] {
  const program = getTestPrepBySlug(slug);
  if (!program) {
    return [];
  }

  return program.relatedTests
    .map((relatedSlug) => getTestPrepBySlug(relatedSlug))
    .filter((relatedProgram): relatedProgram is TestPrepContent => relatedProgram !== undefined);
}
