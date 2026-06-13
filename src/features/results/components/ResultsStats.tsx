"use client";

import { Award, Percent, BookOpen, User } from "lucide-react";
import type { ReactNode } from "react";
import { useResults } from "../hooks/useResults";
import type { ResultType } from "../types/result";

export default function ResultsStats() {
  const { data: response } = useResults({ limit: 1000 });
  const results = (response?.data ?? []) as unknown as ResultType[];
  const total = results.length;

  // Calculations
  let averagePercentage = 0;
  let passingRate = 0;
  let topScorerName = "—";
  let topScorerScore = 0;

  if (total > 0) {
    let totalPercent = 0;
    let passedCount = 0;

    results.forEach((r) => {
      const exam = typeof r.examId === "object" ? r.examId : null;
      if (exam) {
        const percent = (r.marksObtained / exam.totalMarks) * 100;
        totalPercent += percent;

        if (r.marksObtained >= exam.passingMarks) {
          passedCount++;
        }

        if (percent > topScorerScore) {
          topScorerScore = percent;
          const student = typeof r.studentId === "object" ? r.studentId : null;
          topScorerName = student ? student.name : "—";
        }
      }
    });

    averagePercentage = Math.round(totalPercent / total);
    passingRate = Math.round((passedCount / total) * 100);
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Records"
        value={total}
        icon={<BookOpen className="h-10 w-10 text-primary" />}
        color=""
      />

      <StatCard
        title="Average Score"
        value={`${averagePercentage}%`}
        icon={<Percent className="h-10 w-10 text-blue-500" />}
        color="text-blue-500"
      />

      <StatCard
        title="Passing Rate"
        value={`${passingRate}%`}
        icon={<Award className="h-10 w-10 text-green-500" />}
        color="text-green-500"
      />

      <StatCard
        title="Top Scorer"
        value={topScorerName}
        subvalue={
          topScorerScore > 0 ? `${Math.round(topScorerScore)}% Score` : undefined
        }
        icon={<User className="h-10 w-10 text-purple-500" />}
        color="text-purple-500"
      />
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number | string;
  subvalue?: string;
  icon: ReactNode;
  color: string;
}

function StatCard({ title, value, subvalue, icon, color }: StatCardProps) {
  return (
    <div className="rounded-3xl border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className={`mt-2 text-2xl font-bold truncate max-w-[150px] ${color}`}>
            {value}
          </h3>
          {subvalue && (
            <p className="text-xs text-muted-foreground mt-0.5">{subvalue}</p>
          )}
        </div>
        {icon}
      </div>
    </div>
  );
}
