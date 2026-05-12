## Behavior

- Never assume — ask before making structural changes
- Prefer editing existing files over creating new ones
- Do not delete code unless explicitly asked

## Code generation

- Always follow the conventions in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- Never use default exports
- Never import between features directly
- Run `pnpm build` after changes to catch type errors

## Tasks

- Break large changes into small focused commits
- One feature or fix per commit — never bundle unrelated changes

## Hard rules

- Never modify files inside `components/ui/` — that is shadcn territory
- Never install a package without asking first
- Never run `pnpm lint:fix` automatically — ask before auto-fixing

## Git commits

Before committing, always read and follow [docs/GIT_CONVENTIONS.md](docs/GIT_CONVENTIONS.md).
