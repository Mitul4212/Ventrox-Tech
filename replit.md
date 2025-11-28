# Ventrox Tech Website

## Overview
A premium, futuristic multi-page website for Ventrox Tech - a technology and digital innovation company. The website showcases their services in Application Development, Website Development, and AI Automation Solutions.

## Tech Stack
- **Frontend**: React with TypeScript, Tailwind CSS, Shadcn UI components
- **Backend**: Express.js with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state
- **Animations**: Custom CSS animations + Framer Motion-style scroll reveals
- **Form Handling**: React Hook Form with Zod validation

## Brand Identity
- **Primary Color**: Electric Tech Blue (#0066FF / hsl 217 91% 50%)
- **Accent Color**: Neon Violet (#B026FF / hsl 271 81% 56%)
- **Aqua Glow**: (#00E5FF / hsl 187 100% 45%)
- **Typography**: 
  - Headings: Space Grotesk (700 weight for H1/H2, 600 for H3/H4)
  - Body: Inter (400-600 weights)
  - Code/Tech: JetBrains Mono

## Pages
1. **Home** - Hero section with particle effects, services overview, why choose us, tech stack, portfolio preview, testimonials, CTA
2. **About** - Mission/vision, company story, values, team, timeline
3. **Services** - Detailed service pages for App Dev, Web Dev, AI Automation
4. **Portfolio** - Case studies with filterable grid by industry
5. **Contact** - Contact form with validation, inquiry types, contact info

## Key Components
- `VentroxLogo` - Custom SVG logo with gradient V design
- `Navigation` - Fixed header with blur backdrop on scroll
- `AnimatedSection` - Intersection Observer-based scroll animations
- `HeroBackground` - Canvas-based particle system
- `ServiceCard` - Glassmorphism cards with hover effects
- `PortfolioCard` - Project showcase cards
- `ThemeToggle` - Dark/light mode support

## API Endpoints
- `POST /api/contact` - Submit contact form inquiry

## Running the Project
```bash
npm run dev
```
The development server runs on port 5000 with hot reload enabled.

## Design Principles
- Futuristic minimal design
- Premium glassmorphism effects
- High-tech geometric shapes
- Subtle neon accents
- Professional trust with business credibility
