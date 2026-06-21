# Motion System — 澳門新吉利新能源綜合車輛有限公司

> Defines all animation and transition rules for the website.  
> Read alongside `/docs/ui-system.md`. Motion must not conflict with token or hover rules defined there.

---

## 1. Motion Direction

**Premium industrial B2B.** Motion supports content hierarchy and guides attention. It never decorates.

| Allowed | Forbidden |
|---------|-----------|
| Fade-up reveals | Bouncing or spring effects |
| Stagger grid entrances | Rotating or spinning elements |
| Hover lift on clickable cards | Parallax scrolling |
| Active-state transitions on selectable tools | Looping decorative animations |
| Advisory process auto-highlight cycle | Color flashes or pulse effects |
| Progress fill bars | Page transition slides or fades |

**Rule:** If removing the animation makes the page harder to understand, the animation is doing too much work. Every animated element must be fully readable and functional without it.

---

## 2. Allowed Motion Types

### 2a. Section Fade-Up Reveal

Used for section headers and content blocks as they enter the viewport.

```
Initial state:  opacity: 0; transform: translateY(16px)
Final state:    opacity: 1; transform: translateY(0)
Duration:       500ms – 700ms
Easing:         ease-out
Trigger:        IntersectionObserver (threshold: 0.1)
```

- Apply to: section headers (eyebrow + h2), full-width description paragraphs.
- Do NOT apply to: sticky nav, footer, hero (already visible on load), dashboard calculator panels.

### 2b. Stagger Reveal for Card Grids

Used when a grid of cards enters the viewport. Cards appear sequentially rather than all at once.

```
Per-card delay:   index × 80ms (up to 120ms max per step)
Duration:         500ms per card
Easing:           ease-out
Initial state:    opacity: 0; transform: translateY(12px)
Final state:      opacity: 1; transform: translateY(0)
```

- Apply to: Vehicles page cards, Solutions page cards, Brand Portfolio cards.
- Do NOT apply to: dashboard KPI cards (fleet economics), disclaimer blocks, trust pillars.
- Cap stagger at 5 items. Cards beyond index 4 all use the same delay as index 4 — prevents long waits.

### 2c. Hover Transitions (Clickable Cards Only)

Already defined in `/docs/ui-system.md`. Motion spec here is the timing layer.

```
Property:   transform (translateY), box-shadow, border-color
Duration:   300ms (in), 200ms (out)
Easing:     ease-out (in), ease-in (out)
```

- Applies only to: Content Cards (type 3a in ui-system.md) where the card or its footer is a link.
- Does NOT apply to: Dashboard Cards (3b), informational cards with no action.

### 2d. Active-State Transitions for Selectable Tools

Used in ColdChainMatrix temperature selector buttons.

```
Property:   border-color, background-color, ring
Duration:   200ms
Easing:     ease-in-out
```

- State change is user-triggered (click). No delay.
- Active ring (`ring-1 ring-primary`) must appear immediately on click — do not animate the ring itself.

### 2e. Advisory Process Timeline Auto-Highlight

Defined in `components/AdvisoryProcess.tsx`. Motion spec for reference:

```
Step interval:       2500ms
Circle color change: transition-colors duration-500 ease-in-out
Card border/bg:      transition-colors duration-500 ease-in-out
Connector fill:      transition-[width] duration-700 ease-in-out
Progress fill bar:   CSS @keyframes processFill, linear, 2500ms, forwards
```

- All steps remain visible at all times.
- Animation is supplemental — the active step is also identifiable by border and background without color.

---

## 3. Timing Reference

| Context | Duration | Easing |
|---------|----------|--------|
| Section fade-up | 500ms – 700ms | ease-out |
| Card stagger (per card) | 500ms | ease-out |
| Stagger delay per step | 80ms – 120ms | — |
| Hover in | 300ms | ease-out |
| Hover out | 200ms | ease-in |
| Active-state change | 200ms | ease-in-out |
| Timeline circle/card | 500ms | ease-in-out |
| Timeline connector | 700ms | ease-in-out |
| Progress fill bar | 2500ms | linear |

---

## 4. Implementation Approach

**No external libraries.** Use only:
- Tailwind `transition`, `duration-*`, `ease-*` utility classes for hover and state transitions
- CSS `@keyframes` in `app/globals.css` for fill animations
- React `useState` + `useEffect` for timed auto-cycles (AdvisoryProcess)
- `IntersectionObserver` in a small `"use client"` wrapper component for scroll reveals

### Scroll Reveal Component Pattern

```tsx
// components/FadeUp.tsx
"use client";
import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  delay?: number; // ms, for stagger
  className?: string;
};

export default function FadeUp({ children, delay = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: "600ms",
        transitionTimingFunction: "ease-out",
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
      }}
    >
      {children}
    </div>
  );
}
```

Usage for stagger:
```tsx
{cards.map((card, i) => (
  <FadeUp key={card.name} delay={Math.min(i, 4) * 100}>
    <Card ... />
  </FadeUp>
))}
```

---

## 5. Reduced Motion

All motion must respect `prefers-reduced-motion: reduce`.

**CSS approach** (add to `app/globals.css`):
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**React component approach** for `FadeUp`:
```tsx
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
// If true: render children without opacity/transform initial state
```

**Advisory Process:** At reduced motion, the step interval still advances (content changes), but color transitions collapse to instant (`duration-0`).

---

## 6. What Not to Animate

These elements must never receive animation beyond Tailwind's built-in `transition` on state change:

| Element | Reason |
|---------|--------|
| Navbar | Sticky — must always be stable |
| Footer | Below fold, no benefit |
| Form inputs / selects | Focus ring is sufficient affordance |
| Disclaimer blocks | Legal/advisory content — must always be readable |
| Dashboard KPI numbers | Values change reactively — animating them would obscure data |
| Page background | Never animate background-color or opacity of the page body |
| CTA dark panels | Panel itself is static; only the button has hover transition |

---

## 7. Scroll Reveal Priority Order

When implementing, apply in this order to avoid visual noise:

1. Section headers (eyebrow + h2) — single fade-up, no stagger
2. Card grids — stagger per card
3. Standalone description paragraphs — optional, only if section is long
4. Trust pillars — stagger acceptable but not required
5. Advisory process — already animated, no additional reveal needed

Do not apply fade-up to elements that are already animated (AdvisoryProcess, ColdChainMatrix selector).
