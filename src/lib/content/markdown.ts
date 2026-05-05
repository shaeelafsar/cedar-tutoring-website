import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { z } from "zod";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export interface MarkdownDocument<T> {
  path: string;
  data: T;
  content: string;
  html: string;
}

interface IndexedSection {
  title: string;
  content: string;
  index: number;
}

export interface MarkdownSection {
  title: string;
  content: string;
}

export interface MarkdownPage {
  heading: string;
  intro: string;
  sections: MarkdownSection[];
}

export function readMarkdownFile<T>(
  relativePath: string,
  schema: z.ZodType<T>,
): MarkdownDocument<T> {
  const fullPath = path.join(CONTENT_ROOT, relativePath);
  const source = fs.readFileSync(fullPath, "utf8");
  const parsed = matter(source);
  const content = parsed.content.trim();

  return {
    path: fullPath,
    data: schema.parse(parsed.data),
    content,
    html: renderMarkdown(content),
  };
}

export function renderMarkdown(markdown: string): string {
  return String(
    remark().use(remarkHtml).processSync(markdown.trim()),
  ).trim();
}

export function parseMarkdownPage(markdown: string): MarkdownPage {
  const source = markdown.trim();

  if (!source.startsWith("# ")) {
    throw new Error("Markdown page must start with an H1 heading.");
  }

  const firstLineEnd = source.indexOf("\n");
  const heading = source
    .slice(2, firstLineEnd === -1 ? undefined : firstLineEnd)
    .trim();
  const remainder = firstLineEnd === -1 ? "" : source.slice(firstLineEnd + 1).trim();
  const sections = splitSectionsWithIndex(remainder, 2);
  const introEnd = sections[0]?.index ?? remainder.length;
  const intro = remainder.slice(0, introEnd).trim();

  return {
    heading,
    intro,
    sections: sections.map(({ title, content }) => ({ title, content })),
  };
}

export function getSection(
  sections: MarkdownSection[],
  title: string,
): MarkdownSection {
  const section = sections.find((item) => item.title === title);

  if (!section) {
    throw new Error(`Missing markdown section: ${title}`);
  }

  return section;
}

export function splitSections(
  markdown: string,
  level: number,
): MarkdownSection[] {
  return splitSectionsWithIndex(markdown, level).map(({ title, content }) => ({
    title,
    content,
  }));
}

export function getParagraphs(markdown: string): string[] {
  return markdown
    .replace(/^#{1,6}\s+.*$/gm, "")
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .filter((block) => !block.split("\n").every((line) => /^[-*]\s+/.test(line.trim())))
    .map((block) => block.split("\n").map((line) => line.trim()).join(" "));
}

export function getFirstParagraph(markdown: string): string {
  return getParagraphs(markdown)[0] ?? "";
}

export function getListItems(markdown: string): string[] {
  return markdown
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^[-*]\s+/.test(line))
    .map((line) => line.replace(/^[-*]\s+/, "").trim());
}

function splitSectionsWithIndex(markdown: string, level: number): IndexedSection[] {
  const source = markdown.trim();

  if (!source) {
    return [];
  }

  const marker = "#".repeat(level);
  const pattern = new RegExp(`^${marker}\\s+(.+)$`, "gm");
  const matches = Array.from(source.matchAll(pattern));

  return matches.map((match, index) => {
    const start = match.index ?? 0;
    const contentStart = start + match[0].length;
    const end = matches[index + 1]?.index ?? source.length;

    return {
      title: match[1].trim(),
      content: source.slice(contentStart, end).replace(/^\n+/, "").trim(),
      index: start,
    };
  });
}
