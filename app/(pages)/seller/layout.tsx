import Sidebar from "@/components/seller/sidebarComponent";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Search } from "lucide-react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate">
              Seller Dashboard
            </h2>
            <div className="flex items-center">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-full"
                />
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
              <Button variant="ghost" size="icon" className="ml-4">
                <Bell size={20} />
              </Button>
              <Avatar className="ml-4">
                {/* <AvatarImage src="/placeholder-avatar.jpg" alt="User" /> */}
                <AvatarFallback>US</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
};

export default layout;
