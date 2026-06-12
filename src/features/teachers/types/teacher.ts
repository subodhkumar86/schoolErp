export interface Teacher {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  employeeId: string;
  department: string;
  qualification?: string;
  experience?: number;
  salary?: number;
  joiningDate?: string;
  address?: string;
  profileImage?: string;
  subjects?: string[];
  status: "Active" | "Inactive" | "On Leave";
  createdAt: string;
  updatedAt: string;
}
