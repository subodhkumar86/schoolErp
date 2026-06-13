"use client";

import { useSettings } from "../hooks/useSettings";
import { useUpdateSettings } from "../hooks/useUpdateSettings";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import Loader from "@/components/shared/Loader";

export default function NotificationSettings() {
  const { data: settings, isLoading } = useSettings();
  const updateSettings = useUpdateSettings();

  const handleToggle = async (key: "emailNotifications" | "smsNotifications" | "pushNotifications", value: boolean) => {
    if (!settings) return;
    try {
      await updateSettings.mutateAsync({
        ...settings,
        [key]: value,
      });
      toast.success("Notification preferences updated");
    } catch {
      toast.error("Failed to update notification settings");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="rounded-3xl border bg-card p-6 shadow-sm space-y-4">
      <div>
        <h2 className="text-xl font-bold">Notification Settings</h2>
        <p className="text-sm text-muted-foreground">Select preferred notification alerts dispatch channels</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <input
            id="emailNotif"
            type="checkbox"
            checked={settings?.emailNotifications ?? true}
            onChange={(e) => handleToggle("emailNotifications", e.target.checked)}
            disabled={updateSettings.isPending}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <Label htmlFor="emailNotif" className="cursor-pointer font-medium text-sm">
            Enable Email Notifications
          </Label>
        </div>

        <div className="flex items-center gap-3">
          <input
            id="smsNotif"
            type="checkbox"
            checked={settings?.smsNotifications ?? true}
            onChange={(e) => handleToggle("smsNotifications", e.target.checked)}
            disabled={updateSettings.isPending}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <Label htmlFor="smsNotif" className="cursor-pointer font-medium text-sm">
            Enable SMS Text Notifications
          </Label>
        </div>

        <div className="flex items-center gap-3">
          <input
            id="pushNotif"
            type="checkbox"
            checked={settings?.pushNotifications ?? false}
            onChange={(e) => handleToggle("pushNotifications", e.target.checked)}
            disabled={updateSettings.isPending}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <Label htmlFor="pushNotif" className="cursor-pointer font-medium text-sm">
            Enable Push Browser Notifications
          </Label>
        </div>
      </div>
    </div>
  );
}
