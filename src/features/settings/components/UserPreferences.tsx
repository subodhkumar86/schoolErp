export default function UserPreferences() {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">User Preferences</h2>

      <div className="space-y-2">
        <p>Language: English</p>
        <p>Timezone: Asia/Kolkata</p>
        <p>Date Format: DD/MM/YYYY</p>
      </div>
    </div>
  );
}
