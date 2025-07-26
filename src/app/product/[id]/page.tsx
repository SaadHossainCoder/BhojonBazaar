"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";
import { products } from "@/lib/data";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params;
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");


  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <p className="text-2xl text-muted-foreground">Product not found.</p>
        </main>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
     if (reviewRating === 0) {
      toast({
        variant: "destructive",
        title: "Rating required",
        description: "Please select a rating before submitting.",
      });
      return;
    }
    console.log({
      name: reviewName,
      rating: reviewRating,
      comment: reviewComment,
    });
    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
    });
    // In a real app, you would handle form submission here
    setReviewName("");
    setReviewRating(0);
    setReviewComment("");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="relative aspect-square rounded-lg overflow-hidden border">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                data-ai-hint={product.hint}
              />
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => {
                  const ratingValue = i + 1;
                  return (
                     <Star
                      key={i}
                      className={cn(
                        "w-5 h-5",
                        ratingValue <= product.rating
                          ? "fill-current"
                          : "fill-transparent"
                      )}
                    />
                  );
                 })}
              </div>
              <span className="text-muted-foreground">
                ({product.rating.toFixed(1)} rating)
              </span>
            </div>
            <div className="text-3xl font-bold text-primary mb-6">
              <span>${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through ml-4">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <div className="space-y-4 text-muted-foreground mb-6">
              <p>
                <span className="font-semibold text-foreground">Vendor:</span>{" "}
                {product.vendor}
              </p>
              <p>
                <span className="font-semibold text-foreground">
                  Available Since:
                </span>{" "}
                {new Date(product.date).toLocaleDateString()}
              </p>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">Category:</span>{" "}
                <Badge variant="secondary">{product.category}</Badge>
              </div>
            </div>
            <p className="mb-8">
              This is a placeholder description for {product.name}. A more
              detailed description would include information about its origin,
              nutritional value, and suggested uses.
            </p>
            <Button size="lg" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        <Separator className="my-12" />

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Customer Feedback</h2>
            <div className="space-y-6">
              {product.feedback?.length > 0 ? (
                product.feedback.map((fb, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{fb.author}</CardTitle>
                        <div className="flex text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                             <Star
                              key={i}
                              className={cn(
                                "w-4 h-4",
                                i < fb.rating
                                  ? "fill-current"
                                  : "fill-transparent"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{fb.comment}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-muted-foreground">
                  No feedback for this product yet.
                </p>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">Leave a Review</h2>
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="review-name">Your Name</Label>
                    <Input id="review-name" placeholder="John Doe" required 
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Rating</Label>
                    <div className="flex gap-1 text-yellow-500 cursor-pointer" onMouseLeave={() => setHoverRating(0)}>
                      {[...Array(5)].map((_, i) => {
                        const ratingValue = i + 1;
                        return (
                          <Star
                            key={i}
                            className={cn("w-6 h-6", ratingValue <= (hoverRating || reviewRating) ? 'fill-current' : 'fill-transparent')}
                            onClick={() => setReviewRating(ratingValue)}
                            onMouseEnter={() => setHoverRating(ratingValue)}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="review-comment">Your Review</Label>
                    <Textarea
                      id="review-comment"
                      placeholder="What did you think of the product?"
                      required
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Submit Review
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="w-full py-6 mt-12 text-center text-muted-foreground text-sm bg-muted">
        <p>© {new Date().getFullYear()} bazar. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
