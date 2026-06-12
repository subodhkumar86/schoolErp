import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { assets } from "../mock/inventory";

export default function AssetsTable() {
  return (
    <div className="rounded-2xl border bg-card p-4">
      <h2 className="mb-4 text-xl font-semibold">Assets Inventory</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {assets.map((asset) => (
            <TableRow key={asset.id}>
              <TableCell>{asset.asset}</TableCell>
              <TableCell>{asset.category}</TableCell>
              <TableCell>{asset.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
