import { Button } from "@/components/ui/button";

export default function ThemeSettings() {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">Theme Settings</h2>

      <div className="flex gap-3">
        <Button>Light</Button>
        <Button variant="outline">Dark</Button>
      </div>
    </div>
  );
}
