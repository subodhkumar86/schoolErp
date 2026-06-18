import StudentProfileCard from "@/features/students/components/StudentProfileCard";
import StudentAcademicInfo from "@/features/students/components/StudentAcademicInfo";
import StudentAttendanceCard from "@/features/students/components/StudentAttendanceCard";
import StudentDocumentsCard from "@/features/students/components/StudentDocumentsCard";

export default function StudentDetailPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Student Profile</h1>
        <p className="text-muted-foreground">View and manage student academic profile and files</p>
      </div>

      <StudentProfileCard />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <StudentAcademicInfo />
          <StudentDocumentsCard />
        </div>
        <div>
          <StudentAttendanceCard />
        </div>
      </div>
    </div>
  );
}
