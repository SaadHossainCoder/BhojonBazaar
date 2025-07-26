"use client";

import { useState, useContext, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { notifyRelevantSubscribers } from "@/ai/flows/notify-relevant-subscribers";
import type { Vendor } from "@/lib/data";

const formSchema = z.object({
  vendorId: z.string().min(1, "Please select a vendor."),
  itemId: z.string().min(1, "Please select an item."),
  newPrice: z.coerce.number().min(0.01, "Price must be greater than 0."),
});

type PriceFormValues = z.infer<typeof formSchema>;

export default function PriceUpdateForm() {
  const { vendors, subscribers, updatePrice } = useContext(AppContext);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PriceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        vendorId: "",
        itemId: "",
        newPrice: 0
    }
  });

  const selectedVendorId = form.watch("vendorId");

  const menuItems = useMemo(() => {
    const selectedVendor = vendors.find((v) => v.id === selectedVendorId);
    return selectedVendor ? selectedVendor.menu : [];
  }, [selectedVendorId, vendors]);
  
  // Reset item when vendor changes
  useEffect(() => {
    form.resetField("itemId", { defaultValue: "" });
  }, [selectedVendorId, form]);


  async function onSubmit(values: PriceFormValues) {
    setIsSubmitting(true);
    
    const { vendorId, itemId, newPrice } = values;
    const vendor = vendors.find(v => v.id === vendorId);
    const item = vendor?.menu.find(i => i.id === itemId);

    if (!vendor || !item) {
        toast({ variant: 'destructive', title: 'Error', description: 'Selected vendor or item not found.' });
        setIsSubmitting(false);
        return;
    }

    // 1. Update price in global state
    updatePrice(vendorId, itemId, newPrice);
    
    toast({
        title: "Price Updated!",
        description: `The price for ${item.name} is now $${newPrice.toFixed(2)}.`,
    });

    try {
      // 2. Call GenAI flow
      const notificationResult = await notifyRelevantSubscribers({
        foodItem: item.name,
        newPrice: newPrice,
        subscriberList: subscribers,
      });

      // 3. Show success toast with AI result
      const notifiedCount = notificationResult.subscriberIdsToNotify.length;
      toast({
        title: "AI Notification Sent",
        description: `Our AI has notified ${notifiedCount} relevant subscriber(s) about the price change for ${item.name}.`,
      });

    } catch (error) {
      console.error("AI notification error:", error);
      toast({
        variant: 'destructive',
        title: 'AI Notification Failed',
        description: 'Could not send intelligent notifications.',
      });
    }

    form.reset();
    setIsSubmitting(false);
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Update Prices</CardTitle>
        <CardDescription>
          Select a vendor and item to update its price.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="vendorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vendor</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a vendor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {vendors.map((vendor: Vendor) => (
                        <SelectItem key={vendor.id} value={vendor.id}>
                          {vendor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="itemId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Food Item</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedVendorId}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an item" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                       {menuItems.map(item => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Price</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="e.g., 5.99" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update Price & Notify'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
