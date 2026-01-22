import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { type AuthVariables, authMiddleware } from "../middleware";
import { userService } from "../services";

// ─────────────────────────────────────────────────────────────────────────────
// User Routes - REST API for user management
// ─────────────────────────────────────────────────────────────────────────────

const usersRouter = new Hono<{ Variables: AuthVariables }>();

// Validation schemas
const syncUserSchema = z.object({
	email: z.string().email("Email inválido"),
	name: z.string().nullable().optional(),
	imageUrl: z.string().url().nullable().optional(),
});

const updateUserSchema = z.object({
	name: z.string().min(1).nullable().optional(),
	imageUrl: z.string().url().nullable().optional(),
});

// POST /sync - Create or update user from Clerk
usersRouter.post(
	"/sync",
	authMiddleware,
	zValidator("json", syncUserSchema),
	async (c) => {
		const clerkId = c.get("userId");
		const data = c.req.valid("json");

		const user = await userService.upsertByClerkId(clerkId, data);

		return c.json({ success: true, data: user });
	}
);

// GET /me - Get current authenticated user
usersRouter.get("/me", authMiddleware, async (c) => {
	const clerkId = c.get("userId");
	const user = await userService.findByClerkId(clerkId);

	if (!user) {
		return c.json(
			{
				success: false,
				error: { code: "USER_NOT_FOUND", message: "Usuário não encontrado" },
			},
			404
		);
	}

	return c.json({ success: true, data: user });
});

// PATCH /me - Update current user
usersRouter.patch(
	"/me",
	authMiddleware,
	zValidator("json", updateUserSchema),
	async (c) => {
		const clerkId = c.get("userId");
		const data = c.req.valid("json");

		const user = await userService.updateByClerkId(clerkId, data);

		if (!user) {
			return c.json(
				{
					success: false,
					error: { code: "USER_NOT_FOUND", message: "Usuário não encontrado" },
				},
				404
			);
		}

		return c.json({ success: true, data: user });
	}
);

// DELETE /me - Delete current user
usersRouter.delete("/me", authMiddleware, async (c) => {
	const clerkId = c.get("userId");
	const deleted = await userService.deleteByClerkId(clerkId);

	if (!deleted) {
		return c.json(
			{
				success: false,
				error: { code: "USER_NOT_FOUND", message: "Usuário não encontrado" },
			},
			404
		);
	}

	return c.json({ success: true, data: { deleted: true } });
});

export { usersRouter };
