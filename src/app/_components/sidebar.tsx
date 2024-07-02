"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Home,
  CreditCard,
  DollarSign,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  BookCopy,

  TruckIcon,
  PersonStanding,
  PersonStandingIcon
} from "lucide-react";

type SidebarLinkProps = {
  href: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
};

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => (
  <Link
    href={href}
    className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors"
  >
    <Icon size={20} className={`${isCollapsed ? "mx-auto" : "mr-2"}`} />
    {!isCollapsed && <span>{label}</span>}
  </Link>
);

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div
      className={`bg-black text-white h-screen  shadow-lg transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className={`p-4 ${isCollapsed ? "items-center" : ""}`}>
          {/* {!isCollapsed && <h1 className="text-xl font-bold mb-4"></h1>} */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className={`${isCollapsed ? "mx-auto" : ""}`}
          >
            {isCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </Button>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-2 p-2">
            <li>
              <SidebarLink
                href="/dashboard"
                icon={Home}
                label="Dashboard"
                isCollapsed={isCollapsed}
              />
            </li>
            <li>
              <SidebarLink
                href="/finance/invoices"
                icon={FileText}
                label="Invoices"
                isCollapsed={isCollapsed}
              />
            </li>
            <li>
              <SidebarLink
                href="/finance/customer"
                icon={PersonStandingIcon}
                label="Customers"
                isCollapsed={isCollapsed}
              />
            </li>
            <li>
              <SidebarLink
                href="/inventory"
                icon={CreditCard}
                label="Inventory"
                isCollapsed={isCollapsed}
              />
            </li>
            <li>
              <SidebarLink
                href="/finance/books"
                icon={BookCopy}
                label="books"
                isCollapsed={isCollapsed}
              />
            </li>
            <li>
              <SidebarLink
                href="/inventory/vendor"
                icon={TruckIcon}
                label="Vendors"
                isCollapsed={isCollapsed}
              />
            </li>
            <li>
              <SidebarLink
                href="/reports"
                icon={DollarSign}
                label="Reports"
                isCollapsed={isCollapsed}
              />
            </li>
            <li>
              <SidebarLink
                href="/settings"
                icon={Settings}
                label="Settings"
                isCollapsed={isCollapsed}
              />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
