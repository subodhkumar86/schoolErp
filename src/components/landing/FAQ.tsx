"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is a Tenant and how is data kept secure?",
    answer: "A Tenant represents your specific school organization. In our multi-tenant database schema, every record (student, teacher, timetable, invoice) is securely tagged with your unique schoolId. This ensures that School A's data is completely isolated and inaccessible to School B or any other organization on the platform.",
  },
  {
    question: "Can we start with a trial plan first?",
    answer: "Yes, absolutely! When you sign up, your school starts on a 14-day free trial on the Starter plan. You get full access to student admissions, class setups, timetables, and notice logs so you can evaluate the ERP thoroughly.",
  },
  {
    question: "How do we collect student fees online?",
    answer: "We support integration with popular payment gateways like Razorpay, Stripe, and Paytm. Accountants can generate tuition or library invoices directly in the system. Parents then receive a secure notification link to complete online transactions, which marks the fee status as Paid in real-time.",
  },
  {
    question: "What are the student and teacher usage limits?",
    answer: "Our Starter plan supports up to 100 students and 10 teachers. The Professional plan extends this to 500 students and 50 teachers. For larger universities and colleges, our Enterprise plan has completely unlimited quotas and includes dedicated cloud database hosting.",
  },
  {
    question: "Can we export reports for government compliance audits?",
    answer: "Yes, we support one-click CSV and Excel downloads for student lists, teacher salary sheets, fee transaction statements, and term grading results directly from the Reports page.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-white dark:bg-slate-900 transition-colors">
      <div className="container mx-auto px-6 max-w-3xl space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Everything you need to know about our multi-tenant ERP platform.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((f, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-slate-50/50 overflow-hidden transition-all dark:border-slate-800 dark:bg-slate-950/40"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-6 text-left font-bold text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span>{f.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm leading-relaxed text-slate-500 dark:text-slate-400 border-t border-slate-200/50 pt-4 dark:border-slate-850 animate-fade-in">
                    {f.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
