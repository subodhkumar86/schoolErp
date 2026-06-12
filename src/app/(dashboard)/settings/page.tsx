import SchoolProfileForm from "@/features/settings/components/SchoolProfileForm";
import ThemeSettings from "@/features/settings/components/ThemeSettings";
import NotificationSettings from "@/features/settings/components/NotificationSettings";
import UserPreferences from "@/features/settings/components/UserPreferences";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>

        <p className="text-muted-foreground">Configure your ERP system</p>
      </div>

      <SchoolProfileForm />

      <div className="grid gap-6 lg:grid-cols-2">
        <ThemeSettings />
        <NotificationSettings />
      </div>

      <UserPreferences />
    </div>
  );
}
