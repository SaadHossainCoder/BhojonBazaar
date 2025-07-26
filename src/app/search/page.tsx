
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { products } from '@/lib/data';
import type { Product } from '@/lib/data';
import { searchProducts } from '@/ai/flows/search-products-flow';
import { SearchX } from 'lucide-react';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }

    const performSearch = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await searchProducts({ query, products });
        const resultProducts = products.filter((p) =>
          response.productIds.includes(p.id)
        );
        setResults(resultProducts);
      } catch (err) {
        console.error('Search failed:', err);
        setError('An error occurred while searching. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query]);

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      {query ? (
        <h1 className="text-3xl font-bold mb-8">
          Search results for: <span className="text-primary">"{query}"</span>
        </h1>
      ) : (
        <h1 className="text-3xl font-bold mb-8">
          Please enter a search term.
        </h1>
      )}

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <div key={i}>
              <Skeleton className="w-full aspect-square mb-2" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : error ? (
        <p className="text-destructive text-center">{error}</p>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
            <SearchX className="w-20 h-20 text-muted-foreground mx-auto mb-6" />
            <p className="text-xl text-muted-foreground">
                No products found matching your search.
            </p>
        </div>
      )}
    </main>
  );
}


export default function SearchPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <Suspense fallback={<div>Loading...</div>}>
                <SearchResults />
            </Suspense>
            <footer className="w-full py-6 mt-12 text-center text-muted-foreground text-sm bg-muted">
                <p>
                © {new Date().getFullYear()} BhojonBazaar. All Rights Reserved.
                </p>
            </footer>
        </div>
    )
}
