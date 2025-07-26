import { Leaf, Droplet, Flame, ShoppingCart } from "lucide-react";
import type { ComponentType } from "react";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  icon: ComponentType<{ className?: string }>;
  unit: string;
}

export interface Vendor {
  id: string;
  name: string;
  description: string;
  menu: MenuItem[];
}

export const initialVendors: Vendor[] = [
  {
    id: "vendor-1",
    name: "Vegetables",
    description: "Daily prices for fresh vegetables",
    menu: [
      { id: "item-1-1", name: "Onion", price: 30, icon: Leaf, unit: "kg" },
      { id: "item-1-2", name: "Tomato", price: 40, icon: Leaf, unit: "kg" },
      { id: "item-1-3", name: "Potato", price: 25, icon: Leaf, unit: "kg" },
    ],
  },
  {
    id: "vendor-2",
    name: "Masalas",
    description: "Prices for essential spices",
    menu: [
      { id: "item-2-1", name: "Turmeric Powder", price: 200, icon: Flame, unit: "kg" },
      { id: "item-2-2", name: "Chilli Powder", price: 300, icon: Flame, unit: "kg" },
      { id: "item-2-3", name: "Coriander Powder", price: 250, icon: Flame, unit: "kg" },
    ],
  },
  {
    id: "vendor-3",
    name: "Oils",
    description: "Prices for cooking oils",
    menu: [
      { id: "item-3-1", name: "Sunflower Oil", price: 150, icon: Droplet, unit: "litre" },
      { id: "item-3-2", name: "Mustard Oil", price: 180, icon: Droplet, unit: "litre" },
      { id: "item-3-3", name: "Groundnut Oil", price: 220, icon: Droplet, unit: "litre" },
    ],
  },
];

export const initialSubscribers: string[] = [
    '9876543210',
    '8765432109',
    '7654321098',
];
