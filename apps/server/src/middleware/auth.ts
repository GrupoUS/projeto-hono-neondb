import { verifyToken } from "@clerk/backend";
import { env } from "@my-better-t-app/env/server";
import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";

// ─────────────────────────────────────────────────────────────────────────────
// Auth Context Types
// ─────────────────────────────────────────────────────────────────────────────

export type AuthVariables = {
	userId: string;
	sessionId: string;
};

// ─────────────────────────────────────────────────────────────────────────────
// Auth Middleware - Verifies Clerk JWT
// ─────────────────────────────────────────────────────────────────────────────

export const authMiddleware = createMiddleware<{
	Variables: AuthVariables;
}>(async (c, next) => {
	const authHeader = c.req.header("Authorization");

	if (!authHeader?.startsWith("Bearer ")) {
		throw new HTTPException(401, {
			message: "Missing or invalid authorization header",
		});
	}

	const token = authHeader.slice(7);

	try {
		const payload = await verifyToken(token, {
			secretKey: env.CLERK_SECRET_KEY,
		});

		if (!payload.sub) {
			throw new HTTPException(401, { message: "Invalid token payload" });
		}

		c.set("userId", payload.sub);
		c.set("sessionId", payload.sid ?? "");

		await next();
	} catch (error) {
		console.error("Auth error:", error);
		throw new HTTPException(401, { message: "Invalid or expired token" });
	}
});

// ─────────────────────────────────────────────────────────────────────────────
// Optional Auth Middleware - Doesn't fail if no token
// ─────────────────────────────────────────────────────────────────────────────

export const optionalAuthMiddleware = createMiddleware<{
	Variables: Partial<AuthVariables>;
}>(async (c, next) => {
	const authHeader = c.req.header("Authorization");

	if (authHeader?.startsWith("Bearer ")) {
		const token = authHeader.slice(7);
		try {
			const payload = await verifyToken(token, {
				secretKey: env.CLERK_SECRET_KEY,
			});
			if (payload.sub) {
				c.set("userId", payload.sub);
				c.set("sessionId", payload.sid ?? "");
			}
		} catch {
			// Silently continue without auth
		}
	}

	await next();
});
