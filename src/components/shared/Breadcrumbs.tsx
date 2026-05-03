import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({
  items,
  variant = "default",
}: {
  items: BreadcrumbItem[];
  variant?: "default" | "inverse";
}) {
  const isInverse = variant === "inverse";

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol
        className={[
          "flex flex-wrap items-center gap-1.5 text-sm",
          isInverse ? "text-white/75" : "text-muted-foreground",
        ].join(" ")}
      >
        <li>
          <Link
            href="/"
            className={[
              "transition-colors",
              isInverse ? "hover:text-white" : "hover:text-foreground",
            ].join(" ")}
          >
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            {item.href ? (
              <Link
                href={item.href}
                className={[
                  "transition-colors",
                  isInverse ? "hover:text-white" : "hover:text-foreground",
                ].join(" ")}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={
                  isInverse
                    ? "font-medium text-white"
                    : "text-foreground font-medium"
                }
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
