import { useAuth } from "@clerk/clerk-react";
import { env } from "@my-better-t-app/env/web";

// ─────────────────────────────────────────────────────────────────────────────
// REST API Client - For non-tRPC endpoints
// ─────────────────────────────────────────────────────────────────────────────

const API_URL = env.VITE_SERVER_URL;

type FetchOptions = RequestInit & {
	params?: Record<string, string>;
};

export class ApiError extends Error {
	readonly code: string;
	readonly status: number;
	readonly details?: unknown;

	constructor(
		code: string,
		message: string,
		status: number,
		details?: unknown
	) {
		super(message);
		this.name = "ApiError";
		this.code = code;
		this.status = status;
		this.details = details;
	}
}

export function createApiClient(getToken: () => Promise<string | null>) {
	async function request<T>(
		endpoint: string,
		options: FetchOptions = {}
	): Promise<T> {
		const { params, ...fetchOptions } = options;

		let url = `${API_URL}${endpoint}`;
		if (params) {
			const searchParams = new URLSearchParams(params);
			url += `?${searchParams.toString()}`;
		}

		const token = await getToken();

		const headers: HeadersInit = {
			"Content-Type": "application/json",
			...(token && { Authorization: `Bearer ${token}` }),
			...fetchOptions.headers,
		};

		const response = await fetch(url, {
			...fetchOptions,
			headers,
		});

		const data = await response.json();

		if (!(response.ok && data.success)) {
			throw new ApiError(
				data.error?.code || "UNKNOWN_ERROR",
				data.error?.message || "An error occurred",
				response.status,
				data.error?.details
			);
		}

		return data.data;
	}

	return {
		get: <T>(endpoint: string, options?: FetchOptions) =>
			request<T>(endpoint, { ...options, method: "GET" }),
		post: <T>(endpoint: string, body?: unknown, options?: FetchOptions) =>
			request<T>(endpoint, {
				...options,
				method: "POST",
				body: body ? JSON.stringify(body) : undefined,
			}),
		patch: <T>(endpoint: string, body?: unknown, options?: FetchOptions) =>
			request<T>(endpoint, {
				...options,
				method: "PATCH",
				body: body ? JSON.stringify(body) : undefined,
			}),
		delete: <T>(endpoint: string, options?: FetchOptions) =>
			request<T>(endpoint, { ...options, method: "DELETE" }),
	};
}

/**
 * Hook for using the REST API client with Clerk auth
 */
export function useApiClient() {
	const { getToken } = useAuth();
	return createApiClient(getToken);
}
