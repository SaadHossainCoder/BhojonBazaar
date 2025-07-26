"use client";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BestDealsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold mb-4">Best Deals</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Check out our amazing offers and discounts!
          </p>
          <Link href="/">
            <Button>Go to Homepage</Button>
          </Link>
        </div>
      </main>
      <footer className="w-full py-6 mt-auto text-center text-muted-foreground text-sm bg-muted">
        <p>© {new Date().getFullYear()} bazar. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
