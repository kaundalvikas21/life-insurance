# Stitch Design System — Life Insurance Homepage

**Project ID:** `17014209470942739818`
**Style:** Trust & Authority — Traditional corporate + modern polish
**Reference:** patriotamericanbenefits.com

---

## Color Palette

| Role | Hex | Usage |
|---|---|---|
| Primary (Navy) | `#0A2240` | Hero bg, header, dark sections |
| Deep Navy | `#0A1628` | Footer, deepest bg |
| Accent (Teal) | `#0EA5C9` | CTAs, icons, highlights |
| Teal Dark | `#0284C7` | Hover states, gradient end |
| Background | `#F8FAFC` | Alternating section bg |
| White | `#FFFFFF` | Cards, text on dark |
| Text Primary | `#1E293B` | Headings |
| Text Body | `#374151` | Body copy |
| Text Muted | `#9CA3AF` | Labels |
| Amber | `#F59E0B` | Trust badges |

---

## Typography

**Font:** IBM Plex Sans (Google Fonts)
- Hero H1: 64px / 700 / line-height 1.1 / white
- Section H2: 40px / 700 / line-height 1.2 / navy
- Card H3: 20px / 600 / line-height 1.3 / navy
- Body: 17px / 400 / line-height 1.75 / slate
- Label: 13px / 600 / uppercase / letter-spacing 0.08em

---

## Shape & Elevation

- **Buttons:** 8px radius, 56px height
- **Cards:** 12px radius, `0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)` shadow
- **Pills/Badges:** 9999px radius
- **Sections:** No radius (full-width)
- **Hover elevation:** `0 4px 16px rgba(0,0,0,0.10), 0 16px 40px rgba(0,0,0,0.08)`

---

## Section Rhythm

- Section padding: 96px vertical (desktop), 64px (mobile)
- Container max-width: 1200px, 24px horizontal padding
- Card gap: 24px
- Card internal padding: 32px

---

## Atmosphere

Sophisticated, polished, trustworthy. Corporate but approachable. Clean lines, structured hierarchy. Uses subtle shadows, generous whitespace. Never flashy — always reassuring. Smooth 200ms hover transitions throughout.

---

## Anti-Patterns (Avoid)

- No AI purple/pink gradients
- No emoji as icons (use Lucide/Tabler SVG)
- No aggressive reds
- No confusing pricing layouts
- No missing trust signals

---

## Design Variants

Four homepage designs — same 9 sections, different aesthetic treatments:

| Variant | File | Style | Primary | Accent | Font | Radius |
|---|---|---|---|---|---|---|
| **Original** | `homepage.html` | Modern Heritage (Navy + Teal) | `#0A2240` | `#0EA5C9` | IBM Plex Sans | 12px cards |
| **A — Swiss** | `variant-swiss.html` | Minimalism & Swiss | `#1A1A1A` | `#1E40AF` | Inter | 0px / 4px btn |
| **B — Accessible** | `variant-accessible.html` | Accessible & Ethical (WCAG AAA) | `#0F172A` | `#1D4ED8` | IBM Plex Sans | 8px |
| **C — Biophilic** | `variant-biophilic.html` | Organic Biophilic | `#2D2412` | `#2D6A4F` | Cormorant + Inter | 20px / pill btn |

### Quick Style Summary

**Variant A — Minimalism & Swiss**
- All-white surfaces, near-black text, single blue accent
- Sharp 0px corners, 1px dividers, zero shadows on sections
- Mathematical spacing, strict 12-column grid, functional-only elements
- Black hero section inverted for bottom CTA

**Variant B — Accessible & Ethical (WCAG AAA)**
- 18px minimum body text, 1.8 line-height, 0.01em letter-spacing
- All text passes 4.5:1 minimum contrast (#0F172A on white = 21:1)
- 4px visible focus rings on all interactive elements
- Plus/minus accordion icons (clearer than chevrons for older users)
- Deep blue `#1E3A8A` bottom CTA (higher contrast than teal)
- Semantic ARIA labels throughout, skip-to-content link

**Variant C — Organic Biophilic**
- Warm cream `#F5F0E8` base, sage green `#EBF5EE` alternating sections
- Cormorant Garamond serif for all headings (warmth + authority)
- Forest green `#2D6A4F` primary + amber `#D97706` CTA buttons
- Pill-shaped buttons (9999px), 20px card radius throughout
- Organic SVG blob decorations, wave section dividers
- Warm-tinted shadows `rgba(93,70,40,0.12)` instead of cold gray
