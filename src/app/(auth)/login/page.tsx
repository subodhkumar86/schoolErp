import LoginForm from "@/features/auth/components/LoginForm";
import { CheckCircle, ShieldCheck, Award, Star } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      
      {/* Left Column: Visual branding and features (visible only on large screens) */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-blue-600 to-indigo-900 text-white relative overflow-hidden">
        
        {/* Subtle decorative circles */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        {/* Top brand header */}
        <div className="relative z-10 flex items-center gap-2">
          <Link href="/" className="text-2xl font-black tracking-tight hover:scale-105 transition-transform">
            EduFlow ERP
          </Link>
          <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
            SaaS Edition
          </span>
        </div>

        {/* Middle hero details and illustration */}
        <div className="relative z-10 space-y-8 max-w-xl">
          <div className="space-y-3">
            <h2 className="text-4xl font-extrabold leading-tight tracking-tight">
              Manage your entire educational institution in one secure ecosystem.
            </h2>
            <p className="text-slate-200 text-sm leading-relaxed">
              Empower school administrators, teachers, parents, and students with isolated databases, automated invoicing, real-time calendars, and fine tracking.
            </p>
          </div>

          {/* Core Feature Checklist */}
          <ul className="space-y-3.5 text-sm font-medium">
            <li className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
              <span>Isolated tenant boundaries scoping all ERP modules</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
              <span>Full-suite parent portals for grade & fee tracking</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
              <span>Librarian registers & asset inventory logs</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
              <span>Dynamic statistics analytics charts</span>
            </li>
          </ul>

          {/* Premium Glassmorphic Stats Mockup Card */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md shadow-2xl flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-350">DATA PRIVACY ASSURED</p>
              <p className="text-xs text-slate-300 mt-0.5">Strict database row filtering scopes queries by your unique school tenant ID.</p>
            </div>
          </div>
        </div>

        {/* Bottom trust indicators */}
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-xs font-semibold text-slate-200 ml-2">Trusted by 500+ schools worldwide</span>
          </div>
          
          <div className="flex gap-6 text-xs text-slate-300 font-medium">
            <span className="flex items-center gap-1"><Award className="h-4 w-4" /> ISO 27001 Certified</span>
            <span className="flex items-center gap-1">⚡ Ultra-low 90ms response times</span>
          </div>
        </div>
      </div>

      {/* Right Column: Secure Login Form */}
      <div className="flex items-center justify-center p-6 sm:p-12 relative overflow-hidden bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
        
        {/* Subtle background abstract shapes */}
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
        
        <div className="w-full max-w-md relative z-10">
          {/* Logo visible on mobile only */}
          <div className="lg:hidden text-center mb-6">
            <h1 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              EduFlow ERP
            </h1>
            <p className="text-xs text-muted-foreground mt-1">SaaS Educational Ecosystem</p>
          </div>

          <LoginForm />
        </div>
      </div>
      
    </div>
  );
}
