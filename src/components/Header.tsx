"use client";
import { useContext } from "react";
import Link from "next/link";
import { Utensils, LogIn, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const { isAuthenticated, logout } = useContext(AppContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="bg-card shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-primary">
          <Utensils className="w-8 h-8" />
          <span className="text-2xl font-bold font-headline">
            Street Eats
          </span>
        </Link>
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                asChild
              >
                <Link href="/admin/dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin">
                <LogIn className="mr-2 h-4 w-4" />
                Admin Login
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
