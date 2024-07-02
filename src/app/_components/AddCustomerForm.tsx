// components/AddCustomerForm.tsx
"use client"

import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

interface CustomerFormData {

  name: string;
  id: string;
  vendorDetails: string;
  notes: string;
  closingBalance: number;
}

interface AddCustomerFormProps {
  onAddCustomer: (customer: CustomerFormData) => void;
}

export default function AddCustomerForm({ onAddCustomer }: AddCustomerFormProps) {
  const form = useForm<CustomerFormData>();

  const onSubmit = (data: CustomerFormData) => {
    onAddCustomer({ ...data, id: Date.now().toString() });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Customer name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="vendorDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vendor Details</FormLabel>
              <FormControl>
                <Input placeholder="Vendor details" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Additional notes" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="closingBalance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Closing Balance</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Closing balance" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Add Customer</Button>
      </form>
    </Form>
  );
}