import { Hono } from "hono";
import { usersRouter } from "./users";

// ─────────────────────────────────────────────────────────────────────────────
// API Routes - /api/v1
// ─────────────────────────────────────────────────────────────────────────────

const apiRouter = new Hono();

// Mount user routes
apiRouter.route("/users", usersRouter);

export { apiRouter };
