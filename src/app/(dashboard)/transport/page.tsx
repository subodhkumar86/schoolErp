import TransportHeader from "@/features/transport/components/TransportHeader";
import TransportStats from "@/features/transport/components/TransportStats";
import TransportTable from "@/features/transport/components/TransportTable";

export default function TransportPage() {
  return (
    <div className="space-y-6">
      <TransportHeader />

      <TransportStats />

      <TransportTable />
    </div>
  );
}

