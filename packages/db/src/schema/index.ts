import {
	index,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

// ─────────────────────────────────────────────────────────────────────────────
// Users Table
// ─────────────────────────────────────────────────────────────────────────────

export const users = pgTable(
	"users",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		clerkId: varchar("clerk_id", { length: 255 }).notNull().unique(),
		email: varchar("email", { length: 255 }).notNull().unique(),
		name: varchar("name", { length: 255 }),
		imageUrl: text("image_url"),
		createdAt: timestamp("created_at", { withTimezone: true })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.defaultNow()
			.notNull(),
	},
	(table) => [
		index("users_clerk_id_idx").on(table.clerkId),
		index("users_email_idx").on(table.email),
	]
);

// Type inference for Drizzle
export type UserSelect = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;
