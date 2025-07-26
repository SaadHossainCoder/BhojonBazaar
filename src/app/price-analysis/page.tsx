'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { products } from '@/lib/data';
import type { Product } from '@/lib/data';
import {
  analyzePrices,
  type PriceAnalysisOutput,
} from '@/ai/flows/analyze-prices-flow';
import { Sparkles } from 'lucide-react';

export default function PriceAnalysisPage() {
  const [analysis, setAnalysis] = useState<PriceAnalysisOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAnalysis = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await analyzePrices({ products });
        setAnalysis(result);
      } catch (err) {
        setError('Failed to analyze prices. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getAnalysis();
  }, []);

  const getProductById = (id: string): Product | undefined => {
    return products.find((p) => p.id === id);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">AI-Powered Price Analysis</h1>
          <p className="text-lg text-muted-foreground">
            Our AI assistant helps you find the best value for your money.
          </p>
        </div>

        <Card className="mb-12 bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Sparkles className="w-6 h-6" />
              Analysis Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ) : error ? (
              <p className="text-destructive">{error}</p>
            ) : (
              <p className="text-lg">{analysis?.analysisSummary}</p>
            )}
          </CardContent>
        </Card>

        <div>
          <h2 className="text-3xl font-bold mb-6">Top Deals</h2>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-48 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-destructive mb-4">
                Could not load top deals.
              </p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {analysis?.topDeals.map((deal) => {
                const product = getProductById(deal.productId);
                if (!product) return null;
                return (
                  <Card
                    key={deal.productId}
                    className="flex flex-col md:flex-row items-center gap-6 p-4 hover:shadow-lg transition-shadow"
                  >
                    <div className="w-full md:w-1/4 lg:w-1/5">
                      <ProductCard product={product} />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold mb-2 text-primary">
                        Why is this a top deal?
                      </h3>
                      <p className="text-muted-foreground">
                        {deal.justification}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <footer className="w-full py-6 mt-auto text-center text-muted-foreground text-sm bg-muted">
        <p>© {new Date().getFullYear()} bazar. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
