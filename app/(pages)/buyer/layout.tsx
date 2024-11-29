import Sidebar from "@/components/buyer/sidebarComponent";
import SearchBar from "@/components/Searchbar/searchbar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { Bell } from "lucide-react";
import { UserMenu } from "./components/UseMenu";
import axios from "axios";
import { baseUrl } from "@/app/config";

const layout = async ({ children }: { children: React.ReactNode }) => {
  let data;
  try {
    const response = await axios.get(`${baseUrl}/user/getSigninUser`);
    data = response.data.data;
  } catch (err) {
    console.log(err);
  }
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate">
              Buyer Dashboard
            </h2>
            <div className="flex items-center">
              <SearchBar />
              <Button variant="ghost" size="icon" className="ml-4">
                <Bell size={20} />
              </Button>
              <UserMenu data={data} />
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
