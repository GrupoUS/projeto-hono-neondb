import { db } from "@my-better-t-app/db";
import {
	type UserInsert,
	type UserSelect,
	users,
} from "@my-better-t-app/db/schema";
import { eq } from "drizzle-orm";

// ─────────────────────────────────────────────────────────────────────────────
// User Service - Database operations for users
// ─────────────────────────────────────────────────────────────────────────────

export const userService = {
	/**
	 * Find user by Clerk ID
	 */
	async findByClerkId(clerkId: string): Promise<UserSelect | null> {
		const result = await db
			.select()
			.from(users)
			.where(eq(users.clerkId, clerkId))
			.limit(1);
		return result[0] ?? null;
	},

	/**
	 * Find user by internal UUID
	 */
	async findById(id: string): Promise<UserSelect | null> {
		const result = await db
			.select()
			.from(users)
			.where(eq(users.id, id))
			.limit(1);
		return result[0] ?? null;
	},

	/**
	 * Find user by email
	 */
	async findByEmail(email: string): Promise<UserSelect | null> {
		const result = await db
			.select()
			.from(users)
			.where(eq(users.email, email))
			.limit(1);
		return result[0] ?? null;
	},

	/**
	 * Upsert user by Clerk ID (create or update)
	 */
	async upsertByClerkId(
		clerkId: string,
		data: Omit<UserInsert, "id" | "clerkId" | "createdAt" | "updatedAt">
	): Promise<UserSelect> {
		const existing = await this.findByClerkId(clerkId);

		if (existing) {
			const [updated] = await db
				.update(users)
				.set({ ...data, updatedAt: new Date() })
				.where(eq(users.clerkId, clerkId))
				.returning();
			// biome-ignore lint/style/noNonNullAssertion: update always returns when matching exists
			return updated!;
		}

		const [created] = await db
			.insert(users)
			.values({ clerkId, ...data })
			.returning();
		// biome-ignore lint/style/noNonNullAssertion: insert always returns created record
		return created!;
	},

	/**
	 * Update user by Clerk ID
	 */
	async updateByClerkId(
		clerkId: string,
		data: Partial<Omit<UserInsert, "id" | "clerkId" | "createdAt">>
	): Promise<UserSelect | null> {
		const [updated] = await db
			.update(users)
			.set({ ...data, updatedAt: new Date() })
			.where(eq(users.clerkId, clerkId))
			.returning();
		return updated ?? null;
	},

	/**
	 * Delete user by Clerk ID
	 */
	async deleteByClerkId(clerkId: string): Promise<boolean> {
		const result = await db
			.delete(users)
			.where(eq(users.clerkId, clerkId))
			.returning();
		return result.length > 0;
	},
};
