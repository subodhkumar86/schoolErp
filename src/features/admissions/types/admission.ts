export interface Admission {
  _id: string;
  studentName: string;
  email?: string;
  phone?: string;
  appliedClass: string;
  gender: "Male" | "Female" | "Other";
  dateOfBirth?: string;
  parentName?: string;
  parentPhone?: string;
  address?: string;
  status: "Pending" | "Approved" | "Rejected";
  schoolId: string;
  admissionDate: string;
  createdAt: string;
  updatedAt: string;
}
