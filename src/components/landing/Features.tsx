import {
  Users,
  GraduationCap,
  CalendarCheck,
  Wallet,
  BookOpen,
  ClipboardList,
  Layers,
  FileCheck,
} from "lucide-react";

const featureList = [
  {
    title: "Multi-Tenant isolation",
    description: "Every school has 100% data boundary security. Create unique school configurations in seconds.",
    icon: Layers,
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Automated Fee Billing",
    description: "Invoicing, partial payments tracking, and digital receipt generation for Accountant and Parents.",
    icon: Wallet,
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Attendance Manager",
    description: "Daily calendars with simple click sheets for students and teachers. Auto-calculates analytics.",
    icon: CalendarCheck,
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Interactive Homework",
    description: "Teachers assign homework with max points. Students view, solve, and track their due dates.",
    icon: ClipboardList,
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "Exams & Grading",
    description: "Schedule exams, set passing limits, and auto-calculate GPA grades on results publish.",
    icon: FileCheck,
    color: "from-rose-500 to-pink-500",
  },
  {
    title: "Digital Library Register",
    description: "Librarians issue/return books, track copy availability, and automatically log overdue fines.",
    icon: BookOpen,
    color: "from-violet-500 to-purple-500",
  },
  {
    title: "Student Admissions",
    description: "Full profiles containing contact details, address, parent link, and historic academic reports.",
    icon: Users,
    color: "from-fuchsia-500 to-pink-500",
  },
  {
    title: "Teacher Portals",
    description: "Dedicated dashboards for classroom settings, subject timetables, and grading sheets.",
    icon: GraduationCap,
    color: "from-sky-500 to-indigo-500",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900 transition-colors">
      <div className="container mx-auto px-6 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Fully Loaded ERP Ecosystem
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            From admissions to graduations, EduFlow ERP drives transparency and productivity across every educational department.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featureList.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-3xl border border-slate-200/60 bg-slate-50/50 p-8 hover:bg-white hover:border-slate-300 dark:border-slate-800/60 dark:bg-slate-900/50 dark:hover:bg-slate-950/70 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                {/* Icon Circle */}
                <div className={`inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br ${f.color} text-white shadow-lg mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
