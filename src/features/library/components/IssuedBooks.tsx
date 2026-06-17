"use client";

import React from "react";
import { useBooks } from "../hooks/useBooks";
import Loader from "@/components/shared/Loader";

export default function IssuedBooks() {
  const { data: response, isLoading } = useBooks({ limit: 100 });
  const books = response?.data ?? [];

  // Filter books where some copies are checked out
  const issuedList = books.filter((b) => b.totalCopies - b.availableCopies > 0);

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <Loader />
      </div>
    );
  }

  return (
    <div className="border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm">
      <h2 className="mb-4 text-lg font-bold text-slate-800 dark:text-slate-100">
        Issued Books Status
      </h2>

      <div className="space-y-4">
        {issuedList.length === 0 ? (
          <p className="text-sm text-slate-450 dark:text-slate-500 py-4 text-center">
            No books currently issued.
          </p>
        ) : (
          issuedList.map((item) => (
            <div
              key={item._id}
              className="rounded-2xl border border-slate-100 dark:border-slate-900 p-4 bg-slate-50/20 dark:bg-slate-900/10 hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-all duration-200"
            >
              <p className="font-semibold text-slate-850 dark:text-slate-200">
                {item.title}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-450 mt-1">
                Author: {item.author}
              </p>
              <div className="mt-3 flex justify-between items-center text-xs">
                <span className="text-slate-400 dark:text-slate-500">
                  Issued Copies
                </span>
                <span className="rounded-full bg-blue-100/70 text-blue-700 text-xs px-2.5 py-0.5 font-bold dark:bg-blue-950/30 dark:text-blue-400">
                  {item.totalCopies - item.availableCopies} checked out
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
