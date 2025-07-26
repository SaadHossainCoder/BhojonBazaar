"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppContext } from "@/context/AppContext";
import PriceUpdateForm from "@/components/PriceUpdateForm";
import VendorCard from "@/components/VendorCard";
import { useIsClient } from "@/hooks/use-is-client";

export default function DashboardPage() {
  const { isAuthenticated, vendors } = useContext(AppContext);
  const router = useRouter();
  const isClient = useIsClient();

  useEffect(() => {
    if (isClient && !isAuthenticated) {
      router.replace("/admin");
    }
  }, [isAuthenticated, isClient, router]);
  
  if (!isClient || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
            <p className="text-lg text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold font-headline mb-2">Admin Dashboard</h1>
      <p className="text-muted-foreground mb-8">
        Update food item prices and notify subscribers.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <PriceUpdateForm />
        </div>
        <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold font-headline mb-4">Live Vendor Preview</h2>
            <div className="grid gap-6 md:grid-cols-1">
                {vendors.map(vendor => (
                    <VendorCard key={vendor.id} vendor={vendor} />
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
