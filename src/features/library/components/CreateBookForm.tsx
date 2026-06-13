"use client";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { bookSchema, type BookFormValues } from "../schemas/bookSchema";
import { useCreateBook } from "../hooks/useCreateBook";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function CreateBookForm() {
  const router = useRouter();
  const createBook = useCreateBook();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema) as unknown as Resolver<BookFormValues>,
    defaultValues: {
      title: "",
      author: "",
      isbn: "",
      category: "Other",
      totalCopies: 1,
      availableCopies: 1,
      shelfLocation: "",
      status: "Available",
    },
  });

  const onSubmit = async (data: BookFormValues) => {
    try {
      await createBook.mutateAsync(data);
      toast.success("Book added to library catalog successfully");
      router.push("/library");
    } catch (error) {
      toast.error("Failed to add book to catalog");
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
          <Label htmlFor="title">Book Title</Label>
          <Input
            id="title"
            placeholder="e.g. Advanced Calculus, Clean Code"
            {...register("title")}
            className="mt-1"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="author">Author Name</Label>
          <Input
            id="author"
            placeholder="e.g. Robert C. Martin, H.C. Verma"
            {...register("author")}
            className="mt-1"
          />
          {errors.author && (
            <p className="mt-1 text-sm text-red-500">{errors.author.message}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="isbn">ISBN (Optional)</Label>
            <Input
              id="isbn"
              placeholder="e.g. 978-3-16-148410-0"
              {...register("isbn")}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              {...register("category")}
              className="mt-1 w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
            >
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
              <option value="History">History</option>
              <option value="Fiction">Fiction</option>
              <option value="Other">Other</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="totalCopies">Total Copies</Label>
            <Input
              id="totalCopies"
              type="number"
              {...register("totalCopies")}
              className="mt-1"
            />
            {errors.totalCopies && (
              <p className="mt-1 text-sm text-red-500">
                {errors.totalCopies.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="availableCopies">Available Copies</Label>
            <Input
              id="availableCopies"
              type="number"
              {...register("availableCopies")}
              className="mt-1"
            />
            {errors.availableCopies && (
              <p className="mt-1 text-sm text-red-500">
                {errors.availableCopies.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="shelfLocation">Shelf Location (Optional)</Label>
            <Input
              id="shelfLocation"
              placeholder="e.g. A-3, Floor 2"
              {...register("shelfLocation")}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="status">Availability Status</Label>
            <select
              id="status"
              {...register("status")}
              className="mt-1 w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
            >
              <option value="Available">Available</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Reserved">Reserved</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/library")}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1"
          disabled={createBook.isPending}
        >
          {createBook.isPending ? "Adding..." : "Add Book"}
        </Button>
      </div>
    </form>
  );
}
