
"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { products, vendors, Vendor } from "@/lib/data";
import type { Product } from "@/lib/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MapPin, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type VendorWithDistance = Vendor & { distance: number };

export default function BestDealsPage() {
  const { toast } = useToast();
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [nearbyVendors, setNearbyVendors] = useState<VendorWithDistance[]>([]);

  // Group products by vendor
  const productsByVendor = products.reduce((acc, product) => {
    const vendor = product.vendor;
    if (!acc[vendor]) {
      acc[vendor] = [];
    }
    acc[vendor].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  const haversineDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const findNearbyVendors = () => {
    setLoadingLocation(true);
    setNearbyVendors([]);
    if (!navigator.geolocation) {
      toast({
        variant: "destructive",
        title: "Geolocation not supported",
        description: "Your browser does not support geolocation.",
      });
      setLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const vendorsWithDistance = vendors
          .map((vendor) => ({
            ...vendor,
            distance: haversineDistance(
              latitude,
              longitude,
              vendor.location.lat,
              vendor.location.lon
            ),
          }))
          .sort((a, b) => a.distance - b.distance);

        setNearbyVendors(vendorsWithDistance);
        setLoadingLocation(false);
        toast({
          title: "Nearby vendors found!",
          description: "Showing vendors sorted by distance.",
        });
      },
      (error) => {
        console.error("Geolocation error:", error);
        toast({
          variant: "destructive",
          title: "Could not get location",
          description:
            "Please ensure you have enabled location permissions for this site.",
        });
        setLoadingLocation(false);
      }
    );
  };

  const vendorsToShow =
    nearbyVendors.length > 0
      ? nearbyVendors.map((v) => v.name)
      : Object.keys(productsByVendor);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Today's Best Deals</h1>
          <p className="text-lg text-muted-foreground">
            Explore top products from all our trusted vendors at the best
            prices.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <Button onClick={findNearbyVendors} disabled={loadingLocation}>
            {loadingLocation ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <MapPin className="mr-2 h-4 w-4" />
            )}
            Find Nearby Vendors
          </Button>
        </div>

        {nearbyVendors.length > 0 && (
          <div className="mb-8 p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold text-center text-primary">
              Showing vendors nearest to you
            </h3>
          </div>
        )}

        <Accordion type="multiple" className="w-full">
          {vendorsToShow.map((vendorName) => {
              const vendorDetails = nearbyVendors.find(v => v.name === vendorName);
              return (
                <AccordionItem key={vendorName} value={vendorName}>
                  <AccordionTrigger className="text-2xl font-semibold py-4">
                    <div className="flex justify-between w-full items-center pr-4">
                      <span>{vendorName}</span>
                      {vendorDetails && (
                        <span className="text-sm font-normal text-muted-foreground bg-secondary px-2 py-1 rounded-md">
                          ~{vendorDetails.distance.toFixed(1)} km away
                        </span>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4">
                      {(productsByVendor[vendorName] || []).map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })
          }
        </Accordion>
      </main>
      <footer className="w-full py-6 mt-auto text-center text-muted-foreground text-sm bg-muted">
        <p>© {new Date().getFullYear()} BhojonBazaar. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
