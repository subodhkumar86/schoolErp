import Link from "next/link";
import { ArrowRight, CalendarCheck, GraduationCap, NotebookPen, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";

const actions = [
  {
    label: "Add Student",
    href: "/students/create",
    icon: UserPlus,
  },
  {
    label: "Add Teacher",
    href: "/teachers/create",
    icon: GraduationCap,
  },
  {
    label: "Mark Attendance",
    href: "/attendance",
    icon: CalendarCheck,
  },
  {
    label: "Plan Week",
    href: "/planner",
    icon: NotebookPen,
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-3xl border bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">Quick Actions</h3>
          <p className="text-sm text-muted-foreground">
            Jump straight into the most common admin workflows.
          </p>
        </div>

        <Button asChild variant="ghost" size="sm">
          <Link href="/operations">
            Open Operations
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {actions.map((action, index) => {
          const Icon = action.icon;

          return (
            <Button
              key={action.href}
              asChild
              variant={index === 0 ? "default" : "outline"}
              className="h-auto justify-start rounded-2xl px-4 py-4"
            >
              <Link href={action.href}>
                <Icon className="h-4 w-4" />
                {action.label}
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
