"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { NAV_ITEMS, type NavItem } from "@/lib/constants";
import { imagePath } from "@/lib/image-path";
import { cn } from "@/lib/utils";

const primaryTextClass = "text-[hsl(var(--primary-text))]";
const primaryTextHoverClass = "hover:text-[hsl(var(--primary-text))]";

function NavLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const isActive =
    pathname === item.href || pathname.startsWith(item.href + "/");

  if (item.children) {
    return (
      <div className="group relative">
        <Link
          href={item.href}
          className={cn(
            "inline-flex items-center gap-1 text-sm font-medium transition-colors",
            primaryTextHoverClass,
            isActive ? primaryTextClass : "text-muted-foreground"
          )}
        >
          {item.label}
          <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
        </Link>
        <div className="invisible absolute top-full left-0 pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
          <div className="border-border bg-popover min-w-[180px] rounded-lg border p-2 shadow-lg">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className={cn(
                  "hover:bg-muted block rounded-md px-3 py-2 text-sm transition-colors",
                  primaryTextHoverClass,
                  pathname === child.href
                    ? cn("font-medium", primaryTextClass)
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
        "text-sm font-medium transition-colors",
        primaryTextHoverClass,
        isActive ? primaryTextClass : "text-muted-foreground"
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
          "hover:bg-muted/70 block min-h-11 rounded-lg px-3 py-3 text-base leading-6 font-medium transition-colors",
          primaryTextHoverClass,
          isActive ? cn("bg-primary/8", primaryTextClass) : "text-foreground"
        )}
      >
        {item.label}
      </Link>
      {item.children ? (
        <div className="border-border mt-1 ml-4 border-l pl-4">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onClose}
              className={cn(
                "hover:bg-muted/70 block min-h-11 rounded-lg px-3 py-3 text-base leading-6 transition-colors",
                primaryTextHoverClass,
                pathname === child.href
                  ? cn("bg-primary/8 font-medium", primaryTextClass)
                  : "text-muted-foreground"
              )}
            >
              {child.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function BrandLink({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex min-h-11 shrink-0 items-center no-underline",
        className
      )}
      aria-label="Cedar Tutoring Academy home"
    >
      <Image
        src={imagePath("/images/logos/cedar-logo-original.jpg")}
        alt="Cedar Tutoring Academy"
        width={240}
        height={133}
        className="h-10 w-auto md:h-14"
        priority
      />
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-border/60 sticky top-0 z-30 border-b bg-white/90 backdrop-blur-lg">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 md:h-20 md:gap-6 md:px-6 lg:grid-cols-[auto_1fr_auto] lg:px-8">
        <div className="flex items-center justify-start gap-3">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-muted lg:hidden"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[min(92vw,360px)] overflow-y-auto px-2 pt-12 pb-6 sm:w-[360px]"
            >
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
                <div className="border-border mt-6 border-t pt-6">
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

          <BrandLink className="hidden lg:inline-flex" />
        </div>

        <div className="flex items-center justify-center">
          <BrandLink className="lg:hidden" />
          <nav
            className="hidden items-center gap-6 lg:flex"
            aria-label="Primary navigation"
          >
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.href} item={item} pathname={pathname} />
            ))}
          </nav>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/book-assessment"
            className={cn(buttonVariants(), "hidden sm:inline-flex")}
          >
            Book a Free Assessment
          </Link>
          <div className="h-9 w-9 sm:hidden lg:hidden" aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}
