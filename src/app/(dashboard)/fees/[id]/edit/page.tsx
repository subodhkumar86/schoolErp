"use client";

import { useParams, useRouter } from "next/navigation";
import { useFee } from "@/features/fees/hooks/useFee";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import EditFeeForm from "@/features/fees/components/EditFeeForm";

export default function EditFeePage() {
  const params = useParams();
  const router = useRouter();
  const feeId = params.id as string;
  const { data: fee, isLoading } = useFee(feeId);

  if (isLoading) return <Loader />;

  if (!fee) {
    return (
      <div className="rounded-3xl border bg-card p-6 text-center text-muted-foreground">
        Fee payment record not found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push(`/fees/${feeId}`)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Edit Billing Record</h1>
          <p className="text-muted-foreground">
            Update fee invoice parameters, status, and comments
          </p>
        </div>
      </div>

      <EditFeeForm fee={fee} />
    </div>
  );
}
