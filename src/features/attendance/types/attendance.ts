export interface AttendanceRecord {
  _id: string;
  entityId:
    | string
    | {
        _id: string;
        name: string;
        rollNumber?: string;
        employeeId?: string;
        department?: string;
        studentClass?: string;
      };
  entityType: "Student" | "Teacher";
  date: string;
  status: "Present" | "Absent" | "Late" | "Leave";
  remarks?: string;
  markedBy?: string;
  createdAt: string;
  updatedAt: string;
}
