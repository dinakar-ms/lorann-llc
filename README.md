# Lorann LLC — Next.js 14 Website

Production-ready Next.js 14 / TypeScript / Tailwind application for **Lorann LLC** ("List Smarter") — a B2B data intelligence company.

## Features

- **Next.js 14** with App Router
- **TypeScript** throughout
- **Tailwind CSS** with custom brand design tokens
- **Three.js** hero globe with 100+ particles, 4 orbital rings, 4 satellites, 5 energy arcs, pulse rings, rotating text rings
- **Responsive navigation** — desktop dropdowns, full-screen mobile menu with slide-in panel, body scroll lock, ESC-to-close
- **Google Fonts** via `next/font` — Space Grotesk (headings) + Inter (body) + JetBrains Mono (accents)
- **Animations** — scroll-triggered reveals, sequential step activation, counter animations, circular SVG progress rings
- **Lucide React** icons
- Fully responsive: mobile, tablet, desktop, wide
- Accessibility — keyboard navigation, reduced-motion support, ARIA labels

## Pages

- `/` — Homepage with all sections
- `/about` — Mission, values, team stats
- `/solutions` — Full solutions overview
- `/signal-exchange` — Proprietary Signal eXchange™ intelligence layer
- `/how-it-works` — 4-step process + promises
- `/industries` — Healthcare, Financial, B2B, Insurance, Automotive
- `/resources` — Guides, case studies, white papers
- `/contact` — Contact form with mailto fallback
- `/not-found` — Custom 404

## Getting Started

### Prerequisites

- Node.js 18.17+ (or 20+)
- npm / yarn / pnpm

### Installation

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
npm run start
```

### Deploy

This is a standard Next.js 14 app. Deploy to:

- **Vercel** — `vercel deploy` (zero config)
- **Netlify** — works out of the box with the Next.js plugin
- **Any Node host** — `npm run build && npm run start`

## Project Structure

```
lorann-website/
├── app/
│   ├── layout.tsx          # Root layout with fonts + Navbar + Footer
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Tailwind + custom CSS
│   ├── not-found.tsx       # 404 page
│   ├── about/page.tsx
│   ├── solutions/page.tsx
│   ├── signal-exchange/page.tsx
│   ├── how-it-works/page.tsx
│   ├── industries/page.tsx
│   ├── resources/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── Navbar.tsx          # Responsive nav with full-screen mobile menu
│   ├── Footer.tsx
│   ├── AnnouncementBar.tsx
│   ├── Logo.tsx
│   ├── HeroGlobe.tsx       # Three.js globe
│   ├── ScrollReveal.tsx    # Intersection observer utility
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Kicker.tsx
│   │   ├── SectionHeader.tsx
│   │   └── PageHero.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── StatsStripAndTrust.tsx
│       ├── ValueProps.tsx          # 6 flip cards
│       ├── SignalExchangeSection.tsx
│       ├── HowItWorksSection.tsx   # Scroll-triggered steps
│       ├── StatsSection.tsx        # Circular progress rings
│       ├── SolutionsSection.tsx    # Alternating rows
│       ├── IndustriesSection.tsx
│       └── FinalCTA.tsx            # Orbital animation
├── public/
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
├── postcss.config.mjs
└── package.json
```

## Brand Details

- **Company:** Lorann LLC
- **Tagline:** List Smarter
- **Email:** info@lorannllc.com
- **Phone:** +1 914-565-5300
- **Address:** 75 Lake Rd, Suite 326, Congers, NY 10920-2343
- **Proprietary product:** Signal eXchange™ (always with TM)

## Key Stats (client-verified placeholders)

- 95M+ verified contacts
- 98% data accuracy rate
- 500+ industries & verticals
- 10K+ campaigns powered

## Design Tokens

All colors and tokens live in `tailwind.config.ts`. The palette is derived from the Lorann logo's deep-blue globe:

- `blue-600` → `#1D45D9` (primary)
- `cyan-500` → `#00A7EF` (secondary accent)
- `navy-950` → `#03061A` (dark sections)
- `bg-base` → `#DCE8FF` (page background)

## Customization

### Change contact info

Update in `components/Footer.tsx`, `components/Navbar.tsx`, and any `mailto:` links in pages.

### Update stats

Homepage stats: `components/sections/StatsStripAndTrust.tsx` and `components/sections/StatsSection.tsx`.

### Add new pages

Create a new folder in `app/` with a `page.tsx`. Next.js will auto-route it.

### Adjust globe animation

Everything is in `components/HeroGlobe.tsx` — particle count, colors, ring configs, etc.

## Browser Support

- Chrome / Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari 15+
- Mobile Safari iOS 15+
- Chrome Android (latest)

## License

© 2026 Lorann LLC. Signal eXchange™ is a trademark of Lorann LLC.
