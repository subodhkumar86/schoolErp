import LibraryHeader from "@/features/library/components/LibraryHeader";
import LibraryStats from "@/features/library/components/LibraryStats";
import BooksTable from "@/features/library/components/BooksTable";
import IssuedBooks from "@/features/library/components/IssuedBooks";
import FineSummary from "@/features/library/components/FineSummary";

export default function LibraryPage() {
  return (
    <div className="space-y-6">
      <LibraryHeader />

      <LibraryStats />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <BooksTable />
        </div>
        <div className="space-y-6">
          <FineSummary />
          <IssuedBooks />
        </div>
      </div>
    </div>
  );
}

