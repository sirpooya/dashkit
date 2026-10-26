# Contribution guide for dashkit

dashkit is Pooya's design system and React component library for dashboards and web apps.
It includes CSS design tokens, Tailwind 4 integration, accessible components built with
Radix primitives, and reusable hooks and utilities.

## Project structure

- `src/components/` — React components, styles, tests, and Storybook documentation.
- `src/hooks/` — Reusable React hooks.
- `src/lib/` — Shared utilities.
- `src/styles/` — Global CSS, Tailwind integration, and design tokens.
- `src/types.ts` — Shared TypeScript types.
- `.storybook-base/` — Storybook configuration and documentation helpers.
- `test/` — Shared test setup and utilities.

## Making changes

- Keep changes focused on the requested task.
- Put component implementations, hooks, styles, and their documentation in `src/`.
- Update root documentation or configuration when the task requires it.
- Follow existing component patterns and preserve accessibility.
- Use existing design tokens for styling.
- Add or update `.stories.tsx` and `.mdx` sidecars for new components and features.
- Keep examples simple and focused.
- Add tests when needed to verify meaningful behavior.
- Avoid unrelated formatting, build changes, and comments describing obvious behavior.

## File naming

- Component: `ComponentName.tsx`
- Styles: `ComponentName.module.css`
- Tests: `ComponentName.test.tsx`
- Stories: `ComponentName.stories.tsx`
- Documentation: `ComponentName.mdx`

## Setup and checks

Use the pnpm version declared in `package.json`. Install dependencies with `pnpm install`.

Before committing code changes, run:

1. `pnpm run format:fix`
2. `pnpm run lint`
3. `pnpm run types`
4. `pnpm run test`

Run Storybook only when the task requires it.

## License

dashkit is MIT licensed. The project copyright is held by Pooya; see `LICENSE`.
