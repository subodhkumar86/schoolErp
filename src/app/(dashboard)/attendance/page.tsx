import AttendanceHeader from "@/features/attendance/components/AttendanceHeader";
import AttendanceStats from "@/features/attendance/components/AttendanceStats";
import AttendanceTabs from "@/features/attendance/components/AttendanceTabs";

export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <AttendanceHeader />

      <AttendanceStats />

      <AttendanceTabs />
    </div>
  );
}
