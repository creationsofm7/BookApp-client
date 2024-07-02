'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button"

const Navbar = () => {
    return (
      <nav className="bg-black text-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-xl font-bold ">
                  Book.ai
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link href="/" className="inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium ">
                  Home
                </Link>
                <Link href="/about" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium  hover:border-gray-300 ">
                  About
                </Link>
                <Link href="/services" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium  hover:border-gray-300 hover:text-gray-700">
                  Services
                </Link>
                <Link href="/contact" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium  hover:border-gray-300 hover:text-gray-700">
                  Contact
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Button variant="outline" className="ml-3 text-black hover:bg-gray-800 hover:text-white hover:border-black">
                Sign in
              </Button>
              <Button className="ml-3">
                Sign up
              </Button>
            </div>
          </div>
        </div>
      </nav>
    );
  };
  

export default Navbar; 