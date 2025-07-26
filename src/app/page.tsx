"use client";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import Header from "@/components/Header";
import VendorCard from "@/components/VendorCard";
import SubscriptionForm from "@/components/SubscriptionForm";

export default function Home() {
  const { vendors } = useContext(AppContext);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-2">
            Daily Market Prices
          </h1>
          <p className="text-lg text-muted-foreground">
            Your daily source for essential item prices.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>

        <SubscriptionForm />
      </main>
      <footer className="w-full py-4 text-center text-muted-foreground text-sm">
        <p>© {new Date().getFullYear()} Daily Market Prices. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
