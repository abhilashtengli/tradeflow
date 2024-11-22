"use client"; // Mark this component as client-side

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  // Debounce logic to delay search query updates
  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedQuery(searchQuery);
      }, 300); // Adjust debounce time as needed (300ms is common)
      return () => clearTimeout(handler);
    },
    [searchQuery]
  );

  useEffect(
    () => {
      if (debouncedQuery.trim() !== "") {
        router.push(`/buyer/dashboard?query=${debouncedQuery}`);
      } else {
        // If search query is empty, navigate to show all products
        router.push(`/buyer/dashboard`);
      }
    },
    [debouncedQuery, router]
  );

  return (
    <div className="relative">
      <Input
        type="search"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Search..."
        className="pl-10 pr-4 py-2 rounded-full"
      />
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={20}
      />
    </div>
  );
};

export default SearchBar;
