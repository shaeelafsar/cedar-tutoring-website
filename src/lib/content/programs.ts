import arabicJson from "@content/programs/arabic.json";
import homeworkHelpJson from "@content/programs/homework-help.json";
import mathJson from "@content/programs/math.json";
import readingJson from "@content/programs/reading.json";
import scienceJson from "@content/programs/science.json";
import writingJson from "@content/programs/writing.json";

import type { ProgramContent } from "@/types/content";

import { programContentSchema, programContentsSchema } from "./schemas";

const programFiles = [
  readingJson,
  mathJson,
  writingJson,
  scienceJson,
  arabicJson,
  homeworkHelpJson,
];

export function getAllPrograms(): ProgramContent[] {
  return programContentsSchema.parse(programFiles);
}

export function getAllProgramSlugs(): string[] {
  return getAllPrograms().map((program) => program.slug);
}

export function getProgramBySlug(slug: string): ProgramContent | undefined {
  const program = programFiles.find((item) => item.slug === slug);
  return program ? programContentSchema.parse(program) : undefined;
}

export function getRelatedPrograms(slug: string): ProgramContent[] {
  const program = getProgramBySlug(slug);
  if (!program) {
    return [];
  }

  return program.relatedPrograms
    .map((relatedSlug) => getProgramBySlug(relatedSlug))
    .filter((relatedProgram): relatedProgram is ProgramContent => relatedProgram !== undefined);
}
