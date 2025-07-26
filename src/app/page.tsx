"use client";

import { useState } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import { products, categories } from "@/lib/data";
import type { Category, Product } from "@/lib/data";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "Vegetables"
  );

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div className="bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <section>
          <div className="flex items-center mb-6">
            <span className="w-1 h-7 bg-primary mr-3"></span>
            <h2 className="text-2xl font-bold">Today's Deals</h2>
          </div>

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
      <footer className="w-full py-6 mt-12 text-center text-muted-foreground text-sm bg-muted">
        <p>
          © {new Date().getFullYear()} BhojonBazaar. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
