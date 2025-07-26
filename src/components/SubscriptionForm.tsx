"use client";

import { useState, useContext } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export default function SubscriptionForm() {
  const [submitted, setSubmitted] = useState(false);
  const { addSubscriber } = useContext(AppContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    addSubscriber(values.email);
    setSubmitted(true);
  }

  return (
    <section id="subscribe" className="w-full max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">Stay Updated!</CardTitle>
          <CardDescription>
            Subscribe to get notified about the latest price drops and deals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="text-center p-8 bg-green-50 rounded-lg">
              <h3 className="text-xl font-semibold text-green-800">Thank you for subscribing!</h3>
              <p className="text-green-700 mt-2">We'll keep you posted on the best street eats.</p>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                           <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                           <Input placeholder="Your email address" {...field} className="pl-10" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  Subscribe Now
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
