import type { ProgramContent } from "@/types/content";
import {
  getAllProgramSlugs,
  getAllPrograms,
  getProgramBySlug,
  getRelatedPrograms,
} from "@/lib/content/programs";

export const PROGRAMS: readonly ProgramContent[] = getAllPrograms();

export { getAllProgramSlugs, getProgramBySlug, getRelatedPrograms };
