import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { feeCollectionData } from "../mock/fees";

export default function FeeCollectionTable() {
  return (
    <div className="rounded-2xl border bg-card p-4">
      <h2 className="mb-4 text-xl font-semibold">Recent Collections</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {feeCollectionData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.student}</TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell>{item.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
