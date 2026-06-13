import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../store/useAuthStore";

export function useLogout() {
  const logout = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to log out");
      }
      return data;
    },
    onSuccess: () => {
      logout();
      queryClient.setQueryData(["me"], null);
      queryClient.removeQueries();
    },
  });
}
