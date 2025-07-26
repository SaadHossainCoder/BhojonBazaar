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
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { cart } = useCart();
  const { user, signOut } = useAuth();
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/best-deals", label: "Best Deals" },
    { href: "/best-price", label: "Best Price" },
    { href: "/farm", label: "Help" },
  ];

  return (
    <header className="bg-card border-b">
      <div className="bg-muted text-muted-foreground text-xs">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <span>Welcome to BhojonBazaar Online Grocery Store!</span>
          <div className="hidden md:flex items-center gap-4">
            <Link href="#" className="hover:text-primary">
              Customer Care
            </Link>
            <Link href="#" className="hover:text-primary">
              Track Order
            </Link>
            <Link href="/farm" className="hover:text-primary">
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
          <Link href="/" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
              <path d="M12 12a10 10 0 0 1 10-10V12Z" />
            </svg>
            <span className="text-3xl font-bold text-gray-800">
              BhojonBazaar
            </span>
          </Link>
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
            <Button variant="ghost" size="icon" className="relative">
              <Heart />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0">
                0
              </Badge>
            </Button>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User />
                    <div>
                      <p className="text-xs text-left">
                        {user.displayName || "My Account"}
                      </p>
                      <p className="text-xs font-semibold">
                        {user.email?.split("@")[0]}
                      </p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Orders</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="sm" className="gap-2">
                  <User />
                  <div>
                    <p className="text-xs">Login</p>
                    <p className="text-xs font-semibold">Register</p>
                  </div>
                </Button>
              </Link>
            )}
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu />
          </Button>
        </div>
      </div>

      <div className="border-t hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <nav className="flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "py-3 text-sm font-medium hover:text-primary",
                  pathname === link.href &&
                    "text-primary border-b-2 border-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
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
