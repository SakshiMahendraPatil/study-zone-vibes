Study Zone Vibes

Study Zone Vibes is the business website for a study room — a physical space students and professionals can rent out to study. The site presents the business's information and the services the study room offers (seating options, timings, pricing, amenities, contact/booking details, etc.), built with TanStack Start and a polished, accessible UI.

Features
Business/service information — showcases the study room's offerings, amenities, and details for visitors
Modern UI kit — built on shadcn/ui and Radix UI primitives for accessible, composable components (dialogs, dropdowns, tabs, accordions, tooltips, and more)
Full-stack routing — powered by TanStack Start / TanStack Router (SSR-capable)
Data fetching & caching — via TanStack Query
Form handling & validation — React Hook Form + Zod schemas (e.g. contact/inquiry forms)
Styling — Tailwind CSS v4 with tw-animate-css
Type-safe — written in TypeScript throughout
Tech Stack
Framework: TanStack Start (React 19) + Vite
Language: TypeScript
UI Components: shadcn/ui, Radix UI
Styling: Tailwind CSS v4
Routing: TanStack Router
State/Data: TanStack Query
Forms: React Hook Form, Zod
Server runtime: Nitro
Linting/Formatting: ESLint, Prettier
Getting Started
Prerequisites
Node.js (v18 or later recommended)
npm (or Bun, since a bun.lock is included)
Installation
bash
# Clone the repository
git clone https://github.com/SakshiMahendraPatil/study-zone-vibes.git
cd study-zone-vibes

# Install dependencies
npm install
# or
bun install
Running Locally
bash
npm run dev

This starts the Vite dev server for the TanStack Start app.

Building for Production
bash
npm run build
npm run preview

For a development-mode build:

bash
npm run build:dev
Linting & Formatting
bash
npm run lint     # check for lint errors
npm run format   # format files with Prettier
Project Structure
study-zone-vibes/
├── src/
│   ├── components/   # Reusable UI components (shadcn/ui-based)
│   ├── routes/          # TanStack Router route files
│   ├── hooks/          # Custom React hooks
│   └── lib/             # Utilities and helpers
├── public/             # Static assets
├── vite.config.ts
└── tsconfig.json

Adjust this to match the actual folder layout in src/.

Deployment

This project includes a netlify.toml, so it's configured for deployment on Netlify. Connect the repository and it will build and deploy automatically on push.

Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.
