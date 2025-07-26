import {
  Heart,
  Home,
  Watch,
  Shirt,
  ShoppingBag,
  Briefcase,
  Dumbbell,
  ComponentType,
} from "lucide-react";
import {FC} from 'react'

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  imageUrl: string;
  category: string;
  hint: string;
}

export interface Category {
  id: string;
  name: string;
  icon: FC<{ className?: string }>;
}

export const categories: Category[] = [
  { id: "cat-1", name: "Health & Beauty", icon: Heart },
  { id: "cat-2", name: "Home & Garden", icon: Home },
  { id: "cat-3", name: "Accessories", icon: Watch },
  { id: "cat-4", name: "Women's Clothing", icon: Shirt },
  { id: "cat-5", name: "Shoes & Bags", icon: ShoppingBag },
  { id: "cat-6", name: "Men's Clothing", icon: Briefcase },
  { id: "cat-7", name: "Sports", icon: Dumbbell },
];

export const products: Product[] = [
  {
    id: "prod-1",
    name: "J9 Speakers",
    price: 97.0,
    originalPrice: 156.0,
    rating: 4.5,
    imageUrl: "https://placehold.co/300x300.png",
    category: "Accessories",
    hint: "black speaker"
  },
  {
    id: "prod-2",
    name: "Scented Soap",
    price: 97.0,
    originalPrice: 156.0,
    rating: 4.5,
    imageUrl: "https://placehold.co/300x300.png",
    category: "Health & Beauty",
    hint: "scented soap"
  },
  {
    id: "prod-3",
    name: "Summer Shorts",
    price: 97.0,
    originalPrice: 156.0,
    rating: 4.5,
    imageUrl: "https://placehold.co/300x300.png",
    category: "Women's Clothing",
    hint: "denim shorts"
  },
  {
    id: "prod-4",
    name: "Skipping Rope",
    price: 97.0,
    originalPrice: 156.0,
    rating: 4.5,
    imageUrl: "https://placehold.co/300x300.png",
    category: "Sports",
    hint: "skipping rope"
  },
  {
    id: "prod-5",
    name: "Green Chair",
    price: 97.0,
    originalPrice: 156.0,
    rating: 4.5,
    imageUrl: "https://placehold.co/300x300.png",
    category: "Home & Garden",
    hint: "green chair"
  },
  {
    id: "prod-6",
    name: "Lipstick",
    price: 45.0,
    originalPrice: 60.0,
    rating: 4.8,
    imageUrl: "https://placehold.co/300x300.png",
    category: "Health & Beauty",
    hint: "red lipstick"
  },
  {
    id: "prod-7",
    name: "Pearl Earrings",
    price: 120.0,
    originalPrice: 180.0,
    rating: 4.9,
    imageUrl: "https://placehold.co/300x300.png",
    category: "Accessories",
    hint: "pearl earrings"
  },
  {
    id: "prod-8",
    name: "House Plant",
    price: 35.0,
    originalPrice: 50.0,
    rating: 4.7,
    imageUrl: "https://placehold.co/300x300.png",
    category: "Home & Garden",
    hint: "house plant"
  },
  {
    id: "prod-9",
    name: "Vacuum Cleaner",
    price: 199.0,
    originalPrice: 250.0,
    rating: 4.6,
    imageUrl: "https://placehold.co/300x300.png",
    category: "Home & Garden",
    hint: "vacuum cleaner"
  },
  {
    id: "prod-10",
    name: "Leather Shoes",
    price: 150.0,
    originalPrice: 200.0,
    rating: 4.8,
    imageUrl: "https://placehold.co/300x300.png",
    category: "Men's Clothing",
    hint: "leather shoes"
  },
];
