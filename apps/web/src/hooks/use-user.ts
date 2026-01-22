import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../lib/api";

// ─────────────────────────────────────────────────────────────────────────────
// User Types
// ─────────────────────────────────────────────────────────────────────────────

interface User {
	id: string;
	clerkId: string;
	email: string;
	name: string | null;
	imageUrl: string | null;
	createdAt: string;
	updatedAt: string;
}

interface UpdateUser {
	name?: string | null;
	imageUrl?: string | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Query Keys
// ─────────────────────────────────────────────────────────────────────────────

export const userKeys = {
	all: ["users"] as const,
	me: () => [...userKeys.all, "me"] as const,
};

// ─────────────────────────────────────────────────────────────────────────────
// Hooks
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get the current authenticated user
 */
export function useCurrentUser() {
	const api = useApiClient();

	return useQuery({
		queryKey: userKeys.me(),
		queryFn: () => api.get<User>("/api/v1/users/me"),
		retry: false,
	});
}

/**
 * Sync user data from Clerk to database (call after sign-in/sign-up)
 */
export function useSyncUser() {
	const api = useApiClient();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: { email: string; name?: string; imageUrl?: string }) =>
			api.post<User>("/api/v1/users/sync", data),
		onSuccess: (user) => {
			queryClient.setQueryData(userKeys.me(), user);
		},
	});
}

/**
 * Update current user profile
 */
export function useUpdateUser() {
	const api = useApiClient();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: UpdateUser) => api.patch<User>("/api/v1/users/me", data),
		onSuccess: (user) => {
			queryClient.setQueryData(userKeys.me(), user);
		},
	});
}

/**
 * Delete current user account
 */
export function useDeleteUser() {
	const api = useApiClient();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => api.delete<{ deleted: boolean }>("/api/v1/users/me"),
		onSuccess: () => {
			queryClient.removeQueries({ queryKey: userKeys.me() });
		},
	});
}
