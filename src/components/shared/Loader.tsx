import { Skeleton } from "@/components/ui/skeleton";

export default function Loader() {
  return (
    <div className="rounded-3xl border bg-card p-6 shadow-sm">
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
}
