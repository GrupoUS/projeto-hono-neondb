import { z } from "zod";

// ─────────────────────────────────────────────────────────────────────────────
// API Response Schemas
// ─────────────────────────────────────────────────────────────────────────────

export const apiSuccessSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
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

// Type inference
export type ApiSuccess<T> = { success: true; data: T };
export type ApiError = z.infer<typeof apiErrorSchema>;
export type Paginated<T> = {
	items: T[];
	total: number;
	page: number;
	pageSize: number;
	hasMore: boolean;
};
