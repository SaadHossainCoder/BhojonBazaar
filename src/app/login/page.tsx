"use client";

import Link from "next/link";
import LoginForm from "@/components/LoginForm";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container mx-auto px-4 py-4 flex items-center justify-between gap-4 border-b">
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
          <span className="text-3xl font-bold text-gray-800">BhojonBazaar</span>
        </Link>
        <div className="text-sm">
          <span>Need help? Call us at </span>
          <span className="text-primary font-semibold">046582</span>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center bg-muted/40">
        <LoginForm />
      </main>
      <footer className="w-full py-6 text-center text-muted-foreground text-sm bg-muted">
        <p>© {new Date().getFullYear()} BhojonBazaar. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
