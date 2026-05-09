"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import {
  BookOpen,
  Calculator,
  CalendarCheck,
  ChevronDown,
  ClipboardList,
  DollarSign,
  FlaskConical,
  GraduationCap,
  HelpCircle,
  Languages,
  type LucideIcon,
  Mail,
  MapPin,
  Menu,
  PenLine,
  Phone,
  Star,
  Target,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { BRAND_LOGO } from "@/lib/branding";
import type { NavItem, SiteConfig } from "@/lib/content/site";
import { imagePath } from "@/lib/image-path";
import { cn } from "@/lib/utils";

const primaryTextClass = "text-[hsl(var(--primary-text))]";
const primaryTextHoverClass = "hover:text-[hsl(var(--primary-text))]";

const mobileNavContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const mobileNavItemVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
    },
  },
};

const NAV_ICONS: Record<string, LucideIcon> = {
  "/programs": GraduationCap,
  "/programs/math": Calculator,
  "/programs/reading": BookOpen,
  "/programs/writing": PenLine,
  "/programs/science": FlaskConical,
  "/programs/arabic": Languages,
  "/programs/homework-help": ClipboardList,
  "/test-prep": Target,
  "/about": Users,
  "/locations": MapPin,
  "/pricing": DollarSign,
  "/faq": HelpCircle,
  "/reviews": Star,
};

function isPathActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const isActive = isPathActive(pathname, item.href);
  const isCurrentPage = pathname === item.href;

  if (item.children) {
    return (
      <div className="group relative">
        <Link
          href={item.href}
          aria-current={isCurrentPage ? "page" : undefined}
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
            {item.children.map((child) => {
              const isChildActive = isPathActive(pathname, child.href);

              return (
                <Link
                  key={child.href}
                  href={child.href}
                  aria-current={isChildActive ? "page" : undefined}
                  className={cn(
                    "hover:bg-muted block rounded-md px-3 py-2 text-sm transition-colors",
                    primaryTextHoverClass,
                    isChildActive
                      ? cn("font-medium", primaryTextClass)
                      : "text-muted-foreground"
                  )}
                >
                  {child.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      aria-current={isCurrentPage ? "page" : undefined}
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

interface MobileNavLinkProps {
  item: NavItem;
  pathname: string;
  onClose: () => void;
  icon: LucideIcon;
  prefersReducedMotion: boolean;
}

function MobileNavLink({
  item,
  pathname,
  onClose,
  icon: Icon,
  prefersReducedMotion,
}: MobileNavLinkProps) {
  const hasChildren = Boolean(item.children?.length);
  const isActive = isPathActive(pathname, item.href);
  const isCurrentPage = pathname === item.href;
  const [isExpanded, setIsExpanded] = useState(isActive);
  const childGroupId = `${item.href.replace(/[^a-z0-9]+/gi, "-")}-children`;

  return (
    <motion.div variants={prefersReducedMotion ? undefined : mobileNavItemVariants}>
      {hasChildren ? (
        <div className="space-y-1">
          <div
            className={cn(
              "flex items-stretch rounded-xl transition-all duration-200 ease-out",
              isActive
                ? "bg-primary text-white shadow-sm"
                : "bg-transparent text-foreground hover:bg-primary/8 hover:text-[hsl(var(--primary-text))]"
            )}
          >
            <Link
              href={item.href}
              onClick={onClose}
              aria-current={isCurrentPage ? "page" : undefined}
              className="focus-visible:ring-primary/50 focus-visible:ring-offset-background flex min-h-12 min-w-0 flex-1 items-center gap-3 rounded-xl px-3 py-3 text-base leading-6 font-semibold outline-none transition-all duration-200 ease-out focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0",
                  isActive ? "text-white" : "text-primary"
                )}
              />
              <span className="truncate">{item.label}</span>
            </Link>
            <button
              type="button"
              aria-expanded={isExpanded}
              aria-controls={childGroupId}
              aria-label={isExpanded ? `Collapse ${item.label}` : `Expand ${item.label}`}
              className="focus-visible:ring-primary/50 focus-visible:ring-offset-background inline-flex min-h-12 items-center justify-center rounded-xl px-3 outline-none transition-all duration-200 ease-out focus-visible:ring-2 focus-visible:ring-offset-2"
              onClick={() => setIsExpanded((current) => !current)}
            >
              <ChevronDown
                className={cn(
                  "ml-auto h-4 w-4 transition-transform duration-200",
                  isExpanded && "rotate-180"
                )}
              />
            </button>
          </div>

          <AnimatePresence initial={false}>
            {isExpanded ? (
              prefersReducedMotion ? (
                <div
                  id={childGroupId}
                  className="ml-11 mt-1 mb-2 border-l-2 border-primary/20 pl-3"
                >
                  {item.children?.map((child) => {
                    const ChildIcon = NAV_ICONS[child.href] ?? Icon;
                    const isChildActive = isPathActive(pathname, child.href);

                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={onClose}
                        aria-current={isChildActive ? "page" : undefined}
                        className={cn(
                          "focus-visible:ring-primary/40 focus-visible:ring-offset-background flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium outline-none transition-all duration-200 ease-out focus-visible:ring-2 focus-visible:ring-offset-1",
                          isChildActive
                            ? "bg-primary/12 font-semibold text-[hsl(var(--primary-text))]"
                            : "text-muted-foreground hover:bg-primary/6 hover:text-[hsl(var(--primary-text))]"
                        )}
                      >
                        <ChildIcon
                          className={cn(
                            "h-4 w-4 shrink-0",
                            isChildActive ? "text-primary" : "text-muted-foreground"
                          )}
                        />
                        <span>{child.label}</span>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <motion.div
                  id={childGroupId}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="ml-11 mt-1 mb-2 border-l-2 border-primary/20 pl-3"
                >
                  {item.children?.map((child) => {
                    const ChildIcon = NAV_ICONS[child.href] ?? Icon;
                    const isChildActive = isPathActive(pathname, child.href);

                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={onClose}
                        aria-current={isChildActive ? "page" : undefined}
                        className={cn(
                          "focus-visible:ring-primary/40 focus-visible:ring-offset-background flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium outline-none transition-all duration-200 ease-out focus-visible:ring-2 focus-visible:ring-offset-1",
                          isChildActive
                            ? "bg-primary/12 font-semibold text-[hsl(var(--primary-text))]"
                            : "text-muted-foreground hover:bg-primary/6 hover:text-[hsl(var(--primary-text))]"
                        )}
                      >
                        <ChildIcon
                          className={cn(
                            "h-4 w-4 shrink-0",
                            isChildActive ? "text-primary" : "text-muted-foreground"
                          )}
                        />
                        <span>{child.label}</span>
                      </Link>
                    );
                  })}
                </motion.div>
              )
            ) : null}
          </AnimatePresence>
        </div>
      ) : (
        <Link
          href={item.href}
          onClick={onClose}
          aria-current={isCurrentPage ? "page" : undefined}
          className={cn(
            "focus-visible:ring-primary/50 focus-visible:ring-offset-background flex min-h-12 items-center gap-3 rounded-xl px-3 py-3 text-base leading-6 font-semibold outline-none transition-all duration-200 ease-out focus-visible:ring-2 focus-visible:ring-offset-2",
            isActive
              ? "bg-primary text-white shadow-sm"
              : "text-foreground hover:bg-primary/8 hover:text-[hsl(var(--primary-text))]"
          )}
        >
          <Icon
            className={cn(
              "h-5 w-5 shrink-0",
              isActive ? "text-white" : "text-primary"
            )}
          />
          <span>{item.label}</span>
        </Link>
      )}
    </motion.div>
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
        src={imagePath(BRAND_LOGO.src)}
        alt={BRAND_LOGO.alt}
        width={BRAND_LOGO.width}
        height={BRAND_LOGO.height}
        sizes="(min-width: 768px) 101px, 72px"
        className="h-10 w-auto md:h-14"
        priority
      />
    </Link>
  );
}

interface HeaderProps {
  navItems: NavItem[];
  siteConfig: SiteConfig;
}

export function Header({ navItems, siteConfig }: HeaderProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [mobileOpen, setMobileOpen] = useState(false);
  const phoneHref = `tel:+1${siteConfig.phone.replace(/\D/g, "")}`;

  return (
    <header className="border-border/60 sticky top-0 z-30 border-b bg-white/90 backdrop-blur-lg">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 md:h-20 md:gap-6 md:px-6 lg:grid-cols-[auto_1fr_auto] lg:px-8">
        <div className="flex items-center justify-start gap-3">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className="border-border/60 inline-flex h-11 w-11 items-center justify-center rounded-xl border bg-white/80 text-foreground shadow-sm transition-colors hover:bg-primary/8 lg:hidden"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </SheetTrigger>
            <SheetContent
              side="left"
              overlayClassName="bg-primary/30 backdrop-blur-sm"
              className="w-[min(92vw,360px)] overflow-y-auto bg-gradient-to-b from-sky-50/80 via-white to-white p-0 pb-6 sm:w-[360px]"
            >
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>

              <div className="border-primary/10 bg-gradient-to-br from-primary/8 to-primary/3 px-5 pt-14 pb-5 border-b">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex min-h-11 items-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
                  aria-label="Cedar Tutoring Academy home"
                >
                  <Image
                    src={imagePath(BRAND_LOGO.src)}
                    alt={BRAND_LOGO.alt}
                    width={BRAND_LOGO.width}
                    height={BRAND_LOGO.height}
                    sizes="72px"
                    className="h-10 w-auto"
                    priority
                  />
                </Link>
                <p className="mt-2 text-xs tracking-wide text-muted-foreground">
                  {siteConfig.tagline}
                </p>
              </div>

              <motion.nav
                className="flex flex-col gap-0.5 px-3 pt-5"
                aria-label="Mobile navigation"
                variants={prefersReducedMotion ? undefined : mobileNavContainerVariants}
                initial={prefersReducedMotion ? false : "hidden"}
                animate={prefersReducedMotion ? undefined : "visible"}
              >
                {navItems.map((item) => (
                  <MobileNavLink
                    key={`${item.href}-${isPathActive(pathname, item.href) ? "active" : "inactive"}`}
                    item={item}
                    pathname={pathname}
                    onClose={() => setMobileOpen(false)}
                    icon={NAV_ICONS[item.href] ?? GraduationCap}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                ))}
              </motion.nav>

              <div className="border-border mt-6 border-t px-4 pt-6">
                <Link
                  href="/book-assessment"
                  onClick={() => setMobileOpen(false)}
                  className="focus-visible:ring-accent/50 focus-visible:ring-offset-background flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-base font-semibold text-accent-foreground shadow-md transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                >
                  <CalendarCheck className="h-5 w-5" />
                  <span>Book a Free Assessment</span>
                </Link>
              </div>

              <div className="border-border/60 mt-8 border-t px-5 pt-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 shrink-0" />
                  <a
                    href={phoneHref}
                    className="rounded-sm transition-colors hover:text-[hsl(var(--primary-text))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 shrink-0" />
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="rounded-sm transition-colors hover:text-[hsl(var(--primary-text))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>
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
            {navItems.map((item) => (
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
          <div className="h-11 w-11 sm:hidden lg:hidden" aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}
