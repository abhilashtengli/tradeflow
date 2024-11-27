"use client";

import { Package, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Ensures this component is mounted on the client
  }, []);
  // Check if the link is active
  const isActive = (path: string) => isMounted && pathname === path;

  return (
    <div>
      <aside className="w-64 bg-white shadow-md h-full">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">TradeFlow</h1>
        </div>
        <nav className="mt-6">
          <Link
            href="/freightForwarder/ffdashboard"
            className={`block py-2 px-4 text-gray-700 hover:bg-gray-100 ${isActive(
              "/transporter/tsdashboard"
            )
              ? "bg-gray-200"
              : ""}`}
          >
            <Package className="inline-block mr-2" size={20} />
            Requested Quotations
          </Link>
          <Link
            href="/transporter/Bookings"
            className={`block py-2 px-4 text-gray-700 hover:bg-gray-100 ${isActive(
              "/transporter/Bookings"
            )
              ? "bg-gray-200"
              : ""}`}
          >
            <ShoppingCart className="inline-block mr-2" size={20} />
            Bookings
          </Link>

          <Link
            href="/transporter/profile"
            className={`block py-2 px-4 text-gray-700 hover:bg-gray-100 ${isActive(
              "/transporter/profile"
            )
              ? "bg-gray-200"
              : ""}`}
          >
            <User className="inline-block mr-2" size={20} />
            Profile
          </Link>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
