"use client";

import { useSettings } from "../hooks/useSettings";
import { useUpdateSettings } from "../hooks/useUpdateSettings";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import Loader from "@/components/shared/Loader";

export default function UserPreferences() {
  const { data: settings, isLoading } = useSettings();
  const updateSettings = useUpdateSettings();

  const handleSelectChange = async (key: "language" | "timezone" | "dateFormat", value: string) => {
    if (!settings) return;
    try {
      await updateSettings.mutateAsync({
        ...settings,
        [key]: value,
      });
      toast.success("User preferences updated successfully");
    } catch {
      toast.error("Failed to update preferences");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="rounded-3xl border bg-card p-6 shadow-sm space-y-6">
      <div>
        <h2 className="text-xl font-bold">User Preferences</h2>
        <p className="text-sm text-muted-foreground">Customize localization parameters for school session contexts</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 max-w-4xl">
        <div className="space-y-2">
          <Label htmlFor="prefLanguage">System Language</Label>
          <select
            id="prefLanguage"
            value={settings?.language || "English"}
            onChange={(e) => handleSelectChange("language", e.target.value)}
            disabled={updateSettings.isPending}
            className="w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
          >
            <option value="English">English (US)</option>
            <option value="Spanish">Español</option>
            <option value="French">Français</option>
            <option value="Hindi">हिन्दी (Hindi)</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="prefTimezone">Timezone</Label>
          <select
            id="prefTimezone"
            value={settings?.timezone || "Asia/Kolkata"}
            onChange={(e) => handleSelectChange("timezone", e.target.value)}
            disabled={updateSettings.isPending}
            className="w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
          >
            <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
            <option value="UTC">UTC (Coordinated Universal Time)</option>
            <option value="America/New_York">America/New_York (EST)</option>
            <option value="Europe/London">Europe/London (GMT)</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="prefDateFormat">Date Format</Label>
          <select
            id="prefDateFormat"
            value={settings?.dateFormat || "DD/MM/YYYY"}
            onChange={(e) => handleSelectChange("dateFormat", e.target.value)}
            disabled={updateSettings.isPending}
            className="w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
          >
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
      </div>
    </div>
  );
}
