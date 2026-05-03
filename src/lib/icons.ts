import {
  BookOpen,
  Calculator,
  PenTool,
  FlaskConical,
  Languages,
  BookMarked,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "book-open": BookOpen,
  calculator: Calculator,
  "pen-tool": PenTool,
  "flask-conical": FlaskConical,
  languages: Languages,
  "book-marked": BookMarked,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? BookOpen;
}
