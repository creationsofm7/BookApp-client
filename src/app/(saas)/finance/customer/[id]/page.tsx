// app/customers/[id]/page.tsx
"use client"

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'purchase' | 'borrowing';
}

const dummyTransactions: Transaction[] = [
  { id: '1', date: '2024-03-15', description: 'Product A', amount: 100, type: 'purchase' },
  { id: '2', date: '2024-03-16', description: 'Loan', amount: 500, type: 'borrowing' },
  // Add more dummy data as needed
];

export default function CustomerDetail() {
  const params = useParams();
  const customerId = params.id as string;

  const [transactions, setTransactions] = useState<Transaction[]>(dummyTransactions);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Customer Name</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add analytics content here */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add analytics content here */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add analytics content here */}
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="transactions" className="mb-6">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="ledger">Ledger</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions">
          <div className="flex space-x-4 mb-4">
            <Button variant="outline">Date Range</Button>
            <Button variant="outline">Transaction Category</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Field 1</TableHead>
                <TableHead>Field 2</TableHead>
                <TableHead>Field 3</TableHead>
                <TableHead>Field 4</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="ledger">
          {/* Add ledger content here */}
        </TabsContent>
      </Tabs>
    </div>
  );
}