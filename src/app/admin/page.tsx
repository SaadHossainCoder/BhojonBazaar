import LoginForm from "@/components/LoginForm";
import { Utensils } from "lucide-react";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
        <div className="flex items-center gap-2 text-primary mb-6">
          <Utensils className="w-10 h-10" />
          <h1 className="text-4xl font-bold font-headline">Street Eats</h1>
        </div>
        <LoginForm />
    </div>
  );
}
