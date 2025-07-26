
"use client";

import Header from "@/components/Header";

export default function BestDealsPage() {

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        
      </main>
      <footer className="w-full py-6 mt-auto text-center text-muted-foreground text-sm bg-muted">
        <p>© {new Date().getFullYear()} bazar. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
