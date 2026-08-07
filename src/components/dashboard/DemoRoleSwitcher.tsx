"use client";

import { useState } from "react";
import { useMe } from "@/features/auth/hooks/useMe";
import { toast } from "sonner";
import { ShieldAlert, Loader2 } from "lucide-react";

const ROLES = [
  { value: "Admin", label: "Admin View" },
  { value: "Teacher", label: "Teacher View" },
  { value: "Student", label: "Student View" },
  { value: "Parent", label: "Parent View" },
  { value: "Accountant", label: "Accountant View" },
  { value: "Librarian", label: "Librarian View" },
  { value: "Super Admin", label: "Super Admin View" },
];

export default function DemoRoleSwitcher() {
  const { user } = useMe();
  const [switching, setSwitching] = useState(false);

  if (!user) return null;

  const handleRoleChange = async (role: string) => {
    if (user.role === role) return;

    setSwitching(true);
    try {
      const response = await fetch("/api/auth/impersonate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to switch role.");
      }

      toast.success(data.message || `Switched view to ${role}!`);
      // Redirect to dashboard and force refresh page to reload context and roles
      window.location.href = "/dashboard";
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message || "Target role account is not seeded or does not exist.");
    } finally {
      setSwitching(false);
    }
  };

  return (
    <div className="flex items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50/40 p-1 dark:border-blue-900/40 dark:bg-blue-950/20 text-xs">
      <span className="hidden sm:inline-flex items-center gap-1 font-bold text-blue-750 dark:text-blue-400 px-2 uppercase tracking-wide text-[10px]">
        <ShieldAlert className="h-3.5 w-3.5" />
        Demo Swapper
      </span>
      <select
        value={user.role}
        disabled={switching}
        onChange={(e) => handleRoleChange(e.target.value)}
        className="rounded-lg bg-white border border-blue-200/50 px-2.5 py-1.5 font-bold text-slate-700 focus:outline-none dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200 cursor-pointer text-xs transition-colors"
      >
        {ROLES.map((r) => (
          <option key={r.value} value={r.value}>
            {r.label}
          </option>
        ))}
      </select>
      {switching && <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-600 dark:text-blue-400" />}
    </div>
  );
}
