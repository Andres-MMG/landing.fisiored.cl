---
name: Vital Balance System
colors:
  surface: '#f8fafb'
  surface-dim: '#d8dadb'
  surface-bright: '#f8fafb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f5'
  surface-container: '#eceeef'
  surface-container-high: '#e6e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#3e4945'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#eff1f2'
  outline: '#6d7a75'
  outline-variant: '#bdc9c4'
  surface-tint: '#006b59'
  primary: '#006857'
  on-primary: '#ffffff'
  primary-container: '#00846e'
  on-primary-container: '#f4fffa'
  inverse-primary: '#71d9bf'
  secondary: '#586062'
  on-secondary: '#ffffff'
  secondary-container: '#dae1e3'
  on-secondary-container: '#5d6466'
  tertiary: '#4f5f5f'
  on-tertiary: '#ffffff'
  tertiary-container: '#677877'
  on-tertiary-container: '#f3fffe'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#8ef5db'
  primary-fixed-dim: '#71d9bf'
  on-primary-fixed: '#00201a'
  on-primary-fixed-variant: '#005143'
  secondary-fixed: '#dde4e6'
  secondary-fixed-dim: '#c1c8ca'
  on-secondary-fixed: '#161d1f'
  on-secondary-fixed-variant: '#41484a'
  tertiary-fixed: '#d4e6e5'
  tertiary-fixed-dim: '#b8cac9'
  on-tertiary-fixed: '#0e1e1e'
  on-tertiary-fixed-variant: '#3a4a49'
  background: '#f8fafb'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  headline-xl:
    fontFamily: Montserrat
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

The design system is rooted in the "Modern Clinical" aesthetic, blending the sterile precision of medical expertise with the warmth of personalized care. It targets families and individuals seeking rehabilitation and pediatric services, prioritizing accessibility and emotional reassurance.

The visual language is characterized by a "Soft Professionalism"—utilizing ample whitespace to provide "breathing room" for patients, rounded UI elements to evoke safety, and subtle organic patterns (dot grids and concentric waves) to add texture without creating visual noise. The goal is to reduce cognitive load and medical anxiety through a calm, organized, and welcoming interface.

## Colors

The palette is derived from professional healthcare environments. 

- **Primary (Seafoam Teal):** Used for call-to-actions, brand identity, and key highlights. It represents health, vitality, and restorative care.
- **Secondary (Charcoal):** Used for primary typography and grounding elements. It provides the "expert" weight necessary for medical trust.
- **Tertiary (Mint Wash):** A soft background tint for containers and secondary buttons to differentiate sections without harsh borders.
- **Neutral (Off-White):** A "Warm Clinic" white used for main backgrounds to prevent eye strain and maintain a clean, high-end feel.

## Typography

This design system uses a dual-font strategy. **Montserrat** is used for headlines to convey confidence and modern authority through its geometric stability. **Inter** is used for all body text and UI labels to ensure maximum legibility and a friendly, neutral tone for complex medical information.

Hierarchies are strictly enforced to guide the user's eye from the most critical service information down to supporting details. Letter spacing is slightly tightened on large headlines for a more "designed" editorial feel, while body text maintains standard spacing for accessibility.

## Layout & Spacing

The system follows an 8px base grid, ensuring all components and layouts scale proportionately. 

- **Layout Model:** A 12-column fluid grid for desktop with fixed gutters of 24px. On mobile, the system transitions to a 4-column grid.
- **Spacing Philosophy:** Generous padding within cards (min 32px) and sections (min 80px) is required to maintain the "calm" brand attribute. 
- **Decorative Elements:** Use a dot-matrix pattern (8x8 grid of 2px dots) in the corners of sections or behind images to reinforce the brand identity seen in physical collateral.

## Elevation & Depth

To maintain a soft and approachable feel, this design system avoids heavy shadows. Instead, it uses:

1.  **Tonal Tiers:** Surfaces are primarily distinguished by color shifts (e.g., a Tertiary Mint container on a Neutral Off-White background).
2.  **Soft Ambient Shadows:** For interactive cards and floating buttons, use a very large blur radius (20px-40px) with low opacity (4-6%) using a slightly teal-tinted shadow color.
3.  **Low-Contrast Outlines:** Subtle 1px borders in a slightly darker shade of the background color are used to define boundaries without adding visual "weight."

## Shapes

The shape language is consistently rounded to mirror the friendly and caring nature of the brand.

- **Standard Elements:** Buttons and input fields use a 0.5rem (8px) radius.
- **Containers/Cards:** Large surfaces like appointment cards or service descriptions use a 1rem (16px) radius to feel "approachable."
- **Avatars:** Profile images of medical professionals should be contained in circular or highly rounded "squircle" containers.

## Components

### Buttons
Primary buttons feature a solid Primary Teal fill with white text. Hover states should slightly darken the teal. Secondary buttons use a Tertiary Mint background with Primary Teal text. All buttons should have a minimum height of 48px to ensure ease of use on mobile for all age groups.

### Cards
Cards are the primary way to display services (e.g., Kinesiology). They should feature a white background, soft ambient shadow, and top-aligned iconography. Use the "Rounded" (16px) corner radius.

### Input Fields
Inputs use a light gray border and transition to a 2px Primary Teal border on focus. Labels should always be visible above the field using the `label-md` type scale.

### Chips & Badges
Used for status (e.g., "Available") or categories. These should be pill-shaped with high-contrast backgrounds and semi-bold text.

### Iconography
Icons should be thin-stroke (2px) and feature rounded ends. Where possible, use a "duotone" style incorporating both Primary Teal and a lighter tint of the same color to add depth.