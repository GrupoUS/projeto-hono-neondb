import { z } from "zod";

// ─────────────────────────────────────────────────────────────────────────────
// User Schemas
// ─────────────────────────────────────────────────────────────────────────────

export const userSchema = z.object({
	id: z.string().uuid(),
	clerkId: z.string(),
	email: z.string().email(),
	name: z.string().nullable(),
	imageUrl: z.string().url().nullable(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

export const createUserSchema = z.object({
	clerkId: z.string().min(1, "Clerk ID é obrigatório"),
	email: z.string().email("Email inválido"),
	name: z.string().nullable().optional(),
	imageUrl: z.string().url().nullable().optional(),
});

export const updateUserSchema = z.object({
	name: z.string().min(1).nullable().optional(),
	imageUrl: z.string().url().nullable().optional(),
});

// Type inference
export type User = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
