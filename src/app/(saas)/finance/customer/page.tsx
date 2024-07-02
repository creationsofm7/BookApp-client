// app/customers/page.tsx
"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import AddCustomerForm from '@/app/_components/AddCustomerForm'

interface Customer {
  id: string;
  name: string;
  vendorDetails: string;
  notes: string;
  closingBalance: number;
}

const dummyCustomers: Customer[] = [
  { id: '1', name: 'John Doe', vendorDetails: 'Vendor A', notes: 'Regular customer', closingBalance: 1000 },
  { id: '2', name: 'Jane Smith', vendorDetails: 'Vendor B', notes: 'New customer', closingBalance: 500 },
  // Add more dummy data as needed
];

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>(dummyCustomers);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addCustomer = (newCustomer: Customer) => {
    setCustomers([...customers, newCustomer]);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Customer</h1>
        <div className="flex space-x-4">
          <Button variant="outline">Analytics</Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button>New Customer</Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Add New Customer</SheetTitle>
              </SheetHeader>
              <AddCustomerForm onAddCustomer={addCustomer} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <Input
        type="text"
        placeholder="Search customers"
        className="mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vendor Name</TableHead>
            <TableHead>Vendor Details</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Closing balance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCustomers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>
                <Link href={`customer/${customer.id}`} className="text-blue-600 hover:underline">
                  {customer.name}
                </Link>
              </TableCell>
              <TableCell>{customer.vendorDetails}</TableCell>
              <TableCell>{customer.notes}</TableCell>
              <TableCell>{customer.closingBalance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}