import User from "@/models/User";
import { hashPassword } from "./auth";

export async function seedUsers() {
  const count = await User.countDocuments();
  if (count > 0) return;

  const defaultPassword = await hashPassword("password123");

  const defaultUsers = [
    {
      username: "superadmin",
      email: "superadmin@eduflow.com",
      password: defaultPassword,
      role: "Super Admin",
      status: "Active",
    },
    {
      username: "admin",
      email: "admin@eduflow.com",
      password: defaultPassword,
      role: "Admin",
      status: "Active",
    },
    {
      username: "teacher",
      email: "teacher@eduflow.com",
      password: defaultPassword,
      role: "Teacher",
      status: "Active",
    },
    {
      username: "student",
      email: "student@eduflow.com",
      password: defaultPassword,
      role: "Student",
      status: "Active",
    },
    {
      username: "accountant",
      email: "accountant@eduflow.com",
      password: defaultPassword,
      role: "Accountant",
      status: "Active",
    },
    {
      username: "librarian",
      email: "librarian@eduflow.com",
      password: defaultPassword,
      role: "Librarian",
      status: "Active",
    },
  ];

  await User.insertMany(defaultUsers);
  console.log("Database seeded with default users successfully.");
}
