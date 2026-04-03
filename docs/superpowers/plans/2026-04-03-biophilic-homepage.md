# Biophilic Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert `.stitch/designs/variant-biophilic.html` into a fully-built Astro 6 homepage using Tailwind v4 custom tokens, GSAP scroll animations, and React interactive components.

**Architecture:** Astro block components (zero JS) for static sections, React `.tsx` components for interactive pieces (FAQ accordion, mobile menu), all composed in `src/pages/index.astro`. Design tokens defined once in `src/styles/global.css` via Tailwind v4 `@theme`. FAQ content driven from a typed content collection.

**Tech Stack:** Astro 6, React 19, Tailwind CSS v4 (`@theme`), GSAP + ScrollTrigger, Vitest + React Testing Library, TypeScript, Zod (content collections), Montserrat + Inter (Google Fonts)

---

## File Map

| Status | Path | Responsibility |
|---|---|---|
| Modify | `src/styles/global.css` | Biophilic design tokens via `@theme` |
| Modify | `src/layouts/Layout.astro` | Add fonts, title, SEO meta, Header, Footer |
| Create | `src/content/config.ts` | Zod schema for `faqs` collection |
| Create | `src/content/faqs/index.json` | 5 FAQ entries |
| Create | `src/components/common/Container.astro` | Max-width wrapper |
| Create | `src/components/common/Button.astro` | Reusable button (primary/amber/ghost) |
| Create | `src/components/common/Header.astro` | Sticky nav shell (imports MobileMenu) |
| Create | `src/components/common/Footer.astro` | 4-column footer |
| Create | `src/components/interactive/MobileMenu.tsx` | Full-screen drawer |
| Create | `src/components/interactive/MobileMenu.test.tsx` | MobileMenu tests |
| Create | `src/components/interactive/FAQAccordion.tsx` | Accordion + CTA card |
| Create | `src/components/interactive/FAQAccordion.test.tsx` | FAQAccordion tests |
| Create | `src/components/blocks/Hero.astro` | Hero + blobs + CTA |
| Create | `src/components/blocks/StatsBar.astro` | Wave + 4 stat tiles |
| Create | `src/components/blocks/WhyChooseUs.astro` | 2×3 benefit cards |
| Create | `src/components/blocks/HowItWorks.astro` | Dark section, 3 steps |
| Create | `src/components/blocks/CarrierLogos.astro` | Grayscale logo strip |
| Create | `src/components/blocks/BottomCTA.astro` | Gradient CTA section |
| Modify | `src/pages/index.astro` | Compose all blocks |

---

## Task 1: Design Tokens

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Replace global.css content**

```css
/* src/styles/global.css */
@import "tailwindcss";

@theme {
  /* ── Colors ── */
  --color-cream:        #F5F0E8;
  --color-sage:         #EBF5EE;
  --color-forest:       #2D6A4F;
  --color-forest-dark:  #1B4332;
  --color-amber:        #D97706;
  --color-amber-dark:   #B45309;
  --color-teal-nature:  #0E7490;
  --color-brown-dark:   #2D2412;
  --color-brown-mid:    #5C4A28;
  --color-brown-light:  #8B7355;
  --color-earth:        #92400E;

  /* ── Fonts ── */
  --font-display: "Montserrat", sans-serif;
  --font-body:    "Inter", sans-serif;

  /* ── Shadows (warm-tinted) ── */
  --shadow-warm-sm: 0 4px 16px rgba(93, 70, 40, 0.09);
  --shadow-warm:    0 8px 32px rgba(93, 70, 40, 0.12);
  --shadow-warm-lg: 0 16px 48px rgba(93, 70, 40, 0.16);

  /* ── Border radius ── */
  --radius-card: 20px;
  --radius-pill: 9999px;
  --radius-lg:   16px;
  --radius-md:   12px;
  --radius-sm:   8px;
}

/* ── Base resets ── */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  background-color: var(--color-cream);
  color: var(--color-brown-dark);
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Verify build compiles cleanly**

```bash
cd /home/vikas/Documents/apps/life-insurance && npm run build 2>&1 | tail -20
```

Expected: no errors, `dist/` written.

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add biophilic design tokens to global.css"
```

---

## Task 2: FAQ Content Collection

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/faqs/index.json`

- [ ] **Step 1: Create content schema**

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const faqs = defineCollection({
  type: 'data',
  schema: z.array(
    z.object({
      question: z.string(),
      answer:   z.string(),
    })
  ),
});

export const collections = { faqs };
```

- [ ] **Step 2: Create FAQ data**

```json
// src/content/faqs/index.json
[
  {
    "question": "Is a medical exam required to apply?",
    "answer": "No. Most of our final expense plans require only a simple health questionnaire — no blood tests or medical examinations required."
  },
  {
    "question": "How quickly does coverage start?",
    "answer": "Many plans offer day-one coverage, meaning your full benefit is active immediately upon policy approval and first payment."
  },
  {
    "question": "What does final expense insurance cover?",
    "answer": "These policies cover funeral costs, medical bills, and outstanding debts — ensuring your family isn't left with a financial burden during a difficult time."
  },
  {
    "question": "How much does a typical plan cost?",
    "answer": "Premiums start as low as $9/month. Your actual rate depends on your age, gender, and health status. We always shop for the most competitive rate available."
  },
  {
    "question": "Can I apply if I have pre-existing conditions?",
    "answer": "Yes. We work with carriers that specialize in high-risk cases, offering guaranteed issue plans for those with serious health concerns."
  }
]
```

- [ ] **Step 3: Verify build**

```bash
npm run build 2>&1 | tail -10
```

Expected: no type errors on collection.

- [ ] **Step 4: Commit**

```bash
git add src/content/config.ts src/content/faqs/index.json
git commit -m "feat: add faqs content collection with zod schema"
```

---

## Task 3: Container + Button Components

**Files:**
- Create: `src/components/common/Container.astro`
- Create: `src/components/common/Button.astro`

- [ ] **Step 1: Create Container.astro**

```astro
---
// src/components/common/Container.astro
interface Props {
  class?: string;
}
const { class: className = '' } = Astro.props;
---
<div class={`max-w-[1200px] mx-auto px-6 ${className}`}>
  <slot />
</div>
```

- [ ] **Step 2: Create Button.astro**

```astro
---
// src/components/common/Button.astro
interface Props {
  variant?: 'primary' | 'amber' | 'ghost' | 'white';
  href?:    string;
  class?:   string;
  type?:    'button' | 'submit';
  ariaLabel?: string;
}

const {
  variant   = 'primary',
  href,
  class: className = '',
  type    = 'button',
  ariaLabel,
} = Astro.props;

const styles: Record<string, string> = {
  primary: 'bg-forest hover:bg-forest-dark text-white',
  amber:   'bg-amber hover:bg-amber-dark text-white',
  ghost:   'bg-transparent border-2 border-forest text-forest hover:bg-forest hover:text-white',
  white:   'bg-white hover:bg-white/90 text-forest',
};

const base =
  'inline-flex items-center gap-2 px-8 py-4 rounded-pill font-semibold text-base transition-colors duration-200 cursor-pointer';

const Tag = href ? 'a' : 'button';
---
<Tag
  href={href}
  type={!href ? type : undefined}
  aria-label={ariaLabel}
  class={`${base} ${styles[variant]} ${className}`}
>
  <slot />
</Tag>
```

- [ ] **Step 3: Build check**

```bash
npm run build 2>&1 | tail -10
```

Expected: passes.

- [ ] **Step 4: Commit**

```bash
git add src/components/common/Container.astro src/components/common/Button.astro
git commit -m "feat: add Container and Button common components"
```

---

## Task 4: MobileMenu React Component

**Files:**
- Create: `src/components/interactive/MobileMenu.tsx`
- Create: `src/components/interactive/MobileMenu.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/interactive/MobileMenu.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import MobileMenu from './MobileMenu';

const links = [
  { label: 'Home',    href: '/' },
  { label: 'About',   href: '/about' },
  { label: 'Plans',   href: '/plans' },
  { label: 'FAQ',     href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

describe('MobileMenu', () => {
  it('renders the hamburger button', () => {
    render(<MobileMenu links={links} phone="(888) 000-0000" />);
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
  });

  it('drawer is hidden by default', () => {
    render(<MobileMenu links={links} phone="(888) 000-0000" />);
    expect(screen.queryByRole('navigation', { name: /mobile/i })).not.toBeInTheDocument();
  });

  it('opens the drawer on hamburger click', () => {
    render(<MobileMenu links={links} phone="(888) 000-0000" />);
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    expect(screen.getByRole('navigation', { name: /mobile/i })).toBeInTheDocument();
  });

  it('renders all nav links inside drawer', () => {
    render(<MobileMenu links={links} phone="(888) 000-0000" />);
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    links.forEach(({ label }) => {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument();
    });
  });

  it('closes the drawer when close button is clicked', () => {
    render(<MobileMenu links={links} phone="(888) 000-0000" />);
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    fireEvent.click(screen.getByRole('button', { name: /close menu/i }));
    expect(screen.queryByRole('navigation', { name: /mobile/i })).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
npm run test:run -- MobileMenu 2>&1 | tail -20
```

Expected: `Cannot find module './MobileMenu'`

- [ ] **Step 3: Implement MobileMenu**

```tsx
// src/components/interactive/MobileMenu.tsx
import { useState } from 'react';

interface NavLink {
  label: string;
  href:  string;
}

interface Props {
  links: NavLink[];
  phone: string;
}

export default function MobileMenu({ links, phone }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="md:hidden flex flex-col gap-1.5 p-2"
      >
        <span className="block w-6 h-0.5 bg-brown-dark" />
        <span className="block w-6 h-0.5 bg-brown-dark" />
        <span className="block w-6 h-0.5 bg-brown-dark" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[200] bg-forest-dark flex flex-col"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <span className="font-display font-bold text-xl text-white">
              Life Insurance
            </span>
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="text-white p-2"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col px-6 py-8 gap-2 flex-1">
            {links.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="font-display font-semibold text-2xl text-white/80 hover:text-amber py-3 border-b border-white/10 transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="px-6 pb-10">
            <a
              href={`tel:${phone.replace(/\D/g, '')}`}
              className="flex items-center justify-center gap-3 w-full bg-amber hover:bg-amber-dark text-white font-bold text-lg py-4 rounded-pill transition-colors"
            >
              {phone}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 4: Run test — expect PASS**

```bash
npm run test:run -- MobileMenu 2>&1 | tail -15
```

Expected: `5 passed`

- [ ] **Step 5: Commit**

```bash
git add src/components/interactive/MobileMenu.tsx src/components/interactive/MobileMenu.test.tsx
git commit -m "feat: add MobileMenu React component with tests"
```

---

## Task 5: Header Component

**Files:**
- Create: `src/components/common/Header.astro`

- [ ] **Step 1: Create Header.astro**

```astro
---
// src/components/common/Header.astro
import MobileMenu from '../interactive/MobileMenu';

const links = [
  { label: 'Home',    href: '/' },
  { label: 'About',   href: '/about' },
  { label: 'Plans',   href: '/plans' },
  { label: 'FAQ',     href: '/faq' },
  { label: 'Contact', href: '/contact' },
];
---
<header
  id="site-header"
  class="fixed top-0 w-full z-50 bg-cream border-b border-[#D9D0C2] transition-shadow duration-300"
  style="box-shadow: 0 2px 12px rgba(93,70,40,0)"
>
  <div class="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-[72px]">
    <!-- Logo -->
    <a href="/" class="font-display font-bold text-[22px] text-forest no-underline">
      Life Insurance
    </a>

    <!-- Desktop nav -->
    <nav aria-label="Main navigation" class="hidden md:flex items-center gap-8">
      {links.map(({ label, href }) => (
        <a
          href={href}
          class="text-[15px] font-medium text-brown-dark hover:text-forest transition-colors"
        >
          {label}
        </a>
      ))}
    </nav>

    <!-- Desktop CTAs -->
    <div class="hidden md:flex items-center gap-3">
      <a
        href="tel:8880000000"
        class="flex items-center gap-2 bg-forest hover:bg-forest-dark text-white px-5 py-2.5 rounded-pill text-[14px] font-semibold transition-colors"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
        </svg>
        (888) 000-0000
      </a>
      <a
        href="#quote"
        class="bg-amber hover:bg-amber-dark text-white px-5 py-2.5 rounded-pill text-[14px] font-semibold transition-colors"
      >
        Get a Quote
      </a>
    </div>

    <!-- Mobile hamburger -->
    <MobileMenu client:load links={links} phone="(888) 000-0000" />
  </div>
</header>

<!-- Sticky phone bar for mobile (always visible at bottom) -->
<div class="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-forest px-4 py-3 safe-area-pb">
  <a
    href="tel:8880000000"
    class="flex items-center justify-center gap-2 w-full text-white font-bold text-[16px]"
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
    </svg>
    Call (888) 000-0000
  </a>
</div>

<script>
  // Add shadow to header on scroll
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 40) {
      header.style.boxShadow = '0 2px 12px rgba(93,70,40,0.12)';
    } else {
      header.style.boxShadow = '0 2px 12px rgba(93,70,40,0)';
    }
  }, { passive: true });
</script>
```

- [ ] **Step 2: Build check**

```bash
npm run build 2>&1 | tail -15
```

Expected: passes.

- [ ] **Step 3: Commit**

```bash
git add src/components/common/Header.astro
git commit -m "feat: add Header component with sticky nav and mobile bar"
```

---

## Task 6: Footer Component

**Files:**
- Create: `src/components/common/Footer.astro`

- [ ] **Step 1: Create Footer.astro**

```astro
---
// src/components/common/Footer.astro
---
<footer class="bg-[#1A0F00] pt-16 pb-8">
  <div class="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
    <!-- Brand -->
    <div>
      <span class="font-display font-bold text-[20px] text-white block mb-4">
        Life Insurance
      </span>
      <p class="text-[14px] text-[#C9B99A]/70 leading-[1.85]">
        Protecting American families with affordable final expense coverage — one policy at a time.
      </p>
      <div class="flex items-center gap-2 mt-4 px-3 py-2 bg-forest/30 rounded-pill w-fit">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#D97706" aria-hidden="true">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span class="text-[12px] text-amber font-semibold">Licensed in 49 States</span>
      </div>
    </div>

    <!-- Quick Links -->
    <div>
      <h4 class="text-white font-semibold text-[15px] mb-5">Quick Links</h4>
      <ul class="space-y-3">
        {[
          { label: 'About Us',         href: '/about' },
          { label: 'Insurance Plans',  href: '/plans' },
          { label: 'Request a Quote',  href: '/quote' },
          { label: 'Carrier Partners', href: '/partners' },
        ].map(({ label, href }) => (
          <li>
            <a href={href} class="text-[14px] text-[#C9B99A]/70 hover:text-amber transition-colors">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>

    <!-- Contact -->
    <div>
      <h4 class="text-white font-semibold text-[15px] mb-5">Contact Us</h4>
      <ul class="space-y-3">
        <li class="flex items-center gap-2 text-[14px] text-[#C9B99A]/70">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#2D6A4F" aria-hidden="true">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
          </svg>
          (888) 000-0000
        </li>
        <li class="flex items-center gap-2 text-[14px] text-[#C9B99A]/70">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" stroke-width="2" aria-hidden="true">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
          contact@lifeinsurance.com
        </li>
        <li class="text-[14px] text-[#C9B99A]/70">Mon–Fri 9AM–6PM EST</li>
      </ul>
    </div>

    <!-- Licensing -->
    <div>
      <h4 class="text-white font-semibold text-[15px] mb-5">Licensing</h4>
      <p class="text-[13px] text-[#C9B99A]/60 leading-[1.85] italic">
        Licensed insurance agency. All policies subject to underwriting. Terms and conditions apply based on carrier selection.
      </p>
    </div>
  </div>

  <!-- Bottom bar -->
  <div class="max-w-[1200px] mx-auto px-6 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3">
    <p class="text-[13px] text-[#C9B99A]/50">
      © {new Date().getFullYear()} Life Insurance. All rights reserved.
    </p>
    <div class="flex gap-6">
      <a href="/legal/privacy-policy" class="text-[13px] text-[#C9B99A]/50 hover:text-amber transition-colors">
        Privacy Policy
      </a>
      <a href="/legal/terms" class="text-[13px] text-[#C9B99A]/50 hover:text-amber transition-colors">
        Terms of Service
      </a>
    </div>
  </div>
</footer>
```

- [ ] **Step 2: Build check**

```bash
npm run build 2>&1 | tail -10
```

- [ ] **Step 3: Commit**

```bash
git add src/components/common/Footer.astro
git commit -m "feat: add Footer component"
```

---

## Task 7: Update Layout.astro

**Files:**
- Modify: `src/layouts/Layout.astro`

- [ ] **Step 1: Replace Layout.astro**

```astro
---
// src/layouts/Layout.astro
import '../styles/global.css';
import { ClientRouter } from 'astro:transitions';
import Header from '../components/common/Header.astro';
import Footer from '../components/common/Footer.astro';

interface Props {
  title?:       string;
  description?: string;
}

const {
  title       = 'Life Insurance — Protect Your Family\'s Future',
  description = 'Affordable final expense and burial insurance starting from $9/month. No medical exam required. Licensed agents in 49 states. Call (888) 000-0000.',
} = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="generator" content={Astro.generator} />
    <meta name="description" content={description} />
    <title>{title}</title>

    <!-- Fonts: Montserrat (display) + Inter (body) -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap"
      rel="stylesheet"
    />

    <ClientRouter />
  </head>
  <body>
    <!-- Skip to content (a11y) -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-forest focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:font-bold"
    >
      Skip to main content
    </a>

    <Header />
    <main id="main-content">
      <slot />
    </main>
    <Footer />
  </body>
</html>

<script>
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  document.addEventListener('astro:before-swap', () => {
    ScrollTrigger.getAll().forEach((t) => t.kill());
  });

  document.addEventListener('astro:page-load', () => {
    ScrollTrigger.refresh();
  });
</script>
```

- [ ] **Step 2: Build check**

```bash
npm run build 2>&1 | tail -15
```

- [ ] **Step 3: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "feat: update Layout with biophilic fonts, SEO meta, Header/Footer"
```

---

## Task 8: Hero Block

**Files:**
- Create: `src/components/blocks/Hero.astro`

- [ ] **Step 1: Create Hero.astro**

```astro
---
// src/components/blocks/Hero.astro
---
<section class="relative pt-[136px] pb-24 bg-cream overflow-hidden">
  <!-- Organic blob decorations -->
  <svg
    class="absolute opacity-[0.18] pointer-events-none"
    style="top:-80px;right:-100px;width:500px"
    viewBox="0 0 400 400"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M320,200 C320,280 260,350 180,350 C100,350 40,290 40,210 C40,130 100,50 200,50 C300,50 320,120 320,200Z"
      fill="#2D6A4F"
    />
  </svg>
  <svg
    class="absolute opacity-[0.18] pointer-events-none"
    style="bottom:-60px;left:-80px;width:360px"
    viewBox="0 0 400 400"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M260,220 C260,300 200,360 130,360 C60,360 20,300 20,220 C20,140 70,60 160,60 C250,60 260,140 260,220Z"
      fill="#D97706"
    />
  </svg>

  <div class="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-16 items-center relative z-10">
    <!-- Copy -->
    <div id="hero-copy">
      <div class="inline-flex items-center gap-2 px-4 py-2 bg-sage text-forest rounded-pill text-[13px] font-semibold mb-8 border border-[#B7DFC5]">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="#2D6A4F" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14l-4-4 1.41-1.41L10 13.17l6.59-6.59L18 8l-8 8z"/>
        </svg>
        Average funeral costs $8,300 — protect your family today
      </div>

      <h1 class="font-display font-bold text-[clamp(40px,5vw,64px)] text-brown-dark leading-[1.1] mb-6">
        Protect Your<br />Family's Future
      </h1>

      <p class="text-[18px] text-brown-mid leading-[1.85] mb-8 max-w-[500px]">
        Final expense coverage starting from $9/month. No medical exam required.
        Approved the same day you apply.
      </p>

      <div class="flex flex-col sm:flex-row gap-4">
        <a
          href="tel:8880000000"
          class="inline-flex items-center justify-center gap-2 bg-forest hover:bg-forest-dark text-white px-8 py-4 rounded-pill font-semibold text-[16px] transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
          </svg>
          Call Now — (888) 000-0000
        </a>
        <a
          href="#contact"
          class="inline-flex items-center gap-1.5 text-[15px] font-semibold text-amber self-center hover:text-amber-dark transition-colors"
        >
          Request a callback
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>

    <!-- Image -->
    <div class="relative" id="hero-image">
      <div class="absolute -inset-2 bg-forest/10 rounded-3xl blur-xl"></div>
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmBwi_lI9b2hgLANJedzqtgh7YBY57twQ6nlrsTuNOOxBbIb3hH6I6tG17bloxNPU-pakkqNEASNP04qTpVhUo3xO8-UluH17xqRvpCSnLCrr2PCKv8nLj63c0lpGQtRrr93paCY4KZM8DeVTP53C_ElXjlwsSCLL8S6Zsv5kRkpmQSAjhIySdtPJEnD-JWAsQ3ANc2f_ckYd_zMxSd4V-bRukdH7uSOyPlS-UdA3sTq8ESPF67DBuIcYlAjDTv5UbnJfN86ZBBPM"
        alt="A smiling senior couple relaxing at home, feeling secure and protected"
        width="600"
        height="450"
        loading="eager"
        class="relative rounded-3xl w-full object-cover"
        style="aspect-ratio:4/3;box-shadow:0 16px 48px rgba(93,70,40,0.16)"
      />
    </div>
  </div>
</section>

<script>
  import gsap from 'gsap';

  // Hero entrance animation on page load
  document.addEventListener('astro:page-load', () => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline();
      tl.from('#hero-copy > *', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
      });
      gsap.from('#hero-image', {
        opacity: 0,
        x: 40,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out',
      });
    });
  });
</script>
```

- [ ] **Step 2: Build check**

```bash
npm run build 2>&1 | tail -10
```

- [ ] **Step 3: Commit**

```bash
git add src/components/blocks/Hero.astro
git commit -m "feat: add Hero block with organic blobs and GSAP entrance"
```

---

## Task 9: StatsBar Block

**Files:**
- Create: `src/components/blocks/StatsBar.astro`

- [ ] **Step 1: Create StatsBar.astro**

```astro
---
// src/components/blocks/StatsBar.astro

const stats = [
  { number: '130+', label: 'Licensed Agents' },
  { number: '13',   label: 'Carrier Partners' },
  { number: '49',   label: 'States Licensed' },
  { number: '$1M+', label: 'Monthly Production' },
];
---

<!-- Wave divider into white -->
<div class="bg-cream overflow-hidden leading-[0]">
  <svg viewBox="0 0 1440 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="#FFFFFF" />
  </svg>
</div>

<section class="bg-white py-16" aria-label="Company statistics">
  <div class="max-w-[1200px] mx-auto px-6">
    <div id="stats-grid" class="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map(({ number, label }) => (
        <div class="text-center p-6 rounded-2xl bg-sage">
          <div
            class="font-display font-bold text-[48px] text-forest leading-none mb-2"
            data-stat={number}
          >
            {number}
          </div>
          <div class="text-[12px] font-semibold uppercase tracking-[0.1em] text-brown-light">
            {label}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<script>
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  document.addEventListener('astro:page-load', () => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('#stats-grid > *', {
        opacity: 0,
        y: 24,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#stats-grid',
          start: 'top 85%',
          once: true,
        },
      });
    });
  });
</script>
```

- [ ] **Step 2: Build check + commit**

```bash
npm run build 2>&1 | tail -10
git add src/components/blocks/StatsBar.astro
git commit -m "feat: add StatsBar block with wave divider and scroll animation"
```

---

## Task 10: WhyChooseUs Block

**Files:**
- Create: `src/components/blocks/WhyChooseUs.astro`

- [ ] **Step 1: Create WhyChooseUs.astro**

```astro
---
// src/components/blocks/WhyChooseUs.astro

const benefits = [
  {
    icon: `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14l-4-4 1.41-1.41L10 13.17l6.59-6.59L18 8l-8 8z"/>`,
    title: 'No Medical Exam',
    body:  'Qualify based on a simple questionnaire. No needles, no waiting for results.',
  },
  {
    icon: `<path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h5v5H7z"/>`,
    title: 'Coverage from Day One',
    body:  'Full benefits active the moment your first payment is processed.',
  },
  {
    icon: `<path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>`,
    title: 'Low Monthly Premiums',
    body:  'Plans designed for fixed budgets, starting at just $9/month.',
  },
  {
    icon: `<path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>`,
    title: 'Plans for Every Age',
    body:  'Coverage options for seniors aged 50 to 85 — no one left unprotected.',
  },
  {
    icon: `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93V18h-2v1.93C7.06 19.44 4.56 16.94 4.07 14H6v-2H4.07C4.56 9.06 7.06 6.56 10 6.07V8h2V6.07c2.94.49 5.44 2.99 5.93 5.93H16v2h1.93c-.49 2.94-2.99 5.44-5.93 5.93z"/>`,
    title: '13 Carrier Options',
    body:  'We shop 13 top carriers to find your best rate and coverage.',
  },
  {
    icon: `<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>`,
    title: 'Licensed in 49 States',
    body:  'Nationwide reliability with licensed agents serving American families.',
  },
];
---

<!-- Wave into sage -->
<div class="bg-white overflow-hidden leading-[0]">
  <svg viewBox="0 0 1440 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M0,10 C480,40 960,0 1440,25 L1440,40 L0,40 Z" fill="#EBF5EE" />
  </svg>
</div>

<section class="bg-sage py-24">
  <div class="max-w-[1200px] mx-auto px-6">
    <h2 class="font-display font-bold text-[clamp(32px,4vw,42px)] text-brown-dark mb-4 text-center">
      Why Families Trust Us
    </h2>
    <p class="text-[17px] text-brown-mid text-center mb-14 leading-relaxed max-w-[540px] mx-auto">
      We make protecting your family simple, affordable, and stress-free.
    </p>

    <div id="benefits-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {benefits.map(({ icon, title, body }) => (
        <div class="bg-white p-9 rounded-[20px] hover:-translate-y-1 transition-transform duration-300 group"
             style="box-shadow:0 8px 32px rgba(93,70,40,0.12)">
          <div class="w-12 h-12 bg-sage rounded-xl flex items-center justify-center mb-6 group-hover:bg-forest/10 transition-colors">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#2D6A4F" aria-hidden="true">
              <Fragment set:html={icon} />
            </svg>
          </div>
          <h3 class="font-display font-bold text-[22px] text-brown-dark mb-3">{title}</h3>
          <p class="text-[15px] text-brown-mid leading-[1.8]">{body}</p>
        </div>
      ))}
    </div>
  </div>
</section>

<script>
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  document.addEventListener('astro:page-load', () => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('#benefits-grid > *', {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#benefits-grid',
          start: 'top 80%',
          once: true,
        },
      });
    });
  });
</script>
```

- [ ] **Step 2: Build check + commit**

```bash
npm run build 2>&1 | tail -10
git add src/components/blocks/WhyChooseUs.astro
git commit -m "feat: add WhyChooseUs block with 6 benefit cards"
```

---

## Task 11: HowItWorks Block

**Files:**
- Create: `src/components/blocks/HowItWorks.astro`

- [ ] **Step 1: Create HowItWorks.astro**

```astro
---
// src/components/blocks/HowItWorks.astro

const steps = [
  {
    number: '1',
    title:  'Call Us',
    body:   'Speak with a friendly licensed advisor in minutes. No pressure, no sales pitch — just honest guidance.',
    icon:   `<path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>`,
  },
  {
    number: '2',
    title:  'Choose a Plan',
    body:   'We compare quotes from 13 top-rated carriers to find the coverage that fits your budget perfectly.',
    icon:   `<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9 2 2 4-4"/>`,
  },
  {
    number: '3',
    title:  'Get Covered',
    body:   'Finalize your application in minutes. Coverage starts the same day — immediate peace of mind.',
    icon:   `<path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>`,
  },
];
---

<!-- Wave into dark green -->
<div class="bg-sage overflow-hidden leading-[0]">
  <svg viewBox="0 0 1440 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M0,15 C400,40 1040,0 1440,20 L1440,40 L0,40 Z" fill="#1B4332" />
  </svg>
</div>

<section class="bg-forest-dark py-24">
  <div class="max-w-[1200px] mx-auto px-6">
    <h2 class="font-display font-bold text-[clamp(32px,4vw,42px)] text-white text-center mb-3">
      Get Covered in 3 Simple Steps
    </h2>
    <p class="text-[17px] text-white/60 text-center mb-16">
      Most families are fully covered in a single phone call.
    </p>

    <div id="steps-grid" class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {steps.map(({ number, title, body, icon }) => (
        <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
          <div class="w-14 h-14 bg-amber rounded-full flex items-center justify-center text-white text-[24px] font-bold mx-auto mb-6">
            {number}
          </div>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="1.8" class="mx-auto mb-4" aria-hidden="true">
            <Fragment set:html={icon} />
          </svg>
          <h3 class="font-display font-bold text-[24px] text-white mb-3">{title}</h3>
          <p class="text-[15px] text-white/70 leading-[1.8]">{body}</p>
        </div>
      ))}
    </div>
  </div>
</section>

<script>
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  document.addEventListener('astro:page-load', () => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('#steps-grid > *', {
        opacity: 0,
        x: -30,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#steps-grid',
          start: 'top 80%',
          once: true,
        },
      });
    });
  });
</script>
```

- [ ] **Step 2: Build check + commit**

```bash
npm run build 2>&1 | tail -10
git add src/components/blocks/HowItWorks.astro
git commit -m "feat: add HowItWorks block with dark green section"
```

---

## Task 12: CarrierLogos Block

**Files:**
- Create: `src/components/blocks/CarrierLogos.astro`

- [ ] **Step 1: Create CarrierLogos.astro**

```astro
---
// src/components/blocks/CarrierLogos.astro

const carriers = [
  'Mutual of Omaha', 'Transamerica', 'Foresters',
  'AIG', 'Baltimore Life', 'Gerber Life',
  'Aetna', 'Corebridge',
];
---

<!-- Wave into cream -->
<div class="bg-forest-dark overflow-hidden leading-[0]">
  <svg viewBox="0 0 1440 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M0,25 C360,0 1080,40 1440,15 L1440,40 L0,40 Z" fill="#F5F0E8" />
  </svg>
</div>

<section class="bg-cream py-16" aria-label="Carrier partners">
  <div class="max-w-[1200px] mx-auto px-6">
    <p class="text-[12px] font-semibold uppercase tracking-[0.14em] text-forest text-center mb-3">
      Our Trusted Partners
    </p>
    <h3 class="font-display font-bold text-[30px] text-brown-dark text-center mb-12">
      Backed by America's Most Trusted Insurers
    </h3>

    <div
      id="logos-grid"
      class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 opacity-60 hover:opacity-100 transition-opacity duration-500"
    >
      {carriers.map((name) => (
        <div
          class="h-16 bg-white rounded-2xl flex items-center justify-center px-2 text-[11px] font-semibold text-brown-light text-center leading-tight"
          style="box-shadow:0 4px 16px rgba(93,70,40,0.09)"
        >
          {name}
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Build check + commit**

```bash
npm run build 2>&1 | tail -10
git add src/components/blocks/CarrierLogos.astro
git commit -m "feat: add CarrierLogos block"
```

---

## Task 13: FAQAccordion React Component

**Files:**
- Create: `src/components/interactive/FAQAccordion.tsx`
- Create: `src/components/interactive/FAQAccordion.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/interactive/FAQAccordion.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import FAQAccordion from './FAQAccordion';

const faqs = [
  { question: 'Is a medical exam required?', answer: 'No exam needed.' },
  { question: 'How quickly does coverage start?', answer: 'Day one coverage.' },
];

describe('FAQAccordion', () => {
  it('renders all questions', () => {
    render(<FAQAccordion faqs={faqs} />);
    expect(screen.getByText('Is a medical exam required?')).toBeInTheDocument();
    expect(screen.getByText('How quickly does coverage start?')).toBeInTheDocument();
  });

  it('answers are hidden by default', () => {
    render(<FAQAccordion faqs={faqs} />);
    expect(screen.queryByText('No exam needed.')).not.toBeInTheDocument();
  });

  it('reveals answer when question is clicked', () => {
    render(<FAQAccordion faqs={faqs} />);
    fireEvent.click(screen.getByRole('button', { name: /is a medical exam/i }));
    expect(screen.getByText('No exam needed.')).toBeInTheDocument();
  });

  it('closes open answer when clicked again', () => {
    render(<FAQAccordion faqs={faqs} />);
    const btn = screen.getByRole('button', { name: /is a medical exam/i });
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(screen.queryByText('No exam needed.')).not.toBeInTheDocument();
  });

  it('opening one item closes the previously open item', () => {
    render(<FAQAccordion faqs={faqs} />);
    fireEvent.click(screen.getByRole('button', { name: /is a medical exam/i }));
    fireEvent.click(screen.getByRole('button', { name: /how quickly/i }));
    expect(screen.queryByText('No exam needed.')).not.toBeInTheDocument();
    expect(screen.getByText('Day one coverage.')).toBeInTheDocument();
  });

  it('each question button has correct aria-expanded state', () => {
    render(<FAQAccordion faqs={faqs} />);
    const btn = screen.getByRole('button', { name: /is a medical exam/i });
    expect(btn).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'true');
  });
});
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
npm run test:run -- FAQAccordion 2>&1 | tail -15
```

Expected: `Cannot find module './FAQAccordion'`

- [ ] **Step 3: Implement FAQAccordion**

```tsx
// src/components/interactive/FAQAccordion.tsx
import { useState } from 'react';

interface FAQ {
  question: string;
  answer:   string;
}

interface Props {
  faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="flex flex-col lg:flex-row gap-16">
      {/* Accordion */}
      <div className="lg:w-[65%]">
        <h2 className="font-display font-bold text-[clamp(28px,3.5vw,42px)] text-brown-dark mb-10">
          Common Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-white rounded-[20px]"
                style={{ boxShadow: '0 8px 32px rgba(93,70,40,0.12)' }}
              >
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  className="flex justify-between items-center w-full p-6 text-left font-semibold text-[16px] text-brown-dark"
                >
                  {faq.question}
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2D6A4F"
                    strokeWidth="2"
                    className="shrink-0 ml-4 transition-transform duration-200"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {isOpen && (
                  <div
                    id={`faq-answer-${i}`}
                    className="px-6 pb-6 text-[15px] text-brown-mid leading-[1.85]"
                    role="region"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA card */}
      <div className="lg:w-[35%]">
        <div
          className="bg-forest p-10 rounded-3xl sticky top-24"
          style={{ boxShadow: '0 16px 48px rgba(93,70,40,0.16)' }}
        >
          <svg width="44" height="44" viewBox="0 0 24 24" fill="#D97706" className="mb-5" aria-hidden="true">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
          <h3 className="font-display font-bold text-[28px] text-white mb-4">
            Still have questions?
          </h3>
          <p className="text-[16px] text-white/80 leading-[1.8] mb-8">
            Our licensed specialists are ready to provide personalized guidance — at no cost to you.
          </p>
          <a
            href="tel:8880000000"
            className="flex items-center justify-center gap-3 w-full bg-amber hover:bg-amber-dark text-white font-bold text-[17px] py-4 rounded-pill transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
            </svg>
            Call (888) 000-0000
          </a>
          <p className="text-[13px] text-white/60 text-center mt-5">
            No obligation. 100% Free consultation.
          </p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run tests — expect all PASS**

```bash
npm run test:run -- FAQAccordion 2>&1 | tail -15
```

Expected: `6 passed`

- [ ] **Step 5: Commit**

```bash
git add src/components/interactive/FAQAccordion.tsx src/components/interactive/FAQAccordion.test.tsx
git commit -m "feat: add FAQAccordion React component with accordion+CTA, 6 tests passing"
```

---

## Task 14: BottomCTA Block

**Files:**
- Create: `src/components/blocks/BottomCTA.astro`

- [ ] **Step 1: Create BottomCTA.astro**

```astro
---
// src/components/blocks/BottomCTA.astro
---
<section
  id="bottom-cta"
  class="relative py-24 px-6 overflow-hidden"
  style="background: linear-gradient(135deg, #1B4332 0%, #0E7490 100%)"
>
  <!-- Decorative blob -->
  <svg
    class="absolute opacity-[0.12] pointer-events-none"
    style="top:-80px;right:-60px;width:400px"
    viewBox="0 0 400 400"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M300,200 C300,300 240,360 160,360 C80,360 30,290 30,200 C30,110 90,40 200,40 C310,40 300,100 300,200Z"
      fill="#D97706"
    />
  </svg>

  <div class="max-w-[1200px] mx-auto text-center relative z-10">
    <h2 class="font-display font-bold text-[clamp(36px,4.5vw,52px)] text-white leading-[1.1] mb-5">
      Ready to Protect Your Family?
    </h2>
    <p class="text-[18px] text-white/80 leading-[1.8] mb-12 max-w-[560px] mx-auto">
      Talk to a licensed agent today. No pressure, no hidden fees, no surprises — just honest guidance.
    </p>
    <a
      href="tel:8880000000"
      class="inline-flex items-center gap-3 bg-white hover:bg-white/90 text-forest px-10 py-5 rounded-pill font-bold text-[17px] transition-colors"
      style="box-shadow:0 16px 48px rgba(93,70,40,0.16)"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
      </svg>
      Call (888) 000-0000
    </a>
    <p class="text-[13px] text-white/50 mt-6 tracking-wide">
      Mon–Fri 9AM–6PM EST · Licensed in 49 States
    </p>
  </div>
</section>

<script>
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  document.addEventListener('astro:page-load', () => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('#bottom-cta > div', {
        opacity: 0,
        y: 32,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#bottom-cta',
          start: 'top 85%',
          once: true,
        },
      });
    });
  });
</script>
```

- [ ] **Step 2: Build check + commit**

```bash
npm run build 2>&1 | tail -10
git add src/components/blocks/BottomCTA.astro
git commit -m "feat: add BottomCTA block with gradient and scroll animation"
```

---

## Task 15: Assemble Homepage

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Replace index.astro**

```astro
---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro';
import Hero          from '../components/blocks/Hero.astro';
import StatsBar      from '../components/blocks/StatsBar.astro';
import WhyChooseUs   from '../components/blocks/WhyChooseUs.astro';
import HowItWorks    from '../components/blocks/HowItWorks.astro';
import CarrierLogos  from '../components/blocks/CarrierLogos.astro';
import BottomCTA     from '../components/blocks/BottomCTA.astro';
import FAQAccordion  from '../components/interactive/FAQAccordion';
import { getCollection } from 'astro:content';

const faqEntries = await getCollection('faqs');
const faqs = faqEntries[0]?.data ?? [];
---

<Layout
  title="Life Insurance — Protect Your Family's Future"
  description="Affordable final expense and burial insurance from $9/month. No medical exam. Same-day approval. Licensed agents in 49 states."
>
  <Hero />
  <StatsBar />
  <WhyChooseUs />
  <HowItWorks />
  <CarrierLogos />

  <!-- FAQ Section -->
  <section class="bg-sage py-24">
    <div class="max-w-[1200px] mx-auto px-6">
      <FAQAccordion faqs={faqs} client:visible />
    </div>
  </section>

  <BottomCTA />
</Layout>
```

- [ ] **Step 2: Full build**

```bash
npm run build 2>&1
```

Expected: `✓ Completed in X.XXs` with no errors.

- [ ] **Step 3: Run all tests**

```bash
npm run test:run 2>&1 | tail -20
```

Expected: all tests pass.

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: assemble biophilic homepage — all sections wired up"
```

---

## Task 16: Preview Verification

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

Expected: server starts at `http://localhost:4321`

- [ ] **Step 2: Visual checklist (open browser)**

Open `http://localhost:4321` and verify:
- [ ] Cream background, Montserrat headings visible
- [ ] Sticky header with "Life Insurance" green wordmark
- [ ] Hero has organic blob shapes, forest green CTA pill
- [ ] Wave divider between hero/stats
- [ ] Stats 4-tile grid in sage green tiles
- [ ] Wave divider into "Why Families Trust Us"
- [ ] 6 benefit cards with hover lift
- [ ] Wave into dark forest green "How It Works"
- [ ] 3-step cards with amber numbered circles
- [ ] Wave out to cream carrier logos section
- [ ] FAQ accordion opens/closes correctly
- [ ] FAQ right-side CTA card is sticky
- [ ] Bottom CTA has forest→teal gradient
- [ ] Footer dark warm brown with amber hover links
- [ ] Mobile: bottom "Call" bar visible
- [ ] Mobile: hamburger opens full-screen drawer

- [ ] **Step 3: Build production**

```bash
npm run build && npm run preview
```

Expected: build succeeds, preview works at `http://localhost:4321`

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete biophilic homepage implementation"
```

---

## Self-Review Checklist

**Spec coverage:**
- ✅ Sticky nav with phone CTA
- ✅ Hero — organic blobs, headline, sub, badge, CTA
- ✅ Stats bar — 4 tiles, wave divider
- ✅ Why Choose Us — 6 cards, sage bg, wave divider
- ✅ How It Works — 3 steps, dark green bg, wave divider
- ✅ Carrier logos strip
- ✅ FAQ accordion with side CTA card (data from content collection)
- ✅ Bottom CTA gradient section
- ✅ Footer with year, links, disclaimer
- ✅ Mobile menu drawer
- ✅ Mobile sticky bottom call bar
- ✅ GSAP scroll animations (hero, stats, cards, steps, CTA)
- ✅ `prefers-reduced-motion` respected in all animations
- ✅ Montserrat headings + Inter body
- ✅ Biophilic tokens in `@theme`
- ✅ FAQAccordion tests (6 cases)
- ✅ MobileMenu tests (5 cases)

**Type consistency:** `FAQAccordion` accepts `faqs: { question: string; answer: string }[]` — matches `src/content/faqs/index.json` schema. `MobileMenu` accepts `links: { label: string; href: string }[]` — matches `Header.astro` usage.
