import "dotenv/config";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().min(1),
		CORS_ORIGIN: z.string().url(),
		NODE_ENV: z
			.enum(["development", "production", "test"])
			.default("development"),
		// Clerk Authentication
		CLERK_SECRET_KEY: z.string().min(1, "CLERK_SECRET_KEY é obrigatório"),
		CLERK_PUBLISHABLE_KEY: z
			.string()
			.min(1, "CLERK_PUBLISHABLE_KEY é obrigatório"),
		// API Configuration
		API_PORT: z.coerce.number().default(3000),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
