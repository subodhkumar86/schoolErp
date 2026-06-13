import TimetableHeader from "@/features/timetable/components/TimetableHeader";
import TimetableStats from "@/features/timetable/components/TimetableStats";
import TimetableTable from "@/features/timetable/components/TimetableTable";

export default function TimetablePage() {
  return (
    <div className="space-y-6">
      <TimetableHeader />

      <TimetableStats />

      <TimetableTable />
    </div>
  );
}
