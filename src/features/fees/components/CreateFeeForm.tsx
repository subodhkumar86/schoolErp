"use client";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { feeSchema, type FeeFormValues } from "../schemas/feeSchema";
import { useCreateFee } from "../hooks/useCreateFee";
import { useStudents } from "@/features/students/hooks/useStudents";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function CreateFeeForm() {
  const router = useRouter();
  const createFee = useCreateFee();

  // Fetch students for the dropdown selection
  const { data: studentsRes } = useStudents({ limit: 1000, status: "Active" });
  const students = studentsRes?.data ?? [];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FeeFormValues>({
    resolver: zodResolver(feeSchema) as unknown as Resolver<FeeFormValues>,
    defaultValues: {
      studentId: "",
      feeType: "Tuition",
      amount: 0,
      dueDate: new Date().toISOString().split("T")[0],
      paidDate: "",
      status: "Pending",
      paymentMethod: "",
      remarks: "",
      receiptNumber: "",
    },
  });

  const selectedStatus = watch("status");

  const onSubmit = async (data: FeeFormValues) => {
    try {
      // Clean payment method and paidDate if pending/overdue
      const cleanData = {
        ...data,
        paymentMethod:
          data.status === "Paid" || data.status === "Partial"
            ? data.paymentMethod || undefined
            : undefined,
        paidDate:
          data.status === "Paid" || data.status === "Partial"
            ? data.paidDate || undefined
            : undefined,
        receiptNumber: data.receiptNumber || undefined,
        remarks: data.remarks || "",
      };

      await createFee.mutateAsync(cleanData);
      toast.success("Fee record created successfully");
      router.push("/fees");
    } catch (error) {
      toast.error("Failed to create fee record");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-xl bg-card border rounded-3xl p-8 shadow-sm"
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="studentId">Student Name</Label>
          <select
            id="studentId"
            {...register("studentId")}
            className="mt-1 w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
          >
            <option value="">Select Student</option>
            {students.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name} (Roll: {s.rollNumber}, Class: {s.studentClass})
              </option>
            ))}
          </select>
          {errors.studentId && (
            <p className="mt-1 text-sm text-red-500">{errors.studentId.message}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="feeType">Fee Type</Label>
            <select
              id="feeType"
              {...register("feeType")}
              className="mt-1 w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
            >
              <option value="Tuition">Tuition</option>
              <option value="Transport">Transport</option>
              <option value="Library">Library</option>
              <option value="Hostel">Hostel</option>
              <option value="Exam">Exam</option>
              <option value="Sports">Sports</option>
              <option value="Other">Other</option>
            </select>
            {errors.feeType && (
              <p className="mt-1 text-sm text-red-500">{errors.feeType.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="e.g. 5000"
              {...register("amount")}
              className="mt-1"
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-red-500">{errors.amount.message}</p>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              {...register("dueDate")}
              className="mt-1"
            />
            {errors.dueDate && (
              <p className="mt-1 text-sm text-red-500">{errors.dueDate.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="status">Payment Status</Label>
            <select
              id="status"
              {...register("status")}
              className="mt-1 w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Partial">Partial</option>
              <option value="Overdue">Overdue</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-500">{errors.status.message}</p>
            )}
          </div>
        </div>

        {(selectedStatus === "Paid" || selectedStatus === "Partial") && (
          <div className="grid gap-4 sm:grid-cols-2 border-t pt-4 mt-2">
            <div>
              <Label htmlFor="paidDate">Paid Date</Label>
              <Input
                id="paidDate"
                type="date"
                {...register("paidDate")}
                className="mt-1"
              />
              {errors.paidDate && (
                <p className="mt-1 text-sm text-red-500">{errors.paidDate.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <select
                id="paymentMethod"
                {...register("paymentMethod")}
                className="mt-1 w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
              >
                <option value="">Select Method</option>
                <option value="Cash">Cash</option>
                <option value="Online">Online</option>
                <option value="Cheque">Cheque</option>
                <option value="DD">DD</option>
              </select>
              {errors.paymentMethod && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.paymentMethod.message}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="receiptNumber">Receipt / Transaction Number (Optional)</Label>
            <Input
              id="receiptNumber"
              placeholder="e.g. REC-102938"
              {...register("receiptNumber")}
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="remarks">Remarks / Internal Notes (Optional)</Label>
          <textarea
            id="remarks"
            placeholder="Add invoice notes or special fee exemptions description..."
            {...register("remarks")}
            className="mt-1 w-full min-h-[80px] rounded-md border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="flex gap-4 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/fees")}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1"
          disabled={createFee.isPending}
        >
          {createFee.isPending ? "Recording..." : "Record Payment"}
        </Button>
      </div>
    </form>
  );
}
