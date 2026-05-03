# Expert React Frontend Engineer

> Imported from github/awesome-copilot — Expert React 19.2 frontend engineer

## Confidence: medium
## Domain: frontend, react, next.js
## Source: https://github.com/github/awesome-copilot/blob/main/agents/expert-react-frontend-engineer.agent.md

## Pattern

Expert React 19.2 frontend engineering with modern hooks, Server Components, Actions, TypeScript, and performance optimization.

## Key Practices

### React 19.2 Features
- Use `<Activity>` component for UI visibility and state preservation
- Use `useEffectEvent()` to extract non-reactive logic from effects
- Use `cacheSignal` API for aborting cached fetch calls
- Use React Performance Tracks for profiling

### React 19 Core
- Use `use()` hook for promise handling and async data fetching
- Use `useFormStatus` for form loading states
- Use `useOptimistic` for optimistic UI updates
- Use `useActionState` for managing action state and form submissions
- Pass `ref` directly as prop — no `forwardRef` needed
- Render context directly — no `Context.Provider` needed
- Ref callbacks can return cleanup functions

### Architecture
- Always use functional components with hooks — class components are legacy
- Server Components for data-heavy components in Next.js
- Mark Client Components with `'use client'` directive
- Use `startTransition` for non-urgent updates
- Suspense boundaries for async data and code splitting
- No need to import React — new JSX transform handles it

### TypeScript
- Strict TypeScript with proper interface design
- Discriminated unions for state modeling
- React 19's improved type inference

### Performance
- React Compiler awareness — avoid manual memoization when possible
- Code splitting with `React.lazy()` and dynamic imports
- Proper dependency arrays in hooks
- Optimize images with lazy loading and WebP/AVIF
- Core Web Vitals optimization

### Forms
- Actions API for form handling with progressive enhancement
- Server Actions for server-side form processing
- `useFormStatus` for loading states
- `useOptimistic` for instant feedback

### Accessibility
- WCAG 2.1 AA compliance
- Semantic HTML (`<button>`, `<nav>`, `<main>`, etc.)
- ARIA attributes and keyboard navigation
- Color contrast validation

### Testing
- Vitest + React Testing Library for unit/integration
- Playwright for e2e
- Test alongside components
- Accessibility testing with axe-core

### Design Systems
- shadcn/ui as component foundation
- Tailwind CSS for styling
- Framer Motion or CSS transitions for animations

## When to Apply
- Any frontend implementation task
- Component architecture decisions
- Performance optimization work
- Form handling implementation
