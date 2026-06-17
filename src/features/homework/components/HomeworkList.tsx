"use client";

import React from "react";
import { useHomeworks } from "../hooks/useHomeworks";
import Loader from "@/components/shared/Loader";

export default function HomeworkList() {
  const { data: response, isLoading } = useHomeworks({ limit: 5 });
  const assignments = response?.data ?? [];

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <Loader />
      </div>
    );
  }

  return (
    <div className="border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-slate-850 dark:text-slate-100">
        Homework Assignments
      </h2>

      <div className="space-y-4">
        {assignments.length === 0 ? (
          <p className="text-sm text-slate-450 dark:text-slate-500 py-4 text-center">
            No homework assignments posted.
          </p>
        ) : (
          assignments.map((homework) => (
            <div
              key={homework._id}
              className="rounded-2xl border border-slate-100 dark:border-slate-900 p-4 bg-slate-50/20 dark:bg-slate-900/10 hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-all duration-200"
            >
              <h3 className="font-semibold text-slate-850 dark:text-slate-200">
                {homework.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-450 mt-1">
                Subject: {homework.subject} | Class: {homework.className}
              </p>
              <div className="mt-3 flex justify-between items-center text-xs">
                <span className="text-slate-400 dark:text-slate-500">
                  Due: {new Date(homework.dueDate).toLocaleDateString()}
                </span>
                <span className="rounded-full bg-blue-100/70 text-blue-700 text-xs px-2.5 py-0.5 font-bold dark:bg-blue-950/30 dark:text-blue-400">
                  Active Task
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
