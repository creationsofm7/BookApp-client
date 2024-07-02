'use client'

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useForm } from "react-hook-form"



export default function Homey() {
  const [isInvoiceFormOpen, setIsInvoiceFormOpen] = useState(false);

  return (
    <main>
      
      <div className="flex">
        
        <div className="flex-1 p-4">
          <h1 className="text-2xl font-bold mb-4">Inventory</h1>
         
          
          <Sheet open={isInvoiceFormOpen} onOpenChange={setIsInvoiceFormOpen}>
            <SheetTrigger asChild>
              <Button>Add Item</Button>
            </SheetTrigger>
            <SheetContent>
              <InvoiceForm onSubmit={() => setIsInvoiceFormOpen(false)} />
            </SheetContent>
          </Sheet>

          <div className="mt-8 w-full">
            <h2 className="text-xl font-semibold w-full mb-4">Inventory History</h2>
            <TransactionTable />
          </div>
        </div>
      </div>
    </main>
  );
}








const InvoiceForm = ({ onSubmit }: any) => {
  const form = useForm();

  const handleSubmit = (data: any) => {
    console.log(data);
    onSubmit();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <SheetHeader>
          <SheetTitle>Add New Invoice</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 mt-4">
          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter customer name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter amount" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="mt-4">Submit</Button>
      </form>
    </Form>
  );
};

const TransactionTable = () => {
  const transactions = [
    { id: 1, date: '2023-07-01', description: 'Invoice #1001', amount: 500, type: 'Income' },
    { id: 2, date: '2023-07-02', description: 'Office Supplies', amount: -50, type: 'Expense' },
    { id: 3, date: '2023-07-03', description: 'Invoice #1002', amount: 750, type: 'Income' },
  ];

  return (
    <Table className='w-full'>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{transaction.date}</TableCell>
            <TableCell>{transaction.description}</TableCell>
            <TableCell>${transaction.amount.toFixed(2)}</TableCell>
            <TableCell>{transaction.type}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};