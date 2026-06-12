export default function NotificationSettings() {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">Notification Settings</h2>

      <div className="space-y-2">
        <p>Email Notifications: Enabled</p>
        <p>SMS Notifications: Enabled</p>
        <p>Push Notifications: Disabled</p>
      </div>
    </div>
  );
}
