# Homepage Design Spec — Life Insurance

**Date:** 2026-04-03
**Status:** Approved
**Stitch Project:** `17014209470942739818` (Life Insurance Homepage)
**Stitch Screen:** `f505a2932a024c38b6a2e4b8cb6519a5`
**Design Assets:** `.stitch/designs/homepage.html`, `.stitch/designs/homepage-screenshot.jpg`

---

## 1. Project Context

Marketing homepage for a life insurance company specializing in **final expense / burial insurance** for American families aged 50–80. Reference: patriotamericanbenefits.com. Agent-centric model, phone-first conversion. No auth, no dashboard — pure marketing site.

**Primary goal:** Drive phone calls to licensed agents.

---

## 2. Design Approach

**"Modern Heritage"** — Traditional corporate trust foundation combined with contemporary polish. Subtle and consistent throughout. The same trustworthy signals as patriotamericanbenefits.com but visually elevated.

---

## 3. Design System

### Colors

| Token | Hex | Usage |
|---|---|---|
| `--color-navy-950` | `#0A1628` | Footer, deepest surfaces |
| `--color-navy-800` | `#0A2240` | Hero, header, How It Works background |
| `--color-teal-500` | `#0EA5C9` | Primary CTA buttons, icon accents, highlights |
| `--color-teal-600` | `#0284C7` | CTA gradient end, hover state |
| `--color-slate-50` | `#F8FAFC` | Alternating section backgrounds |
| `--color-white` | `#FFFFFF` | Cards, text on dark |
| `--color-text-primary` | `#1E293B` | All headings |
| `--color-text-body` | `#374151` | Body text |
| `--color-text-muted` | `#9CA3AF` | Labels, muted text |
| `--color-amber-500` | `#F59E0B` | Trust badge accent |

### Typography

| Role | Size | Weight | Line Height |
|---|---|---|---|
| Hero Headline | 64px | 700 | 1.1 |
| Section Heading (H2) | 40px | 700 | 1.2 |
| Card Heading (H3) | 20px | 600 | 1.3 |
| Body | 17px | 400 | 1.75 |
| Label / Badge | 13px | 600 | — |
| CTA Button | 16px | 600 | — |

**Font:** IBM Plex Sans (Google Fonts)
```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap');
```

### Shadows

```css
--shadow-card:  0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04);
--shadow-hover: 0 4px 16px rgba(0,0,0,0.10), 0 16px 40px rgba(0,0,0,0.08);
--shadow-nav:   0 1px 0 rgba(0,0,0,0.08);
```

### Border Radius

```css
--radius-button: 8px;
--radius-card:   12px;
--radius-pill:   9999px;
--radius-badge:  9999px;
```

### Spacing

```css
--section-py-desktop: 96px;
--section-py-mobile:  64px;
--container-max-w:    1200px;
--container-px:       24px;
--card-gap:           24px;
--card-padding:       32px;
```

---

## 4. Page Sections

### 4.1 Header (Sticky Nav)
- **Background:** `navy-800` (#0A2240)
- **Height:** 72px
- **Left:** "Life Insurance" wordmark, white, 600 weight
- **Center:** Home · About · Plans · FAQ · Contact — white, 15px
- **Right:** `(888) 000-0000` pill (teal outline) + "Get a Quote" ghost button
- **Scroll behavior:** Transparent at top → navy bg at scroll >50px, 300ms transition

### 4.2 Hero
- **Background:** `navy-800` → `navy-950` diagonal gradient
- **Layout:** 60/40 split (copy left, family photo right with vignette)
- **Headline:** "Protect Your Family's Future" — 64px/700/white
- **Sub:** "Final expense coverage from $9/month. No medical exam. Approved same day."
- **Badge:** Amber pill — "Average funeral costs $8,300 — don't leave that to your family"
- **CTA:** Teal pill button, 56px, "Call Now — (888) 000-0000" with phone icon
- **Secondary:** "Or request a callback →" white text link
- **GSAP:** Headline fade-up 0ms → sub 200ms → CTA 400ms on page load

### 4.3 Stats / Trust Bar
- **Background:** White — sharp contrast break
- **Layout:** 4 stats in horizontal row, thin vertical dividers
- **Numbers:** 48px/700/navy — `130+` · `13` · `49` · `$1M+`
- **Labels:** 13px/600/uppercase/gray — "Licensed Agents" · "Carrier Partners" · "States Licensed" · "Monthly Production"
- **GSAP:** CountUp animation on ScrollTrigger enter

### 4.4 Why Choose Us
- **Background:** `slate-50`
- **Heading:** "Why Families Trust Us"
- **Layout:** 2×3 card grid, white cards
- **Cards (6):** Teal Tabler/Lucide icon + 20px bold title + 15px gray description
  1. Shield — No Medical Exam Required
  2. Zap — Coverage from Day One
  3. DollarSign — Low Monthly Premiums
  4. Users — Plans for Every Age
  5. Building2 — 13 Carrier Options
  6. Map — Licensed in 49 States
- **GSAP:** StaggerReveal, 80ms stagger, fade+slide up

### 4.5 How It Works
- **Background:** `navy-800`
- **Heading:** "Get Covered in 3 Simple Steps" — white
- **Layout:** 3 steps horizontal with dotted connector line
- **Steps:** Teal circle number + icon + white title + white/70 body
  1. Phone — Call Us
  2. Search — Choose a Plan
  3. CheckCircle — Get Covered
- **GSAP:** Steps reveal left→right, 150ms stagger

### 4.6 Carrier Logos
- **Background:** White
- **Label:** "TRUSTED CARRIER PARTNERS" — 12px/teal/uppercase/tracked
- **Heading:** "Backed by America's Most Trusted Insurers" — 32px/navy
- **Layout:** 8 grayscale carrier logo placeholders, hover reveals color

### 4.7 FAQ
- **Background:** `slate-50`
- **Layout:** 65% accordion left / 35% navy CTA card right
- **Accordion (5 items):** React component, GSAP height animation, chevron rotate
  1. Is a medical exam required to apply?
  2. How quickly does coverage start?
  3. What does final expense insurance cover?
  4. How much does coverage cost per month?
  5. Can I apply if I have pre-existing conditions?
- **CTA Card:** Navy bg, "Still have questions?" + teal call button
- **Component:** `FAQAccordion.tsx` — `client:visible`

### 4.8 Bottom CTA
- **Background:** `teal-500` → `teal-600` gradient (left→right)
- **Headline:** "Ready to Protect Your Family?" — 48px/700/white
- **Sub:** "Talk to a licensed agent today. No pressure, no hidden fees, no surprises."
- **Button:** White pill, navy text, 56px — "Call (888) 000-0000"
- **Below button:** "Mon–Fri 9AM–6PM EST · Licensed in 49 States" — 13px/white/70

### 4.9 Footer
- **Background:** `navy-950`
- **Layout:** 4-column grid
  - Col 1: Logo + tagline + copyright
  - Col 2: Quick Links
  - Col 3: Contact Us
  - Col 4: Licensed & Regulated
- **Bottom bar:** Thin divider + copyright + Privacy Policy · Terms links
- **Disclaimer:** Small gray licensing text

---

## 5. Mobile Behavior

- Sticky bottom bar: full-width teal "Call (888) 000-0000" button, always visible
- Hero: stacks to single column, headline scales to 36px
- Stats bar: 2×2 grid on mobile
- Benefit cards: 1-column on mobile
- How It Works: vertical stack
- FAQ: full width (no side card on mobile)
- Header: hamburger → full-screen navy drawer (React `MobileMenu.tsx`)

---

## 6. Animation Strategy

All animations use existing GSAP + ScrollTrigger already installed.
Reuse `ScrollReveal.tsx` and `StaggerReveal.tsx` from `src/components/interactive/`.

| Element | Animation | Notes |
|---|---|---|
| Hero copy | Cascade fade-up on load | 0/200/400ms delays |
| Stats numbers | CountUp via `StatCounter.tsx` | ScrollTrigger |
| Benefit cards | StaggerReveal fade+slide up | 80ms stagger |
| How It Works steps | Stagger left→right | 150ms stagger |
| Bottom CTA | Single ScrollReveal fade-up | — |
| Header bg | CSS transition on scroll event | 300ms, no GSAP needed |

---

## 7. Component File Map

### Blocks (`src/components/blocks/`)
- `Hero.astro`
- `StatsBar.astro`
- `WhyChooseUs.astro`
- `HowItWorks.astro`
- `CarrierLogos.astro`
- `BottomCTA.astro`

### Common (`src/components/common/`)
- `Header.astro`
- `Footer.astro`
- `Button.astro` (variants: primary, ghost, outline)
- `Container.astro`
- `SectionHeading.astro`

### Interactive (`src/components/interactive/`)
- `FAQAccordion.tsx` — `client:visible`
- `MobileMenu.tsx` — `client:load`
- `StatCounter.tsx` — `client:visible`

### Pages
- `src/pages/index.astro` — replaces current stub

### Styles
- `src/styles/global.css` — add `@theme` design tokens

### Layout
- `src/layouts/Layout.astro` — add Header, Footer, update title/meta

---

## 8. Accessibility Checklist

- [ ] All contrast ratios ≥4.5:1 (WCAG AA)
- [ ] Focus rings visible on all interactive elements
- [ ] Alt text on hero image and carrier logos
- [ ] ARIA labels on icon-only buttons
- [ ] FAQ accordion uses `aria-expanded` and `aria-controls`
- [ ] Skip-to-content link in Layout
- [ ] `prefers-reduced-motion` — all GSAP animations wrapped with check
- [ ] Phone number links use `tel:` href
- [ ] Mobile: minimum 44×44px touch targets

---

## 9. Stitch Design Reference

- **Project URL:** https://stitch.withgoogle.com/projects/17014209470942739818
- **Screen:** `f505a2932a024c38b6a2e4b8cb6519a5`
- **HTML:** `.stitch/designs/homepage.html`
- **Screenshot:** `.stitch/designs/homepage-screenshot.jpg`
