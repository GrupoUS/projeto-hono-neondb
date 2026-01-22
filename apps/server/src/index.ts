import { trpcServer } from "@hono/trpc-server";
import { createContext } from "@my-better-t-app/api/context";
import { appRouter } from "@my-better-t-app/api/routers/index";
import { env } from "@my-better-t-app/env/server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { apiRouter } from "./routes";

const app = new Hono();

// Global middleware
app.use(logger());
app.use("*", secureHeaders());
app.use(
	"/*",
	cors({
		origin: env.CORS_ORIGIN,
		allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
		credentials: true,
	})
);

// Health check endpoint
app.get("/health", (c) => {
	return c.json({
		status: "ok",
		timestamp: new Date().toISOString(),
		environment: env.NODE_ENV,
	});
});

// REST API routes
app.route("/api/v1", apiRouter);

// tRPC routes (existing)
app.use(
	"/trpc/*",
	trpcServer({
		router: appRouter,
		createContext: (_opts, context) => {
			return createContext({ context });
		},
	})
);

// Root route
app.get("/", (c) => {
	return c.json({
		message: "SaaS API Boilerplate",
		docs: "/health",
		api: "/api/v1",
		trpc: "/trpc",
	});
});

// Global error handler
app.onError((err, c) => {
	console.error("Unhandled error:", err);
	return c.json(
		{
			success: false,
			error: {
				code: "INTERNAL_ERROR",
				message:
					env.NODE_ENV === "production" ? "Internal server error" : err.message,
			},
		},
		500
	);
});

// 404 handler
app.notFound((c) =>
	c.json(
		{
			success: false,
			error: {
				code: "NOT_FOUND",
				message: "Route not found",
			},
		},
		404
	)
);

export default app;
