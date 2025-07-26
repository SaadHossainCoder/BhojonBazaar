import {
  Carrot,
  Apple,
  Milk,
  Cookie,
  Beef,
  Flame,
  ComponentType,
} from "lucide-react";
import {FC} from 'react'

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
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
  { id: "cat-1", name: "Vegetables", icon: Carrot },
  { id: "cat-2", name: "Fruits", icon: Apple },
  { id: "cat-3", name: "Dairy", icon: Milk },
  { id: "cat-4", name: "Bakery", icon: Cookie },
  { id: "cat-5", name: "Meat", icon: Beef },
  { id: "cat-6", name: "Pantry", icon: Flame },
];

export const products: Product[] = [
  // Vegetables
  {
    id: "prod-1",
    name: "Organic Carrots",
    price: 2.5,
    originalPrice: 3.0,
    rating: 4.8,
    imageUrl: "https://placehold.co/300x300.png",
    category: "Vegetables",
    hint: "fresh carrots",
  },
  {
    id: "prod-2",
    name: "Fresh Tomatoes",
    price: 3.0,
    rating: 4.7,
    imageUrl: "https://placehold.co/300x300.png",
    category: "Vegetables",
    hint: "red tomatoes",
  },
  {
    id: "prod-3",
    name: "Spinach Bunch",
    price: 2.0,
    originalPrice: 2.5,
    rating: 4.9,
    imageUrl: "https://placehold.co/300x300.png",
    category: "Vegetables",
    hint: "green spinach",
  },
  // Fruits
  {
    id: "prod-4",
    name: "Red Apples",
    price: 4.0,
    rating: 4.9,
    imageUrl: "https://placehold.co/300x300.png",
    category: "Fruits",
    hint: "juicy apples",
  },
  {
    id: "prod-5",
    name: "Bananas",
    price: 1.5,
    rating: 4.6,
    imageUrl: "https://placehold.co/300x300.png",
    category: "Fruits",
    hint: "ripe bananas",
  },
  // Dairy
  {
    id: "prod-6",
    name: "Organic Milk",
    price: 3.5,
    rating: 4.8,
    imageUrl: "https://placehold.co/300x300.png",
    category: "Dairy",
    hint: "fresh milk",
  },
  {
    id: "prod-7",
    name: "Cheddar Cheese",
    price: 5.0,
    originalPrice: 6.0,
    rating: 4.7,
    imageUrl: "https://placehold.co/300x300.png",
    category: "Dairy",
    hint: "block cheese",
  },
  // Bakery
  {
    id: "prod-8",
    name: "Sourdough Bread",
    price: 4.5,
    rating: 4.9,
    imageUrl: "https://placehold.co/300x300.png",
    category: "Bakery",
    hint: "artisan bread",
  },
  // Meat
  {
    id: "prod-9",
    name: "Chicken Breast",
    price: 8.0,
    rating: 4.8,
    imageUrl: "https://placehold.co/300x300.png",
    category: "Meat",
    hint: "raw chicken",
  },
  // Pantry
  {
    id: "prod-10",
    name: "Olive Oil",
    price: 10.0,
    rating: 4.9,
    imageUrl: "https://placehold.co/300x300.png",
    category: "Pantry",
    hint: "olive oil",
  },
];
