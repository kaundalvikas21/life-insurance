# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at localhost:4321
npm run build     # Production build to ./dist/
npm run preview   # Preview the production build
```

```bash
npm test          # Watch mode
npm run test:run  # Single run (CI)
```

Test files: `**/*.{test,spec}.{ts,tsx}` — co-locate with components or place in `src/test/`.
Uses **Vitest** + **@testing-library/react** + **happy-dom**. Setup file: `src/test/setup.ts` (imports `@testing-library/jest-dom` matchers).

## Architecture

This is an **Astro 6** project with **React 19** and **Tailwind CSS v4**.

**Project type**: Marketing / content display website for a life insurance company. No auth, no dashboard, no complex backend. Think: homepage, plans, FAQ, contact, about — similar to patriotamericanbenefits.com.

### Stack
- **Astro 6** — page routing, layouts, static/hybrid rendering
- **React 19** — interactive client-side components (`.tsx` files with `client:*` directives)
- **Tailwind CSS v4** — utility classes, loaded via `@tailwindcss/vite` Vite plugin (no `tailwind.config.*` needed)
- **TypeScript** — `jsxImportSource: "react"` set in `tsconfig.json`

### Key conventions

**Tailwind setup**: Global CSS lives in `src/styles/global.css` with a single `@import "tailwindcss"`. This is imported in `src/layouts/Layout.astro`, making Tailwind available on every page that uses the layout.

**React in Astro**: React components must use a `client:*` directive when imported into `.astro` files to enable interactivity (e.g. `<FAQAccordion client:load />`). Without a directive, the component renders as static HTML only.

**Layouts**: `src/layouts/Layout.astro` is the root HTML shell. Pages use it via `<Layout>...</Layout>`. The `<slot />` renders page content.

**Routing**: File-based. Each `.astro` file under `src/pages/` maps to a route.

**SSR**: This project uses server-side rendering configured with `output: 'server'` in `astro.config.mjs`. Use `export const prerender = true` on pages that should be statically generated.

---

## Directory Structure

This is the canonical, scalable structure for this project. **All future development must follow this layout.**

```
life-insurance/
├── public/
│   ├── favicon.svg
│   ├── favicon.ico
│   ├── robots.txt
│   └── images/               # Static assets NOT processed by Astro (PDFs, fonts)
│
├── src/
│   ├── assets/
│   │   └── images/           # Images processed & optimized by Astro <Image />
│   │
│   ├── content/              # Astro content collections (type-safe structured data)
│   │   ├── config.ts         # Zod schemas for all collections
│   │   ├── plans/            # Insurance plan data (JSON/YAML or MD)
│   │   ├── faqs/             # FAQ entries (JSON/YAML)
│   │   ├── testimonials/     # Customer testimonials (JSON)
│   │   └── team/             # Team bios (JSON)
│   │
│   ├── components/
│   │   ├── blocks/           # Page section components (Astro — zero JS)
│   │   │   │                 # Hero, Features, Pricing, Testimonials,
│   │   │   │                 # CTA, Stats, WhyUs, HowItWorks
│   │   │
│   │   ├── interactive/      # React components (hydrated client-side only)
│   │   │   │                 # FAQAccordion, ContactForm, PlanComparison,
│   │   │   │                 # QuoteCalculator, MobileMenu
│   │   │
│   │   ├── common/           # Shared Astro UI elements used across pages
│   │   │   │                 # Header, Footer, Navigation, Button,
│   │   │   │                 # Card, Container, Badge, SEO
│   │   │
│   │   └── icons/            # SVG icon components (.astro)
│   │
│   ├── layouts/
│   │   ├── Layout.astro      # Root HTML shell (current — header + footer + slot)
│   │   └── ArticleLayout.astro  # Optional: for legal pages / blog
│   │
│   ├── pages/
│   │   ├── index.astro       # Homepage
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── faq.astro
│   │   ├── quote.astro       # Quote request page
│   │   ├── plans/
│   │   │   ├── index.astro   # Plans overview
│   │   │   └── [slug].astro  # Individual plan detail (from content collection)
│   │   ├── legal/
│   │   │   ├── privacy-policy.astro
│   │   │   └── terms.astro
│   │   └── api/
│   │       └── contact.ts    # SSR endpoint for contact form submission only
│   │
│   ├── lib/                  # Shared utilities used across 2+ components
│   │   │                     # constants.ts, helpers.ts, seo.ts
│   │
│   ├── utils/                # Pure functions & formatters
│   │   │                     # format.ts (currency, dates), validators.ts
│   │
│   └── styles/
│       └── global.css        # @import "tailwindcss" + global resets
│
├── astro.config.mjs
├── tsconfig.json
├── vitest.config.ts
└── package.json
```

### Directory Rules

| Directory | What goes here | What does NOT go here |
|---|---|---|
| `src/content/` | Structured data (plans, FAQs, testimonials, team) via Astro collections | Components or pages |
| `src/components/blocks/` | Full-width page sections, Astro only, no client JS | Interactive widgets |
| `src/components/interactive/` | React `.tsx` components that need client-side state | Static layout sections |
| `src/components/common/` | Shared Astro elements (header, footer, button, card) | Full page sections |
| `src/components/icons/` | SVG icon `.astro` files only | Raster images |
| `src/pages/api/` | SSR endpoints (contact form only) | React/Astro components |
| `src/lib/` | Constants, SEO helpers, shared logic | Component-specific code |
| `src/utils/` | Pure formatting/validation functions | Side effects or API calls |
| `src/assets/images/` | Images used with Astro `<Image />` (auto-optimized) | Files served as-is |
| `public/images/` | Files served as-is (logos, PDFs, OG images) | Files needing optimization |

### Component rule: Astro vs React

- Default to **Astro** — zero JS, fastest render
- Use **React** only when the component needs client-side interactivity:
  - Accordion expand/collapse
  - Form validation and submission
  - Plan comparison toggle
  - Mobile menu open/close
  - Quote calculator with live updates

```astro
<!-- Good: static section in Astro, interactive piece in React -->
<Features />                          <!-- Astro block, no JS -->
<FAQAccordion client:load />          <!-- React, hydrated on load -->
<ContactForm client:visible />        <!-- React, hydrated when visible -->
```

### Content Collections rule

All structured, repeating data must live in `src/content/` — never hardcoded in components:

- Insurance plans → `src/content/plans/`
- FAQs → `src/content/faqs/`
- Testimonials → `src/content/testimonials/`
- Team members → `src/content/team/`

### Co-location rule for tests

Co-locate test files with the code they test:

```
src/components/interactive/FAQAccordion.tsx
src/components/interactive/FAQAccordion.test.tsx

src/utils/format.ts
src/utils/format.test.ts
```

---

## ⚠️ AI Workflow Guidelines (MANDATORY)

**These rules MUST be followed for every task. Failure to follow these guidelines is not acceptable.**

### 1. Brainstorming (BEFORE creative work)
- **ALWAYS** use `superpowers:brainstorming` skill BEFORE any creative work
- Applies to: creating features, building components, adding functionality, modifying behavior
- Explores user intent, requirements, and design BEFORE implementation
- **HARD GATE:** Do NOT write code until design is approved
- For multi-step tasks: after brainstorming, invoke `superpowers:writing-plans` skill
- For plan execution: use `superpowers:executing-plans` skill

### 2. Astro Work
- **ALWAYS** use `astro` skill when creating or modifying Astro components, pages, layouts, or config
- Covers: `.astro` files, `client:*` directives, SSR vs static, content collections, routing

### 3. React Components
- **ALWAYS** use `vercel-react-best-practices` skill when writing or reviewing React (`.tsx`) components
- Covers: performance optimization, component patterns, avoiding unnecessary re-renders

### 4. Test-Driven Development (BEFORE writing code)
- **ALWAYS** use `superpowers:test-driven-development` skill before implementing any feature or bugfix
- Write tests first, then implementation

### 5. Debugging (AFTER any failure)
- **ALWAYS** use `superpowers:systematic-debugging` skill when encountering any bug, test failure, or unexpected behavior
- Do NOT propose fixes before diagnosing root cause

### 6. Code Search (STRICTLY ENFORCED)
- **ALWAYS** use `Grep` or `Glob` tools for ALL code searches (symbols, functions, types, files)
- Do NOT assume file locations — search first

### 7. Research First (BEFORE implementation)
- **ALWAYS** use both `Ref MCP` AND `exa MCP` together for documentation/research
- Gather latest information BEFORE writing any code
- Never assume patterns — verify with current docs

### 8. Build Check (AFTER code changes)
- **MANDATORY** after any code modification:
  ```bash
  npm run build  # Type check via TypeScript + Astro
  ```
- Do NOT mark task complete if build fails

### 9. Browser Testing (AFTER all changes)
- **ALWAYS** use `agent-browser` skill for end-to-end browser testing (PRIMARY)
- **FALLBACK** use `chrome-devtools` MCP tools when agent-browser is unavailable
- Verify changes work correctly in the browser before completing tasks

### 10. Verification Before Completion
- **ALWAYS** use `superpowers:verification-before-completion` skill before claiming any task is done
- Run verification commands and confirm output — evidence before assertions

### 11. Commit Workflow (MANDATORY)
- **NEVER commit without explicit user permission**
- After completing any task/feature:
  1. Run lint/type check (`npm run build`)
  2. Show user summary of changes
  3. Ask: "Ready to commit?"
  4. Wait for user's explicit approval
  5. Only then run `git commit` and `git push`
