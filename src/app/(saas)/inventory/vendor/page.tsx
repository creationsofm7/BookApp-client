"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Vendor {
  id: string;
  name: string;
  details: string;
  notes: string;
  closingBalance: number;
}

const dummyVendors: Vendor[] = [
  { id: '1', name: 'Vendor A', details: 'Details A', notes: 'Note A', closingBalance: 1000 },
  { id: '2', name: 'Vendor B', details: 'Details B', notes: 'Note B', closingBalance: 2000 },
  { id: '3', name: 'Vendor C', details: 'Details C', notes: 'Note C', closingBalance: 3000 },
];

export default function VendorManagement() {
  const [vendors, setVendors] = useState<Vendor[]>(dummyVendors);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [isAddingVendor, setIsAddingVendor] = useState(false);

  const handleVendorClick = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setIsAddingVendor(false);
  };

  const handleNewVendor = () => {
    setSelectedVendor(null);
    setIsAddingVendor(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Vendor</h1>
        <div>
          <Button variant="outline" className="mr-2">Analytics</Button>
          <Button onClick={handleNewVendor}>New Vendor</Button>
        </div>
      </div>

      <div className="flex">
        <div className="w-2/3 pr-6">
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
              {vendors.map((vendor) => (
                <TableRow key={vendor.id} onClick={() => handleVendorClick(vendor)} className="cursor-pointer">
                  <TableCell>{vendor.name}</TableCell>
                  <TableCell>{vendor.details}</TableCell>
                  <TableCell>{vendor.notes}</TableCell>
                  <TableCell>₹ {vendor.closingBalance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="w-1/3">
          {(selectedVendor || isAddingVendor) && (
            <Card>
              <CardHeader>
                <CardTitle>{isAddingVendor ? 'Add New Vendor' : 'Vendor Details'}</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="basic">
                  <TabsList>
                    <TabsTrigger value="basic">Basic Details</TabsTrigger>
                    <TabsTrigger value="company">Company Details</TabsTrigger>
                    <TabsTrigger value="more">More Details</TabsTrigger>
                  </TabsList>
                  <TabsContent value="basic">
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Vendor Name</label>
                        <Input type="text" defaultValue={selectedVendor?.name} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Vendor Details</label>
                        <Input type="text" defaultValue={selectedVendor?.details} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Notes</label>
                        <Input type="text" defaultValue={selectedVendor?.notes} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Closing Balance</label>
                        <Input type="number" defaultValue={selectedVendor?.closingBalance} />
                      </div>
                    </form>
                  </TabsContent>
                  <TabsContent value="company">
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Company Name</label>
                        <Input type="text" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Company Address</label>
                        <Input type="text" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Company Registration Number</label>
                        <Input type="text" />
                      </div>
                    </form>
                  </TabsContent>
                  <TabsContent value="more">
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Contact Person</label>
                        <Input type="text" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Contact Email</label>
                        <Input type="email" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
                        <Input type="tel" />
                      </div>
                    </form>
                  </TabsContent>
                </Tabs>
                {isAddingVendor && (
                  <Button className="mt-4 w-full">Add Vendor</Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}