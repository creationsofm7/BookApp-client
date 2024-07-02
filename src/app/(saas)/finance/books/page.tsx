"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface Business {
  id: string;
  name: string;
  createdAt: string;
  balance: number;
}

const dummyBusinesses: Business[] = [
  { id: '1', name: 'Business Book 1', createdAt: '12/12/24', balance: 12000 },
  { id: '2', name: 'Business Book 2', createdAt: '12/12/24', balance: 12000 },
  { id: '3', name: 'Business Book 3', createdAt: '12/12/24', balance: 12000 },
  // Add more dummy data as needed
];

interface AddBookFormData {
  name: string;
  balance: number;
}

function AddBookForm({ onAddBook }: { onAddBook: (data: AddBookFormData) => void }) {
  const form = useForm<AddBookFormData>();

  const onSubmit = (data: AddBookFormData) => {
    onAddBook(data);
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
              <FormLabel>Book Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter book name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="balance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Initial Balance</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter initial balance" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Add Book</Button>
      </form>
    </Form>
  );
}

export default function BusinessList() {
  const [businesses, setBusinesses] = useState<Business[]>(dummyBusinesses);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);

  const filteredBusinesses = businesses.filter(business => 
    business.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddBook = (data: AddBookFormData) => {
    const newBusiness: Business = {
      id: (businesses.length + 1).toString(),
      name: data.name,
      createdAt: new Date().toLocaleDateString(),
      balance: data.balance
    };
    setBusinesses([...businesses, newBusiness]);
    setIsAddBookOpen(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Business 1</h1>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4 w-full">
          <Input
            type="text"
            placeholder="Search"
            className="max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Balance (High to Low)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high-to-low">Balance (High to Low)</SelectItem>
              <SelectItem value="low-to-high">Balance (Low to High)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Sheet open={isAddBookOpen} onOpenChange={setIsAddBookOpen}>
          <SheetTrigger asChild>
            <Button>Add New Book</Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Add New Book</SheetTitle>
            </SheetHeader>
            <AddBookForm onAddBook={handleAddBook} />
          </SheetContent>
        </Sheet>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Created On</TableHead>
            <TableHead>Balance</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBusinesses.map((business) => (
            <TableRow key={business.id}>
              <TableCell>{business.name}</TableCell>
              <TableCell>{business.createdAt}</TableCell>
              <TableCell>{business.balance}</TableCell>
              <TableCell>
                <Link href={`/finance/books/${business.id}`}>
                  <Button variant="ghost">View</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}