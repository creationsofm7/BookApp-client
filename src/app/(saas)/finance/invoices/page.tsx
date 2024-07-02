"use client"

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";

interface Invoice {
  id: string;
  amount: number;
  billNumber: string;
  status: 'pending' | 'paid' | 'overdue';
  customer: string;
  date: string;
}

const dummyInvoices: Invoice[] = [
  { id: '1', amount: 1000, billNumber: '#INV-1', status: 'pending', customer: 'John Doe', date: '2023-07-01' },
  { id: '2', amount: 2000, billNumber: '#INV-2', status: 'paid', customer: 'Jane Smith', date: '2023-07-02' },
  { id: '3', amount: 1500, billNumber: '#INV-3', status: 'overdue', customer: 'Bob Johnson', date: '2023-07-03' },
];

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(dummyInvoices);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isInvoiceFormOpen, setIsInvoiceFormOpen] = useState<boolean>(false);

  const filteredInvoices = invoices.filter(invoice => 
    invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.billNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Sales</h1>
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-1/2">
          <Input
            type="text"
            placeholder="Search"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <Sheet open={isInvoiceFormOpen} onOpenChange={setIsInvoiceFormOpen}>
          <SheetTrigger asChild>
            <Button>Create Invoice</Button>
          </SheetTrigger>
          <SheetContent>
            <InvoiceForm onSubmit={(data) => {
              setInvoices([...invoices, { ...data, id: String(invoices.length + 1) }]);
              setIsInvoiceFormOpen(false);
            }} />
          </SheetContent>
        </Sheet>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Amount</TableHead>
            <TableHead>Bill #</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInvoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>₹ {invoice.amount}</TableCell>
              <TableCell>{invoice.billNumber}</TableCell>
              <TableCell>{invoice.status}</TableCell>
              <TableCell>{invoice.customer}</TableCell>
              <TableCell>{invoice.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

interface InvoiceFormData {
  amount: number;
  billNumber: string;
  status: 'pending' | 'paid' | 'overdue';
  customer: string;
  date: string;
}

const InvoiceForm: React.FC<{ onSubmit: (data: InvoiceFormData) => void }> = ({ onSubmit }) => {
  const form = useForm<InvoiceFormData>();

  const handleSubmit = (data: InvoiceFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <SheetHeader>
          <SheetTitle>Create New Invoice</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 mt-4">
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
            name="billNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bill Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter bill number" {...field} />
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
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="customer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer</FormLabel>
                <FormControl>
                  <Input placeholder="Enter customer name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="mt-4">Create Invoice</Button>
      </form>
    </Form>
  );
};