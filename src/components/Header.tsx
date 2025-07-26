"use client";

import Link from "next/link";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  Phone,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function Header() {
  return (
    <header className="bg-card border-b">
      <div className="bg-muted text-muted-foreground text-xs">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <span>Welcome to bazar Online Shopping Store!</span>
          <div className="hidden md:flex items-center gap-4">
            <Link href="#" className="hover:text-primary">
              Customer Care
            </Link>
            <Link href="#" className="hover:text-primary">
              Track Order
            </Link>
            <Link href="#" className="hover:text-primary">
              Help
            </Link>
            <Button variant="ghost" size="sm" className="gap-1 text-xs">
              <Globe className="w-4 h-4" />
              English
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25.76,14.24a5.76,5.76,0,0,1-11.52,0C14.24,8.48,20,2,20,2S25.76,8.48,25.76,14.24Z"
              fill="#F44336"
            />
            <path d="M20 22a8 8 0 1 0-8 8 8 8 0 0 0 8-8z" fill="#FFC107" />
            <path d="M28 30a8 8 0 1 0-8 8 8 8 0 0 0 8-8z" fill="#4CAF50" />
          </svg>
          <span className="text-3xl font-bold text-gray-800">bazar</span>
        </div>

        <div className="hidden lg:flex flex-grow max-w-lg">
          <div className="relative w-full">
            <Input
              type="search"
              placeholder="I'm shopping for..."
              className="pr-24"
            />
            <Button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8"
            >
              Search
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Heart />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0">
                2
              </Badge>
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0">
                1
              </Badge>
            </Button>
            <Link href="/login">
               <Button variant="ghost" size="sm" className="gap-2">
                <User />
                <div>
                  <p className="text-xs">Login</p>
                  <p className="text-xs font-semibold">Register</p>
                </div>
              </Button>
            </Link>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu />
          </Button>
        </div>
      </div>

      <div className="border-t hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <nav className="flex gap-6">
            <Link
              href="#"
              className="py-3 text-sm font-medium hover:text-primary"
            >
              Home
            </Link>
            <Link
              href="#"
              className="py-3 text-sm font-medium hover:text-primary"
            >
              Shop
            </Link>
            <Link
              href="#"
              className="py-3 text-sm font-medium hover:text-primary"
            >
              Pages
            </Link>
            <Link
              href="#"
              className="py-3 text-sm font-medium hover:text-primary"
            >
              Blog
            </Link>
            <Link
              href="#"
              className="py-3 text-sm font-medium text-primary border-b-2 border-primary"
            >
              Daily Deals
            </Link>
            <Link
              href="#"
              className="py-3 text-sm font-medium hover:text-primary"
            >
              Discount
            </Link>
          </nav>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-5 h-5" />
            <span>Hotline: 046582</span>
          </div>
        </div>
      </div>
    </header>
  );
}
