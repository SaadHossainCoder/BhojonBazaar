"use client";

import type { MenuItem } from "@/lib/data";
import { useEffect, useState } from "react";

export default function MenuItemComponent({ item }: { item: MenuItem }) {
  const [price, setPrice] = useState(item.price);
  const [isUpdated, setIsUpdated] = useState(false);
  const Icon = item.icon;

  useEffect(() => {
    if (item.price !== price) {
      setPrice(item.price);
      setIsUpdated(true);
      const timer = setTimeout(() => setIsUpdated(false), 500);
      return () => clearTimeout(timer);
    }
  }, [item.price, price]);

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-4">
        <Icon className="h-6 w-6 text-accent" />
        <span className="font-medium">{item.name}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span
          className={`font-semibold text-primary transition-all duration-500 ${
            isUpdated ? 'transform scale-125 text-accent' : ''
          }`}
        >
          ₹{price.toFixed(2)}
        </span>
        <span className="text-sm text-muted-foreground">/ {item.unit}</span>
      </div>
    </div>
  );
}
