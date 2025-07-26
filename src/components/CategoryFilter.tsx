"use client";

import { cn } from "@/lib/utils";
import type { Category } from "@/lib/data";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (id: string | null) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex items-center justify-center flex-wrap gap-4">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.name)}
            className={cn(
              "flex flex-col items-center justify-center gap-2 p-4 rounded-lg border w-32 h-28 transition-colors duration-200",
              selectedCategory === category.name
                ? "bg-primary/10 border-primary text-primary"
                : "bg-card hover:bg-muted"
            )}
          >
            <Icon className="w-8 h-8" />
            <span className="text-sm font-medium">{category.name}</span>
          </button>
        );
      })}
    </div>
  );
}
