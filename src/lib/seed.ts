import School from "@/models/School";
import User from "@/models/User";
import Student from "@/models/Student";
import Teacher from "@/models/Teacher";
import Class from "@/models/Class";
import Book from "@/models/Book";
import Fee from "@/models/Fee";
import Notice from "@/models/Notice";
import Notification from "@/models/Notification";
import Exam from "@/models/Exam";
import Result from "@/models/Result";
import Homework from "@/models/Homework";
import Inventory from "@/models/Inventory";
import Transport from "@/models/Transport";
import Timetable from "@/models/Timetable";
import Setting from "@/models/Setting";
import { hashPassword } from "./auth";

export async function seedUsers() {
  const schoolCount = await School.countDocuments();
  if (schoolCount > 0) return;

  console.log("Starting multi-tenant database seed...");

  // 1. Create Schools/Tenants
  const defaultPassword = await hashPassword("password123");

  const globalSchool = await School.create({
    name: "Global Academy",
    slug: "global",
    email: "info@globalacademy.com",
    phone: "+91 9876543210",
    address: "12, Ring Road, New Delhi",
    subscription: {
      plan: "Starter",
      status: "Trial",
      trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      limitStudents: 100,
      limitTeachers: 10,
    },
  });

  await School.create({
    name: "Apex Institute",
    slug: "apex",
    email: "contact@apexinstitute.com",
    phone: "+91 8765432109",
    address: "45, Sector 62, Noida",
    subscription: {
      plan: "Professional",
      status: "Active",
      endsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      limitStudents: 500,
      limitTeachers: 50,
    },
  });

  await School.create({
    name: "Horizon University",
    slug: "horizon",
    email: "admin@horizonuniversity.com",
    phone: "+91 7654321098",
    address: "Sector 15, Gurgaon",
    subscription: {
      plan: "Enterprise",
      status: "Active",
      endsAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      limitStudents: 99999,
      limitTeachers: 999,
    },
  });

  const schoolId = globalSchool._id;

  // 2. Create default Teacher & Student profiles for Global Academy
  const teacherDoc = await Teacher.create({
    schoolId,
    name: "Karan Sharma",
    email: "teacher@global.com",
    phone: "+91 9999911111",
    employeeId: "EMP001",
    department: "Science",
    qualification: "M.Sc Physics",
    experience: 5,
    salary: 45000,
    address: "GK-1, New Delhi",
    subjects: ["Physics", "Mathematics"],
    status: "Active",
  });

  const studentDoc = await Student.create({
    schoolId,
    name: "Subodh Kumar",
    email: "student@global.com",
    phone: "+91 8888822222",
    rollNumber: "ROLL101",
    studentClass: "Class 10-A",
    section: "A",
    gender: "Male",
    dateOfBirth: new Date("2011-04-15"),
    address: "Dwarka, Sector 10, New Delhi",
    parentName: "Rajesh Kumar",
    parentPhone: "+91 7777733333",
    attendance: 92,
    status: "Active",
  });

  // 3. Create Users linked to Global Academy and their profiles
  const users = [
    {
      username: "superadmin",
      email: "superadmin@eduflow.com",
      password: defaultPassword,
      role: "Super Admin",
      status: "Active",
      schoolId: null,
    },
    {
      username: "admin",
      email: "admin@global.com",
      password: defaultPassword,
      role: "Admin",
      status: "Active",
      schoolId,
    },
    {
      username: "teacher",
      email: "teacher@global.com",
      password: defaultPassword,
      role: "Teacher",
      status: "Active",
      schoolId,
      entityId: teacherDoc._id,
      entityModel: "Teacher",
    },
    {
      username: "student",
      email: "student@global.com",
      password: defaultPassword,
      role: "Student",
      status: "Active",
      schoolId,
      entityId: studentDoc._id,
      entityModel: "Student",
    },
    {
      username: "parent",
      email: "parent@global.com",
      password: defaultPassword,
      role: "Parent",
      status: "Active",
      schoolId,
      entityId: studentDoc._id, // References child (Student)
      entityModel: "Student",
    },
    {
      username: "accountant",
      email: "accountant@global.com",
      password: defaultPassword,
      role: "Accountant",
      status: "Active",
      schoolId,
    },
    {
      username: "librarian",
      email: "librarian@global.com",
      password: defaultPassword,
      role: "Librarian",
      status: "Active",
      schoolId,
    },
  ];

  await User.insertMany(users);

  // 4. Create remaining mock entities
  const classDoc = await Class.create({
    schoolId,
    name: "Class 10-A",
    section: "A",
    classTeacher: teacherDoc._id,
    capacity: 40,
    subjects: ["Physics", "Chemistry", "Mathematics", "English"],
    status: "Active",
  });

  await Book.create({
    schoolId,
    title: "Introduction to Classical Mechanics",
    author: "H.C. Verma",
    isbn: "978-8177091793",
    category: "Science",
    totalCopies: 10,
    availableCopies: 8,
    status: "Available",
    shelfLocation: "Aisle 3, Shelf B",
  });

  await Fee.create({
    schoolId,
    studentId: studentDoc._id,
    feeType: "Tuition",
    amount: 12500,
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    status: "Pending",
    remarks: "First Term Tuition Fee",
  });

  await Notice.create({
    schoolId,
    title: "Annual Sports Meet 2026",
    content: "The annual sports day will be held on July 10th. Registrations for all track events are open.",
    audience: "All",
    postedDate: new Date(),
    expiryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    status: "Active",
    createdBy: "Sports Department",
  });

  await Notification.create({
    schoolId,
    title: "Term 1 Syllabus Updated",
    message: "Science syllabus for Term 1 has been updated in class portal. Please review chapters.",
    type: "Info",
    recipient: "Students",
    read: false,
    priority: "Normal",
    postedDate: new Date(),
  });

  const examDoc = await Exam.create({
    schoolId,
    name: "Physics Midterm",
    subject: "Physics",
    className: "Class 10-A",
    section: "A",
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    duration: 90,
    totalMarks: 100,
    passingMarks: 33,
    status: "Scheduled",
  });

  await Result.create({
    schoolId,
    studentId: studentDoc._id,
    examId: examDoc._id,
    marksObtained: 88,
    grade: "A",
    remarks: "Excellent analytical skills",
  });

  await Homework.create({
    schoolId,
    title: "Mechanics Numerical Practice",
    description: "Solve questions 1-15 from Chapter 4 numerical exercises and upload solutions.",
    className: "Class 10-A",
    section: "A",
    subject: "Physics",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    status: "Active",
    teacherId: teacherDoc._id,
    maxPoints: 20,
  });

  await Inventory.create({
    schoolId,
    name: "Laboratory Microscope",
    category: "Other",
    status: "Active",
    quantity: 15,
    costValue: 3200,
    location: "Physics Lab",
  });

  await Transport.create({
    schoolId,
    routeName: "Dwarka-Janakpuri Line",
    vehicleNumber: "DL-1PB-4589",
    driverName: "Ram Singh",
    driverPhone: "+91 9988776655",
    routeCost: 2500,
    capacity: 42,
    status: "Active",
  });

  await Timetable.create({
    schoolId,
    classId: classDoc._id,
    subject: "Physics",
    teacherId: teacherDoc._id,
    dayOfWeek: "Monday",
    startTime: "09:00",
    endTime: "10:00",
    classroom: "Lab 2",
  });

  await Setting.create({
    schoolId,
    schoolName: "Global Academy Public School",
    schoolAddress: "12, Ring Road, New Delhi",
    schoolEmail: "info@globalacademy.com",
    sessionYear: "2026-2027",
    currency: "INR",
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
  });

  console.log("Database seeded successfully with default multi-tenant records.");
}
