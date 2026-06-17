import React from "react";

export default function AboutPage() {
  return (
    <div className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-6 max-w-4xl space-y-16">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black sm:text-6xl bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
            Our Mission & Vision
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Learn how we are digitizing schools and empowering academic growth across the globe.
          </p>
        </div>

        <div className="space-y-8 text-slate-750 dark:text-slate-300 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">About EduFlow ERP</h2>
            <p>
              EduFlow ERP is a leading school management solution built specifically for the needs of modern educational organizations. By integrating students, teachers, parents, administrators, accountants, and librarians into a unified platform, we eliminate manual paperwork, automate billing cycles, and foster collaboration.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Our Core Principles</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl border p-6 bg-white dark:bg-slate-900 dark:border-slate-800">
                <h3 className="font-bold text-lg mb-2">Security First</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Data isolation between schools is our highest priority. All records are securely scoped and protected.
                </p>
              </div>
              <div className="rounded-2xl border p-6 bg-white dark:bg-slate-900 dark:border-slate-800">
                <h3 className="font-bold text-lg mb-2">Simplicity</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  A modern, responsive, and mobile-friendly interface designed for easy operation by users of all backgrounds.
                </p>
              </div>
              <div className="rounded-2xl border p-6 bg-white dark:bg-slate-900 dark:border-slate-800">
                <h3 className="font-bold text-lg mb-2">Efficiency</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  From homework submissions to dynamic grade analysis, we focus on saving valuable time for educators.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
