# AGENTS.md

## Quick Start

```bash
npm install          # Setup
npm run start:dev    # Run dev server on port 3000
npm run test         # Run unit tests
npm run test:e2e     # Run e2e tests
```

## Architecture

- **Framework**: NestJS + TypeScript + SQLite
- **Entry point**: `src/main.ts`
- **Core modules**: `UsersModule`, `ReportsModule`
- **Database**: SQLite (`db.sqlite`), auto-synced (`synchronize: true`)

## Important Conventions

- **Authentication**: Session-based via `cookie-session` (keys: `['dgbasjbd22bnbs']`)
- **CurrentUser decorator**: Access via `@CurrentUser()` from request context
- **Password hashing**: Uses `scrypt` with salt (`salt.hash` format)
- **Serialization**: `@Serialize(Dto)` wraps responses with DTO transformation
- **Validation**: Global `ValidationPipe` with `whitelist: true`

## Testing

- Unit tests: `**/*.spec.ts` in `src/`
- E2E tests: Configured in `test/jest-e2e.json`
- Run `npm run test:cov` for coverage report

## Style

- **Single quotes**: Enforced via Prettier
- **Trailing commas**: `all` (objects, arrays, imports)
- **Lint + format**: `npm run lint` fixes in-place

## Gotchas

1. `AuthController` not found in `UsersModule`—guards/interceptors may be applied differently
2. `console.log` statements present in interceptors (remove before production)
3. Cookie session key is hardcoded—don't commit to version control
4. TypeORM auto-syncs schema (`synchronize: true`), useful for development only
