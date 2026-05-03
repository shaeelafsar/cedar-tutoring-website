# Morpheus — Architecture Alignment Review

> Date: 2026-05-03
> Reviewer: Morpheus (Lead/Architect)
> Input: Oracle's UX Review (oracle-ux-review-2026-05-03.md)

---

## Executive Summary

Oracle's review is well-targeted and substantive. The vast majority of recommendations are approved — they address a genuine brand color misalignment (the site currently uses generic Tailwind colors, not Cedar's logo palette), polish parity between the homepage and interior pages, and a handful of accessibility micro-fixes. One recommendation (brand color replacement strategy) requires an architectural adjustment: Cedar Red (#d92027) is introduced as a new `--brand-red` token rather than replacing `--secondary`, preserving the semantic meaning of green for success/validation states. One recommendation (add more photography) is explicitly rejected for Phase 1 — no assets exist and this is scope creep.

---

## Recommendation Verdicts

### Recommendation 1: Update Color Palette to Match Cedar Brand

**Oracle's ask:** Replace `--primary` (#2563eb) with Cedar Blue (#0d8ecf), replace `--secondary` (#059669) with Cedar Red (#d92027), update `--accent` to Cedar Orange (#ffa725).

**Verdict:** ⚠️ APPROVED WITH CHANGES

**Rationale:**
- Updating `--primary` to Cedar Blue (#0d8ecf) and `--accent` to Cedar Orange (#ffa725) is **fully approved** — owner-mandated, brand-correct.
- Replacing `--secondary` (green) with Cedar Red (#d92027) is **NOT approved as written.** The `--secondary` token carries semantic meaning: it is used for success badges, credential checkmarks, feature list ticks, and qualification chips throughout the spec. Replacing all of that with red violates established UX conventions (red = danger/error) and would make pricing feature lists and tutor credential chips look like error states.
- **Resolution:** Cedar Red is introduced as a **new** design token `--brand-red` / `--brand-red-foreground`, separate from `--secondary`. This preserves semantic green while making the brand red available for emphasis badges, "Popular" pricing indicators, and brand accent elements. The `--secondary` green stays for semantic uses only.
- **Contrast note:** Cedar Blue (#0d8ecf) has ~3.48:1 contrast on white — it FAILS WCAG AA for normal body text. It is approved as: CTA backgrounds (with white text), icon fills, border accents, hero gradients. For text on light backgrounds, it MUST be darkened to `#0a7ab8` (~4.52:1). This must be documented in the color-usage matrix and enforced by Trinity.
- **Contrast note:** Cedar Red (#d92027) is approximately 4.5:1 on white — borderline AA pass for normal text. Use it for text ONLY on white backgrounds, and prefer it as a background color (with white text) where possible.

**Scope:** Phase 1
**Spec update needed:** Yes — oracle-design-spec.md (color tokens, color-usage matrix)

---

### Recommendation 2: Warm Up Hero Gradients

**Oracle's ask:** Replace the dark corporate gradient (#062a40 → #0a4a6e → primary) with a Cedar Blue-based warmer gradient. Example: `from-[#0a5a8a] via-[#0d8ecf] to-[#2ea8dc]`.

**Verdict:** ✅ APPROVED

**Rationale:** This directly follows from the brand color update. The existing gradient reads as fintech/SaaS, not education. Shifting to Cedar Blue creates brand consistency. The suggested gradient range is approved — it uses deeper blue at the edges (for contrast/readability of text) and bright Cedar Blue in the midpoint. CSS-only change, no component architecture impact.

**Scope:** Phase 1
**Spec update needed:** Yes — oracle-design-spec.md (hero section guidance)

---

### Recommendation 3: Add Cedar Red as Accent Color

**Oracle's ask:** Introduce #d92027 for "Book Now" emphasis CTAs, "Popular" badges on pricing, badge backgrounds, hover states. Create a `destructive` or `emphasis` variant.

**Verdict:** ✅ APPROVED

**Rationale:** Approved with the token model from Recommendation 1. Cedar Red (`--brand-red`) is appropriate for:
- "Most Popular" badge on PricingCard highlighted tier
- Emphasis/featured badge rings on any highlighted card
- Decorative accent stripes on ProgramCards (the top gradient bar)
- Optional "Book Now" button variant on the final CTA section (use sparingly)

**NOT approved uses:** Red as semantic success indicator, red as body text on light backgrounds (borderline contrast), red replacing the green checkmark on feature lists.

**Implementation note for Trinity:** Introduce `--brand-red: 358 74% 49%` and `--brand-red-foreground: 0 0% 100%` in globals.css. Use it via `bg-[hsl(var(--brand-red))]` or as a Tailwind CSS variable alias. Do not wire to shadcn's `destructive` token — that token has established semantic meaning (form errors).

**Scope:** Phase 1
**Spec update needed:** Yes — oracle-design-spec.md (new token), trinity-frontend-spec.md (PricingCard, program card gradient)

---

### Recommendation 4: Bring Homepage Polish to Interior PageHero

**Oracle's ask:** Add blurred gradient orbs (smaller than homepage) and subtle border rings to the PageHero component on interior pages. Maintain shorter height for interior pages.

**Verdict:** ✅ APPROVED

**Rationale:** This is a component enhancement to an existing, already-specced component. Adding `pointer-events-none absolute` decorative elements improves visual quality without any architectural impact. Interior pages currently use a flat version of the hero while the homepage has depth — this inconsistency signals different levels of craft. Approved as a conditional variant: PageHero receives an `decorative?: boolean` prop (default `true`), so the homepage and interior pages can choose their orb/ring intensity. No new dependencies, no bundle impact.

**Scope:** Phase 1
**Spec update needed:** Yes — trinity-frontend-spec.md (PageHero props), oracle-design-spec.md (PageHero spec)

---

### Recommendation 5: Unify CTA Section Treatment (Gradient Container Everywhere)

**Oracle's ask:** Apply the homepage gradient-container + decorative-circles + trust-bullets pattern to ALL final CTA sections across Programs Hub, Program Detail, and all other pages.

**Verdict:** ✅ APPROVED

**Rationale:** Homepage CTA is rated 5/5; interior CTAs are rated 3/5 due to plain white background with a single button. The gradient container is already implemented for homepage — extending it to interior pages is a pattern reuse, not new work. This creates consistency and raises conversion potential across the entire site. The dual-CTA pattern (primary button + phone number) should also be universal on all final CTAs.

**Implementation note:** A `CTASection` component (or standardized final-CTA section pattern) should be documented as a shared component. It receives: `heading`, `subtext`, `primaryCta`, `secondaryCta` (phone link), and optional `trustBullets[]`. It always renders the gradient container with decorative circles.

**Scope:** Phase 1
**Spec update needed:** Yes — trinity-frontend-spec.md (add CTASection component), oracle-design-spec.md (CTA section spec)

---

### Recommendation 6: Increase Mobile Typography Baseline

**Oracle's ask:** Increase stat card label text from 11px (`text-[11px]`) to 12px (`text-xs`). Verify all mobile body text is at least 14px.

**Verdict:** ✅ APPROVED

**Rationale:** 11px text is at the readability boundary (WCAG 2.2 doesn't specify a minimum font size, but industry consensus and iOS/Android guidelines both recommend 12px minimum). This is a micro-fix with zero architectural impact. Any instance of `text-[11px]` in the codebase should be `text-xs` (12px).

**Scope:** Phase 1
**Spec update needed:** No — this is a Trinity implementation detail, but confirm in the oracle-design-spec typography table minimum sizes.

---

### Recommendation 7: Unify Process Step Styling

**Oracle's ask:** Homepage uses filled gradient circles for process steps; program detail pages use bordered circles. Standardize to filled circles (more impactful).

**Verdict:** ✅ APPROVED

**Rationale:** Inconsistency between homepage and detail pages signals lack of design system discipline. The `ProcessSteps` component is specced as a shared component — it should have one visual treatment everywhere. Filled gradient circles (primary background, white text number) is the approved canonical style. Oracle rated homepage process steps 4/5; detail page variants read as different components.

**Scope:** Phase 1
**Spec update needed:** Yes — trinity-frontend-spec.md (ProcessSteps spec — explicitly note filled circles, not bordered)

---

### Recommendation 8: Why Cedar Section — Replace Green Stripes with Brand Color

**Oracle's ask:** The secondary green stripes in the "Why Cedar" section should be Cedar Red or a Cedar Blue variant.

**Verdict:** ⚠️ APPROVED WITH CHANGES

**Rationale:** Replacing the green "Why Cedar" card stripes with Cedar Blue (`--primary`) is approved — it creates brand consistency. Using Cedar Red for these stripes is NOT approved (red draws error/warning connotations; "Why Cedar" content is positive/reassuring). Cedar Blue variant or a blue-to-sky gradient is the correct treatment for decorative side-stripes on Why Cedar / differentiator cards.

**Scope:** Phase 1
**Spec update needed:** No — implementation-level decision for Trinity.

---

### Recommendation 9: Proof Bar Mobile Touch Targets

**Oracle's ask:** Proof Bar items are ~40px on mobile, below the 44px WCAG minimum touch target. Increase height slightly.

**Verdict:** ✅ APPROVED

**Rationale:** Touch target compliance is non-negotiable per oracle-design-spec.md § Touch Targets and WCAG 2.5.5. This is a padding adjustment (`py-2.5` → `py-3`) on ProofBar items. No architectural impact.

**Scope:** Phase 1
**Spec update needed:** Yes — oracle-design-spec.md (ProofBar spec min-height)

---

### Recommendation 10: Program Card Hover Gradient — Incorporate Cedar Orange

**Oracle's ask:** The program card hover gradient (primary → secondary) could incorporate Cedar Orange.

**Verdict:** ⚠️ APPROVED WITH CHANGES

**Rationale:** The card hover top-gradient can use Cedar Blue → Cedar Orange (`from-primary to-accent`) on hover rather than the current primary → secondary (blue → green). This is on-brand and creates visual warmth. However, it must be subtle (top border only, not full card gradient), and the orange must be used as an accent stripe, not a card background (which would be too visually aggressive). This is a micro-enhancement, not a structural change.

**Scope:** Phase 1
**Spec update needed:** No — implementation detail for Trinity.

---

### Recommendation 11: Connecting Line Visibility in How It Works

**Oracle's ask:** The connecting line between process steps is `primary/20` opacity — very subtle. Make it more visible.

**Verdict:** ✅ APPROVED

**Rationale:** At `primary/20`, the connecting line barely exists. `primary/40` or `border` color maintains subtlety while being visually readable. Simple CSS change.

**Scope:** Phase 1
**Spec update needed:** Yes — oracle-design-spec.md (ProcessSteps spec, connecting line color)

---

### Recommendation 12: Add More Photography

**Oracle's ask:** Current site is illustration/gradient heavy. Real photos would add warmth and make the business feel tangible.

**Verdict:** ❌ REJECTED (Phase 1)

**Rationale:** Oracle's own spec (§ Photography & Imagery Direction) already addresses this correctly: "If Real Photos Unavailable — Use high-quality illustrations (consistent style) for program icons. Use abstract geometric patterns for hero backgrounds. Plan a photo shoot for Phase 1.5." No real photos exist. We cannot design around assets that don't exist, and stock photography would actively harm brand credibility (Oracle explicitly warns against it). Adding a photo shoot to Phase 1 scope is out of bounds and would delay launch.

**Scope:** Deferred — Phase 1.5 photo shoot
**Spec update needed:** No (already correctly handled in oracle-design-spec.md)

---

### Recommendation 13: Interior Testimonial Dark Card Treatment

**Oracle's ask:** Testimonial cards on interior pages feel flat vs. the homepage dark-section testimonials. Consider applying the dark card treatment on interior pages.

**Verdict:** ⚠️ APPROVED WITH CHANGES

**Rationale:** Full dark section on every interior page testimonial block would be visually heavy. Approved approach: on interior pages, use the existing TestimonialCard in `muted` background section, but add the gradient top-accent stripe (already specced for the dark variant). This closes the quality gap without making every page look identical. Program detail pages may use a narrow testimonial strip (2-3 cards) rather than a full dark section.

**Scope:** Phase 1
**Spec update needed:** No — implementation-level guidance for Trinity.

---

### Recommendation 14: Mobile Spacing (How It Works Step Gap)

**Oracle's ask:** Cards in "How It Works" could have slightly more spacing between them on mobile.

**Verdict:** ✅ APPROVED

**Rationale:** Minor spacing improvement. `space-y-4` → `space-y-6` on mobile vertical step layout. No architectural impact.

**Scope:** Phase 1
**Spec update needed:** No — implementation detail.

---

## Approved Implementation Plan

### Priority 1 — Must Do (Brand Alignment)

1. **Update CSS custom properties** in globals.css:
   - `--primary` → Cedar Blue (#0d8ecf, `hsl(199 87% 43%)`)
   - `--accent` → Cedar Orange (#ffa725, `hsl(38 97% 57%)`)
   - Add `--brand-red` → Cedar Red (#d92027, `hsl(358 74% 49%)`)
   - `--secondary` stays green (semantic success color)
2. **Update hero gradients** across homepage hero and PageHero to use Cedar Blue range: `from-[#0a5a8a] via-[#0d8ecf] to-[#2ea8dc]`
3. **Audit and update color-usage matrix** — flag Cedar Blue as NOT text-safe on white; document `#0a7ab8` as the text-safe variant

### Priority 2 — Should Do (Visual Consistency)

4. **Upgrade PageHero** with decorative orbs/rings on interior pages (add `decorative?: boolean` prop, default `true`)
5. **Standardize CTASection** as a shared component with gradient-container, decorative circles, trust bullets, dual CTA — apply to ALL final CTA sections across all pages
6. **Unify ProcessSteps** to always use filled circles (primary background, white number) — remove bordered variant
7. **Apply Cedar Red** (`--brand-red`) to: PricingCard "Most Popular" badge, program card top-gradient accent, emphasis highlights

### Priority 3 — Quick Wins (Polish)

8. **Mobile typography baseline** — change `text-[11px]` to `text-xs` everywhere
9. **Proof Bar touch targets** — increase mobile item height to `min-h-[44px]`
10. **Process step connecting line** — increase from `primary/20` to `primary/40` or `border` color
11. **Why Cedar card stripes** — change from secondary-green to primary (Cedar Blue)
12. **Program card hover gradient** — shift top-border accent to `from-primary to-accent` (Cedar Blue → Cedar Orange)

---

## Spec Updates Made

### oracle-design-spec.md

1. **Color token CSS block** — Updated `--primary` to Cedar Blue (#0d8ecf), `--accent` to Cedar Orange (#ffa725), added `--brand-red` and `--brand-red-foreground` tokens, retained `--secondary` green for semantic uses.
2. **Color-Usage Matrix** — Added Cedar Blue row (documents 3.48:1 on white = NOT text-safe; approved as background/icon/border; text-safe variant #0a7ab8 at 4.52:1). Updated Primary row to reflect new value. Added Brand Red row. Updated Accent row to Cedar Orange.
3. **Hero section guidance** — Added approved gradient formula for Cedar Blue. Replaced fintech-dark gradient recommendation.
4. **PageHero spec** — Added note that decorative orbs should be present on all heroes (scaled down for interior pages). Interior heroes use 1-2 smaller orbs vs. homepage's 2-3.
5. **CTA section spec** — Added `CTASection` module spec: always uses gradient container, decorative circles, dual-CTA (button + phone), optional trust bullets.
6. **ProofBar spec** — Added `min-h-[44px]` touch target requirement to mobile item spec.
7. **ProcessSteps spec** — Clarified step circle is always filled (primary background, white text number). Connecting line opacity updated to `primary/40`.
8. **Revision history** — Added v1.2 entry.

### trinity-frontend-spec.md

1. **Design Token Consumption CSS example** — Updated `--primary`, `--accent` to Cedar brand values; added `--brand-red`.
2. **PageHero component spec** — Added `decorative?: boolean` prop (default `true`). Documents orb/ring rendering behavior.
3. **ProcessSteps component spec** — Explicitly documented that step circles are always filled (never bordered variant).
4. **Added `CTASection` component** — New shared component spec: `{ heading, subtext, primaryCta, secondaryCta?, trustBullets? }`. Always renders gradient container. Required on all final CTA sections.
5. **Updated per-page implementation guides** — Replaced inline `<Section: CTA>` entries with `<CTASection>` on all pages.
6. **Revision history** — Added v1.2 entry.

---

## Decisions Recorded

| Decision | By | What |
|----------|----|------|
| Cedar Blue as primary | Morpheus | `--primary: hsl(199 87% 43%)` (#0d8ecf). NOT text-safe on white (<4.5:1). Approved as background/icon/border. Text-safe variant: #0a7ab8. |
| Cedar Orange as accent | Morpheus | `--accent: hsl(38 97% 57%)` (#ffa725). Background/decoration only — never text on light backgrounds. |
| Cedar Red as brand-red token | Morpheus | `--brand-red: hsl(358 74% 49%)` (#d92027). New token, NOT replacing --secondary. Use for emphasis badges, featured indicators, brand accents only. |
| Secondary green retained | Morpheus | `--secondary` (#059669) stays for semantic success/outcome states. Green = growth/success has established UX meaning that Cedar Red cannot replace. |
| CTASection standardized | Morpheus | All final CTA sections across all pages use the gradient-container pattern with dual CTA. CTASection is a shared component, not an ad-hoc per-page implementation. |
| PageHero decorative orbs | Morpheus | PageHero renders decorative blurred orbs on all pages by default. Interior pages use scaled-down orbs (1-2 smaller). Homepage uses 2-3 larger orbs. |
| Photography deferred | Morpheus | No real photography in Phase 1. No stock photography. Gradient/illustration fallbacks as specced in oracle-design-spec.md. Phase 1.5 photo shoot planned. |

---

## Scope Guard

The following items from Oracle's review are explicitly **out of scope for Phase 1**:

| Item | Reason |
|------|--------|
| Real center/facility photography | No assets available. Phase 1.5 scope. |
| Stock photography | Actively harmful to brand — explicitly rejected in oracle-design-spec.md |
| News & Events page | Already deferred to Phase 2 per 2026-05-02 decision ledger |
| Customer portal, auth, payments | Phase 2 by explicit owner decision |
| Complex scroll choreography (Framer Motion) | CSS-only animations approved. Framer Motion not justified unless Oracle identifies a specific complex sequence. |
| Google Maps embed | Static map image approved; live embed adds external dependency and GDPR surface area not needed in Phase 1. |

---

*Review completed by Morpheus (Lead/Architect) on 2026-05-03.*
