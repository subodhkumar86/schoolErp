export interface Student {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  rollNumber: string;
  studentClass: string;
  section?: string;
  gender?: "Male" | "Female" | "Other";
  dateOfBirth?: string;
  admissionDate?: string;
  address?: string;
  parentName?: string;
  parentPhone?: string;
  profileImage?: string;
  attendance?: number;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}
