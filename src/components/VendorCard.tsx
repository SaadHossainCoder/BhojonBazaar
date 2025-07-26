"use client";

import type { Vendor } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MenuItemComponent from "./MenuItem";
import { Separator } from "./ui/separator";

export default function VendorCard({ vendor }: { vendor: Vendor }) {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-accent">{vendor.name}</CardTitle>
        <CardDescription>{vendor.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <div className="flex-grow">
          {vendor.menu.map((item, index) => (
            <div key={item.id}>
              <MenuItemComponent item={item} />
              {index < vendor.menu.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
