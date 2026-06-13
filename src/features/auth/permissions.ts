export type UserRole = "Super Admin" | "Admin" | "Teacher" | "Student" | "Accountant" | "Librarian";

export type AppModule =
  | "dashboard"
  | "students"
  | "teachers"
  | "attendance"
  | "classes"
  | "subjects"
  | "exams"
  | "results"
  | "fees"
  | "library"
  | "inventory"
  | "homework"
  | "notices"
  | "notifications"
  | "reports"
  | "settings";

export const ROLE_PERMISSIONS: Record<UserRole, AppModule[]> = {
  "Super Admin": [
    "dashboard",
    "students",
    "teachers",
    "attendance",
    "classes",
    "subjects",
    "exams",
    "results",
    "fees",
    "library",
    "inventory",
    "homework",
    "notices",
    "notifications",
    "reports",
    "settings",
  ],
  Admin: [
    "dashboard",
    "students",
    "teachers",
    "attendance",
    "classes",
    "subjects",
    "exams",
    "results",
    "fees",
    "library",
    "inventory",
    "homework",
    "notices",
    "notifications",
    "reports",
    "settings",
  ],
  Teacher: [
    "dashboard",
    "students",
    "attendance",
    "classes",
    "subjects",
    "exams",
    "results",
    "homework",
    "notices",
    "notifications",
  ],
  Student: [
    "dashboard",
    "attendance",
    "subjects",
    "exams",
    "results",
    "homework",
    "library",
    "notices",
    "notifications",
  ],
  Accountant: [
    "dashboard",
    "fees",
    "inventory",
    "notices",
    "notifications",
    "reports",
  ],
  Librarian: [
    "dashboard",
    "library",
    "notices",
    "notifications",
  ],
};

export function hasPermission(role: UserRole, module: AppModule): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  if (!permissions) return false;
  return permissions.includes(module);
}
