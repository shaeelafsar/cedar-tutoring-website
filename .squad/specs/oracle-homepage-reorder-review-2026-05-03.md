# Oracle UX Review: Homepage Optimization & Mobile Fixes
## Date: 2026-05-03
## Requested by: Shaeel

---

## 1. Mobile Testimonials Fix

### Root Cause Diagnosis

**Location:** `src/app/(marketing)/page.tsx` lines 414-451

The bug occurs because of a **CSS containment conflict** between the horizontal scroll container and the individual card content:

| Property | Value | Issue |
|----------|-------|-------|
| Card wrapper | `min-w-[85%]` | Sets a minimum width at 85% of viewport, correct |
| Card overflow | No `overflow` control | Text can overflow the card bounds |
| Quote text | `text-sm leading-7` | Normal text styling, not the issue |
| Card padding | `p-5` | Creates ~40px total horizontal padding |

**The actual problem:** The `.min-w-[85%]` constraint sets the card's minimum width relative to the scroll container, BUT there's no mechanism to **force text to wrap inside this constrained width**. Long words or continuous text can push the card's actual width beyond 85%, triggering horizontal scroll **inside** each card.

Additionally, the card uses `shrink-0` (preventing flex shrink) but lacks `max-w-[85%]` or explicit width constraints that would force text wrapping.

### Suggested CSS Fix

**Current (lines 417-419):**
```tsx
className="relative min-w-[85%] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm md:min-w-0 md:p-6"
```

**Proposed fix:**
```tsx
className="relative min-w-[85%] max-w-[85%] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:min-w-[340px] sm:max-w-[340px] md:min-w-0 md:max-w-none md:p-6"
```

**Alternative (more robust):** Add `break-words` to the quote text:
```tsx
// Line 436
<p className="mt-4 break-words text-sm leading-7 text-white/80 sm:mt-5">
```

**Recommended approach:** Apply BOTH fixes for belt-and-suspenders protection:
1. Add `max-w-[85%]` to the card to constrain the card itself
2. Add `break-words` to the quote text as a fallback

### Before/After Behavior

| Behavior | Before | After |
|----------|--------|-------|
| Card width on mobile | Expands beyond 85% when text is long | Stays exactly 85% viewport width |
| Text wrapping | May overflow horizontally | Always wraps within card bounds |
| Scroll type | Both container scroll + per-card scroll | Container scroll only (horizontal swipe) |
| Touch experience | Confusing dual-axis scrolling | Clean single-direction snap scroll |

---

## 2. Homepage Section Reordering

### Current Order vs Proposed Order

| Position | Current Section | Proposed Section | Change |
|----------|-----------------|------------------|--------|
| 1 | Hero | Hero | ✅ No change |
| 2 | Proof Bar | Proof Bar | ✅ Keep (consider merge option below) |
| 3 | Programs | **Testimonials** | ⬆️ Move up from position 6 |
| 4 | How It Works | Programs | ⬇️ Move down from position 3 |
| 5 | Why Cedar | How It Works | ⬇️ Move down from position 4 |
| 6 | Testimonials | Why Cedar | ⬇️ Move down from position 5 |
| 7 | CTASection | CTASection | ✅ No change |

### Rationale for Each Position (Conversion Psychology)

#### Position 1: Hero ✅ KEEP
- **Why it works:** Immediate value proposition, emotional hook, clear CTAs
- **Psychology:** Attention capture within 3 seconds; the "what" and "for whom"
- **Shaeel's feedback:** "You nailed this" — no changes needed

#### Position 2: Proof Bar — KEEP OR MERGE
**Option A: Keep as-is**
- Fast credibility scan (5.0 Google, 1:3 ratio, K-12, etc.)
- Reinforces hero claims immediately
- Low cognitive load

**Option B: Merge into Hero** (consideration)
- The Hero already has mini proof stats (5.0, 1:3, K-12)
- Proof Bar is slightly redundant
- Could free up visual real estate
- **Recommendation:** Keep for now; the orange strip creates visual rhythm and isn't distracting

#### Position 3: Testimonials ⬆️ MOVE UP
**Conversion rationale:**
- **Social proof is #1 trust driver for local service businesses** (BrightLocal 2024: 87% of consumers read reviews for local businesses)
- Parents deciding on tutoring are in **high-stakes decision mode** — they need reassurance early
- Current position (6) means mobile users might never scroll that far
- Moving testimonials higher catches parents in their "convince me" phase before they start evaluating programs

**Psychology sequence:** Hero → "Others trust us" → "Here's what we offer"

#### Position 4: Programs ⬇️ MOVE DOWN
**Conversion rationale:**
- Once trust is established, NOW they want to know "do you have what I need?"
- Programs section answers the "fit" question
- Still appears above the fold on most desktop screens

#### Position 5: How It Works ⬇️ MOVE DOWN
**Conversion rationale:**
- At this point, they know WHAT you do (programs) and WHO trusts you (testimonials)
- Now they need to understand HOW the experience unfolds
- Reduces anxiety about process and commitment

#### Position 6: Why Cedar ⬇️ MOVE DOWN
**Conversion rationale:**
- Differentiators matter most to comparison shoppers
- By position 6, the visitor is likely deep in evaluation mode
- Reinforces reasons to choose Cedar over competitors

#### Position 7: CTASection ✅ KEEP
- **Why it works:** Final push after all the convincing
- **Psychology:** Reciprocity and commitment — after investing time scrolling, they're more likely to act
- **Shaeel's feedback:** "You nailed this"

### SEO Impact Assessment Per Change

| Change | SEO Impact | Notes |
|--------|------------|-------|
| Move Testimonials to position 3 | **Positive** | Keeps testimonials in main content; no content loss; may improve engagement metrics (time on page, scroll depth) which indirectly help SEO |
| Move Programs to position 4 | **Neutral** | Content remains on page; H2 still visible; no keyword loss |
| Move How It Works to position 5 | **Neutral** | Process content remains; semantic structure unchanged |
| Move Why Cedar to position 6 | **Neutral** | Differentiators still present; no loss of topical relevance |

**Overall SEO verdict:** Section reordering has **no negative SEO impact** as long as all content remains present and properly structured with H2 headings.

---

## 3. Cross-Page Repetitiveness Audit

### Content Overlap Matrix

| Content Element | Homepage | Programs Hub | Program Detail | Verdict |
|-----------------|----------|--------------|----------------|---------|
| **CTASection** | Yes (bottom) | Yes (bottom) | Yes (bottom) | **KEEP ALL** — each page needs a conversion endpoint |
| **Program Cards** | 6 cards, detailed | 6 cards, simpler | Related programs only (2-3) | **KEEP ALL** — different contexts serve different intents |
| **"Why Cedar" features** | 4 features with checks | 4 features (simpler) | N/A | **CONSOLIDATE** — Programs Hub duplicates Homepage |
| **"How It Works" steps** | 4 steps, detailed | N/A | 4 steps, identical | **KEEP BOTH** — Homepage for discovery, Detail for reinforcement |
| **Testimonials** | 3 testimonials | N/A | Program-specific testimonials | **KEEP ALL** — contextually relevant per page |
| **Proof stats** | Hero + Proof Bar | N/A | N/A | **KEEP** — Homepage only, appropriate |

### Detailed Recommendations

#### CTASection — KEEP ON ALL PAGES ✅
**Why keep:**
- Each page represents a different point in the user journey
- Homepage: browsing → conversion
- Programs Hub: comparing programs → conversion
- Program Detail: evaluating specific program → conversion
- Removing any CTA leaves a dead-end page with no action path

**SEO impact of keeping:** Positive (clear conversion paths, multiple entry points to booking)

#### Program Cards — KEEP VARIATIONS ✅
**Why keep:**
- **Homepage cards:** Showcase full portfolio, include "outcomes" tagline — for discovery
- **Programs Hub cards:** Simpler, focused on navigation — for comparison
- **Program Detail "Related" cards:** Cross-selling, 2-3 cards only — for upselling

**What's NOT redundant:** Each card set serves different user intent:
| Location | User Intent | Card Purpose |
|----------|-------------|--------------|
| Homepage | "What do you offer?" | Portfolio overview |
| Programs Hub | "Which program fits my kid?" | Direct navigation |
| Program Detail | "What else might help?" | Cross-sell related options |

**SEO impact:** Positive (internal linking, keyword distribution across pages)

#### "Why Cedar" Features — CONSOLIDATE ⚠️
**Current state:**
- Homepage: 4 detailed feature cards with icon, description, and bullet checks
- Programs Hub: 4 simpler feature cards with title + description only

**Problem:** Programs Hub "Why Cedar" section (lines 73-113) largely duplicates Homepage content with slight rewording. Same 4 themes: small groups, assessment-led, progress visibility, flexible logistics.

**Recommendation:** **REMOVE from Programs Hub**
- The Programs Hub is about program selection, not Cedar differentiation
- Parents who reach Programs Hub have likely seen the Homepage
- If they haven't, they'll encounter "Why Cedar" on Program Detail pages anyway

**SEO impact of removal:**
- **Neutral to Slight Positive** — Less duplicate content across pages; Programs Hub becomes more focused on its core purpose (program comparison)
- No keyword loss — the same content exists on Homepage
- May improve Programs Hub's topical focus score for "tutoring programs" queries

#### "How It Works" Steps — KEEP ON BOTH PAGES ✅
**Why keep:**
- Homepage: Introduces the process for first-time visitors
- Program Detail: Reinforces the process in context of the specific program
- Different audiences may land on either page first (direct search, referral, etc.)

**What's different:**
- Homepage steps are slightly longer (line 30-51 vs. lines 38-59 in program detail)
- Program Detail steps are contextually framed ("We learn where your child is" vs "We learn where your child is now")

**SEO impact:** Neutral (process content is helpful on both pages; not duplicate since context differs)

### Summary: What to Remove/Keep

| Element | Action | SEO Impact |
|---------|--------|------------|
| "Why Cedar" on Programs Hub | **REMOVE** | Neutral (reduces redundancy, improves focus) |
| CTASection everywhere | KEEP | Positive (conversion paths) |
| Program cards (all variations) | KEEP | Positive (internal linking) |
| How It Works (Homepage + Detail) | KEEP | Neutral (different contexts) |
| Testimonials (Homepage + Detail) | KEEP | Positive (social proof at key decision points) |

---

## 4. SEO Validation

### Current SEO Strengths

1. **Semantic HTML structure**
   - Proper H1 → H2 → H3 hierarchy
   - Section landmarks with `aria-label`
   - Clear content organization

2. **Keyword coverage on Homepage**
   - "tutoring" in hero (primary keyword)
   - "K-12" repeated appropriately
   - "Plano, TX" (local SEO)
   - Program names (reading, math, writing, science, Arabic)
   - "assessment" and "progress" (parent intent keywords)

3. **Internal linking**
   - Program cards link to detail pages
   - CTAs link to booking page
   - Breadcrumbs on sub-pages

4. **Local SEO signals**
   - "Plano, TX" in hero and proof bar
   - Local testimonials with city attribution
   - Google rating mention

### Risks from Proposed Changes

| Change | Risk Level | Mitigation |
|--------|------------|------------|
| Moving Testimonials up | **None** | Content remains; may improve engagement metrics |
| Removing "Why Cedar" from Programs Hub | **Very Low** | Content exists on Homepage; no keyword loss |
| Reordering sections | **None** | All content preserved; H2 structure maintained |

### Mitigation Recommendations

1. **After reordering:** Verify all H2 headings remain in logical order for screen readers
2. **After removing Programs Hub "Why Cedar":** Add a subtle text link or CTA directing users to main "Why Cedar" page (if one exists) or mention key differentiators in Programs Hub intro text
3. **Monitor post-launch:** Track Search Console for any ranking changes to Programs Hub

### SEO-Positive Byproducts

- Moving Testimonials up may **increase scroll depth** on Homepage (users engage with reviews)
- Reduced redundancy on Programs Hub creates a **more focused topical page** for "tutoring programs Plano" queries
- All changes preserve the content; nothing is being deleted, only reorganized

---

## 5. Summary: Recommended Changes (Prioritized)

### P0 — Must-Do (User Experience Issues)

| # | Change | File | Effort |
|---|--------|------|--------|
| 1 | **Fix mobile testimonials horizontal scroll** — Add `max-w-[85%]` to card and `break-words` to quote text | `page.tsx` lines 417-419, 436 | 5 min |
| 2 | **Reorder Homepage sections** — Move Testimonials to position 3 (after Proof Bar) | `page.tsx` | 15 min |

### P1 — Should-Do (Conversion Optimization)

| # | Change | File | Effort |
|---|--------|------|--------|
| 3 | **Remove "Why Cedar" section from Programs Hub** — Redundant with Homepage | `programs/page.tsx` lines 73-113 | 5 min |
| 4 | **Review Programs Hub intro text** — Consider adding 1 sentence about Cedar's approach to replace removed section | `programs/page.tsx` line 24-25 | 5 min |

### P2 — Nice-to-Have (Polish)

| # | Change | File | Effort |
|---|--------|------|--------|
| 5 | **Consider merging Proof Bar into Hero** — Evaluate if orange strip is necessary given Hero already has proof stats | `page.tsx` | 30 min (design decision) |
| 6 | **Add mobile-specific testimonial count** — Consider showing only 2 testimonials on mobile to reduce scroll fatigue | `page.tsx` | 10 min |

---

## Implementation Notes for Trinity

### Mobile Testimonials Fix (P0-1)

```tsx
// BEFORE (line 417-419)
className="relative min-w-[85%] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm md:min-w-0 md:p-6"

// AFTER
className="relative min-w-[85%] max-w-[85%] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:min-w-[340px] sm:max-w-[340px] md:min-w-0 md:max-w-none md:p-6"

// ALSO add break-words to quote (line 436)
<p className="mt-4 break-words text-sm leading-7 text-white/80 sm:mt-5">
```

### Section Reorder (P0-2)

Move the entire `<section id="testimonials">` block (lines 394-454) to immediately after the Proof Bar section (after line 226). No content changes needed — just cut and paste the entire section.

### Programs Hub "Why Cedar" Removal (P1-3)

Delete lines 73-113 from `src/app/(marketing)/programs/page.tsx`. This removes the redundant "Why Cedar" section while keeping the Programs cards and CTA.

---

## Sign-Off

**Oracle (UX/Design Reviewer)** — Analysis complete. All recommendations are suggestions only; no code changes made. Trinity or Morpheus should implement after Shaeel approves the direction.

**Confidence levels:**
- Mobile fix: 🟢 High confidence (clear CSS issue)
- Section reordering: 🟢 High confidence (standard conversion optimization pattern)
- Redundancy removal: 🟡 Medium confidence (depends on how often users land directly on Programs Hub)
- SEO impact: 🟢 High confidence (no content removal, only reorganization)
