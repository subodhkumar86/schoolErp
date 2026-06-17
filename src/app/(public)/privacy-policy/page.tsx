import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-6 max-w-3xl space-y-8">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">Privacy Policy</h1>
        <p className="text-slate-500 dark:text-slate-400">Last updated: June 16, 2026</p>

        <hr className="border-slate-200 dark:border-slate-800" />

        <div className="space-y-6 text-slate-700 dark:text-slate-350 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">1. Information We Collect</h2>
            <p>
              We collect information related to student profiles, teacher rosters, class schedules, and fee invoices uploaded by authorized school personnel. We do not store payment card information directly; all online payments are processed securely by Razorpay or Stripe.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">2. Data Isolation & Tenant Boundaries</h2>
            <p>
              EduFlow ERP utilizes strict multi-tenant scoping. Your school data is stored with unique tenant identifiers. Access controls prevent query leakages across different schools, ensuring complete privacy.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">3. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact our support team at privacy@eduflow.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
