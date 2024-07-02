"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Apr 2023', value: 3000 },
  { name: 'May 2023', value: 3500 },
  { name: 'Jun 2023', value: 4200 },
  { name: 'Jul 2023', value: 4000 },
  { name: 'Aug 2023', value: 4500 },
  { name: 'Sep 2023', value: 4800 },
  { name: 'Oct 2023', value: 5200 },
  { name: 'Nov 2023', value: 4700 },
  { name: 'Dec 2023', value: 5000 },
  { name: 'Jan 2024', value: 5500 },
  { name: 'Feb 2024', value: 5300 },
  { name: 'Mar 2024', value: 5600 },
  { name: 'Apr 2024', value: 5800 },
  { name: 'May 2024', value: 6000 },
  { name: 'Jun 2024', value: 6200 },
];

const transactions = [
  { id: 1, date: '2023-07-01', description: 'Book Sale', amount: 500, type: 'Income' },
  { id: 2, date: '2023-07-02', description: 'Office Supplies', amount: -50, type: 'Expense' },
  { id: 3, date: '2023-07-03', description: 'Consulting Fee', amount: 750, type: 'Income' },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col ">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main className="flex-grow bg-gray-100">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl font-semibold mb-6">Analytics</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <AnalyticsCard title="Cash In" value="₹ 10,000" icon="↑" />
              <AnalyticsCard title="Cash Out" value="₹ 5,000" icon="↓" />
              <AnalyticsCard title="Products Sold" value="150" />
              <AnalyticsCard title="Customers" value="50" />
              <AnalyticsCard title="Pending Invoices" value="10" />
            </div>

            <h2 className="text-2xl font-semibold mt-12 mb-6">Reports Overview</h2>
            <Card>
              <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <TotalCard title="Total Sales" value="₹ 50,000" />
              <TotalCard title="Total Purchases" value="₹ 30,000" />
              <TotalCard title="Total Expenses" value="₹ 10,000" />
            </div>

            <h2 className="text-2xl font-semibold mt-12 mb-6">Recent Transactions</h2>
            <Card>
              <CardContent>
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
                        <TableCell>₹ {Math.abs(transaction.amount).toFixed(2)}</TableCell>
                        <TableCell>{transaction.type}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

type AnalyticsCardProps = {
    title: string;
    value: string;
    icon?: React.ReactNode;
    };


function AnalyticsCard({ title, value, icon }: AnalyticsCardProps)  {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="text-2xl font-bold">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

type TotalCardProps = {
    title: string;
    value: string;
    };


function TotalCard({ title, value } : TotalCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}