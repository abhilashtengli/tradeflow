import Sidebar from "@/components/transporter/sidebarComponent";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { Bell } from "lucide-react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate">
              Transporter Dashboard
            </h2>
            <div className="flex items-center">
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
        <Toaster />
      </main>
    </div>
  );
};

export default layout;
