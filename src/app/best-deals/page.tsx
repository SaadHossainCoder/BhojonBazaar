
"use client";

import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";
import type { Product } from "@/lib/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function BestDealsPage() {
  // Group products by vendor
  const productsByVendor = products.reduce((acc, product) => {
    const vendor = product.vendor;
    if (!acc[vendor]) {
      acc[vendor] = [];
    }
    acc[vendor].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Today's Best Deals</h1>
          <p className="text-lg text-muted-foreground">
            Explore top products from all our trusted vendors at the best prices.
          </p>
        </div>

        <Accordion type="multiple" className="w-full">
          {Object.entries(productsByVendor).map(([vendor, vendorProducts]) => (
            <AccordionItem key={vendor} value={vendor}>
              <AccordionTrigger className="text-2xl font-semibold py-4">
                {vendor}
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4">
                  {vendorProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
      <footer className="w-full py-6 mt-auto text-center text-muted-foreground text-sm bg-muted">
        <p>© {new Date().getFullYear()} bazar. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
