# UI System — 澳門新吉利新能源綜合車輛有限公司

> Authoritative reference for all UI decisions on this website.  
> Source of truth when code and design intent conflict.

---

## 1. Design Tokens

All values come from `app/globals.css` `@theme {}`. Never use raw Tailwind color classes where a token exists.

| Role | Token | Value | Use |
|------|-------|-------|-----|
| Page background | `bg-bg` | `#FFFFFF` | `<body>`, page sections, card backgrounds |
| Surface (raised) | `bg-surface` | `#F4F6F8` | Trust bars, dashboard KPI cells, alt-band sections |
| Surface 2 (inset) | `bg-surface2` | `#E8ECF0` | Hover target for clickable surface cards, progress bars |
| Border | `border-border` | `#D0D7DE` | All card borders, dividers, input borders |
| Primary (teal) | `text-primary` / `bg-primary` | `#0D9488` | CTAs, active states, accent bars, eyebrows |
| Secondary (blue) | `text-secondary` / `bg-secondary` | `#0284C7` | Cold-chain accent, secondary links, gradient end |
| Warning (amber) | `text-warning` / `bg-warning` | `#D97706` | Disclaimers, caution indicators |
| Dark panel | `bg-[#1E293B]` (slate-800) | `#1E293B` | CTA panels, input panel headers — **not a token; use this exact value** |

### Forbidden patterns
- `bg-white` — use `bg-bg`
- `border-slate-200` — use `border-border`
- Any arbitrary color not listed above without explicit justification in code comment

---

## 2. Page Header Standard

Every page (including homepage sections) uses a consistent eyebrow + headline structure.

```
[eyebrow]        text-xs font-semibold uppercase tracking-[0.2em] text-primary
[headline h2]    text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl
[description]    text-base leading-7 text-gray-500 (optional)
```

- Eyebrow tracking is **always `tracking-[0.2em]`** — homepage inline sections must match Section component.
- The `<Section>` component is the canonical implementation. Use it for all subpages.
- Homepage hand-written sections must match the same eyebrow spec.

---

## 3. Card Types

There are three distinct card surfaces. Each has a fixed visual spec.

### 3a. Content Card (Vehicles, Solutions, Brand Portfolio)

Used for browsable, comparative content (vehicle categories, industry solutions, brand tiles).

```
rounded-2xl
border border-border
bg-bg
shadow-sm
transition-all duration-300
hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)]
```

- Always has a **top accent bar**: `h-1 w-full bg-gradient-to-r from-primary to-secondary`
- Heading: `text-lg font-semibold text-gray-900`
- Description: `text-sm leading-6 text-gray-500`
- Clickable content cards: the entire card must be wrapped in `<Link>` or the card must contain a clearly labelled footer link
- **Title-only hover is not allowed.** Hover must affect the whole card (border, shadow, lift)

### 3b. Dashboard / KPI Card (Fleet Economics results, ColdChainMatrix vehicle pills)

Used for read-only data output. Not clickable by the user.

```
rounded-xl
border border-border  (or semantic variant: border-primary/30, border-secondary/30, border-warning/30)
bg-surface  (or semantic variant: bg-primary/5, bg-secondary/5, bg-warning/5)
```

- **No lift or translate hover.** These are data displays, not navigation targets.
- May use `transition` for state changes driven by user input (e.g. calculator result changes).
- No `shadow` — keep them flat and data-focused.

### 3c. Gateway / Feature Card (Homepage navigation cards)

Used only on the homepage gateway section. Larger, used as primary navigation.

```
rounded-3xl        ← intentionally larger radius for homepage premium feel
border border-border
bg-surface
transition hover:border-secondary hover:bg-surface2
```

- No lift or shadow — these are layout anchors, not individual items.
- Entire card is a `<Link>`.
- Does not use a top accent bar.

---

## 4. Hover Behavior

| Card type | Hover allowed | Behavior |
|-----------|--------------|----------|
| Content Card (3a) | Yes | `hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)]` |
| Dashboard Card (3b) | No lift/shadow | State changes only (semantic border/bg reacts to calculator input) |
| Gateway Card (3c) | Yes | `hover:border-secondary hover:bg-surface2` (no lift) |
| Trust pillars, info blocks | No | Static — do not add hover to non-interactive elements |

**Rule: title-only hover is forbidden.** If a card has hover, it must apply to the entire card container — border, shadow, and lift together. Partial hover (e.g. only the heading changes color on card hover) is not permitted.

**Rule: clickable cards must make the entire card surface the click target.** Either wrap the card in `<Link>`, or the card must contain a footer link that is clearly labelled. In the latter case, the card itself must still have the full hover treatment.

---

## 5. Shadow System

| Context | Shadow value |
|---------|-------------|
| Content Card default | `shadow-sm` |
| Content Card hover | `shadow-[0_18px_45px_rgba(15,23,42,0.10)]` |
| Hero advisory panel | `shadow-xl` |
| Dashboard Card | none |
| Gateway Card | none |
| Inputs, selects | none |
| CTA dark panel | none (relies on contrast, not shadow) |

---

## 6. Radius System

| Element | Radius |
|---------|--------|
| Content Card | `rounded-2xl` |
| Dashboard Card | `rounded-xl` |
| Gateway Card | `rounded-3xl` |
| CTA dark panel wrapper | `rounded-3xl` |
| Buttons (primary) | `rounded-xl` |
| Buttons (nav) | `rounded-lg` |
| Tag / pill | `rounded-full` |
| Input, select | `rounded-lg` |
| Step circle (AdvisoryProcess) | `rounded-full` |
| Numbered icon block | `rounded-xl` |

---

## 7. CTA Panel Style

All subpage CTAs (Vehicles, Solutions, Refrigeration, Fleet Economics) use the same dark panel pattern.

**Outer wrapper:**
```html
<section class="border-t border-border px-6 py-14 md:py-24 lg:px-8">
  <div class="mx-auto max-w-[800px] overflow-hidden rounded-3xl">
```

**Inner panel:**
```html
<div class="bg-[#1E293B] px-10 py-10 text-center md:px-14 md:py-12">
  <!-- eyebrow: text-xs font-semibold uppercase tracking-[0.2em] text-primary -->
  <!-- h2: text-2xl font-semibold text-white -->
  <!-- p: text-sm leading-7 text-slate-400 -->
  <!-- button: mt-8 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 -->
```

**Rules:**
- CTA section vertical padding: `py-14 md:py-24` — matches Section component. **Not `py-16`.**
- Button inside dark CTA always uses `bg-primary` (teal), never `bg-secondary`.
- Eyebrow inside dark CTA uses `text-primary` (teal) — same as light sections.

**Homepage final CTA** uses a light variant (`bg-surface2` card on white background). This is homepage-only. All subpages use the dark panel.

---

## 8. Tag / Pill Style

One standard pill style across all card surfaces:

```
rounded-full
border border-border
bg-surface
px-3 py-0.5
text-xs font-medium text-gray-600
```

- Always has a background (`bg-surface`), not borderless.
- `py-0.5` — not `py-1`.
- `font-medium` — not plain weight.
- Semantic variants (for compatibility/refrigeration status badges) may use `border-primary/30 bg-primary/10 text-primary` etc., but base tags follow the standard above.

---

## 9. Eyebrow Tracking Standard

**Single value: `tracking-[0.2em]`**

This is the value defined in `components/Section.tsx` and used by all subpages. Homepage inline eyebrow divs must use the same value. `tracking-[0.25em]` is a divergence and must be corrected.

---

## 10. Homepage vs Subpage Rules

The homepage may use premium treatments not available on subpages, but must still follow the base system.

| Attribute | Homepage | Subpages |
|-----------|----------|----------|
| Gateway card radius | `rounded-3xl` | N/A |
| Final CTA | Light `bg-surface2` box | Dark `bg-[#1E293B]` panel |
| Hero panel | Dark `bg-[#1E293B]` advisory brief | N/A |
| Advisory Process | Animated component, `bg-surface` band | N/A |
| Section pattern | Hand-written inline sections | `<Section>` component |
| Eyebrow tracking | `tracking-[0.2em]` | `tracking-[0.2em]` (via Section) |
| Border token | `border-border` | `border-border` |
| Button style | Same as subpages | Same as homepage |
| Card radius | `rounded-2xl` (content), `rounded-3xl` (gateway) | `rounded-2xl` |
| Shadow on cards | `shadow-sm` | `shadow-sm` |

**The homepage is permitted to be more expressive** in layout (hero panel, animated process, alternating section backgrounds) but is **not permitted to deviate** from radius, shadow, border, button, or token standards.

---

## 11. Input / Form Style

All form inputs and selects:

```
w-full rounded-lg border border-border bg-bg
px-3 py-2.5
text-sm text-gray-900
focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary
```

- Background is always `bg-bg` (white), never `bg-surface`.
- Padding is `py-2.5` for calculator inputs; `py-3` for contact form (slightly more generous for single-use form UX). Both are acceptable.
- Labels: `text-xs font-medium text-gray-600` with `mb-1.5`.

---

## 12. Disclaimer / Advisory Notice Style

Used in Fleet Economics and ColdChainMatrix:

```
rounded-2xl border border-warning/30 bg-warning/5 p-5
```

Header: amber dot `h-2 w-2 rounded-full bg-warning` + `text-sm font-semibold text-gray-700`  
Body: `text-sm leading-7 text-gray-500`

This pattern must not be used for general content. Reserved for legal/advisory disclaimers only.

---

## Quick Reference — Token Decision Table

| Need | Use |
|------|-----|
| Page/section background | `bg-bg` |
| Card background | `bg-bg` |
| Alt-band section background | `bg-surface` |
| Inset / hover surface | `bg-surface2` |
| All card and input borders | `border-border` |
| Primary button + active states | `bg-primary` / `text-primary` |
| Cold-chain / secondary accent | `bg-secondary` / `text-secondary` |
| Dashboard card — positive | `border-primary/30 bg-primary/5 text-primary` |
| Dashboard card — neutral/EV | `border-secondary/30 bg-secondary/5 text-secondary` |
| Dashboard card — caution | `border-warning/40 bg-warning/5 text-warning` |
| Advisory disclaimer | `border-warning/30 bg-warning/5` |
| Dark CTA / input panel header | `bg-[#1E293B]` |
