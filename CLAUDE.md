# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
pnpm dev          # start dev server at localhost:3000
pnpm build        # production build
pnpm lint         # run oxlint
pnpm lint:fix     # run oxlint with auto-fix
pnpm fmt          # run oxfmt formatter
pnpm fmt:check    # check formatting without writing
```

There are no tests yet. Use `pnpm build` to type-check and catch errors.

## Architecture

This is a **Next.js 16 App Router** project using **React 19** with the React Compiler enabled (`reactCompiler: true` in [next.config.ts](next.config.ts)).

- `app/globals.css` — Tailwind CSS v4 entry point (used as the `stylesheet` reference for Tailwind class sorting in oxfmt config).
- Path alias `@/*` resolves to the repo root (e.g. `@/app/...`).

This project follows a feature-first architecture with shared UI components via shadcn.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the full folder structure, dependency rules, and naming conventions.

## Tooling

- **Linter**: [oxlint](https://oxc.rs/docs/guide/usage/linter) — configured in [.oxlintrc.json](.oxlintrc.json). Plugins: `typescript`, `unicorn`, `oxc`, `nextjs`, `react`, `import`, `jsx-a11y`. All `correctness` rules are errors.
- **Formatter**: [oxfmt](https://oxc.rs/docs/guide/usage/formatter) — configured in [.oxfmtrc.json](.oxfmtrc.json). Print width 120, double quotes, semicolons, imports sorted with newlines between groups, Tailwind classes auto-sorted.
- **Pre-commit**: lint-staged runs `oxlint` on JS/TS files and `oxfmt` on all files before every commit.
- **Package manager**: pnpm (see [pnpm-workspace.yaml](pnpm-workspace.yaml)).

## Git

See [docs/GIT_CONVENTIONS.md](docs/GIT_CONVENTIONS.md) for commit format, types, and rules.
