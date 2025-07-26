"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import type { Product } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="group overflow-hidden border-0 shadow-none hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0 bg-muted">
        <div className="relative w-full aspect-square">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            data-ai-hint={product.hint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 text-center">
        <CardTitle className="text-sm font-medium truncate">
          {product.name}
        </CardTitle>
        <div className="flex justify-center items-center gap-2 mt-2">
          <span className="font-bold text-primary">${product.price.toFixed(2)}</span>
          <span className="text-sm text-muted-foreground line-through">
            ${product.originalPrice.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-center items-center gap-1 mt-2 text-xs text-muted-foreground">
          <div className="flex text-yellow-500">
             {[...Array(Math.floor(product.rating))].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
            ))}
            {product.rating % 1 !== 0 && <Star className="w-4 h-4" />}
          </div>
          <span>({product.rating.toFixed(1)})</span>
        </div>
      </CardContent>
    </Card>
  );
}
