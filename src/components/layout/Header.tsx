"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ChevronDown, TreePine } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { NAV_ITEMS, type NavItem } from "@/lib/constants";
import { cn } from "@/lib/utils";

function NavLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const isActive =
    pathname === item.href || pathname.startsWith(item.href + "/");

  if (item.children) {
    return (
      <div className="group relative">
        <Link
          href={item.href}
          className={cn(
            "inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
            isActive ? "text-primary" : "text-muted-foreground"
          )}
        >
          {item.label}
          <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
        </Link>
        <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
          <div className="min-w-[180px] rounded-lg border border-border bg-popover p-2 shadow-lg">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className={cn(
                  "block rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted hover:text-primary",
                  pathname === child.href
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                )}
              >
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        isActive ? "text-primary" : "text-muted-foreground"
      )}
    >
      {item.label}
    </Link>
  );
}

function MobileNavLink({
  item,
  pathname,
  onClose,
}: {
  item: NavItem;
  pathname: string;
  onClose: () => void;
}) {
  const isActive =
    pathname === item.href || pathname.startsWith(item.href + "/");

  return (
    <div>
      <Link
        href={item.href}
        onClick={onClose}
        className={cn(
          "block py-2 text-base font-medium transition-colors hover:text-primary",
          isActive ? "text-primary" : "text-foreground"
        )}
      >
        {item.label}
      </Link>
      {item.children && (
        <div className="ml-4 border-l border-border pl-4">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onClose}
              className={cn(
                "block py-1.5 text-sm transition-colors hover:text-primary",
                pathname === child.href
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              )}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-white/84 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-6 px-4 md:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="inline-flex items-center gap-3 no-underline"
          aria-label="Cedar Tutoring Academy home"
        >
          <span className="grid h-11 w-11 place-items-center rounded-[14px] border border-primary/14 bg-gradient-to-br from-primary/12 to-secondary/18 shadow-sm">
            <TreePine className="h-6 w-6 text-primary" />
          </span>
          <span>
            <strong className="block text-[0.95rem] tracking-wide text-foreground">
              Cedar Tutoring Academy
            </strong>
            <span className="block text-[0.75rem] text-muted-foreground">
              Where Learning Takes Root
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden items-center gap-6 lg:flex"
          aria-label="Primary navigation"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/book-assessment"
            className={cn(
              buttonVariants(),
              "hidden sm:inline-flex bg-gradient-to-b from-primary to-primary/90 shadow-md shadow-primary/18 hover:shadow-lg hover:shadow-primary/24 hover:-translate-y-px transition-all"
            )}
          >
            Book a Free Assessment
          </Link>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open navigation menu"
                />
              }
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[360px]">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <nav
                className="mt-8 flex flex-col gap-1"
                aria-label="Mobile navigation"
              >
                {NAV_ITEMS.map((item) => (
                  <MobileNavLink
                    key={item.href}
                    item={item}
                    pathname={pathname}
                    onClose={() => setMobileOpen(false)}
                  />
                ))}
                <div className="mt-6 pt-6 border-t border-border">
                  <Link
                    href="/book-assessment"
                    onClick={() => setMobileOpen(false)}
                    className={cn(buttonVariants({ size: "lg" }), "w-full")}
                  >
                    Book a Free Assessment
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
