export interface Student {
  id: number;
  name: string;
  rollNumber: string;
  class: string;
  attendance: number;
  status: "Active" | "Inactive";
}
