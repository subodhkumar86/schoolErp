import LibraryStats from "@/features/library/components/LibraryStats";
import BooksTable from "@/features/library/components/BooksTable";
import IssuedBooks from "@/features/library/components/IssuedBooks";
import FineSummary from "@/features/library/components/FineSummary";

export default function LibraryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Library Management</h1>

        <p className="text-muted-foreground">
          Manage books and library operations
        </p>
      </div>

      <LibraryStats />

      <FineSummary />

      <div className="grid gap-6 lg:grid-cols-2">
        <BooksTable />
        <IssuedBooks />
      </div>
    </div>
  );
}
