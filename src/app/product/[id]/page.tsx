
"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { Star, ShoppingCart, MapPin, Loader2 } from "lucide-react";
import type { Product, Feedback } from "@/lib/data";
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
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const productRef = doc(db, 'products', id);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          const productData = { ...productSnap.data(), id: productSnap.id } as Product;
          setProduct(productData);
          setFeedback(productData.feedback || []);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);


  if (loading) {
     return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
           <ProductPageSkeleton />
        </main>
      </div>
    );
  }

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

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     if (reviewRating === 0) {
      toast({
        variant: "destructive",
        title: "Rating required",
        description: "Please select a rating before submitting.",
      });
      return;
    }

    const newFeedback: Feedback = {
      author: reviewName,
      rating: reviewRating,
      comment: reviewComment,
    };

    try {
      const productRef = doc(db, 'products', id);
      await updateDoc(productRef, {
        feedback: arrayUnion(newFeedback)
      });
      setFeedback(prevFeedback => [newFeedback, ...prevFeedback]);
      toast({
        title: "Review Submitted",
        description: "Thank you for your feedback!",
      });
      setReviewName("");
      setReviewRating(0);
      setReviewComment("");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
       console.error("Error submitting review:", error);
       toast({
        variant: "destructive",
        title: "Submission failed",
        description: "Could not submit your review. Please try again.",
      });
    }
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
            
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="w-5 h-5" />
                  Delivery Availability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input placeholder="Enter Pincode" />
                  <Button variant="outline">Check</Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Enter your pincode to see delivery options.
                </p>
              </CardContent>
            </Card>

          </div>
        </div>

        <Separator className="my-12" />

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Customer Feedback</h2>
            <div className="space-y-6">
              {feedback.length > 0 ? (
                feedback.map((fb, index) => (
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
        <p>© {new Date().getFullYear()} BhojonBazaar. All Rights Reserved.</p>
      </footer>
    </div>
  );
}


const ProductPageSkeleton = () => (
  <div className="grid md:grid-cols-2 gap-12">
    <div>
      <Skeleton className="w-full aspect-square rounded-lg" />
    </div>
    <div className="space-y-6">
      <Skeleton className="h-10 w-3/4" />
      <Skeleton className="h-6 w-1/4" />
      <Skeleton className="h-8 w-1/2" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <Skeleton className="h-12 w-40" />
      <Skeleton className="h-32 w-full" />
    </div>
  </div>
);

