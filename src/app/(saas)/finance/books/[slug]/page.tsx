"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'cash-in' | 'cash-out';
}

const dummyTransactions: Transaction[] = [
  { id: '1', date: '2024-03-15', description: 'Sale', amount: 1000, type: 'cash-in' },
  { id: '2', date: '2024-03-16', description: 'Expense', amount: 500, type: 'cash-out' },
  // Add more dummy data as needed
];

export default function BusinessDetail() {
  const router = useRouter();
  

  const [transactions, setTransactions] = React.useState<Transaction[]>(dummyTransactions);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Business Book </h1>
      <div className="flex justify-end space-x-4 mb-6">
        <Button variant="outline">Cash In</Button>
        <Button variant="outline">Cash Out</Button>
      </div>
      <Table>
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
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded ${
                  transaction.type === 'cash-in' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                }`}>
                  {transaction.type === 'cash-in' ? 'Cash In' : 'Cash Out'}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}