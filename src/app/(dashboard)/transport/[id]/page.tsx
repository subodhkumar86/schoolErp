"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useTransport } from "@/features/transport/hooks/useTransport";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil, Bus, User, DollarSign, Users } from "lucide-react";

export default function TransportDetailPage() {
  const params = useParams();
  const router = useRouter();
  const routeId = params.id as string;
  const { data: route, isLoading } = useTransport(routeId);

  if (isLoading) return <Loader />;

  if (!route) {
    return (
      <div className="rounded-3xl border bg-card p-6 text-center text-muted-foreground">
        Transport route not found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/transport")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Route Details</h1>
            <p className="text-muted-foreground">
              Detailed tracking profile of transport route fleet
            </p>
          </div>
        </div>

        <Link href={`/transport/${routeId}/edit`} passHref legacyBehavior>
          <Button className="flex items-center gap-2">
            <Pencil className="h-4 w-4" />
            Edit Route
          </Button>
        </Link>
      </div>

      <div className="rounded-3xl border bg-card p-8 shadow-sm space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b pb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{route.routeName}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Route ID: {route._id}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`rounded-full px-3.5 py-1 text-xs font-semibold ${
                route.status === "Active"
                  ? "bg-green-500/20 text-green-600"
                  : route.status === "Maintenance"
                    ? "bg-orange-500/20 text-orange-600"
                    : "bg-red-500/20 text-red-600"
              }`}
            >
              {route.status}
            </span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border p-5 flex items-start gap-4">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <Bus className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Vehicle Details
              </p>
              <h4 className="font-bold text-lg mt-1">{route.vehicleNumber}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Plate Number
              </p>
            </div>
          </div>

          <div className="rounded-2xl border p-5 flex items-start gap-4">
            <div className="rounded-xl bg-green-500/10 p-3 text-green-500">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Monthly Route Cost
              </p>
              <h4 className="font-bold text-lg mt-1 text-green-600">
                ₹{(route.routeCost || 0).toLocaleString()}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Billing charge per student
              </p>
            </div>
          </div>

          <div className="rounded-2xl border p-5 flex items-start gap-4">
            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-500">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Seating Capacity
              </p>
              <h4 className="font-bold text-lg mt-1">
                {route.capacity} Seats
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Total passenger seats
              </p>
            </div>
          </div>

          <div className="rounded-2xl border p-5 flex items-start gap-4">
            <div className="rounded-xl bg-orange-500/10 p-3 text-orange-500">
              <User className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Driver Contact
              </p>
              <h4 className="font-bold text-lg mt-1">
                {route.driverName}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Phone: {route.driverPhone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
