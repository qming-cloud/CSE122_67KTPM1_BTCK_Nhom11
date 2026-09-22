---
name: SkillSwap Peer Exchange
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#464555'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#fea619'
  on-secondary-container: '#684000'
  tertiary: '#005338'
  on-tertiary: '#ffffff'
  tertiary-container: '#006e4b'
  on-tertiary-container: '#67f4b7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 44px
    fontWeight: '800'
    lineHeight: 52px
    letterSpacing: -0.03em
  display-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 38px
    letterSpacing: -0.025em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system is engineered for an energetic, collaborative, and collegiate peer-to-peer ecosystem. It strikes a balance between academic credibility and social vibrancy, projecting momentum, curiosity, and peer empowerment.

The style blends modern clean minimalism with purposeful tactile clarity—reminiscent of high-craft portfolio showcases. Crisp, layered surface planes, hyper-legible geometric typography, and high-contrast semantic badging structure the interface. Rather than relying on heavy ornament, the visual punch emerges from clear spatial grouping, punchy micro-interactions, bright tag accents against pristine canvases, and confident button profiles.

## Colors

The palette establishes a bright, structured hierarchy optimized for swift scanning and exchange intent.

- **Primary (`#4F46E5` / `#4338CA`):** Deep electric indigo anchors navigational frames, focused active states, verified student badges, and primary calls to action.
- **Secondary Accent (`#F59E0B` / `#FBBF24`):** Warm amber supplies spark and motivation, reserved for gamified achievements, swap tokens, high-match indicators, and ratings.
- **Semantic Exchange Pair:**
  - **Teach Intent (`#10B981` text / border on `#ECFDF5` fill):** Emerald green indicates offers, mastery, and ready-to-share skills.
  - **Learn Intent (`#F97316` text / border on `#FFF7ED` fill):** Warm orange designates learning goals, skill gaps, and active requests.
- **Neutrals & Surfaces:** Pure slate scales spanning ultra-subtle off-white foundations (`#F8FAFC`), crisp white elevated cards (`#FFFFFF`), whisper borders (`#E2E8F0`), and high-readability slate body copy (`#334155`) grounded by deep slate headings (`#0F172A`).

## Typography

The type scale relies entirely on Plus Jakarta Sans to deliver a unified, contemporary geometric voice with open counters and friendly humanist nuances. Headings use tight negative tracking with robust weights (700 and 800) to create impact and immediate presence. Body text balances generous line spacing against neutral tracking to preserve effortless reading across dense skill directories and messaging panels.

## Layout & Spacing

A structured 12-column responsive fluid grid aligns desktop listings, transitioning into an 8-column layout for tablets (below 1024px) and a single-column stack with 4-column sub-tracks on mobile devices (below 640px).

- **Grid Canvas:** Centered maximum container constraint of 1280px ensures cards remain compact and readable on ultra-wide screens.
- **Component Flow:** Internal card padding scales strictly between `space-md` (16px) on compact widgets and `space-lg` (24px) on featured profiles.
- **Section Rhythm:** Major vertical sections use `space-xl` (40px) intervals on mobile and expand to double-interval rhythm on desktop displays for deliberate breathing room.

## Elevation & Depth

Visual depth is achieved through crisp, light-weight outlines paired with ambient, color-tinted drop shadows rather than heavy grayscale blurs:

- **Level 0 (Flat Canvas):** `#F8FAFC` base page background.
- **Level 1 (Cards & Modules):** Pure `#FFFFFF` surface bounded by a subtle border (`1px solid #E2E8F0`) with ambient elevation: `0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.03)`.
- **Level 2 (Hovered Cards & Interactive States):** Elevated lift with slight upward offset: `0 12px 24px -6px rgba(79, 70, 229, 0.08), 0 4px 8px -2px rgba(15, 23, 42, 0.03)` with the border subtly shifting to indigo-tinted slate (`#CBD5E1`).
- **Level 3 (Modals, Overlays, Dropdowns):** Floating surface with deep ambient diffusion: `0 20px 30px -10px rgba(15, 23, 42, 0.12), 0 8px 12px -4px rgba(15, 23, 42, 0.06)`.

## Shapes

The design uses a balanced rounded geometry to create a friendly, approachable atmosphere without sacrificing structural precision:

- Standard structural panels, card containers, and modal windows adhere to `0.75rem` (12px) to `1rem` (16px).
- Action buttons, interactive text boxes, and search modules employ `0.625rem` (10px).
- Badges, status indicators, and skill tags utilize full pill radii (`9999px`) to create an unmistakable contrast against the rectangular structural cards.

## Components

### Buttons
- **Primary:** Deep indigo background (`#4F46E5`), crisp white text, bold font weight, `0.625rem` radius. Subtle inner border highlight and an energetic hover elevation transition to `#4338CA`.
- **Secondary / Ghost:** Clear background, `1.5px` border in `#E2E8F0`, slate text (`#1E293B`), transitioning to `#F1F5F9` on hover.
- **Accent Action (Swap / Request):** Amber fill (`#F59E0B`), white bold text, dedicated to high-intent conversion points.

### Skill Badges & Chips
- **"Teach" Pill:** Full pill radius, `#ECFDF5` background, `#059669` text, `1px solid #A7F3D0`. Prefixed with a subtle dot or mini graduation icon.
- **"Learn" Pill:** Full pill radius, `#FFF7ED` background, `#EA580C` text, `1px solid #FED7AA`. Prefixed with a mini target or compass icon.
- **Neutral / General Tag:** Light slate `#F1F5F9`, `#475569` text, borderless.

### Student Profile Cards
- Pure white background, `1px solid #E2E8F0`, rounded-lg boundaries.
- Upper region features student avatar (with optional campus affiliation badge and star review rating in amber).
- Mid-region houses two distinct segmented sections: "Teaches" (emerald chip collection) and "Wants to Learn" (orange chip collection).
- Bottom row features a sleek primary "Propose Swap" button and secondary profile link.

### Search & Filters
- **Minimalist Search Input:** Generous height (48px), inset search icon, soft `#F8FAFC` inner fill shifting to crisp white with a 2px `#4F46E5` glow ring upon focus.
- **Filter Segment Tabs:** Pill-based tab switcher with smooth sliding background token indicator.

### Input Fields & Controls
- Form inputs feature clear floating labels, `1px solid #CBD5E1`, and smooth transition rings. Checkboxes and radio buttons use primary indigo fills with clean white vectors and rounded-sm edges.