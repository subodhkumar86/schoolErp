import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../store/useAuthStore";

export function useLogin() {
  const setUser = useAuthStore((state) => state.setUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: { identifier: string; password: string; rememberMe?: boolean }) => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to sign in");
      }
      return data;
    },
    onSuccess: (data) => {
      setUser(data.user);
      queryClient.setQueryData(["me"], { user: data.user });
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
