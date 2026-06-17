import Link from "next/link";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "₹1,000",
    period: "/month",
    description: "Ideal for tutoring academies and small preschools.",
    features: [
      "Up to 100 students",
      "Up to 10 teachers",
      "Core ERP Modules (Admissions, Attendance, Classes)",
      "Basic Notices & Notifications",
      "Email support",
    ],
    cta: "Start 14-day Trial",
    highlight: false,
  },
  {
    name: "Professional",
    price: "₹3,000",
    period: "/month",
    description: "Perfect for primary and secondary schools.",
    features: [
      "Up to 500 students",
      "Up to 50 teachers",
      "All Starter Plan features",
      "Exams & Result Grading",
      "Fee Invoicing & Payments tracking",
      "Digital Library Catalog",
      "Priority Email & Chat support",
    ],
    cta: "Start 14-day Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For colleges, universities, and large school networks.",
    features: [
      "Unlimited students",
      "Unlimited teachers",
      "All Professional Plan features",
      "Inventory & Asset register",
      "Bus Transport route tracking",
      "Advanced CSV/Excel Reporting",
      "Dedicated 24/7 account manager",
      "Custom integrations & subdomains",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-6 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Flexible, Scalable Pricing
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            No hidden setup fees. Upgrade or downgrade your plan as your student enrollments grow.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
          {plans.map((p, idx) => (
            <div
              key={idx}
              className={`rounded-3xl border p-8 flex flex-col justify-between relative transition-all duration-300 ${
                p.highlight
                  ? "bg-white border-blue-600 shadow-xl scale-[1.03] z-10 dark:bg-slate-900 dark:border-blue-500"
                  : "bg-white/75 border-slate-200/60 shadow-md hover:shadow-lg hover:scale-[1.01] dark:bg-slate-900/50 dark:border-slate-800"
              }`}
            >
              {p.highlight && (
                <span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-bold text-white uppercase tracking-wider dark:bg-blue-500">
                  Most Popular
                </span>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{p.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{p.description}</p>
                </div>

                <div className="flex items-baseline">
                  <span className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                    {p.price}
                  </span>
                  <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 ml-1">
                    {p.period}
                  </span>
                </div>

                <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-350">
                  {p.features.map((f, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <Link
                  href={p.price === "Custom" ? "/contact" : "/demo"}
                  className={`block w-full py-3.5 px-6 rounded-2xl text-center text-sm font-bold active:scale-95 transition-all ${
                    p.highlight
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {p.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
