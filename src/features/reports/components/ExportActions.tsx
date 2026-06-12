import { Button } from "@/components/ui/button";

export default function ExportActions() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button>Export PDF</Button>

      <Button variant="outline">Export Excel</Button>

      <Button variant="outline">Export CSV</Button>
    </div>
  );
}
