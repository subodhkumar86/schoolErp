import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface Props {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
}

export default function StatsCard({ title, value, description, icon }: Props) {
  return (
    <Card className="relative overflow-hidden border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 shadow-sm hover:shadow-xl hover:border-blue-500/20 dark:hover:border-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 group">
      {/* Decorative gradient blur background */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-blue-500/5 blur-xl group-hover:bg-blue-500/10 transition-all duration-300" />
      
      <div className="p-6 flex items-center justify-between relative z-10">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{title}</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 mt-1">{value}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">{description}</p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </div>
    </Card>
  );
}
