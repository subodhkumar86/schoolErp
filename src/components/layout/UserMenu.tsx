"use client";

import { useRouter } from "next/navigation";
import { useMe } from "@/features/auth/hooks/useMe";
import { useLogout } from "@/features/auth/hooks/useLogout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function UserMenu() {
  const { user } = useMe();
  const logoutMutation = useLogout();
  const router = useRouter();

  if (!user) return null;

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      router.push("/login");
    } catch {
      // Handled in hook
    }
  };

  const initial = user.username ? user.username[0].toUpperCase() : "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2 hover:bg-muted">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
            {initial}
          </div>

          <div className="hidden md:block text-left">
            <p className="text-sm font-semibold capitalize">{user.username}</p>
            <p className="text-xs text-muted-foreground">{user.role}</p>
          </div>

          <ChevronDown className="hidden h-4 w-4 md:block text-muted-foreground" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48 rounded-xl">
        <DropdownMenuItem onClick={() => router.push("/settings")}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/settings")}>
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout} className="text-destructive font-medium">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
