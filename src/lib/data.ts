
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
