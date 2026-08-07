import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  CalendarRange,
  CheckCircle2,
  ClipboardList,
  FileSpreadsheet,
  TimerReset,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const planningBoards = [
  {
    title: "Class Rhythm",
    description: "Sequence lesson coverage, timetable constraints, and teacher handoffs.",
    href: "/classes",
    cta: "Review Classes",
    icon: BookOpenText,
  },
  {
    title: "Assessment Window",
    description: "Prepare exam timelines, result processing, and revision periods ahead of deadlines.",
    href: "/exams",
    cta: "Review Exams",
    icon: FileSpreadsheet,
  },
  {
    title: "Homework Cadence",
    description: "Balance assignments, due dates, and student workload across the week.",
    href: "/homework",
    cta: "Review Homework",
    icon: ClipboardList,
  },
];

const weeklyCadence = [
  "Lock timetable changes before the week begins",
  "Check assessment clashes across classes and sections",
  "Spread homework deadlines to avoid same-day overload",
  "Reserve a buffer block for parent meetings and make-up sessions",
];

export default function PlannerPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border bg-card p-8 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <Badge variant="outline" className="rounded-full px-3 py-1">
              Weekly Planning Workspace
            </Badge>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight">Academic Planner</h1>
              <p className="text-sm text-muted-foreground sm:text-base">
                Organize the week before it becomes reactive. Keep lessons, exams, and homework
                aligned so each class moves with a steady academic cadence.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/timetable">
                Open Timetable
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        {planningBoards.map((board) => {
          const Icon = board.icon;

          return (
            <Card key={board.title} className="rounded-3xl">
              <CardHeader>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-muted">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle>{board.title}</CardTitle>
                <CardDescription>{board.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full justify-between">
                  <Link href={board.href}>
                    {board.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarRange className="h-5 w-5" />
              Weekly Planning Flow
            </CardTitle>
            <CardDescription>
              A simple operating rhythm for turning class plans into a workable school week.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {weeklyCadence.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border px-4 py-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                <p className="text-sm text-muted-foreground">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TimerReset className="h-5 w-5" />
              Planning Shortcuts
            </CardTitle>
            <CardDescription>
              Jump directly into the workflows that shape the next seven school days.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild variant="outline" className="w-full justify-between">
              <Link href="/subjects">
                Review Subject Coverage
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button asChild variant="outline" className="w-full justify-between">
              <Link href="/results">
                Track Result Follow-up
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button asChild variant="outline" className="w-full justify-between">
              <Link href="/reports">
                Export Planning Reports
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
