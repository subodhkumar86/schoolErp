"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useFee } from "@/features/fees/hooks/useFee";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil, User, DollarSign, Calendar, CreditCard } from "lucide-react";

export default function FeeDetailPage() {
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

  const student =
    fee.studentId && typeof fee.studentId === "object"
      ? fee.studentId
      : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/fees")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Billing Receipt Details</h1>
            <p className="text-muted-foreground">
              Detailed overview of recorded student fee receipt
            </p>
          </div>
        </div>

        <Link href={`/fees/${feeId}/edit`} passHref legacyBehavior>
          <Button className="flex items-center gap-2">
            <Pencil className="h-4 w-4" />
            Edit Record
          </Button>
        </Link>
      </div>

      <div className="rounded-3xl border bg-card p-8 shadow-sm space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b pb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {fee.feeType} Invoice
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Invoice ID: {fee._id}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`rounded-full px-3.5 py-1 text-xs font-semibold ${
                fee.status === "Paid"
                  ? "bg-green-500/20 text-green-600"
                  : fee.status === "Pending"
                    ? "bg-yellow-500/20 text-yellow-600"
                    : fee.status === "Partial"
                      ? "bg-blue-500/20 text-blue-600"
                      : "bg-red-500/20 text-red-600"
              }`}
            >
              {fee.status}
            </span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border p-5 flex items-start gap-4">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <User className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Student & Class
              </p>
              <h4 className="font-bold text-lg mt-1">
                {student?.name ?? "—"}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Class: {student?.studentClass ?? "—"}
                {student?.rollNumber ? ` | Roll: ${student.rollNumber}` : ""}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border p-5 flex items-start gap-4">
            <div className="rounded-xl bg-green-500/10 p-3 text-green-500">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Billing Amount
              </p>
              <h4 className="font-bold text-lg mt-1 text-green-600">
                ₹{fee.amount.toLocaleString()}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Total Invoiced Amount
              </p>
            </div>
          </div>

          <div className="rounded-2xl border p-5 flex items-start gap-4">
            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-500">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Key Dates
              </p>
              <h4 className="font-bold text-sm mt-1">
                Due: {new Date(fee.dueDate).toLocaleDateString()}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Paid: {fee.paidDate ? new Date(fee.paidDate).toLocaleDateString() : "Pending"}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border p-5 flex items-start gap-4">
            <div className="rounded-xl bg-orange-500/10 p-3 text-orange-500">
              <CreditCard className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Payment Details
              </p>
              <h4 className="font-bold text-lg mt-1">
                {fee.paymentMethod ?? "—"}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-[150px]">
                {fee.receiptNumber ? `Ref: ${fee.receiptNumber}` : "No Transaction Ref"}
              </p>
            </div>
          </div>
        </div>

        {fee.remarks && (
          <div className="space-y-2 pt-4">
            <h3 className="text-lg font-bold border-b pb-2">
              Billing Remarks / Exemption Notes
            </h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed border rounded-xl p-4 bg-muted/10">
              {fee.remarks}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
