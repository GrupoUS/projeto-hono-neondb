# SaaS Boilerplate — Hono + NeonDB + Drizzle

Production-ready SaaS boilerplate with TypeScript end-to-end type safety, Clerk authentication, and Railway deployment.

## Features

- **Hono** - Edge-first, lightweight API framework
- **NeonDB** - Serverless PostgreSQL with connection pooling
- **Drizzle ORM** - Type-safe SQL with migrations
- **Clerk** - Complete authentication with JWT verification
- **React 19** - Latest React with concurrent features
- **TanStack Router** - Type-safe file-based routing
- **TanStack Query** - Async state management
- **tRPC** - End-to-end type-safe APIs
- **Tailwind CSS + shadcn/ui** - Modern styling
- **Turborepo** - Optimized monorepo build system
- **Railway** - One-click deployment ready

## Quick Start

```bash
# Install dependencies
bun install

# Configure environment
cp .env.example apps/server/.env
# Edit .env with your Clerk and NeonDB credentials

# Push database schema
bun run db:push

# Start development
bun run dev
```

- **Web**: http://localhost:5173
- **API**: http://localhost:3000
- **Health**: http://localhost:3000/health

## Project Structure

```
├── apps/
│   ├── server/         # Hono API + tRPC
│   │   ├── src/
│   │   │   ├── routes/      # REST API routes (users)
│   │   │   ├── middleware/  # Clerk auth middleware
│   │   │   ├── services/    # Business logic
│   │   │   └── index.ts     # Entry point
│   │   └── Dockerfile
│   └── web/            # React + TanStack
│       ├── src/
│       │   ├── routes/      # File-based routing
│       │   ├── hooks/       # useCurrentUser, useSyncUser
│       │   └── lib/         # API client with auth
│       └── package.json
├── packages/
│   ├── api/            # tRPC routers
│   ├── db/             # Drizzle schema + client
│   ├── env/            # Environment validation
│   └── shared/         # Shared types + Zod validators
├── railway.toml        # Railway config
└── .env.example
```

## API Endpoints

### REST API (`/api/v1`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/users/sync` | Sync user from Clerk |
| GET | `/api/v1/users/me` | Get current user |
| PATCH | `/api/v1/users/me` | Update current user |
| DELETE | `/api/v1/users/me` | Delete current user |
| GET | `/health` | Health check |

### tRPC (`/trpc`)

Existing tRPC endpoints remain available.

## Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."

# Clerk Authentication
CLERK_SECRET_KEY="sk_test_..."
CLERK_PUBLISHABLE_KEY="pk_test_..."

# API Configuration
API_PORT=3000
CORS_ORIGIN="http://localhost:5173"
NODE_ENV="development"
```

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start all apps in dev mode |
| `bun run build` | Build all apps |
| `bun run check-types` | TypeScript type check |
| `bun run db:push` | Push schema to database |
| `bun run db:studio` | Open Drizzle Studio |
| `bun run db:generate` | Generate migrations |

## Railway Deployment

1. Push to GitHub
2. Connect to Railway
3. Add environment variables
4. Deploy!

```bash
railway link
railway up
```

## License

MIT
