"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Package,
  ShoppingCart,
  Upload,
  User,
  Truck,
  Ship,
  Box
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";

const sidebarItems = [
  {
    title: "Products",
    items: [
      { title: "My Products", icon: Package, href: "/seller/dashboard" },
      {
        title: "Upload Products",
        icon: Upload,
        href: "/seller/uploadproducts"
      },
      { title: "Quotations", icon: FileText, href: "/seller/quotations" },
      { title: "Bookings", icon: ShoppingCart, href: "/seller/productbookings" }
    ]
  },
  {
    title: "Freight",
    items: [
      { title: "Find Forwarder", icon: Ship, href: "/seller/findforwarder" },
      {
        title: "Quotations",
        icon: FileText,
        href: "/seller/freightquotations"
      },
      { title: "Bookings", icon: Box, href: "/seller/freightbookings" }
    ]
  },
  {
    title: "Transportation",
    items: [
      { title: "Add Details", icon: Truck, href: "/seller/addtransportation" },
      {
        title: "Bookings",
        icon: ShoppingCart,
        href: "/seller/transportationbookings"
      }
    ]
  }
];

export default function TradeFlowSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-5">
        <h1 className="text-2xl font-bold text-primary">TradeFlow</h1>
      </SidebarHeader>
      <SidebarContent>
        {sidebarItems.map(section =>
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map(item =>
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                          pathname === item.href &&
                            "bg-muted font-medium text-primary"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/seller/profile"}
                >
                  <Link
                    href="/seller/profile"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                      pathname === "/seller/profile" &&
                        "bg-muted font-medium text-primary"
                    )}
                  >
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
