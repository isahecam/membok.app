## Git Commits Conventions

Follow Conventional Commits specification using commitlint with the `conventional-changelog-atom` preset.

### Format

`type(scope?): subject`

### Length

- The commit header (`type(scope?): subject`) must not exceed 100 characters.

### Types

- build: changes that affect the build system
- chore: maintenance tasks
- ci: changes to CI configuration
- docs: documentation changes
- feat: new feature
- fix: bug fix
- perf: performance improvements
- refactor: code change without bug fix or feature
- revert: revert a previous commit
- style: formatting, missing semi colons, etc
- test: adding or updating tests

### Rules

- Type must be lowercase
- Subject must not end with a period
- Scope must be lowercase if provided

### Examples

- `feat(auth): add OAuth2 login with Google provider and session persistence`
- `fix(api): handle null response from external service and return fallback value`
- `chore(deps): update tailwindcss to v4 and adjust configuration accordingly`
