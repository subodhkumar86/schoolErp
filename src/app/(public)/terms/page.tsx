import React from "react";

export default function TermsPage() {
  return (
    <div className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-6 max-w-3xl space-y-8">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">Terms of Service</h1>
        <p className="text-slate-500 dark:text-slate-400">Last updated: June 16, 2026</p>

        <hr className="border-slate-200 dark:border-slate-800" />

        <div className="space-y-6 text-slate-700 dark:text-slate-350 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">1. Acceptance of Terms</h2>
            <p>
              By signing up for an EduFlow ERP trial or paid subscription, you agree to comply with and be bound by these terms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">2. Usage Limitations</h2>
            <p>
              Subscription plans carry limits on active student and teacher counts (e.g. 100 students on the Starter plan). Exceeding these limits will restrict creating new profiles until you upgrade your subscription.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">3. Termination</h2>
            <p>
              We reserve the right to suspend accounts with overdue fees or those violating standard security boundaries.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
