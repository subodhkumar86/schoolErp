import React from "react";
import { CheckCircle } from "lucide-react";

const roleFeatures = [
  {
    role: "Super Admin Portal",
    description: "Manage multiple schools, subscriptions, and platform-wide revenue metrics.",
    items: ["Manage Schools & Tenants", "Subscription Plan Configurator", "Global Revenue Analytics Graphs", "Tenant Suspension / Activation"],
  },
  {
    role: "School Admin Portal",
    description: "Full administrative controls over a single school tenant.",
    items: ["Student Admissions & Roster", "Teacher Recruitment & Departments", "Timetable Scheduler Slots", "Notice Board Announcements"],
  },
  {
    role: "Teacher Portal",
    description: "Empower educators to manage their classes, homework, and exams.",
    items: ["Subject Classes & Attendance", "Homework Uploads & Grading", "Exams & Results Publishing", "Notice Board Updates"],
  },
  {
    role: "Parent Portal",
    description: "Real-time updates for parents to track their child's education.",
    items: ["Child Daily Attendance Status", "Academic Performance Report Card", "Pending Fee Invoices & Payment Ledger", "Instant Notice Board Notifications"],
  },
];

export default function FeaturesPage() {
  return (
    <div className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-6 max-w-5xl space-y-16">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black sm:text-6xl bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
            Modules Built for Roles
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            EduFlow ERP provides dedicated, secure portal logins with tailor-made capabilities for every member of the academic community.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {roleFeatures.map((rf, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-slate-200/50 bg-white p-8 shadow-md dark:border-slate-800/50 dark:bg-slate-900"
            >
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">{rf.role}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">{rf.description}</p>
              
              <ul className="space-y-3">
                {rf.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-center gap-3 text-sm text-slate-650 dark:text-slate-300">
                    <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
