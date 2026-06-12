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
    <Card className="border-0 shadow-md hover:shadow-xl transition-all">
      <div className="p-6 flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-sm">{title}</p>

          <h2 className="text-4xl font-bold mt-2">{value}</h2>

          <p className="text-xs text-muted-foreground mt-2">{description}</p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-xl">{icon}</div>
      </div>
    </Card>
  );
}
