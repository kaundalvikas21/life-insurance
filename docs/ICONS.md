# Iconography — Life Insurance Homepage

All icons are inline SVG elements using Material Symbols/Lucide-style paths. No external icon libraries.

## Icon Inventory by Component

### Header (Navigation & CTAs)
| Icon | Purpose | Size | Color | Source |
|------|---------|------|-------|--------|
| Phone handset | Desktop/mobile phone CTA | 15px, 18px | `currentColor` | Material Symbols |
| Arrow right | "Request a callback" link | 16px | `stroke` | Custom path |

### Hero Section
| Icon | Purpose | Size | Color | Source |
|------|---------|------|-------|--------|
| Checkmark (circle) | Trust badge "$8,300 stat" | 15px | `#2D6A4F` (forest) | Material Symbols |
| Phone handset | "Call Now" primary CTA | 18px | `currentColor` | Material Symbols |

### Footer
| Icon | Purpose | Size | Color | Source |
|------|---------|------|-------|--------|
| Checkmark (circle) | "Licensed in 49 States" badge | 14px | `#D97706` (amber) | Material Symbols |
| Phone handset | Contact info | 16px | `#2D6A4F` (forest) | Material Symbols |
| Envelope | Email contact | 16px | `#2D6A4F` (forest) | Material Symbols (stroke) |

### WhyChooseUs (6 benefit cards)
| Card | Icon | Purpose | Size | Color | Source |
|------|------|---------|------|-------|--------|
| No Medical Exam | Checkmark (circle) | Trust indicator | 28px | `#2D6A4F` | Material Symbols |
| Coverage from Day One | Calendar | Date/time | 28px | `#2D6A4F` | Material Symbols |
| Low Monthly Premiums | Dollar sign | Cost/affordable | 28px | `#2D6A4F` | Material Symbols |
| Plans for Every Age | Users (group) | Demographics | 28px | `#2D6A4F` | Material Symbols |
| 13 Carrier Options | Compass | Options/variety | 28px | `#2D6A4F` | Material Symbols |
| Licensed in 49 States | Location pin | Geographic coverage | 28px | `#2D6A4F | Material Symbols |

### HowItWorks (3 steps)
| Step | Icon | Purpose | Size | Color | Source |
|------|------|---------|------|-------|--------|
| 1. Call Us | Phone handset | Contact | 44px | `stroke #D97706` | Material Symbols (stroke) |
| 2. Choose a Plan | Clipboard | Documents/plan selection | 44px | `stroke #D97706` | Material Symbols (stroke) |
| 3. Get Covered | Shield | Protection/security | 44px | `stroke #D97706` | Material Symbols (stroke) |

### FAQAccordion (React component)
| Element | Icon | Purpose | Size | Color | Source |
|----------|------|---------|------|-------|--------|
| CTA card | Message bubble | "Still have questions" | 44px | `#D97706` (amber) | Material Symbols |
| CTA card | Phone handset | "Call (888) 000-0000" | 20px | `currentColor` | Material Symbols |
| FAQ items | Chevron down | Accordion toggle | 22px | `stroke #2D6A4F` | Material Symbols (stroke) |
| FAQ items | Chevron down | Accordion toggle (rotates) | 22px | `stroke #2D6A4F` | Material Symbols (stroke) |

### MobileMenu (React component)
| Element | Icon | Purpose | Size | Color | Source |
|----------|------|---------|------|-------|--------|
| Close button | X (cross) | Close drawer | 24px | `stroke` | Custom path |

### BottomCTA Section
| Element | Icon | Purpose | Size | Color | Source |
|----------|------|---------|------|-------|--------|
| Primary CTA | Phone handset | "Call (888) 000-0000" | 20px | `currentColor` | Material Symbols |

## Decorative SVG Elements (non-icons)

### Wave Dividers
- **StatsBar**: `d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z"` (white)
- **WhyChooseUs**: `d="M0,10 C480,40 960,0 1440,25 L1440,40 L0,40 Z"` (sage)
- **HowItWorks**: `d="M0,15 C400,40 1040,0 1440,20 L1440,40 L0,40 Z"` (dark green)
- **CarrierLogos**: `d="M0,25 C360,0 1080,40 1440,15 L1440,40 L0,40 Z"` (cream)

### Organic Blobs
- **Hero (forest)**: `d="M320,200 C320,280 260,350 180,350 C100,350 40,290 40,210 C40,130 100,50 200,50 C300,50 320,120 320,200Z"` (positioned top-right)
- **Hero (amber)**: `d="M260,220 C260,300 200,360 130,360 C60,360 20,300 20,220 C20,140 70,60 160,60 C250,60 260,140 260,220Z"` (positioned bottom-left)
- **BottomCTA (amber)**: `d="M300,200 C300,300 240,360 160,360 C80,360 30,290 30,200 C30,110 90,40 200,40 C310,40 300,100 300,200Z"` (positioned top-right)

## Icon Conventions

### Sizing
- **Navigation icons**: 15-18px (small, touch-friendly minimum 16px)
- **Hero/CTA icons**: 18-20px (medium, prominent)
- **Feature icons**: 28px (large, for benefit cards)
- **HowItWorks step icons**: 44px (extra-large, for visual emphasis)
- **Mobile icons**: 24px (standard touch target)

### Colors
- **Primary CTAs**: `currentColor` (inherits text color, usually forest green or white)
- **Trust/Success**: `#2D6A4F` (forest green)
- **Accents**: `#D97706` (amber) and `#0E7490` (teal-nature)
- **Stroke icons**: `stroke="currentColor"` with `stroke-width: 1.8-2.5`

### Accessibility
- All decorative SVGs have `aria-hidden="true"`
- Icons conveying meaning (phone, checkmark, chevron) are inline with descriptive text
- Accordion toggles use `aria-expanded` state managed by React
- Touch targets meet minimum 44×44px WCAG guideline (most are larger)

## Icon Source Reference

**Primary icon set**: Material Symbols (Google)
- Base paths from Material Design icon library
- Custom stroke widths applied for brand consistency
- Some paths modified (custom chevron, close X) but aligned with Material style

**No external icon libraries** — all SVGs are inline for performance and customization.
