# ═══════════════════════════════════════════════════════════════════════════════
# PRP: SaaS Boilerplate — Hono + NeonDB + Drizzle Stack
# Template Base para Projetos SaaS com Máximo Controle e Portabilidade SQL
# ═══════════════════════════════════════════════════════════════════════════════

metadata:
  complexity: "L7 — Full-stack boilerplate com múltiplas integrações, monorepo structure, auth flow completo"
  estimated_time: "4-6 horas"
  parallel_safe: false
  version: "1.0.0"
  template_name: "saas-hono-drizzle-boilerplate"

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 1: ROLE & OBJECTIVE
# ─────────────────────────────────────────────────────────────────────────────
role: "Senior Full-Stack TypeScript Developer & DevOps Engineer"
expertise_areas:
  - "Hono framework (edge-first, lightweight API)"
  - "Drizzle ORM (type-safe SQL)"
  - "NeonDB (serverless PostgreSQL)"
  - "Clerk authentication (JWT verification)"
  - "TanStack ecosystem (Router, Query)"
  - "Monorepo architecture (Turborepo)"
  - "Railway deployment patterns"

objective:
  task: "CREATE a production-ready SaaS boilerplate with Hono API backend, Drizzle ORM, NeonDB, and React frontend that serves as the standard template for all future SaaS projects"
  context: "Monorepo TypeScript project with Bun, optimized for vibe coding (AI-assisted development), Railway deployment, and maximum SQL portability"
  why_this_matters: |
    Este boilerplate será a fundação para múltiplos projetos SaaS.
    Precisa ser: (1) Rápido de clonar e customizar, (2) Type-safe end-to-end,
    (3) Otimizado para AI coding assistants, (4) Pronto para escalar no Railway,
    (5) Sem vendor lock-in (PostgreSQL portável).

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 2: TECHNICAL CONTEXT
# ─────────────────────────────────────────────────────────────────────────────
environment:
  runtime: "Bun 1.1.x (package manager + runtime)"
  api_framework: "Hono 4.x"
  orm: "Drizzle ORM"
  database: "NeonDB (serverless PostgreSQL)"
  auth: "Clerk (JWT verification via Hono middleware)"
  frontend_framework: "React 19"
  router: "TanStack Router v1 (file-based routing)"
  state: "TanStack Query v5"
  ui: "shadcn/ui + Tailwind CSS v4"
  build: "Vite 6.x"
  monorepo: "Turborepo"
  testing: "Vitest + Testing Library"
  deployment: "Railway (API container + NeonDB external)"

project_structure:
  root: |
    saas-boilerplate/
    ├── apps/
    │   ├── api/                    # Hono backend
    │   │   ├── src/
    │   │   │   ├── index.ts        # Entry point
    │   │   │   ├── routes/         # Route handlers
    │   │   │   ├── middleware/     # Auth, CORS, logging
    │   │   │   ├── lib/            # Shared utilities
    │   │   │   └── db/             # Drizzle config + schema
    │   │   ├── drizzle/            # Migrations
    │   │   ├── drizzle.config.ts
    │   │   └── package.json
    │   └── web/                    # React frontend
    │       ├── src/
    │       │   ├── routes/         # TanStack file-based routes
    │       │   ├── components/     # UI components
    │       │   ├── hooks/          # Custom hooks
    │       │   ├── lib/            # API client, utilities
    │       │   └── main.tsx
    │       ├── vite.config.ts
    │       └── package.json
    ├── packages/
    │   ├── shared/                 # Shared types, validators
    │   │   ├── src/
    │   │   │   ├── types/          # Shared TypeScript types
    │   │   │   └── validators/     # Zod schemas
    │   │   └── package.json
    │   └── ui/                     # Shared UI components (optional)
    ├── turbo.json
    ├── package.json
    ├── .env.example
    └── railway.toml

naming_conventions:
  files: "kebab-case (user-routes.ts, auth-middleware.ts)"
  components: "PascalCase (UserProfile.tsx)"
  functions: "camelCase (getUserById)"
  database_tables: "snake_case (user_profiles)"
  database_columns: "snake_case (created_at)"
  env_vars: "SCREAMING_SNAKE_CASE (DATABASE_URL)"
  routes: "kebab-case (/api/user-profiles)"

constraints:
  non_negotiable:
    - "100% TypeScript — zero `any` types permitidos"
    - "Type-safe end-to-end: Drizzle → API → Frontend"
    - "Todas as env vars validadas com Zod no startup"
    - "Clerk JWT verification obrigatório em rotas protegidas"
    - "Migrations versionadas com Drizzle Kit"
    - "Zero secrets hardcoded — tudo via environment variables"
    - "CORS configurado para produção (não usar * em prod)"
  preferences:
    - "Prefer Zod para validação de input em todas as rotas"
    - "Usar @hono/zod-validator para request validation"
    - "Implementar rate limiting básico"
    - "Structured logging com contexto de request"
    - "Health check endpoint obrigatório"

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 3: RESEARCH DIRECTIVES
# ─────────────────────────────────────────────────────────────────────────────
research_phase:
  required_before_implementation:
    - source: "https://hono.dev/docs"
      focus: "Middleware patterns, Bun adapter, OpenAPI integration"
    - source: "https://orm.drizzle.team/docs"
      focus: "PostgreSQL dialect, migrations, relations"
    - source: "https://neon.tech/docs"
      focus: "Connection pooling, serverless driver"
    - source: "https://clerk.com/docs"
      focus: "JWT verification, Hono integration patterns"
    - source: "https://tanstack.com/router/latest"
      focus: "File-based routing, Vite plugin, loaders"
    - source: "https://tanstack.com/query/latest"
      focus: "Query patterns, prefetching, mutations"
    
  validation_questions:
    - "Drizzle usa qual driver para NeonDB? (@neondatabase/serverless)"
    - "Clerk JWT verification em Hono usa qual pattern? (custom middleware)"
    - "TanStack Router file-based routing requer qual Vite plugin?"
    - "Qual a estrutura de migration do Drizzle Kit?"

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 4: CHAIN OF THOUGHT PROCESS
# ─────────────────────────────────────────────────────────────────────────────
chain_of_thought:
  analyze:
    core_requirements:
      - "Monorepo structure com workspaces Bun"
      - "API type-safe com Hono + Drizzle"
      - "Auth flow completo com Clerk"
      - "Frontend reativo com TanStack"
      - "Deploy ready para Railway"
    
    integration_points:
      - "Clerk → Hono: JWT verification middleware"
      - "Drizzle → NeonDB: Serverless connection"
      - "API → Frontend: Type-safe fetch com inferência"
      - "TanStack Query → API: Mutations e queries"

  tree_of_thoughts:
    approach_a:
      description: "tRPC para type-safety end-to-end"
      pros: ["Type inference automático", "Developer experience excelente"]
      cons: ["Overhead adicional", "Menos flexível para APIs públicas"]
      viability_score: 4
    approach_b:
      description: "Hono OpenAPI + Zod schemas compartilhados"
      pros: ["API documentada", "Schemas reutilizáveis", "Mais flexível"]
      cons: ["Requer mais setup manual", "Type sharing manual"]
      viability_score: 4
    approach_c:
      description: "Hono puro com types exportados do packages/shared"
      pros: ["Simples", "Menos dependências", "Fácil de entender"]
      cons: ["Type safety menos automático"]
      viability_score: 3
    selected_approach: "approach_b"
    rationale: |
      OpenAPI + Zod oferece o melhor balanço: API documentada para futuras
      integrações, schemas Zod reutilizáveis entre API e frontend, e
      flexibilidade para APIs públicas. tRPC seria excelente mas adiciona
      complexidade desnecessária para um boilerplate.

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 5: ATOMIC TASKS
# ─────────────────────────────────────────────────────────────────────────────
atomic_tasks:

  # ═══════════════════════════════════════════════════════════════════════════
  # PHASE 1: PROJECT FOUNDATION (Monorepo Setup)
  # ═══════════════════════════════════════════════════════════════════════════
  
  - id: "AT-001"
    title: "Initialize Bun monorepo with Turborepo"
    phase: 1
    priority: "critical"
    dependencies: []
    parallel_safe: true
    implementation:
      files_to_create:
        - "package.json (root workspace config)"
        - "turbo.json (pipeline config)"
        - "bun.lockb (auto-generated)"
        - ".gitignore"
        - ".env.example"
      commands:
        - "mkdir saas-boilerplate && cd saas-boilerplate"
        - "bun init -y"
        - "bun add -D turbo"
      validation: "bun run --filter '*' build (should show no workspaces yet)"
      rollback: "rm -rf saas-boilerplate"
    acceptance_criteria:
      - "package.json com workspaces: ['apps/*', 'packages/*']"
      - "turbo.json com pipelines: build, dev, lint, test, typecheck"
      - ".env.example com todas as variáveis necessárias documentadas"
    deliverables:
      package_json: |
        {
          "name": "saas-boilerplate",
          "private": true,
          "workspaces": ["apps/*", "packages/*"],
          "scripts": {
            "dev": "turbo dev",
            "build": "turbo build",
            "lint": "turbo lint",
            "test": "turbo test",
            "typecheck": "turbo typecheck",
            "db:generate": "bun run --filter api db:generate",
            "db:migrate": "bun run --filter api db:migrate",
            "db:studio": "bun run --filter api db:studio"
          },
          "devDependencies": {
            "turbo": "^2.3.0",
            "typescript": "^5.7.0"
          }
        }
      turbo_json: |
        {
          "$schema": "https://turbo.build/schema.json",
          "tasks": {
            "build": {
              "dependsOn": ["^build"],
              "outputs": ["dist/**", ".next/**"]
            },
            "dev": {
              "cache": false,
              "persistent": true
            },
            "lint": {},
            "test": {},
            "typecheck": {
              "dependsOn": ["^build"]
            }
          }
        }
      env_example: |
        # Database (NeonDB)
        DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"
        
        # Clerk Auth
        CLERK_PUBLISHABLE_KEY="pk_test_xxx"
        CLERK_SECRET_KEY="sk_test_xxx"
        
        # API
        API_PORT=3001
        API_URL="http://localhost:3001"
        
        # Frontend
        VITE_API_URL="http://localhost:3001"
        VITE_CLERK_PUBLISHABLE_KEY="pk_test_xxx"

  - id: "AT-002"
    title: "Create shared package with types and validators"
    phase: 1
    priority: "critical"
    dependencies: ["AT-001"]
    parallel_safe: true
    implementation:
      files_to_create:
        - "packages/shared/package.json"
        - "packages/shared/tsconfig.json"
        - "packages/shared/src/index.ts"
        - "packages/shared/src/types/index.ts"
        - "packages/shared/src/types/user.ts"
        - "packages/shared/src/types/api.ts"
        - "packages/shared/src/validators/index.ts"
        - "packages/shared/src/validators/user.ts"
        - "packages/shared/src/validators/env.ts"
      commands:
        - "mkdir -p packages/shared/src/{types,validators}"
        - "cd packages/shared && bun init -y"
        - "bun add zod"
      validation: "bun run --filter @repo/shared typecheck"
      rollback: "rm -rf packages/shared"
    acceptance_criteria:
      - "Zod schemas exportados para User, ApiResponse, PaginatedResponse"
      - "TypeScript types inferidos dos Zod schemas"
      - "Environment validator para runtime validation"
    deliverables:
      user_types: |
        import { z } from 'zod';
        
        export const userSchema = z.object({
          id: z.string().uuid(),
          clerkId: z.string(),
          email: z.string().email(),
          name: z.string().nullable(),
          imageUrl: z.string().url().nullable(),
          createdAt: z.coerce.date(),
          updatedAt: z.coerce.date(),
        });
        
        export const createUserSchema = userSchema.pick({
          clerkId: true,
          email: true,
          name: true,
          imageUrl: true,
        });
        
        export const updateUserSchema = userSchema.partial().pick({
          name: true,
          imageUrl: true,
        });
        
        export type User = z.infer<typeof userSchema>;
        export type CreateUser = z.infer<typeof createUserSchema>;
        export type UpdateUser = z.infer<typeof updateUserSchema>;
      api_types: |
        import { z } from 'zod';
        
        export const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
          z.object({
            success: z.literal(true),
            data: dataSchema,
          });
        
        export const apiErrorSchema = z.object({
          success: z.literal(false),
          error: z.object({
            code: z.string(),
            message: z.string(),
            details: z.unknown().optional(),
          }),
        });
        
        export const paginatedSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
          z.object({
            items: z.array(itemSchema),
            total: z.number(),
            page: z.number(),
            pageSize: z.number(),
            hasMore: z.boolean(),
          });
        
        export type ApiResponse<T> = { success: true; data: T };
        export type ApiError = z.infer<typeof apiErrorSchema>;
        export type Paginated<T> = {
          items: T[];
          total: number;
          page: number;
          pageSize: number;
          hasMore: boolean;
        };

  # ═══════════════════════════════════════════════════════════════════════════
  # PHASE 2: API BACKEND (Hono + Drizzle)
  # ═══════════════════════════════════════════════════════════════════════════

  - id: "AT-003"
    title: "Initialize Hono API with Bun adapter"
    phase: 2
    priority: "critical"
    dependencies: ["AT-002"]
    parallel_safe: true
    implementation:
      files_to_create:
        - "apps/api/package.json"
        - "apps/api/tsconfig.json"
        - "apps/api/src/index.ts"
        - "apps/api/src/lib/env.ts"
      commands:
        - "mkdir -p apps/api/src/lib"
        - "cd apps/api && bun init -y"
        - "bun add hono @hono/zod-validator zod"
        - "bun add -D @types/bun"
      validation: "cd apps/api && bun run src/index.ts (should start server)"
      rollback: "rm -rf apps/api"
    acceptance_criteria:
      - "Hono app inicializa na porta configurada"
      - "Health check endpoint /health retorna 200"
      - "Environment variables validadas no startup"
      - "Graceful shutdown implementado"
    deliverables:
      api_entry: |
        import { Hono } from 'hono';
        import { cors } from 'hono/cors';
        import { logger } from 'hono/logger';
        import { prettyJSON } from 'hono/pretty-json';
        import { secureHeaders } from 'hono/secure-headers';
        import { env } from './lib/env';
        
        const app = new Hono();
        
        // Global middleware
        app.use('*', logger());
        app.use('*', prettyJSON());
        app.use('*', secureHeaders());
        app.use('*', cors({
          origin: env.NODE_ENV === 'production' 
            ? ['https://yourdomain.com'] 
            : ['http://localhost:5173'],
          credentials: true,
        }));
        
        // Health check
        app.get('/health', (c) => c.json({ 
          status: 'ok', 
          timestamp: new Date().toISOString() 
        }));
        
        // API routes will be mounted here
        // app.route('/api/v1', apiRoutes);
        
        // Global error handler
        app.onError((err, c) => {
          console.error('Unhandled error:', err);
          return c.json({
            success: false,
            error: {
              code: 'INTERNAL_ERROR',
              message: env.NODE_ENV === 'production' 
                ? 'Internal server error' 
                : err.message,
            },
          }, 500);
        });
        
        // 404 handler
        app.notFound((c) => c.json({
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Route not found',
          },
        }, 404));
        
        console.log(`🚀 Server starting on port ${env.API_PORT}`);
        
        export default {
          port: env.API_PORT,
          fetch: app.fetch,
        };
      env_lib: |
        import { z } from 'zod';
        
        const envSchema = z.object({
          NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
          API_PORT: z.coerce.number().default(3001),
          DATABASE_URL: z.string().url(),
          CLERK_SECRET_KEY: z.string().min(1),
          CLERK_PUBLISHABLE_KEY: z.string().min(1),
        });
        
        const parsed = envSchema.safeParse(process.env);
        
        if (!parsed.success) {
          console.error('❌ Invalid environment variables:');
          console.error(JSON.stringify(parsed.error.flatten().fieldErrors, null, 2));
          process.exit(1);
        }
        
        export const env = parsed.data;
        export type Env = z.infer<typeof envSchema>;

  - id: "AT-004"
    title: "Setup Drizzle ORM with NeonDB"
    phase: 2
    priority: "critical"
    dependencies: ["AT-003"]
    parallel_safe: false
    implementation:
      files_to_create:
        - "apps/api/drizzle.config.ts"
        - "apps/api/src/db/index.ts"
        - "apps/api/src/db/schema/index.ts"
        - "apps/api/src/db/schema/users.ts"
      commands:
        - "cd apps/api && bun add drizzle-orm @neondatabase/serverless"
        - "cd apps/api && bun add -D drizzle-kit"
      validation: "cd apps/api && bun run db:generate"
      rollback: "rm -rf apps/api/src/db apps/api/drizzle.config.ts"
    acceptance_criteria:
      - "Drizzle conecta ao NeonDB via serverless driver"
      - "Schema de users definido com campos padrão"
      - "drizzle.config.ts configurado para migrations"
      - "Scripts db:generate, db:migrate, db:studio funcionando"
    deliverables:
      drizzle_config: |
        import { defineConfig } from 'drizzle-kit';
        
        export default defineConfig({
          schema: './src/db/schema/index.ts',
          out: './drizzle',
          dialect: 'postgresql',
          dbCredentials: {
            url: process.env.DATABASE_URL!,
          },
          verbose: true,
          strict: true,
        });
      db_index: |
        import { neon } from '@neondatabase/serverless';
        import { drizzle } from 'drizzle-orm/neon-http';
        import { env } from '../lib/env';
        import * as schema from './schema';
        
        const sql = neon(env.DATABASE_URL);
        
        export const db = drizzle(sql, { 
          schema,
          logger: env.NODE_ENV === 'development',
        });
        
        export type Database = typeof db;
      users_schema: |
        import { pgTable, uuid, text, timestamp, varchar } from 'drizzle-orm/pg-core';
        
        export const users = pgTable('users', {
          id: uuid('id').defaultRandom().primaryKey(),
          clerkId: varchar('clerk_id', { length: 255 }).notNull().unique(),
          email: varchar('email', { length: 255 }).notNull().unique(),
          name: varchar('name', { length: 255 }),
          imageUrl: text('image_url'),
          createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
          updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
        });
        
        export type UserSelect = typeof users.$inferSelect;
        export type UserInsert = typeof users.$inferInsert;

  - id: "AT-005"
    title: "Implement Clerk authentication middleware"
    phase: 2
    priority: "critical"
    dependencies: ["AT-004"]
    parallel_safe: true
    implementation:
      files_to_create:
        - "apps/api/src/middleware/auth.ts"
        - "apps/api/src/middleware/index.ts"
        - "apps/api/src/lib/clerk.ts"
      commands:
        - "cd apps/api && bun add @clerk/backend"
      validation: "Protected route returns 401 without valid JWT"
      rollback: "rm -rf apps/api/src/middleware"
    acceptance_criteria:
      - "Middleware verifica JWT do Clerk"
      - "User ID extraído e disponível no context"
      - "Rotas protegidas rejeitam requests sem auth"
      - "Error messages claras para auth failures"
    deliverables:
      auth_middleware: |
        import { createMiddleware } from 'hono/factory';
        import { verifyToken } from '@clerk/backend';
        import { env } from '../lib/env';
        import { HTTPException } from 'hono/http-exception';
        
        type AuthContext = {
          Variables: {
            userId: string;
            sessionId: string;
          };
        };
        
        export const authMiddleware = createMiddleware<AuthContext>(async (c, next) => {
          const authHeader = c.req.header('Authorization');
          
          if (!authHeader?.startsWith('Bearer ')) {
            throw new HTTPException(401, { 
              message: 'Missing or invalid authorization header' 
            });
          }
          
          const token = authHeader.slice(7);
          
          try {
            const payload = await verifyToken(token, {
              secretKey: env.CLERK_SECRET_KEY,
            });
            
            if (!payload.sub) {
              throw new HTTPException(401, { message: 'Invalid token payload' });
            }
            
            c.set('userId', payload.sub);
            c.set('sessionId', payload.sid || '');
            
            await next();
          } catch (error) {
            console.error('Auth error:', error);
            throw new HTTPException(401, { message: 'Invalid or expired token' });
          }
        });
        
        // Optional auth - doesn't fail if no token
        export const optionalAuthMiddleware = createMiddleware<AuthContext>(async (c, next) => {
          const authHeader = c.req.header('Authorization');
          
          if (authHeader?.startsWith('Bearer ')) {
            const token = authHeader.slice(7);
            try {
              const payload = await verifyToken(token, {
                secretKey: env.CLERK_SECRET_KEY,
              });
              if (payload.sub) {
                c.set('userId', payload.sub);
                c.set('sessionId', payload.sid || '');
              }
            } catch {
              // Silently continue without auth
            }
          }
          
          await next();
        });

  - id: "AT-006"
    title: "Create user routes with CRUD operations"
    phase: 2
    priority: "high"
    dependencies: ["AT-005"]
    parallel_safe: true
    implementation:
      files_to_create:
        - "apps/api/src/routes/index.ts"
        - "apps/api/src/routes/users.ts"
        - "apps/api/src/services/user.service.ts"
      validation: "bun test apps/api/src/routes/users.test.ts"
      rollback: "rm -rf apps/api/src/routes apps/api/src/services"
    acceptance_criteria:
      - "GET /api/v1/users/me retorna usuário autenticado"
      - "POST /api/v1/users/sync cria/atualiza usuário do Clerk"
      - "PATCH /api/v1/users/me atualiza dados do usuário"
      - "Input validation com Zod em todas as rotas"
    deliverables:
      users_routes: |
        import { Hono } from 'hono';
        import { zValidator } from '@hono/zod-validator';
        import { authMiddleware } from '../middleware/auth';
        import { userService } from '../services/user.service';
        import { createUserSchema, updateUserSchema } from '@repo/shared';
        import { z } from 'zod';
        
        const usersRouter = new Hono();
        
        // Sync user from Clerk (called after signup/signin)
        usersRouter.post(
          '/sync',
          authMiddleware,
          zValidator('json', createUserSchema),
          async (c) => {
            const userId = c.get('userId');
            const data = c.req.valid('json');
            
            const user = await userService.upsertByClerkId(userId, data);
            
            return c.json({ success: true, data: user });
          }
        );
        
        // Get current user
        usersRouter.get('/me', authMiddleware, async (c) => {
          const clerkId = c.get('userId');
          const user = await userService.findByClerkId(clerkId);
          
          if (!user) {
            return c.json({
              success: false,
              error: { code: 'USER_NOT_FOUND', message: 'User not found' },
            }, 404);
          }
          
          return c.json({ success: true, data: user });
        });
        
        // Update current user
        usersRouter.patch(
          '/me',
          authMiddleware,
          zValidator('json', updateUserSchema),
          async (c) => {
            const clerkId = c.get('userId');
            const data = c.req.valid('json');
            
            const user = await userService.updateByClerkId(clerkId, data);
            
            if (!user) {
              return c.json({
                success: false,
                error: { code: 'USER_NOT_FOUND', message: 'User not found' },
              }, 404);
            }
            
            return c.json({ success: true, data: user });
          }
        );
        
        export { usersRouter };
      user_service: |
        import { eq } from 'drizzle-orm';
        import { db } from '../db';
        import { users, UserInsert, UserSelect } from '../db/schema';
        
        export const userService = {
          async findByClerkId(clerkId: string): Promise<UserSelect | null> {
            const result = await db
              .select()
              .from(users)
              .where(eq(users.clerkId, clerkId))
              .limit(1);
            return result[0] ?? null;
          },
          
          async findById(id: string): Promise<UserSelect | null> {
            const result = await db
              .select()
              .from(users)
              .where(eq(users.id, id))
              .limit(1);
            return result[0] ?? null;
          },
          
          async upsertByClerkId(
            clerkId: string,
            data: Omit<UserInsert, 'id' | 'clerkId' | 'createdAt' | 'updatedAt'>
          ): Promise<UserSelect> {
            const existing = await this.findByClerkId(clerkId);
            
            if (existing) {
              const [updated] = await db
                .update(users)
                .set({ ...data, updatedAt: new Date() })
                .where(eq(users.clerkId, clerkId))
                .returning();
              return updated;
            }
            
            const [created] = await db
              .insert(users)
              .values({ clerkId, ...data })
              .returning();
            return created;
          },
          
          async updateByClerkId(
            clerkId: string,
            data: Partial<Omit<UserInsert, 'id' | 'clerkId' | 'createdAt'>>
          ): Promise<UserSelect | null> {
            const [updated] = await db
              .update(users)
              .set({ ...data, updatedAt: new Date() })
              .where(eq(users.clerkId, clerkId))
              .returning();
            return updated ?? null;
          },
        };

  # ═══════════════════════════════════════════════════════════════════════════
  # PHASE 3: FRONTEND (React + TanStack)
  # ═══════════════════════════════════════════════════════════════════════════

  - id: "AT-007"
    title: "Initialize React frontend with Vite and TanStack Router"
    phase: 3
    priority: "critical"
    dependencies: ["AT-002"]
    parallel_safe: true
    implementation:
      files_to_create:
        - "apps/web/package.json"
        - "apps/web/vite.config.ts"
        - "apps/web/tsconfig.json"
        - "apps/web/index.html"
        - "apps/web/src/main.tsx"
        - "apps/web/src/routeTree.gen.ts (auto-generated)"
        - "apps/web/src/routes/__root.tsx"
        - "apps/web/src/routes/index.tsx"
      commands:
        - "cd apps/web && bun create vite . --template react-ts"
        - "bun add @tanstack/react-router @tanstack/react-query"
        - "bun add -D @tanstack/router-plugin @tanstack/router-devtools"
      validation: "cd apps/web && bun run dev (should open localhost:5173)"
      rollback: "rm -rf apps/web"
    acceptance_criteria:
      - "Vite dev server inicia corretamente"
      - "TanStack Router com file-based routing funcionando"
      - "Route tree auto-generated pelo plugin"
      - "DevTools disponíveis em development"
    deliverables:
      vite_config: |
        import { defineConfig } from 'vite';
        import react from '@vitejs/plugin-react';
        import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
        import path from 'path';
        
        export default defineConfig({
          plugins: [
            TanStackRouterVite({
              target: 'react',
              autoCodeSplitting: true,
            }),
            react(),
          ],
          resolve: {
            alias: {
              '@': path.resolve(__dirname, './src'),
            },
          },
          server: {
            port: 5173,
            proxy: {
              '/api': {
                target: 'http://localhost:3001',
                changeOrigin: true,
              },
            },
          },
        });
      main_tsx: |
        import { StrictMode } from 'react';
        import { createRoot } from 'react-dom/client';
        import { RouterProvider, createRouter } from '@tanstack/react-router';
        import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
        import { ClerkProvider } from '@clerk/clerk-react';
        import { routeTree } from './routeTree.gen';
        import './index.css';
        
        const queryClient = new QueryClient({
          defaultOptions: {
            queries: {
              staleTime: 1000 * 60 * 5, // 5 minutes
              retry: 1,
            },
          },
        });
        
        const router = createRouter({
          routeTree,
          context: { queryClient },
          defaultPreload: 'intent',
        });
        
        declare module '@tanstack/react-router' {
          interface Register {
            router: typeof router;
          }
        }
        
        const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
        
        if (!CLERK_KEY) {
          throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY');
        }
        
        createRoot(document.getElementById('root')!).render(
          <StrictMode>
            <ClerkProvider publishableKey={CLERK_KEY}>
              <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
              </QueryClientProvider>
            </ClerkProvider>
          </StrictMode>
        );
      root_route: |
        import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
        import { TanStackRouterDevtools } from '@tanstack/router-devtools';
        import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
        import type { QueryClient } from '@tanstack/react-query';
        
        interface RouterContext {
          queryClient: QueryClient;
        }
        
        export const Route = createRootRouteWithContext<RouterContext>()({
          component: RootComponent,
        });
        
        function RootComponent() {
          return (
            <>
              <Outlet />
              {import.meta.env.DEV && (
                <>
                  <TanStackRouterDevtools position="bottom-right" />
                  <ReactQueryDevtools buttonPosition="bottom-left" />
                </>
              )}
            </>
          );
        }

  - id: "AT-008"
    title: "Setup shadcn/ui and Tailwind CSS"
    phase: 3
    priority: "high"
    dependencies: ["AT-007"]
    parallel_safe: true
    implementation:
      files_to_create:
        - "apps/web/tailwind.config.ts"
        - "apps/web/postcss.config.js"
        - "apps/web/src/index.css"
        - "apps/web/components.json"
        - "apps/web/src/components/ui/button.tsx"
        - "apps/web/src/lib/utils.ts"
      commands:
        - "cd apps/web && bun add tailwindcss postcss autoprefixer"
        - "cd apps/web && bun add class-variance-authority clsx tailwind-merge"
        - "cd apps/web && bun add lucide-react"
        - "cd apps/web && bunx shadcn@latest init"
      validation: "Button component renders with correct styles"
      rollback: "Remove Tailwind config and UI components"
    acceptance_criteria:
      - "Tailwind CSS processando corretamente"
      - "shadcn/ui CLI configurado"
      - "Componentes básicos (Button, Card, Input) instalados"
      - "Dark mode support configurado"
    deliverables:
      utils: |
        import { type ClassValue, clsx } from 'clsx';
        import { twMerge } from 'tailwind-merge';
        
        export function cn(...inputs: ClassValue[]) {
          return twMerge(clsx(inputs));
        }

  - id: "AT-009"
    title: "Implement API client with type-safe fetch"
    phase: 3
    priority: "high"
    dependencies: ["AT-008"]
    parallel_safe: true
    implementation:
      files_to_create:
        - "apps/web/src/lib/api.ts"
        - "apps/web/src/hooks/use-api.ts"
        - "apps/web/src/hooks/use-user.ts"
      validation: "API calls work with proper typing"
      rollback: "rm apps/web/src/lib/api.ts apps/web/src/hooks"
    acceptance_criteria:
      - "API client injeta auth token automaticamente"
      - "Error handling consistente"
      - "Types inferidos das respostas"
      - "TanStack Query hooks para user operations"
    deliverables:
      api_client: |
        import { useAuth } from '@clerk/clerk-react';
        
        const API_URL = import.meta.env.VITE_API_URL || '';
        
        type FetchOptions = RequestInit & {
          params?: Record<string, string>;
        };
        
        export class ApiError extends Error {
          constructor(
            public code: string,
            message: string,
            public status: number,
            public details?: unknown
          ) {
            super(message);
            this.name = 'ApiError';
          }
        }
        
        export function createApiClient(getToken: () => Promise<string | null>) {
          async function request<T>(
            endpoint: string,
            options: FetchOptions = {}
          ): Promise<T> {
            const { params, ...fetchOptions } = options;
            
            let url = `${API_URL}${endpoint}`;
            if (params) {
              const searchParams = new URLSearchParams(params);
              url += `?${searchParams.toString()}`;
            }
            
            const token = await getToken();
            
            const headers: HeadersInit = {
              'Content-Type': 'application/json',
              ...(token && { Authorization: `Bearer ${token}` }),
              ...fetchOptions.headers,
            };
            
            const response = await fetch(url, {
              ...fetchOptions,
              headers,
            });
            
            const data = await response.json();
            
            if (!response.ok || !data.success) {
              throw new ApiError(
                data.error?.code || 'UNKNOWN_ERROR',
                data.error?.message || 'An error occurred',
                response.status,
                data.error?.details
              );
            }
            
            return data.data;
          }
          
          return {
            get: <T>(endpoint: string, options?: FetchOptions) =>
              request<T>(endpoint, { ...options, method: 'GET' }),
            post: <T>(endpoint: string, body?: unknown, options?: FetchOptions) =>
              request<T>(endpoint, {
                ...options,
                method: 'POST',
                body: body ? JSON.stringify(body) : undefined,
              }),
            patch: <T>(endpoint: string, body?: unknown, options?: FetchOptions) =>
              request<T>(endpoint, {
                ...options,
                method: 'PATCH',
                body: body ? JSON.stringify(body) : undefined,
              }),
            delete: <T>(endpoint: string, options?: FetchOptions) =>
              request<T>(endpoint, { ...options, method: 'DELETE' }),
          };
        }
        
        // Hook for using the API client
        export function useApiClient() {
          const { getToken } = useAuth();
          return createApiClient(getToken);
        }
      use_user_hook: |
        import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
        import { useApiClient } from '../lib/api';
        import type { User, UpdateUser } from '@repo/shared';
        
        export const userKeys = {
          all: ['users'] as const,
          me: () => [...userKeys.all, 'me'] as const,
        };
        
        export function useCurrentUser() {
          const api = useApiClient();
          
          return useQuery({
            queryKey: userKeys.me(),
            queryFn: () => api.get<User>('/api/v1/users/me'),
          });
        }
        
        export function useSyncUser() {
          const api = useApiClient();
          const queryClient = useQueryClient();
          
          return useMutation({
            mutationFn: (data: { email: string; name?: string; imageUrl?: string }) =>
              api.post<User>('/api/v1/users/sync', data),
            onSuccess: (user) => {
              queryClient.setQueryData(userKeys.me(), user);
            },
          });
        }
        
        export function useUpdateUser() {
          const api = useApiClient();
          const queryClient = useQueryClient();
          
          return useMutation({
            mutationFn: (data: UpdateUser) =>
              api.patch<User>('/api/v1/users/me', data),
            onSuccess: (user) => {
              queryClient.setQueryData(userKeys.me(), user);
            },
          });
        }

  - id: "AT-010"
    title: "Create authentication pages and protected routes"
    phase: 3
    priority: "high"
    dependencies: ["AT-009"]
    parallel_safe: true
    implementation:
      files_to_create:
        - "apps/web/src/routes/_auth.tsx"
        - "apps/web/src/routes/_auth/sign-in.tsx"
        - "apps/web/src/routes/_auth/sign-up.tsx"
        - "apps/web/src/routes/_protected.tsx"
        - "apps/web/src/routes/_protected/dashboard.tsx"
        - "apps/web/src/components/layout/header.tsx"
        - "apps/web/src/components/layout/sidebar.tsx"
      validation: "Auth flow works end-to-end"
      rollback: "rm -rf apps/web/src/routes/_auth apps/web/src/routes/_protected"
    acceptance_criteria:
      - "Sign in/up pages com Clerk components"
      - "Protected routes redirect para sign-in"
      - "Dashboard acessível após autenticação"
      - "User sync automático após sign-in"

  # ═══════════════════════════════════════════════════════════════════════════
  # PHASE 4: INTEGRATION & POLISH
  # ═══════════════════════════════════════════════════════════════════════════

  - id: "AT-011"
    title: "Connect all routes and finalize API structure"
    phase: 4
    priority: "high"
    dependencies: ["AT-006", "AT-010"]
    parallel_safe: false
    implementation:
      files_to_modify:
        - "apps/api/src/index.ts"
        - "apps/api/src/routes/index.ts"
      validation: "Full auth flow works: signup → sync → dashboard"
      rollback: "Revert route changes"
    acceptance_criteria:
      - "Todas as rotas montadas corretamente"
      - "CORS permitindo frontend"
      - "Error handling consistente"
      - "Logging estruturado"

  - id: "AT-012"
    title: "Setup testing infrastructure"
    phase: 4
    priority: "medium"
    dependencies: ["AT-011"]
    parallel_safe: true
    implementation:
      files_to_create:
        - "apps/api/vitest.config.ts"
        - "apps/api/src/__tests__/setup.ts"
        - "apps/api/src/__tests__/users.test.ts"
        - "apps/web/vitest.config.ts"
        - "apps/web/src/__tests__/setup.ts"
      commands:
        - "cd apps/api && bun add -D vitest @vitest/coverage-v8"
        - "cd apps/web && bun add -D vitest @testing-library/react @testing-library/jest-dom jsdom"
      validation: "bun run test (all tests pass)"
      rollback: "Remove test configs and files"
    acceptance_criteria:
      - "Vitest configurado em ambos apps"
      - "Testes unitários para user service"
      - "Testes de integração para rotas"
      - "Coverage report disponível"

  - id: "AT-013"
    title: "Create Railway deployment configuration"
    phase: 4
    priority: "high"
    dependencies: ["AT-011"]
    parallel_safe: true
    implementation:
      files_to_create:
        - "railway.toml"
        - "apps/api/Dockerfile"
        - "apps/web/Dockerfile"
        - ".github/workflows/ci.yml"
      validation: "Docker builds successfully"
      rollback: "Remove deployment configs"
    acceptance_criteria:
      - "railway.toml com configuração multi-service"
      - "Dockerfiles otimizados para Bun"
      - "CI pipeline para lint, test, build"
      - "Environment variables documentadas"
    deliverables:
      railway_toml: |
        [build]
        builder = "dockerfile"
        
        [deploy]
        healthcheckPath = "/health"
        healthcheckTimeout = 30
        restartPolicyType = "on-failure"
        restartPolicyMaxRetries = 5
      api_dockerfile: |
        FROM oven/bun:1 AS base
        WORKDIR /app
        
        # Install dependencies
        FROM base AS deps
        COPY package.json bun.lockb ./
        COPY apps/api/package.json ./apps/api/
        COPY packages/shared/package.json ./packages/shared/
        RUN bun install --frozen-lockfile
        
        # Build
        FROM base AS builder
        COPY --from=deps /app/node_modules ./node_modules
        COPY . .
        RUN bun run --filter api build
        
        # Production
        FROM base AS runner
        COPY --from=builder /app/apps/api/dist ./dist
        COPY --from=builder /app/node_modules ./node_modules
        
        ENV NODE_ENV=production
        EXPOSE 3001
        
        CMD ["bun", "run", "dist/index.js"]

  # ═══════════════════════════════════════════════════════════════════════════
  # PHASE 5: DOCUMENTATION & FINALIZATION
  # ═══════════════════════════════════════════════════════════════════════════

  - id: "AT-014"
    title: "Create comprehensive documentation"
    phase: 5
    priority: "medium"
    dependencies: ["AT-013"]
    parallel_safe: true
    implementation:
      files_to_create:
        - "README.md"
        - "docs/SETUP.md"
        - "docs/ARCHITECTURE.md"
        - "docs/DEPLOYMENT.md"
        - "docs/API.md"
      validation: "All docs render correctly in GitHub"
      rollback: "Remove docs folder"
    acceptance_criteria:
      - "README com quick start"
      - "Setup guide completo"
      - "Architecture decision records"
      - "API documentation"
      - "Deployment guide para Railway"

  - id: "AT-015"
    title: "Final validation and cleanup"
    phase: 5
    priority: "critical"
    dependencies: ["AT-014"]
    parallel_safe: false
    implementation:
      commands:
        - "bun run lint"
        - "bun run typecheck"
        - "bun run test"
        - "bun run build"
      validation: "All commands pass with zero errors"
      rollback: "N/A - final validation"
    acceptance_criteria:
      - "Zero lint errors"
      - "Zero TypeScript errors"
      - "All tests passing"
      - "Build completa sem warnings"
      - "Docker build successful"

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 6: VALIDATION GATES
# ─────────────────────────────────────────────────────────────────────────────
validation:
  automated:
    - id: "VT-001"
      command: "bun run build"
      expected: "Exit code 0, builds for all workspaces"
    - id: "VT-002"
      command: "bun run lint"
      expected: "No errors or warnings"
    - id: "VT-003"
      command: "bun run typecheck"
      expected: "No TypeScript errors"
    - id: "VT-004"
      command: "bun run test"
      expected: "All tests pass"
    - id: "VT-005"
      command: "docker build -f apps/api/Dockerfile ."
      expected: "Image builds successfully"

  manual_checklist:
    - "[ ] Auth flow completo: signup → verify → dashboard"
    - "[ ] User data persiste no NeonDB"
    - "[ ] Protected routes bloqueiam acesso não autenticado"
    - "[ ] API retorna errors consistentes"
    - "[ ] Dark mode funciona corretamente"
    - "[ ] Mobile responsiveness OK"

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 7: OUTPUT CONTRACT
# ─────────────────────────────────────────────────────────────────────────────
output:
  format: "Monorepo completo, production-ready, clone-and-customize"
  
  success_definition: |
    O boilerplate está completo quando:
    1. `git clone && bun install && bun run dev` funciona out-of-box
    2. Auth flow end-to-end funcional com Clerk
    3. CRUD operations funcionando com NeonDB
    4. Frontend reativo com TanStack Query
    5. Deploy para Railway com um comando
    6. Zero TypeScript errors, zero lint warnings
    7. Documentação permite onboarding em < 30 minutos

  repository_structure: |
    saas-hono-drizzle-boilerplate/
    ├── apps/
    │   ├── api/          # Hono + Drizzle backend
    │   └── web/          # React + TanStack frontend
    ├── packages/
    │   └── shared/       # Shared types and validators
    ├── docs/             # Documentation
    ├── .github/          # CI workflows
    ├── turbo.json
    ├── package.json
    └── README.md