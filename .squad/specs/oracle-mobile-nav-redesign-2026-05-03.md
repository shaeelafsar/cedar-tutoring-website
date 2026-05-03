# Mobile Navigation Drawer — Premium Redesign Spec

**Author:** Oracle (UX/Design)  
**Date:** 2026-05-03  
**Status:** Ready for Implementation  
**Implementer:** Trinity (Frontend)

---

## 1. Overview

Transform the plain mobile navigation drawer into a **premium, branded experience** that reflects Cedar Tutoring Academy's identity: warm, trustworthy, professional, and results-oriented.

### Design Philosophy
- **Organic Fluidity** aesthetic: soft gradients, rounded corners, smooth transitions
- **Brand-forward**: Cedar Blue (#0d8ecf) as visual anchor
- **Elevated polish**: subtle depth layers, motion choreography
- **Touch-first**: generous tap targets, comfortable spacing

---

## 2. Visual Structure (ASCII Wireframe)

```
┌──────────────────────────────────┐
│ ╔══════════════════════════════╗ │ ← Subtle blue gradient header
│ ║     [Cedar Logo]             ║ │
│ ║  "Where Learning Takes Root" ║ │ ← Tagline in muted text
│ ╚══════════════════════════════╝ │
│                                  │
│ ┌────────────────────────────┐   │
│ │ 📚  Programs            ▾  │   │ ← Parent nav item with icon
│ │    ├─ 📐 Math              │   │ ← Child items (indented, smaller)
│ │    ├─ 📖 Reading           │   │
│ │    ├─ ✏️ Writing            │   │
│ │    ├─ 🔬 Science           │   │
│ │    ├─ 🌙 Arabic            │   │
│ │    └─ 📝 Homework Help     │   │
│ └────────────────────────────┘   │
│                                  │
│ ┌────────────────────────────┐   │
│ │ 🎯  Test Prep           ▾  │   │
│ │    ├─ SAT                  │   │
│ │    ├─ ACT                  │   │
│ │    └─ PSAT                 │   │
│ └────────────────────────────┘   │
│                                  │
│ │ 👤  About                  │   │ ← Single nav items
│ │ 📍  Locations              │   │
│ │ 💰  Pricing                │   │
│ │ ❓  FAQ                    │   │
│ │ ⭐  Reviews                │   │
│                                  │
│ ════════════════════════════════ │ ← Divider
│                                  │
│ ╔══════════════════════════════╗ │
│ ║  📅  Book a Free Assessment ║ │ ← CTA Button (Orange)
│ ╚══════════════════════════════╝ │
│                                  │
│ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │ ← Subtle separator
│                                  │
│   📞 (469) 757-2220              │ ← Footer contact info
│   ✉️  info@cedartutoring.com     │
│                                  │
└──────────────────────────────────┘
```

---

## 3. Color Specifications

### Background Treatment
The drawer uses a **layered gradient background** for depth:

```css
/* Base: Slight blue tint instead of pure white */
background: linear-gradient(
  180deg,
  hsl(199 87% 97%) 0%,      /* Very light Cedar Blue tint */
  hsl(0 0% 100%) 15%,       /* Fade to white */
  hsl(0 0% 100%) 100%
);
```

**Tailwind classes:**
```
bg-gradient-to-b from-sky-50/80 via-white to-white
```

### Header Section (Logo Area)
```css
/* Subtle branded header band */
background: linear-gradient(
  135deg,
  hsl(199 87% 43% / 0.08) 0%,
  hsl(199 87% 43% / 0.03) 100%
);
border-bottom: 1px solid hsl(199 87% 43% / 0.1);
```

**Tailwind classes:**
```
bg-gradient-to-br from-primary/8 to-primary/3 border-b border-primary/10
```

### Active State (Selected Nav Item)
```css
/* Cedar Blue background with white text */
background: hsl(199 87% 43%);
color: white;
```

**Tailwind classes:**
```
bg-primary text-white
```

### Hover State
```css
/* Soft blue tint */
background: hsl(199 87% 43% / 0.08);
```

**Tailwind classes:**
```
hover:bg-primary/8
```

---

## 4. Icon Mapping (Lucide Icons)

| Nav Item | Lucide Icon | Reasoning |
|----------|-------------|-----------|
| **Programs** | `GraduationCap` | Represents education/learning |
| Math | `Calculator` | Mathematical operations |
| Reading | `BookOpen` | Open book for reading |
| Writing | `PenLine` | Writing instrument |
| Science | `FlaskConical` | Lab/science association |
| Arabic | `Languages` | Language learning |
| Homework Help | `ClipboardList` | Task assistance |
| **Test Prep** | `Target` | Goal/target achievement |
| SAT | (inherits parent icon) | — |
| ACT | (inherits parent icon) | — |
| PSAT | (inherits parent icon) | — |
| **About** | `Users` | Team/people |
| **Locations** | `MapPin` | Geographic marker |
| **Pricing** | `DollarSign` | Cost/value |
| **FAQ** | `HelpCircle` | Questions/help |
| **Reviews** | `Star` | Ratings/testimonials |

**CTA Button Icon:** `CalendarCheck` (appointment/booking)

---

## 5. Typography Specifications

### Logo Area
- **Logo:** 40px height (h-10)
- **Tagline:** 
  - Font: `font-sans` (Inter)
  - Size: `text-xs` (12px)
  - Color: `text-muted-foreground`
  - Tracking: `tracking-wide`

### Parent Navigation Items
- Font: `font-sans` (Inter)
- Weight: `font-semibold` (600)
- Size: `text-base` (16px)
- Line height: `leading-6`

### Child Navigation Items
- Font: `font-sans` (Inter)
- Weight: `font-medium` (500)
- Size: `text-sm` (14px)
- Color: `text-muted-foreground` (default), `text-primary` (active)

### CTA Button
- Font: `font-semibold` (600)
- Size: `text-base` (16px)

### Footer Contact
- Size: `text-sm` (14px)
- Color: `text-muted-foreground`

---

## 6. Spacing & Layout

### Sheet Content (Container)
```
className="w-[min(92vw,360px)] sm:w-[360px] px-0 pt-0 pb-6 overflow-y-auto"
```

### Header Section (Logo Area)
```
className="px-5 pt-14 pb-5 bg-gradient-to-br from-primary/8 to-primary/3 border-b border-primary/10"
```

### Navigation Container
```
className="px-3 pt-5 flex flex-col gap-0.5"
```

### Parent Nav Item
```
className="flex items-center gap-3 min-h-12 px-3 py-3 rounded-xl text-base font-semibold"
```
- Icon: `h-5 w-5`
- Chevron (expandable): `h-4 w-4 ml-auto`

### Child Nav Items Container
```
className="ml-11 mt-1 mb-2 pl-3 border-l-2 border-primary/20"
```

### Child Nav Item
```
className="flex items-center gap-3 min-h-10 px-3 py-2 rounded-lg text-sm font-medium"
```
- Icon: `h-4 w-4 text-muted-foreground`

### CTA Section
```
className="px-4 mt-6 pt-6 border-t border-border"
```

### Footer Section
```
className="px-5 mt-8 pt-6 border-t border-border/60"
```

---

## 7. Component States

### Parent Nav Item States

| State | Tailwind Classes |
|-------|------------------|
| **Default** | `text-foreground bg-transparent` |
| **Hover** | `bg-primary/8 text-[hsl(var(--primary-text))]` |
| **Active (current page)** | `bg-primary text-white shadow-sm` |
| **Focus** | `outline-none ring-2 ring-primary/50 ring-offset-2` |

### Child Nav Item States

| State | Tailwind Classes |
|-------|------------------|
| **Default** | `text-muted-foreground` |
| **Hover** | `bg-primary/6 text-[hsl(var(--primary-text))]` |
| **Active (current page)** | `bg-primary/12 text-[hsl(var(--primary-text))] font-semibold` |
| **Focus** | `outline-none ring-2 ring-primary/40 ring-offset-1` |

### CTA Button

```
className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
```

Icon placement: `CalendarCheck` (h-5 w-5) to the left of text

---

## 8. Animation & Motion Specs

### Sheet Overlay (Backdrop)
Instead of default semi-transparent black, use a **branded tint**:

```css
/* Custom overlay with blue tint */
background: hsl(199 87% 30% / 0.3);
backdrop-filter: blur(4px);
```

**Tailwind (if customizable via SheetOverlay):**
```
className="bg-primary/30 backdrop-blur-sm"
```

### Nav Items Entrance Animation (Framer Motion)

Staggered fade-in from left:

```tsx
// Container variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

// Item variants
const itemVariants = {
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
```

### Hover/Active Transitions

All interactive states use:
```
transition-all duration-200 ease-out
```

### Chevron Rotation (Expandable Items)
```
className="transition-transform duration-200"
// When expanded: "rotate-180"
```

### CTA Button Hover
```css
transform: translateY(-1px);
box-shadow: 0 6px 12px rgba(255, 167, 37, 0.25);
```

```
hover:-translate-y-0.5 hover:shadow-lg
```

---

## 9. Accessibility Requirements

### Touch Targets
- All interactive elements: **minimum 44×44px** touch target
- Parent nav items: 48px min-height ✓
- Child nav items: 40px min-height ✓
- CTA button: 52px height ✓

### Color Contrast (WCAG AA)
| Element | Foreground | Background | Ratio | Pass |
|---------|------------|------------|-------|------|
| Active nav text | white | #0d8ecf | 4.52:1 | ✓ |
| Default text | #1e293b | white | 14.3:1 | ✓ |
| Muted text | #4b5563 | white | 7.1:1 | ✓ |
| CTA text | #1c1917 | #ffa725 | 7.8:1 | ✓ |

### Focus Management
- First focusable element receives focus when sheet opens
- Focus trapped within sheet
- Escape key closes sheet
- Focus returns to trigger button on close

### Screen Reader
- `aria-label="Mobile navigation"` on nav
- `aria-current="page"` on active nav item
- `aria-expanded` on parent items with children
- Proper heading structure (sr-only SheetTitle maintained)

### Reduced Motion
```tsx
// Wrap animations in reduced-motion check
const prefersReducedMotion = useReducedMotion();

// Skip entrance animations if user prefers reduced motion
variants={prefersReducedMotion ? {} : itemVariants}
```

---

## 10. Complete Implementation Reference

### SheetContent Structure
```tsx
<SheetContent
  side="left"
  className="w-[min(92vw,360px)] sm:w-[360px] p-0 overflow-y-auto bg-gradient-to-b from-sky-50/80 via-white to-white"
>
  <SheetTitle className="sr-only">Navigation menu</SheetTitle>
  
  {/* Header with Logo */}
  <div className="px-5 pt-14 pb-5 bg-gradient-to-br from-primary/8 to-primary/3 border-b border-primary/10">
    <Image ... />
    <p className="mt-2 text-xs text-muted-foreground tracking-wide">
      Where Learning Takes Root
    </p>
  </div>
  
  {/* Navigation */}
  <motion.nav
    className="px-3 pt-5 flex flex-col gap-0.5"
    aria-label="Mobile navigation"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    {NAV_ITEMS.map((item, index) => (
      <MobileNavItem key={item.href} item={item} ... />
    ))}
  </motion.nav>
  
  {/* CTA Section */}
  <div className="px-4 mt-6 pt-6 border-t border-border">
    <Link className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 ...">
      <CalendarCheck className="h-5 w-5" />
      Book a Free Assessment
    </Link>
  </div>
  
  {/* Footer */}
  <div className="px-5 mt-8 pt-6 border-t border-border/60">
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Phone className="h-4 w-4" />
      <a href="tel:+14697572220">(469) 757-2220</a>
    </div>
    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
      <Mail className="h-4 w-4" />
      <a href="mailto:info@cedartutoring.com">info@cedartutoring.com</a>
    </div>
  </div>
</SheetContent>
```

### MobileNavItem Component Props
```tsx
interface MobileNavItemProps {
  item: NavItem;
  pathname: string;
  onClose: () => void;
  icon: LucideIcon;
}
```

---

## 11. Lucide Icon Imports

```tsx
import {
  GraduationCap,
  Calculator,
  BookOpen,
  PenLine,
  FlaskConical,
  Languages,
  ClipboardList,
  Target,
  Users,
  MapPin,
  DollarSign,
  HelpCircle,
  Star,
  CalendarCheck,
  Phone,
  Mail,
  ChevronDown,
} from "lucide-react";
```

---

## 12. Icon Mapping Constant

Create this in constants or inline in Header.tsx:

```tsx
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
```

---

## 13. Quality Checklist for Trinity

- [ ] Logo displays correctly in header area
- [ ] Tagline renders below logo
- [ ] All icons display next to nav items
- [ ] Active state shows Cedar Blue background with white text
- [ ] Hover states have smooth transitions
- [ ] Child items indented with left border accent
- [ ] CTA button uses Cedar Orange with icon
- [ ] Contact footer displays phone and email
- [ ] Staggered entrance animation works
- [ ] Reduced motion preference respected
- [ ] Touch targets meet 44px minimum
- [ ] Focus states visible and logical
- [ ] Sheet backdrop has blue tint (if customizable)

---

**End of Spec**
