
"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import { categories } from "@/lib/data";
import type { Product } from "@/lib/data";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "Vegetables"
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productsCollection = collection(db, 'products');
        const productSnapshot = await getDocs(productsCollection);
        const productList = productSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as Product);
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
             {loading ? (
              [...Array(5)].map((_, i) => (
                <CardSkeleton key={i} />
              ))
            ) : (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
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

const CardSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  )
}
