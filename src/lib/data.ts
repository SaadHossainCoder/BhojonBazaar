import { Sandwich, Soup, Pizza, IceCream, Cookie, UtensilsCrossed } from "lucide-react";
import type { ComponentType } from "react";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  icon: ComponentType<{ className?: string }>;
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
    name: "Mumbai Munchies",
    description: "Authentic Mumbai street food",
    menu: [
      { id: "item-1-1", name: "Vada Pav", price: 2.5, icon: Sandwich },
      { id: "item-1-2", name: "Pav Bhaji", price: 5.0, icon: Soup },
      { id: "item-1-3", name: "Pani Puri", price: 4.0, icon: UtensilsCrossed },
    ],
  },
  {
    id: "vendor-2",
    name: "Delhi Delights",
    description: "Flavorful bites from the heart of Delhi",
    menu: [
      { id: "item-2-1", name: "Chole Bhature", price: 6.0, icon: Soup },
      { id: "item-2-2", name: "Aloo Tikki", price: 3.5, icon: Cookie },
      { id: "item-2-3", name: "Kulfi", price: 3.0, icon: IceCream },
    ],
  },
  {
    id: "vendor-3",
    name: "Global Bites",
    description: "International street food favorites",
    menu: [
      { id: "item-3-1", name: "Margherita Pizza", price: 8.0, icon: Pizza },
      { id: "item-3-2", name: "Classic Burger", price: 7.5, icon: Sandwich },
      { id: "item-3-3", name: "Chocolate Cookie", price: 2.0, icon: Cookie },
    ],
  },
];

export const initialSubscribers: string[] = [
    'subscriber1@example.com',
    'subscriber2@example.com',
    'subscriber3@example.com',
];
