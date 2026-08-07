import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarClock,
  ClipboardCheck,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const operationsLanes = [
  {
    title: "People & Attendance",
    description: "Keep classrooms staffed, attendance marked, and parent-facing updates flowing.",
    icon: Users,
    href: "/attendance",
    cta: "Open Attendance",
  },
  {
    title: "Academic Delivery",
    description: "Coordinate classes, timetable changes, homework, and exam execution in one rhythm.",
    icon: BookOpenCheck,
    href: "/timetable",
    cta: "Open Timetable",
  },
  {
    title: "Finance & Follow-up",
    description: "Track fee collection pressure, payment exceptions, and daily cashflow blockers.",
    icon: Wallet,
    href: "/fees",
    cta: "Open Fees",
  },
];

const operationalChecks = [
  "Morning attendance completion before first period closes",
  "Teacher substitution gaps for absent staff members",
  "Pending notices or parent-facing alerts requiring approval",
  "Fee exceptions and overdue follow-up needing escalation",
];

export default function OperationsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border bg-card p-8 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <Badge variant="outline" className="rounded-full px-3 py-1">
              Daily Command Center
            </Badge>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight">Operations</h1>
              <p className="text-sm text-muted-foreground sm:text-base">
                Run the school day with a clear pulse across attendance, staffing, academics,
                and collections. Use this space as the team’s operational cockpit.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/dashboard">
                Back to Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/reports">Open Reports</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        {operationsLanes.map((lane) => {
          const Icon = lane.icon;

          return (
            <Card key={lane.title} className="rounded-3xl">
              <CardHeader>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-muted">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle>{lane.title}</CardTitle>
                <CardDescription>{lane.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full justify-between">
                  <Link href={lane.href}>
                    {lane.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.25fr_0.95fr]">
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5" />
              Today&apos;s Readiness Checklist
            </CardTitle>
            <CardDescription>
              A fast scan for the items that usually create midday friction if they slip early.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {operationalChecks.map((check, index) => (
              <div
                key={check}
                className="flex items-start gap-3 rounded-2xl border px-4 py-3"
              >
                <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {index + 1}
                </div>
                <p className="text-sm text-muted-foreground">{check}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              Leadership Focus
            </CardTitle>
            <CardDescription>
              Operational routines that help admins stay ahead of escalations instead of reacting late.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border bg-muted/40 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                <CalendarClock className="h-4 w-4" />
                Morning Review
              </div>
              <p className="text-sm text-muted-foreground">
                Confirm attendance coverage, transport exceptions, and any urgent staffing swaps.
              </p>
            </div>

            <div className="rounded-2xl border bg-muted/40 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                <ClipboardCheck className="h-4 w-4" />
                Midday Review
              </div>
              <p className="text-sm text-muted-foreground">
                Check fee follow-ups, open notices, and unresolved workflow bottlenecks across teams.
              </p>
            </div>

            <div className="rounded-2xl border bg-muted/40 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                <ShieldCheck className="h-4 w-4" />
                Closeout Review
              </div>
              <p className="text-sm text-muted-foreground">
                Capture what slipped, who owns tomorrow&apos;s action items, and what needs parent communication.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
