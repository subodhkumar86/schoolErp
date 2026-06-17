import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

const articlesData: Record<string, { title: string; date: string; content: string }> = {
  "digitizing-classrooms-in-2026": {
    title: "Digitizing Classrooms in 2026: Trends & Challenges",
    date: "June 10, 2026",
    content: "Educational software is transitioning from simple recording logs to automated workflows. Modern ERP systems now auto-assign timetable slots based on teacher availability, manage books inventory without manual ledger pages, and automatically compute student present percentages. However, implementing isolated databases across large school networks remains a core architecture challenge. Multi-tenant designs like ours isolate school directories, assuring parents of safe profile storage.",
  },
  "benefits-of-parent-portals": {
    title: "Why Parent Portals Build Stronger School Communities",
    date: "May 28, 2026",
    content: "When parents are kept in the loop on children's test results, daily attendance slots, and class notice releases, their academic engagement spikes. Modern Parent Portals avoid SMS overheads by deploying instant push notifications in web portals, bringing transparent grading access directly to mobile devices without additional telecommunication fees.",
  },
  "preventing-fee-defaults-alerts": {
    title: "How Automated Payment Reminders Prevent Fee Defaults",
    date: "April 15, 2026",
    content: "Schools typically lose 5-8% of term revenues to late or missing fee cycles. By automating invoices with pending alerts, accountants can trigger digital receipts and collect funds online via integrated credit cards, online banking, and UPI networks, keeping school budgets in order without manual follow-up calls.",
  },
};

interface Params {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const article = articlesData[slug];

  if (!article) {
    notFound();
  }

  return (
    <div className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-6 max-w-2xl space-y-6">
        <Link href="/blog" className="text-sm font-semibold text-blue-650 hover:underline">
          ← Back to Blog Feed
        </Link>
        <span className="text-xs text-slate-550 block">{article.date}</span>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">{article.title}</h1>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed pt-4 whitespace-pre-line">
          {article.content}
        </p>
      </div>
    </div>
  );
}
