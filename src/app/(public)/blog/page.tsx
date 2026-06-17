import React from "react";
import Link from "next/link";

const articles = [
  {
    slug: "digitizing-classrooms-in-2026",
    title: "Digitizing Classrooms in 2026: Trends & Challenges",
    date: "June 10, 2026",
    excerpt: "Learn how modern SaaS platforms are automating timetables, grading cards, and fee collections for K-12 institutes.",
  },
  {
    slug: "benefits-of-parent-portals",
    title: "Why Parent Portals Build Stronger School Communities",
    date: "May 28, 2026",
    excerpt: "Increasing transparency in daily student attendance and exam marks leads to higher student academic engagement.",
  },
  {
    slug: "preventing-fee-defaults-alerts",
    title: "How Automated Payment Reminders Prevent Fee Defaults",
    date: "April 15, 2026",
    excerpt: "Explore how school accountants use notifications to prompt parent invoice clearances without manual collections calls.",
  },
];

export default function BlogPage() {
  return (
    <div className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-6 max-w-4xl space-y-16">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black sm:text-6xl bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
            Educational Insights
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Read our latest columns on software-driven school transformations.
          </p>
        </div>

        <div className="space-y-8">
          {articles.map((art, idx) => (
            <article
              key={idx}
              className="rounded-3xl border border-slate-200/50 bg-white p-8 shadow-sm hover:shadow-md transition-all dark:border-slate-800/50 dark:bg-slate-900"
            >
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{art.date}</span>
              <h2 className="text-2xl font-bold mt-2 mb-3 text-slate-850 dark:text-slate-100">{art.title}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">{art.excerpt}</p>
              
              <Link
                href={`/blog/${art.slug}`}
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Read Article →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
