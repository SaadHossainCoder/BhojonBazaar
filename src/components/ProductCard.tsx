"use client";

import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";
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
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="group overflow-hidden border-0 shadow-none hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <CardHeader className="p-0 bg-muted relative">
        <div className="relative w-full aspect-square">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            data-ai-hint={product.hint}
          />
        </div>
        <Button
          size="sm"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardHeader>
      <CardContent className="p-4 text-center flex-grow">
        <CardTitle className="text-sm font-medium truncate">
          {product.name}
        </CardTitle>
        <div className="flex justify-center items-center gap-2 mt-2">
          <span className="font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
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
