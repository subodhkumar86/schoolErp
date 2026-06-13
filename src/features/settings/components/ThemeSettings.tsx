"use client";

import { useSettings } from "../hooks/useSettings";
import { useUpdateSettings } from "../hooks/useUpdateSettings";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Loader from "@/components/shared/Loader";

export default function ThemeSettings() {
  const { data: settings, isLoading } = useSettings();
  const updateSettings = useUpdateSettings();

  const handleThemeChange = async (theme: "light" | "dark") => {
    if (!settings) return;
    try {
      await updateSettings.mutateAsync({
        ...settings,
        theme,
      });
      toast.success(`Theme switched to ${theme}`);
    } catch {
      toast.error("Failed to update theme");
    }
  };

  if (isLoading) return <Loader />;

  const currentTheme = settings?.theme || "light";

  return (
    <div className="rounded-3xl border bg-card p-6 shadow-sm space-y-4">
      <div>
        <h2 className="text-xl font-bold">Theme Settings</h2>
        <p className="text-sm text-muted-foreground">Select preferred interface layout style color theme</p>
      </div>

      <div className="flex gap-3">
        <Button
          variant={currentTheme === "light" ? "default" : "outline"}
          onClick={() => handleThemeChange("light")}
          disabled={updateSettings.isPending}
        >
          Light Mode
        </Button>
        <Button
          variant={currentTheme === "dark" ? "default" : "outline"}
          onClick={() => handleThemeChange("dark")}
          disabled={updateSettings.isPending}
        >
          Dark Mode
        </Button>
      </div>
    </div>
  );
}
