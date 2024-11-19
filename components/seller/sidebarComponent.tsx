"use client";

import { FileText, Package, ShoppingCart, Upload, User } from "lucide-react";
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
      <aside className="w-64 bg-white shadow-md h-screen">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">TradeFlow</h1>
        </div>
        <nav className="mt-6">
          <Link
            href="/seller/dashboard"
            className={`block py-2 px-4 text-gray-700 hover:bg-gray-100 ${isActive(
              "/seller/dashboard"
            )
              ? "bg-gray-200"
              : ""}`}
          >
            <Package className="inline-block mr-2" size={20} />
            Dashboard
          </Link>
          <Link
            href="/seller/quotations"
            className={`block py-2 px-4 text-gray-700 hover:bg-gray-100 ${isActive(
              "/seller/quotations"
            )
              ? "bg-gray-200"
              : ""}`}
          >
            <FileText className="inline-block mr-2" size={20} />
            Quotations
          </Link>
          <Link
            href="/seller/productbookings"
            className={`block py-2 px-4 text-gray-700 hover:bg-gray-100 ${isActive(
              "/seller/productbookings"
            )
              ? "bg-gray-200"
              : ""}`}
          >
            <ShoppingCart className="inline-block mr-2" size={20} />
            Product Bookings
          </Link>
          <Link
            href="/seller/uploadproducts"
            className={`block py-2 px-4 text-gray-700 hover:bg-gray-100 ${isActive(
              "/seller/uploadproducts"
            )
              ? "bg-gray-200"
              : ""}`}
          >
            <Upload className="inline-block mr-2" size={20} />
            Upload Products
          </Link>
          <Link
            href="/seller/profile"
            className={`block py-2 px-4 text-gray-700 hover:bg-gray-100 ${isActive(
              "/seller/profile"
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
