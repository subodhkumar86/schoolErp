import NoticesHeader from "@/features/notices/components/NoticesHeader";
import NoticesStats from "@/features/notices/components/NoticesStats";
import NoticesTable from "@/features/notices/components/NoticesTable";

export default function NoticesPage() {
  return (
    <div className="space-y-6">
      <NoticesHeader />
      <NoticesStats />
      <NoticesTable />
    </div>
  );
}
