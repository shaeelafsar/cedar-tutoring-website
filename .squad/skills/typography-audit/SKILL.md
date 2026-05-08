# Typography Casing Audit Skill

## Purpose
Systematically detect and classify uppercase text across a web application to ensure consistent, brand-aligned typography.

## When to Use
- User reports inconsistent casing
- Post-launch typography review
- Design system audit
- Brand voice alignment check

## Method

### Phase 1: Source Grep (5 min)
Search codebase for casing patterns:
```bash
# Tailwind uppercase utility
grep -rn "uppercase" --include="*.tsx" --include="*.css"

# Letter-spacing (often paired with uppercase)
grep -rn "tracking-" --include="*.tsx"

# CSS text-transform
grep -rn "text-transform" --include="*.css"

# Manual JS uppercasing
grep -rn "\.toUpperCase()" --include="*.tsx"
```

Capture for each match:
- File path and line number
- Surrounding context (component name, element tag)
- Visual role: eyebrow | heading | label | badge | button | nav | body

### Phase 2: Visual Inspection via Playwright (15 min)
Run on all marketing routes to detect CSS-applied AND manually-written uppercase:

```javascript
// Detect all uppercase text elements
const findings = await page.evaluate(() => {
  const results = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const processed = new Set();
  
  while (walker.nextNode()) {
    const text = walker.currentNode.textContent?.trim();
    if (!text || text.length < 3) continue;
    
    const el = walker.currentNode.parentElement;
    const styles = window.getComputedStyle(el);
    
    // CSS uppercase OR manual all-caps
    const isUppercaseCSS = styles.textTransform === 'uppercase';
    const isManualUppercase = /^[A-Z\s\d\-&'!?]+$/.test(text) && /[A-Z]{3,}/.test(text);
    
    if (isUppercaseCSS || isManualUppercase) {
      results.push({
        text: text.slice(0, 80),
        tagName: el.tagName.toLowerCase(),
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
        textTransform: styles.textTransform,
        isUppercaseCSS,
        isManualUppercase
      });
    }
  }
  return results;
});
```

### Phase 3: Classification Matrix
For each finding, assign a verdict:

| Visual Role | Expected Casing | Verdict Options |
|-------------|-----------------|-----------------|
| Eyebrow (above h1/h2) | UPPERCASE | KEEP if short + tracked |
| Section heading (h2/h3) | Sentence case | CHANGE if uppercase |
| Card title | Sentence case | CHANGE if uppercase |
| Badge/chip | UPPERCASE | KEEP if ≤3 words |
| Nav group title | UPPERCASE | KEEP |
| Button | Sentence case | CHANGE if uppercase |
| Table header | UPPERCASE | KEEP |

### Phase 4: Brand Alignment Check
Apply framework criteria:
- **Bringhurst:** ALL CAPS for short labels with tracking, never for headlines or body
- **Nielsen #4:** Consistent patterns across similar elements
- **Brand voice:** Warm brands → minimal uppercase; Corporate brands → more acceptable

## Outputs

1. **Casing Inventory Table**
   | Page | Element | Source file:line | Current | Role | Verdict |

2. **Proposed Rule** — Codified casing guidelines

3. **Fix List for Implementation** — Specific file:line changes

4. **Open Questions** — Brand judgment calls for stakeholder

## Example Verdicts

| Finding | Role | Verdict | Rationale |
|---------|------|---------|-----------|
| "ACADEMIC PROGRAMS" (12px/600) | Eyebrow | KEEP | Short label, tracked |
| "PERSONALIZED LEARNING" (16px h3) | Subheading | CHANGE | Heading should be sentence case |
| "PROGRAMS" (14px footer h3) | Nav group | KEEP | Standard nav pattern |
| "BOOK NOW" (button) | Button | CHANGE | Buttons should be sentence case |

## References
- Robert Bringhurst, *Elements of Typographic Style*
- Nielsen Norman Group Heuristic #4 (Consistency)
- Material Design Typography Guidelines
