"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useHomework } from "@/features/homework/hooks/useHomework";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil, BookOpen, Clock, Award, User } from "lucide-react";

export default function HomeworkDetailPage() {
  const params = useParams();
  const router = useRouter();
  const homeworkId = params.id as string;
  const { data: homework, isLoading } = useHomework(homeworkId);

  if (isLoading) return <Loader />;

  if (!homework) {
    return (
      <div className="rounded-3xl border bg-card p-6 text-center text-muted-foreground">
        Homework assignment not found
      </div>
    );
  }

  const teacher =
    homework.teacherId && typeof homework.teacherId === "object"
      ? homework.teacherId
      : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/homework")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Homework Details</h1>
            <p className="text-muted-foreground">
              Detailed overview of assigned homework task
            </p>
          </div>
        </div>

        <Link href={`/homework/${homeworkId}/edit`} passHref legacyBehavior>
          <Button className="flex items-center gap-2">
            <Pencil className="h-4 w-4" />
            Edit Assignment
          </Button>
        </Link>
      </div>

      <div className="rounded-3xl border bg-card p-8 shadow-sm space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b pb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{homework.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Assignment ID: {homework._id}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`rounded-full px-3.5 py-1 text-xs font-semibold ${
                homework.status === "Active"
                  ? "bg-green-500/20 text-green-600"
                  : "bg-red-500/20 text-red-600"
              }`}
            >
              {homework.status}
            </span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border p-5 flex items-start gap-4">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Subject & Class
              </p>
              <h4 className="font-bold text-lg mt-1">{homework.subject}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Class: {homework.className}
                {homework.section ? ` - ${homework.section}` : ""}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border p-5 flex items-start gap-4">
            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-500">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Due Date
              </p>
              <h4 className="font-bold text-lg mt-1">
                {new Date(homework.dueDate).toLocaleDateString()}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Submission Deadline
              </p>
            </div>
          </div>

          <div className="rounded-2xl border p-5 flex items-start gap-4">
            <div className="rounded-xl bg-purple-500/10 p-3 text-purple-500">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Evaluation Marks
              </p>
              <h4 className="font-bold text-lg mt-1">
                {homework.maxPoints} Max Points
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Total attainable score
              </p>
            </div>
          </div>

          <div className="rounded-2xl border p-5 flex items-start gap-4">
            <div className="rounded-xl bg-orange-500/10 p-3 text-orange-500">
              <User className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Assigned Teacher
              </p>
              <h4 className="font-bold text-lg mt-1">
                {teacher?.name ?? "Not Assigned"}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                {teacher ? `ID: ${teacher.employeeId}` : "—"}
              </p>
            </div>
          </div>
        </div>

        {homework.description && (
          <div className="space-y-2 pt-4">
            <h3 className="text-lg font-bold border-b pb-2">
              Assignment Description / Instructions
            </h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed border rounded-xl p-4 bg-muted/10">
              {homework.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
