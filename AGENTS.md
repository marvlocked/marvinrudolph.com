# AGENTS.md

## Project Overview

Personal portfolio site for Marvin Rudolph (marvinrudolph.com). A monorepo with a single TanStack Start app deployed to Cloudflare Workers.

## Architecture

### Monorepo Structure

```
├── apps/
│   └── site/          # TanStack Start app (@p/site)
├── packages/          # Shared packages (none yet)
├── turbo.json         # Turborepo task config
├── pnpm-workspace.yaml
└── eslint.config.js
```

### Tech Stack

- **Runtime**: Node 22
- **Framework**: TanStack Start (SSR React meta-framework)
- **Routing**: TanStack React Router (file-based, generated route tree)
- **UI**: React 19
- **Build**: Vite 8
- **Styling**: Tailwind CSS v4
- **Animations**: Motion (motion/react)
- **Icons**: HugeIcons Pro (stroke-rounded variant)
- **Accessibility**: React Aria Components
- **Validation**: Zod v4
- **Linting**: @antfu/eslint-config with React
- **Deploy**: Cloudflare Workers via Wrangler

### Package Manager

**pnpm** (v10.32.1). Always use `pnpm add`, `pnpm install`, `pnpm run`, `pnpx`. Never use npm, yarn, or bun. Dependency versions are managed through pnpm catalogs (`catalog:dev`, `catalog:prod`) defined in `pnpm-workspace.yaml`.

## Conventions

### File Naming

- Components: `kebab-case.tsx` (e.g. `theme-toggle.tsx`, `default-catch-boundary.tsx`)
- Routes: `index.tsx`, `imprint.tsx`, `__root.tsx` — standard TanStack Router file conventions
- Utilities: `lib/utils.ts`
- Styles: `styles/tailwind.css`
- Generated files: `route-tree.gen.ts` (never edit manually, ignored by ESLint)

### Imports

- Path alias: `~/` maps to `apps/site/src/` (configured in tsconfig)
- Use `import type` for type-only imports
- TypeScript file extensions in imports are allowed (`~/theme-context.tsx`)
- Barrel exports via `index.tsx` for `components/` and `layouts/`

### Components

- Named exports: `export function ComponentName()`
- Props typed with explicit interfaces or `PropsWithChildren`
- Destructure props in the function body, not in the parameter: `const { children } = props`
- Mark read-only props: `props: Readonly<MyProps>`
- Route-specific components (e.g. `RouteComponent`, `RootDocument`) stay unexported in their route file

### Routing

- File-based routes in `apps/site/src/routes/`
- `createRootRoute` in `__root.tsx` for layout, meta, error/not-found components, and the theme loader
- `createFileRoute('/path')` with a `component: RouteComponent` for each page
- Route components are wrapped in `DefaultLayout` for consistent page structure
- Default preload strategy: `intent`

### Styling

- Tailwind CSS v4 with `@theme` block for design tokens (fonts, colors, animations)
- Dark mode via `.dark` class on `<html>`, toggled by `ThemeProvider`
- `cn()` utility (clsx + tailwind-merge) for conditional class composition
- Neutral color palette as base, accent color `#34E969`
- Font: Geist Variable (sans) via `@fontsource-variable/geist`, imported in `tailwind.css`

### Animations

- Use `motion` from `motion/react` for entrance animations
- Standard entrance pattern: `initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}` → `animate={{ opacity: 1, y: 0, filter: 'none' }}` with `duration: 0.4, ease: 'easeOut'`
- Stagger delays incrementally (0.2, 0.5, 0.6, 0.7, 0.8, etc.)
- Custom CSS animations `wiggle` and `wiggle-fast` defined in the Tailwind theme

### Server/Client Boundary

- `createServerFn()` for server-only logic (cookie access, etc.)
- `createClientOnlyFn()` for browser-only logic (media queries, etc.)
- Route `loader` functions fetch SSR data via server functions
- `router.invalidate()` to refetch after mutations

### Theme System

- Three modes: `light`, `dark`, `system`
- Stored in a cookie, read server-side in the root route loader
- `ThemeProvider` (React Context) manages state and syncs the `.dark` class
- `ScriptOnce` injects a blocking script to prevent flash of unstyled content
- React 19 `use()` hook for consuming context in `useTheme()`

### Icons

- Import from `@hugeicons-pro/core-stroke-rounded`
- Render with `<HugeiconsIcon icon={...} size="1rem" strokeWidth={2} />`

### Accessibility

- Use `react-aria-components` for interactive primitives (e.g. `Button` for theme toggle)
- Semantic HTML elements: `<main>`, `<footer>`, `<nav>`
- `aria-label` on icon-only buttons
- `rel="noopener noreferrer"` on all `target="_blank"` links

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in dev mode (via Turbo) |
| `pnpm build:site` | Build the site app |
| `pnpm deploy:site` | Deploy the site to Cloudflare |
| `pnpm check-deps` | Interactive dependency update check |

## Forms

TanStack Form is the only allowed form library. Never use React Hook Form, Formik, or any alternatives. Use Zod schemas for validation.

## Linting

ESLint uses `@antfu/eslint-config` with React support and formatters enabled. The generated route tree file is ignored. Two rules are currently disabled:

- `react-hooks/refs` — false positives (React bug #34775)
- `react-refresh/only-export-components` — too restrictive for this project

## Deployment

The site deploys to Cloudflare Workers. The Wrangler config (`apps/site/wrangler.jsonc`) sets the entry point to `@tanstack/react-start/server-entry` with `nodejs_compat` compatibility. Build and deploy run sequentially through Turbo's task pipeline.

## Things to Avoid

- Do not edit `route-tree.gen.ts` — it is auto-generated
- Do not use `any` types
- Do not use `console.log` in production code
- Do not use `var` — always `const` or `let`
- Do not use CSS-in-JS or styled-components — use Tailwind
- Do not use form libraries other than TanStack Form
- Do not add redundant code comments that just narrate what the code does
