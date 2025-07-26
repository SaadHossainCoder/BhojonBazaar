"use client";

import Link from "next/link";
import SignUpForm from "@/components/SignUpForm";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container mx-auto px-4 py-4 flex items-center justify-between gap-4 border-b">
        <Link href="/" className="flex items-center gap-2">
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
        </Link>
        <div className="text-sm">
          <span>Need help? Call us at </span>
          <span className="text-primary font-semibold">046582</span>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center bg-muted/40">
        <SignUpForm />
      </main>
      <footer className="w-full py-6 text-center text-muted-foreground text-sm bg-muted">
        <p>© {new Date().getFullYear()} bazar. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
