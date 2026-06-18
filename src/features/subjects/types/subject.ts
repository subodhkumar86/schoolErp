export interface SubjectType {
  _id: string;
  name: string;
  code: string;
  type: "Theory" | "Practical" | "Both";
  description?: string;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}
