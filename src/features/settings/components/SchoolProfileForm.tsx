import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SchoolProfileForm() {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">School Profile</h2>

      <div className="space-y-4">
        <Input defaultValue="EduFlow Public School" />
        <Input defaultValue="New Delhi" />
        <Input defaultValue="info@eduflow.com" />

        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
