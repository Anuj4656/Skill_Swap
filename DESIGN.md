---
name: Quiet Craft Community (V2)
colors:
  primary: '#7ed6cb'
  surface-base: '#121417'
  surface-card: '#181B20'
  surface-elevated: '#1F242B'
  surface-container-low: '#1a1c1f'
  surface-container: '#1e2023'
  surface-container-high: '#282a2d'
  background: '#111316'
  text-primary: '#E6EDF3'
  text-secondary: '#C9D1D9'
  text-muted: '#8B949E'
  on-surface: '#e2e2e6'
  on-surface-variant: '#bdc9c6'
  status-accepted: '#10B981'
  status-accepted-bg: '#0D2A20'
  status-pending: '#D97706'
  status-pending-bg: '#2A1E0D'
  status-rejected: '#E11D48'
  status-rejected-bg: '#2F1119'
  status-completed: '#3B82F6'
  status-completed-bg: '#12213D'
  border-subtle: '#2D333B'
  border-strong: '#30363D'
typography:
  headline-xl:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Manrope
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
  label-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  caption:
    fontFamily: Manrope
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-lg: 1.5rem
  margin: 1rem
  margin-md: 1.5rem
  margin-lg: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

# Skill Swap Platform Design System

## Brand Identity & Personality
- **Name:** SkillSwap
- **Essence:** Trustworthy, vibrant, collaborative, clean, approachable peer-to-peer knowledge exchange.
- **Principles:** High scannability, transparent trust metrics, low-friction request flow, modern minimalist card UI with tactile feedback.

## Color Palette
- **Primary / Brand:** `#7ed6cb` (Soft teal), Primary Container: `#459f95`
- **Neutrals / Surfaces:**
  - Background Canvas: `#111316` (Deep Slate)
  - Card & Container Surface: `#181B20` (Elevated dark)
  - Surface Border: `#2D333B` (Subtle boundary)
  - Text Primary: `#E6EDF3`
  - Text Secondary: `#C9D1D9`
  - Text Muted: `#8B949E`
- **Status & Feedback Tokens:**
  - **Pending:** `#D97706` (Amber), BG: `#2A1E0D`
  - **Accepted:** `#10B981` (Emerald), BG: `#0D2A20`
  - **Rejected / Cancelled:** `#E11D48` (Rose), BG: `#2F1119`
  - **Completed:** `#3B82F6` (Blue), BG: `#12213D`

## Typography
- **Font Family:** `Manrope`, system-ui, -apple-system, sans-serif
- **Headings:**
  - Headline-XL: 32px / font-semibold
  - Headline-LG: 24px / font-semibold
  - Headline-MD: 20px / font-semibold
- **Body:** 14px / font-normal / leading-relaxed
- **Meta / Chips / Badges:** 12px/13px / font-semibold

## Component Patterns
- **User Cards:** Elevated white cards with subtle border (`border-slate-200/80`), avatar with online/availability badge, user name, location, trust score pill (e.g. ⭐ 4.9 · 24 swaps), clear 2-row skill pill sections ("Offers" in teal badge, "Wants" in slate/indigo badge), and a prominent "Request Swap" button.
- **Skill Chips:** Pill-shaped badges with subtle color tinting, rounded-full, with clean micro-icons or category indicators.
- **Swap Request Cards:** Structured exchange rows showing User A's offered skill with arrow indicating transfer to User B's offered skill, status chip, timestamp, message snippet, and contextual action buttons (Accept/Decline or Mark Complete / Leave Review).
- **Modals:** Centered backdrop-blur overlay cards with clear headers, dropdown selection of skills, character-counted note textareas, and affirmative primary CTAs.
