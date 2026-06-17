"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMe } from "@/features/auth/hooks/useMe";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Loader2,
  Building,
  Calendar,
  Layers,
  BookOpen,
  Users,
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Plus,
  Trash2,
  AlertCircle,
} from "lucide-react";

interface ClassItem {
  name: string;
  section: string;
  capacity: number;
  subjects: string[];
}

interface TeacherItem {
  name: string;
  email: string;
  phone: string;
  employeeId: string;
  qualification: string;
  salary: number;
  subjects: string[];
}

interface StudentItem {
  name: string;
  email: string;
  phone: string;
  rollNumber: string;
  studentClass: string;
  section: string;
  gender: string;
  dateOfBirth: string;
  parentName: string;
  parentPhone: string;
}

export default function SetupWizardPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useMe();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  // Step 1 State: School Details
  const [schoolDetails, setSchoolDetails] = useState({
    schoolName: "",
    schoolEmail: "",
    schoolPhone: "",
    schoolAddress: "",
    timezone: "Asia/Kolkata",
    currency: "INR",
  });

  // Step 2 State: Academic Session
  const [sessionDetails, setSessionDetails] = useState({
    sessionYear: "2026-2027",
  });

  // Step 3 State: Classes
  const [classesList, setClassesList] = useState<ClassItem[]>([
    { name: "Class 10", section: "A", capacity: 40, subjects: [] },
  ]);
  const [newClass, setNewClass] = useState({ name: "", section: "", capacity: 40 });

  // Step 4 State: Class Subjects (mapped by class name + section)
  const [classSubjects, setClassSubjects] = useState<Record<string, string>>({
    "Class 10-A": "Mathematics, Physics, Chemistry, English",
  });

  // Step 5 State: Teachers
  const [teachersList, setTeachersList] = useState<TeacherItem[]>([]);
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    email: "",
    phone: "",
    employeeId: "",
    qualification: "",
    salary: 35000,
    selectedSubjects: [] as string[],
  });

  // Step 6 State: Students
  const [studentsList, setStudentsList] = useState<StudentItem[]>([]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    phone: "",
    rollNumber: "",
    classIndex: 0,
    gender: "Male",
    dateOfBirth: "2010-06-15",
    parentName: "",
    parentPhone: "",
  });

  // Redirect if not authenticated or not an Admin
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/login");
      } else if (user.role !== "Admin") {
        router.push("/dashboard");
      } else if (user.schoolId) {
        // Fetch current settings if school already has them to prefill
        fetch("/api/settings")
          .then((res) => res.json())
          .then((data) => {
            if (data && data.schoolName) {
              setSchoolDetails({
                schoolName: data.schoolName || "",
                schoolEmail: data.schoolEmail || "",
                schoolPhone: data.schoolPhone || "",
                schoolAddress: data.schoolAddress || "",
                timezone: data.timezone || "Asia/Kolkata",
                currency: data.currency || "INR",
              });
              setSessionDetails({
                sessionYear: data.sessionYear || "2026-2027",
              });
            }
          })
          .catch(() => {});
      }
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center gap-2 bg-slate-50 dark:bg-slate-950 transition-colors">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="text-sm font-semibold">Loading setup context...</span>
      </div>
    );
  }

  // --- Step Handlers ---
  const handleAddClass = () => {
    if (!newClass.name || !newClass.section) {
      toast.error("Class Name and Section are required.");
      return;
    }
    const key = `${newClass.name}-${newClass.section}`;
    if (classesList.some((c) => `${c.name}-${c.section}` === key)) {
      toast.error("This Class Section already exists.");
      return;
    }
    setClassesList([...classesList, { ...newClass, subjects: [] }]);
    setClassSubjects({ ...classSubjects, [key]: "Mathematics, Science, English" });
    setNewClass({ name: "", section: "", capacity: 40 });
    toast.success("Class Section added to configuration.");
  };

  const handleRemoveClass = (idx: number) => {
    const target = classesList[idx];
    const key = `${target.name}-${target.section}`;
    const newLists = classesList.filter((_, i) => i !== idx);
    setClassesList(newLists);
    const updatedSubjects = { ...classSubjects };
    delete updatedSubjects[key];
    setClassSubjects(updatedSubjects);
  };

  const handleAddTeacher = () => {
    if (!newTeacher.name || !newTeacher.email || !newTeacher.employeeId) {
      toast.error("Teacher Name, Email, and Employee ID are required.");
      return;
    }
    if (teachersList.some((t) => t.email === newTeacher.email || t.employeeId === newTeacher.employeeId)) {
      toast.error("A teacher with this Email or Employee ID already exists.");
      return;
    }
    setTeachersList([
      ...teachersList,
      {
        name: newTeacher.name,
        email: newTeacher.email,
        phone: newTeacher.phone,
        employeeId: newTeacher.employeeId,
        qualification: newTeacher.qualification,
        salary: newTeacher.salary,
        subjects: newTeacher.selectedSubjects,
      },
    ]);
    setNewTeacher({
      name: "",
      email: "",
      phone: "",
      employeeId: "",
      qualification: "",
      salary: 35000,
      selectedSubjects: [],
    });
    toast.success("Teacher added to setup list.");
  };

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.rollNumber) {
      toast.error("Student Name and Roll Number are required.");
      return;
    }
    const targetClass = classesList[newStudent.classIndex];
    if (!targetClass) {
      toast.error("Please add a class first.");
      return;
    }
    if (studentsList.some((s) => s.rollNumber === newStudent.rollNumber)) {
      toast.error("Roll Number must be unique.");
      return;
    }

    setStudentsList([
      ...studentsList,
      {
        name: newStudent.name,
        email: newStudent.email || `${newStudent.rollNumber.toLowerCase()}@school.com`,
        phone: newStudent.phone,
        rollNumber: newStudent.rollNumber,
        studentClass: targetClass.name,
        section: targetClass.section,
        gender: newStudent.gender,
        dateOfBirth: newStudent.dateOfBirth,
        parentName: newStudent.parentName || "Parent",
        parentPhone: newStudent.parentPhone,
      },
    ]);
    setNewStudent({
      ...newStudent,
      name: "",
      email: "",
      phone: "",
      rollNumber: "",
      parentName: "",
      parentPhone: "",
    });
    toast.success("Student added to setup list.");
  };

  // --- Final Setup Execution ---
  const handleCompleteSetup = async () => {
    setSubmitting(true);
    try {
      // 1. Save Settings (Step 1 & Step 2 details combined)
      const settingsPayload = {
        schoolName: schoolDetails.schoolName,
        schoolEmail: schoolDetails.schoolEmail,
        schoolAddress: schoolDetails.schoolAddress,
        sessionYear: sessionDetails.sessionYear,
        currency: schoolDetails.currency,
        timezone: schoolDetails.timezone,
      };

      const settingsRes = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settingsPayload),
      });
      if (!settingsRes.ok) throw new Error("Failed to save School settings.");

      // 2. Save Classes (Step 3 & Step 4 combined)
      const classIdMap: Record<string, string> = {};
      for (const cls of classesList) {
        const key = `${cls.name}-${cls.section}`;
        const subjectsString = classSubjects[key] || "";
        const parsedSubjects = subjectsString
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);

        const classRes = await fetch("/api/classes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: cls.name,
            section: cls.section,
            capacity: cls.capacity,
            subjects: parsedSubjects,
          }),
        });

        if (!classRes.ok) {
          const err = await classRes.json();
          throw new Error(`Failed to save Class ${cls.name}-${cls.section}: ${err.message}`);
        }
        const savedClass = await classRes.json();
        classIdMap[key] = savedClass._id;
      }

      // 3. Save Teachers (Step 5)
      for (const teacher of teachersList) {
        const teacherRes = await fetch("/api/teachers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(teacher),
        });
        if (!teacherRes.ok) {
          const err = await teacherRes.json();
          throw new Error(`Failed to register Teacher ${teacher.name}: ${err.message}`);
        }
      }

      // 4. Save Students (Step 6)
      for (const student of studentsList) {
        const studentRes = await fetch("/api/students", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(student),
        });
        if (!studentRes.ok) {
          const err = await studentRes.json();
          throw new Error(`Failed to register Student ${student.name}: ${err.message}`);
        }
      }

      toast.success("School Onboarding Setup Completed Successfully!");
      router.push("/dashboard");
    } catch (error: unknown) {
      const err = error as Error | null;
      toast.error(err?.message || "An error occurred during onboarding configuration.");
    } finally {
      setSubmitting(false);
    }
  };

  // Helper lists of subjects across all classes
  const allAvailableSubjects = Array.from(
    new Set(
      Object.values(classSubjects)
        .flatMap((s) => s.split(","))
        .map((s) => s.trim())
        .filter(Boolean)
    )
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans transition-colors duration-300">
      {/* Onboarding Header */}
      <div className="border-b bg-white dark:bg-slate-900 py-6 px-8 shadow-sm">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              EduFlow Onboarding Wizard
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">Let&apos;s configure your tenant instance</p>
          </div>
          <div className="text-xs text-slate-400 font-semibold bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
            Step {step} of 6
          </div>
        </div>
      </div>

      {/* Wizard Step Timeline Progress */}
      <div className="max-w-5xl mx-auto py-8 px-6">
        <div className="flex justify-between items-center relative mb-12">
          <div className="absolute left-0 right-0 h-1 bg-slate-200 dark:bg-slate-800 top-1/2 -translate-y-1/2 -z-10" />
          <div
            className="absolute left-0 h-1 bg-blue-600 top-1/2 -translate-y-1/2 -z-10 transition-all duration-300"
            style={{ width: `${((step - 1) / 5) * 100}%` }}
          />

          {[
            { s: 1, label: "School Details", icon: Building },
            { s: 2, label: "Academic Session", icon: Calendar },
            { s: 3, label: "Classes Setup", icon: Layers },
            { s: 4, label: "Class Subjects", icon: BookOpen },
            { s: 5, label: "Teachers", icon: Users },
            { s: 6, label: "Students", icon: GraduationCap },
          ].map((item) => {
            const Icon = item.icon;
            const active = step >= item.s;
            const current = step === item.s;
            return (
              <div key={item.s} className="flex flex-col items-center gap-2">
                <div
                  className={`h-10 w-10 rounded-full border-2 flex items-center justify-center transition-all ${
                    current
                      ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/25 scale-110"
                      : active
                      ? "bg-blue-100 border-blue-600 text-blue-600 dark:bg-blue-950 dark:border-blue-500"
                      : "bg-white border-slate-200 text-slate-400 dark:bg-slate-900 dark:border-slate-800"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span className={`text-[10px] sm:text-xs font-semibold hidden md:block ${active ? "text-blue-600 dark:text-blue-400" : "text-slate-400"}`}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Wizard Step Body */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl">
          {/* STEP 1: School Details */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black">Step 1: Institutional Profile</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Provide the basic administrative and physical contact details for your school or academy instance.
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="sName">School Name *</Label>
                  <Input
                    id="sName"
                    value={schoolDetails.schoolName}
                    onChange={(e) => setSchoolDetails({ ...schoolDetails, schoolName: e.target.value })}
                    placeholder="e.g. Apex Public School"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sEmail">Official Email *</Label>
                  <Input
                    id="sEmail"
                    type="email"
                    value={schoolDetails.schoolEmail}
                    onChange={(e) => setSchoolDetails({ ...schoolDetails, schoolEmail: e.target.value })}
                    placeholder="info@apexinstitute.com"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sPhone">Contact Phone</Label>
                  <Input
                    id="sPhone"
                    value={schoolDetails.schoolPhone}
                    onChange={(e) => setSchoolDetails({ ...schoolDetails, schoolPhone: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sAddr">School Address</Label>
                  <Input
                    id="sAddr"
                    value={schoolDetails.schoolAddress}
                    onChange={(e) => setSchoolDetails({ ...schoolDetails, schoolAddress: e.target.value })}
                    placeholder="Plot 45, Sector 62, Noida"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sCur">Platform Currency</Label>
                  <select
                    id="sCur"
                    value={schoolDetails.currency}
                    onChange={(e) => setSchoolDetails({ ...schoolDetails, currency: e.target.value })}
                    className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm focus:outline-none"
                  >
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sTime">Timezone</Label>
                  <select
                    id="sTime"
                    value={schoolDetails.timezone}
                    onChange={(e) => setSchoolDetails({ ...schoolDetails, timezone: e.target.value })}
                    className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm focus:outline-none"
                  >
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="UTC">Coordinated Universal Time (UTC)</option>
                    <option value="America/New_York">America/New_York (EST)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Academic Session */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black">Step 2: Academic Session</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Define the current active academic session parameters. Timetables, attendances, and fee billing cycle scopes will belong to this session.
              </p>
              <div className="max-w-md space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="sYear">Active Session Year *</Label>
                  <select
                    id="sYear"
                    value={sessionDetails.sessionYear}
                    onChange={(e) => setSessionDetails({ ...sessionDetails, sessionYear: e.target.value })}
                    className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm focus:outline-none"
                  >
                    <option value="2026-2027">2026-2027</option>
                    <option value="2027-2028">2027-2028</option>
                    <option value="2028-2029">2028-2029</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Classes Setup */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black">Step 3: Core Class Sections</h2>
              <p className="text-sm text-muted-foreground">
                Set up the classroom units (e.g. Class 10-A, Class 9-B) that students will be enrolled in.
              </p>

              <div className="grid gap-4 md:grid-cols-4 items-end bg-slate-50 dark:bg-slate-900/60 p-4 border rounded-2xl">
                <div className="space-y-1.5">
                  <Label>Class Name *</Label>
                  <Input
                    value={newClass.name}
                    onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                    placeholder="e.g. Class 10"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Section *</Label>
                  <Input
                    value={newClass.section}
                    onChange={(e) => setNewClass({ ...newClass, section: e.target.value })}
                    placeholder="e.g. A"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Max Student Capacity</Label>
                  <Input
                    type="number"
                    value={newClass.capacity}
                    onChange={(e) => setNewClass({ ...newClass, capacity: parseInt(e.target.value) || 40 })}
                  />
                </div>
                <Button onClick={handleAddClass} className="rounded-2xl flex items-center gap-1.5 w-full">
                  <Plus className="h-4 w-4" /> Add Class
                </Button>
              </div>

              {/* Added Classes List */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold">Configured Classes ({classesList.length})</h4>
                {classesList.length === 0 ? (
                  <div className="p-6 border border-dashed rounded-2xl text-center text-sm text-muted-foreground">
                    No classes added yet. You must configure at least one class section.
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {classesList.map((c, idx) => (
                      <div key={idx} className="border p-4 rounded-2xl bg-white dark:bg-slate-950 flex justify-between items-center shadow-sm">
                        <div>
                          <p className="font-bold">{c.name} - {c.section}</p>
                          <p className="text-xs text-muted-foreground">Capacity: {c.capacity} students</p>
                        </div>
                        <Button
                          variant="ghost"
                          onClick={() => handleRemoveClass(idx)}
                          className="h-8 w-8 text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-full p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: Class Subjects */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black">Step 4: Assign Class Subjects</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Add subject lists taught inside each configured class section. Provide them as comma-separated values.
              </p>

              <div className="space-y-4">
                {classesList.map((c) => {
                  const key = `${c.name}-${c.section}`;
                  return (
                    <div key={key} className="space-y-2 p-4 border rounded-2xl bg-slate-50 dark:bg-slate-900/60">
                      <Label htmlFor={`subj-${key}`} className="font-bold">{c.name} - {c.section} Subjects</Label>
                      <Input
                        id={`subj-${key}`}
                        value={classSubjects[key] || ""}
                        onChange={(e) => setClassSubjects({ ...classSubjects, [key]: e.target.value })}
                        placeholder="Mathematics, Physics, Chemistry, English"
                      />
                      <p className="text-[10px] text-muted-foreground">Type subjects separated by commas.</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: Teachers Setup */}
          {step === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black">Step 5: Teachers Directory</h2>
              <p className="text-sm text-muted-foreground">
                Register educators to handle registers, post homework, and enter exam outcomes.
              </p>

              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 bg-slate-50 dark:bg-slate-900/60 p-6 border rounded-2xl">
                <div className="space-y-1.5">
                  <Label>Teacher Name *</Label>
                  <Input
                    value={newTeacher.name}
                    onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                    placeholder="e.g. Karan Sharma"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Teacher Email *</Label>
                  <Input
                    type="email"
                    value={newTeacher.email}
                    onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                    placeholder="karan@school.com"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Teacher Phone</Label>
                  <Input
                    value={newTeacher.phone}
                    onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                    placeholder="+91 99999 11111"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Employee ID *</Label>
                  <Input
                    value={newTeacher.employeeId}
                    onChange={(e) => setNewTeacher({ ...newTeacher, employeeId: e.target.value })}
                    placeholder="EMP001"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Qualification</Label>
                  <Input
                    value={newTeacher.qualification}
                    onChange={(e) => setNewTeacher({ ...newTeacher, qualification: e.target.value })}
                    placeholder="M.Sc Physics"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Salary (Monthly)</Label>
                  <Input
                    type="number"
                    value={newTeacher.salary}
                    onChange={(e) => setNewTeacher({ ...newTeacher, salary: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="sm:col-span-2 md:col-span-3 space-y-2">
                  <Label className="text-xs font-semibold">Allocated Subjects (Check all that apply)</Label>
                  <div className="flex flex-wrap gap-3 p-3 border rounded-xl bg-white dark:bg-slate-950">
                    {allAvailableSubjects.length === 0 ? (
                      <span className="text-xs text-muted-foreground">Add subjects in Step 4 first.</span>
                    ) : (
                      allAvailableSubjects.map((sub) => {
                        const checked = newTeacher.selectedSubjects.includes(sub);
                        return (
                          <label key={sub} className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => {
                                const list = checked
                                  ? newTeacher.selectedSubjects.filter((s) => s !== sub)
                                  : [...newTeacher.selectedSubjects, sub];
                                setNewTeacher({ ...newTeacher, selectedSubjects: list });
                              }}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            {sub}
                          </label>
                        );
                      })
                    )}
                  </div>
                </div>
                <Button onClick={handleAddTeacher} className="sm:col-span-2 md:col-span-3 mt-2 rounded-2xl flex items-center justify-center gap-1.5">
                  <Plus className="h-4 w-4" /> Add Teacher
                </Button>
              </div>

              {/* Added Teachers List */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold">Registered Teachers ({teachersList.length})</h4>
                {teachersList.length === 0 ? (
                  <div className="p-6 border border-dashed rounded-2xl text-center text-sm text-muted-foreground">
                    No teachers registered yet. You can add them now or do it later in the dashboard.
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {teachersList.map((t, idx) => (
                      <div key={idx} className="border p-4 rounded-2xl bg-white dark:bg-slate-950 flex justify-between items-center shadow-sm">
                        <div>
                          <p className="font-bold">{t.name}</p>
                          <p className="text-xs text-muted-foreground">{t.employeeId} | {t.qualification || "No qualification listed"}</p>
                          <p className="text-[10px] text-blue-600 dark:text-blue-400 mt-1">Teaches: {t.subjects.join(", ") || "None"}</p>
                        </div>
                        <Button
                          variant="ghost"
                          onClick={() => setTeachersList(teachersList.filter((_, i) => i !== idx))}
                          className="h-8 w-8 text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-full p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 6: Students Setup */}
          {step === 6 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black">Step 6: Student Roster</h2>
              <p className="text-sm text-muted-foreground">
                Add students to enroll them in classrooms and generate their credentials automatically.
              </p>

              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 bg-slate-50 dark:bg-slate-900/60 p-6 border rounded-2xl">
                <div className="space-y-1.5">
                  <Label>Student Name *</Label>
                  <Input
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    placeholder="e.g. Subodh Kumar"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Student Email (Optional)</Label>
                  <Input
                    type="email"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                    placeholder="subodh@school.com"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Phone Number</Label>
                  <Input
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                    placeholder="+91 88888 22222"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Roll Number *</Label>
                  <Input
                    value={newStudent.rollNumber}
                    onChange={(e) => setNewStudent({ ...newStudent, rollNumber: e.target.value })}
                    placeholder="ROLL101"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Class Section *</Label>
                  <select
                    value={newStudent.classIndex}
                    onChange={(e) => setNewStudent({ ...newStudent, classIndex: parseInt(e.target.value) || 0 })}
                    className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm focus:outline-none"
                  >
                    {classesList.map((c, i) => (
                      <option key={i} value={i}>{c.name} - {c.section}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label>Gender</Label>
                  <select
                    value={newStudent.gender}
                    onChange={(e) => setNewStudent({ ...newStudent, gender: e.target.value })}
                    className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label>Parent Name</Label>
                  <Input
                    value={newStudent.parentName}
                    onChange={(e) => setNewStudent({ ...newStudent, parentName: e.target.value })}
                    placeholder="Parent Name"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Parent Phone</Label>
                  <Input
                    value={newStudent.parentPhone}
                    onChange={(e) => setNewStudent({ ...newStudent, parentPhone: e.target.value })}
                    placeholder="Parent Phone Number"
                  />
                </div>
                <Button onClick={handleAddStudent} className="sm:col-span-2 md:col-span-3 mt-2 rounded-2xl flex items-center justify-center gap-1.5">
                  <Plus className="h-4 w-4" /> Add Student
                </Button>
              </div>

              {/* Added Students List */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold">Enrolled Students ({studentsList.length})</h4>
                {studentsList.length === 0 ? (
                  <div className="p-6 border border-dashed rounded-2xl text-center text-sm text-muted-foreground">
                    No students added to config roster yet.
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {studentsList.map((s, idx) => (
                      <div key={idx} className="border p-4 rounded-2xl bg-white dark:bg-slate-950 flex justify-between items-center shadow-sm">
                        <div>
                          <p className="font-bold">{s.name}</p>
                          <p className="text-xs text-muted-foreground">{s.rollNumber} | {s.studentClass} - {s.section}</p>
                          {s.parentName && <p className="text-[10px] text-muted-foreground">Parent: {s.parentName}</p>}
                        </div>
                        <Button
                          variant="ghost"
                          onClick={() => setStudentsList(studentsList.filter((_, i) => i !== idx))}
                          className="h-8 w-8 text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-full p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Setup Instructions Alerts */}
          {classesList.length === 0 && step >= 4 && (
            <div className="mt-6 flex items-start gap-3 p-4 rounded-2xl bg-amber-50 text-amber-800 dark:bg-amber-950/20 dark:text-amber-400 border border-amber-200 dark:border-amber-900">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed font-semibold">
                WARNING: You deleted all classes in Step 3. You must have at least one Class Section configured to proceed. Return to Step 3 to fix this.
              </p>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 pt-6 border-t flex justify-between items-center">
            {step > 1 ? (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                disabled={submitting}
                className="rounded-2xl flex items-center gap-1.5"
              >
                <ArrowLeft className="h-4 w-4" /> Previous
              </Button>
            ) : (
              <div />
            )}

            {step < 6 ? (
              <Button
                onClick={() => {
                  if (step === 1 && !schoolDetails.schoolName) {
                    toast.error("School Name is required.");
                    return;
                  }
                  if (step === 3 && classesList.length === 0) {
                    toast.error("Please add at least one Class Section.");
                    return;
                  }
                  setStep(step + 1);
                }}
                className="rounded-2xl flex items-center gap-1.5"
              >
                Next Step <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleCompleteSetup}
                disabled={submitting || classesList.length === 0}
                className="rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 flex items-center gap-1.5 font-bold"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Initializing Platform...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4" /> Complete Setup & Launch
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
