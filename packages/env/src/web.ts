import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	clientPrefix: "VITE_",
	client: {
		VITE_SERVER_URL: z.string().url(),
		VITE_CLERK_PUBLISHABLE_KEY: z
			.string()
			.min(1, "VITE_CLERK_PUBLISHABLE_KEY é obrigatório"),
	},
	runtimeEnv: (import.meta as unknown as { env: Record<string, string> }).env,
	emptyStringAsUndefined: true,
});
