import { Globe } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const NavbarHome = () => {
  return (
    <div className="fixed w-full">
      <header className="sticky top-0 px-10 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Globe className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl">TradeFlow</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#solutions"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              Solutions
            </Link>
            <Link
              href="#resources"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              Resources
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              Pricing
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/signin">
              <Button
                variant="ghost"
                className="hidden md:inline-flex hover:text-blue-600 transition-colors"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                variant="ghost"
                className="hidden md:inline-flex hover:text-blue-600 transition-colors"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default NavbarHome;
