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

export interface Feedback {
  author: string;
  rating: number;
  comment: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  imageUrl: string;
  category: string;
  hint: string;
  vendor: string;
  date: string;
  feedback?: Feedback[];
}

export interface Category {
  id: string;
  name: string;
  icon: FC<{ className?: string }>;
}

export interface Vendor {
  name: string;
  location: {
    lat: number;
    lon: number;
  };
}


export const categories: Category[] = [
  { id: "cat-1", name: "Vegetables", icon: Carrot },
  { id: "cat-2", name: "Fruits", icon: Apple },
  { id: "cat-3", name: "Dairy", icon: Milk },
  { id: "cat-4", name: "Bakery", icon: Cookie },
  { id: "cat-5", name: "Meat", icon: Beef },
  { id: "cat-6", name: "Pantry", icon: Flame },
];

export const vendors: Vendor[] = [
  { name: "FarmFresh Co.", location: { lat: 34.0522, lon: -118.2437 } }, // LA
  { name: "Green Grocers", location: { lat: 40.7128, lon: -74.0060 } }, // NYC
  { name: "Orchard Direct", location: { lat: 41.8781, lon: -87.6298 } }, // Chicago
  { name: "Tropical Fruits", location: { lat: 25.7617, lon: -80.1918 } }, // Miami
  { name: "Happy Cow Dairy", location: { lat: 43.0731, lon: -89.4012 } }, // Madison, WI
  { name: "The Cheese Makers", location: { lat: 45.5152, lon: -122.6784 } }, // Portland
  { name: "The Bread Kiln", location: { lat: 37.7749, lon: -122.4194 } }, // San Francisco
  { name: "Free-Range Farms", location: { lat: 30.2672, lon: -97.7431 } }, // Austin
  { name: "Mediterranean Gold", location: { lat: 38.9072, lon: -77.0369 } }, // Washington D.C.
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
    vendor: "FarmFresh Co.",
    date: "2024-07-20",
    feedback: [
      { author: "Jane D.", rating: 5, comment: "So fresh and crunchy!" },
      { author: "John S.", rating: 4, comment: "Great quality for the price." },
    ],
  },
  {
    id: "prod-2",
    name: "Fresh Tomatoes",
    price: 3.0,
    rating: 4.7,
    imageUrl: "https://placehold.co/300x300.png",
    category: "Vegetables",
    hint: "red tomatoes",
    vendor: "Green Grocers",
    date: "2024-07-21",
    feedback: [
      { author: "Alice", rating: 5, comment: "Perfect for salads." },
    ],
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
    vendor: "FarmFresh Co.",
    date: "2024-07-22",
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
    vendor: "Orchard Direct",
    date: "2024-07-19",
    feedback: [
      { author: "Bob", rating: 5, comment: "My kids love these apples." },
      { author: "Charlie", rating: 5, comment: "Sweet and crisp, just perfect." },
    ],
  },
  {
    id: "prod-5",
    name: "Bananas",
    price: 1.5,
    rating: 4.6,
    imageUrl: "https://placehold.co/300x300.png",
    category: "Fruits",
    hint: "ripe bananas",
    vendor: "Tropical Fruits",
    date: "2024-07-18",
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
    vendor: "Happy Cow Dairy",
    date: "2024-07-25",
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
    vendor: "The Cheese Makers",
    date: "2024-08-10",
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
    vendor: "The Bread Kiln",
    date: "2024-07-22",
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
    vendor: "Free-Range Farms",
    date: "2024-07-23",
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
    vendor: "Mediterranean Gold",
    date: "2025-01-01",
  },
];
