import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { pendingFeesData } from "../mock/fees";

export default function PendingFeesTable() {
  return (
    <div className="rounded-2xl border bg-card p-4">
      <h2 className="mb-4 text-xl font-semibold">Pending Fees</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {pendingFeesData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.class}</TableCell>
              <TableCell>{item.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
