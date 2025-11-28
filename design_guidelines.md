# Ventrox Tech Design Guidelines

## Brand Identity

### Logo System
**Custom Geometric "V" Logo**
- **Style**: Sharp, angular, minimal futuristic geometric "V"
- **Treatment**: Subtle tech pattern or circuitry accents integrated into letterform
- **Colors**: Electric Blue primary with Black/White variants
- **Variants Required**: Light mode, dark mode, favicon (16x16, 32x32)
- **Placement**: Header (left-aligned), footer (centered), favicon

### Typography Hierarchy
**Primary Font Stack:**
- **Headings**: Space Grotesk (700 weight for H1/H2, 600 for H3/H4)
  - H1: 3.5rem desktop / 2.5rem mobile, line-height 1.1
  - H2: 2.5rem desktop / 2rem mobile, line-height 1.2
  - H3: 1.75rem, line-height 1.3
- **Body**: Inter (400 regular, 500 medium, 600 semi-bold)
  - Body: 1rem, line-height 1.6
  - Small: 0.875rem, line-height 1.5
- **Accent/Code**: JetBrains Mono for technical specifications and data points

### Color System
**Primary Palette:**
- Electric Tech Blue: #0066FF (primary actions, accents, logo)
- Deep Charcoal: #1A1A1A (backgrounds, dark mode base)
- Pure White: #FFFFFF (light mode base, text on dark)

**Secondary Accents:**
- Neon Violet: #B026FF (hover states, highlights)
- Aqua Glow: #00E5FF (interactive elements, success states)
- Tech Silver: #E5E7EB (borders, dividers)

**Backgrounds:**
- Light mode: White with subtle gradient overlays
- Dark mode: Charcoal with radial gradient (#1A1A1A → #0A0A0A)
- Section dividers: Gradient borders using blue-to-violet

## Layout Architecture

### Spacing System
Use Tailwind units: 4, 8, 12, 16, 24, 32, 48 for consistent rhythm
- Component padding: p-8 to p-12
- Section spacing: py-24 desktop / py-16 mobile
- Card gaps: gap-8 (desktop) / gap-6 (mobile)

### Grid Structures
- Service cards: 3-column grid (desktop) → 1-column (mobile)
- Portfolio: 2-column masonry grid
- Features: 4-column icon grid
- Max container width: max-w-7xl with px-6 gutters

## Component Design Specifications

### Hero Section
**Layout:** Full viewport height (min-h-screen) with centered content
**Background:** Animated gradient mesh with floating geometric shapes (circles, lines, subtle tech patterns)
**Content Structure:**
- Logo-style headline with Ventrox Tech branding
- Subheadline: 1.25rem, max-w-2xl centered
- CTA button group: Primary + Secondary action
**Image Treatment:** Abstract tech visualization or particle system background (not photography)

### Service Cards
**Design:** Premium glassmorphism cards with backdrop-blur
**Structure:**
- Icon: 48x48 with neon glow effect
- Title: Space Grotesk H3
- Description: 2-3 lines, Inter body
- Hover state: Lift (translateY -4px), glowing border (2px gradient)
**Spacing:** p-8, rounded-2xl

### Navigation
**Style:** Transparent header with blur backdrop on scroll
**Layout:** Logo left, nav center, CTA button right
**Mobile:** Slide-in menu with backdrop blur overlay

### Buttons
**Primary:** Blue gradient background, white text, rounded-lg, px-8 py-4
**Secondary:** Transparent with blue border, blue text
**Hover:** Neon glow shadow effect, slight scale (1.02)
**On Images:** Backdrop-blur-md background with white/blue treatment

## Animation System

### Global Animations
- Page transitions: 300ms fade-in
- Scroll reveals: Fade-up on elements entering viewport (50px translateY → 0)
- Timing: cubic-bezier(0.4, 0, 0.2, 1)

### Interactive Elements
- **Service Cards**: Hover lift (translateY -8px, 400ms), border glow fade-in
- **Buttons**: Ripple effect on click, glow shadow on hover (0 0 20px rgba(0, 102, 255, 0.5))
- **Logo**: Subtle pulse animation (1s ease infinite) on page load only
- **Hero**: Text fade-in sequence (stagger 100ms), floating shapes gentle movement

### Parallax Effects
- Hero background shapes: 0.5x scroll speed
- Section backgrounds: Subtle parallax on scroll (minimal, professional)

## Page-Specific Layouts

### Home Page
7 sections: Hero, Services Grid (3-col), Why Choose Us (features), Tech Stack Icons, Portfolio Preview (2 projects), Testimonials (3-col cards), CTA

### Services Pages
Each service: Hero banner, Overview section, 6-step process timeline (vertical on mobile, horizontal on desktop), Features grid (2×3), Tech stack badges, CTA

### Portfolio Page
Masonry grid layout, each project card: Featured image, title, industry tag, tech badges, hover overlay with "View Case Study" CTA

### About Page
Mission/Vision cards (side-by-side), Company values (4-icon grid), Timeline (vertical roadmap style), placeholder team grid

### Contact Page
Split layout: Form (left 60%) + Info sidebar (right 40%), inquiry dropdown categories, map placeholder with gradient overlay

## Images

**Hero Section:** Abstract tech visualization - NOT a large photograph. Use animated gradient mesh, particle effects, or geometric patterns
**Portfolio Cards:** Fictional project mockups (browser/mobile frames showing interfaces)
**About Page:** Optional team placeholder illustrations (geometric avatars, not photos)
**Service Pages:** Icon-based, no large imagery needed

## Critical Design Principles
- **Futuristic Minimal**: Clean layouts with strategic neon accents, never cluttered
- **Premium Feel**: Generous whitespace, high-quality glassmorphism, sophisticated animations
- **High-Tech Identity**: Geometric shapes, circuit-inspired patterns, tech-forward typography
- **Professional Trust**: Balanced creativity with business credibility, polished execution throughout