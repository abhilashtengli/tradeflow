import { baseUrl } from "@/app/config";
import Sidebar from "@/components/transporter/sidebarComponent";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import axios from "axios";
import { Bell } from "lucide-react";
import { UserMenu } from "./components/UseMenu";

const layout = async ({ children }: { children: React.ReactNode }) => {
  let data;
  try {
    const response = await axios.get(`${baseUrl}/usertransporter/user`);
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
              Transporter Dashboard
            </h2>
            <div className="flex items-center">
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
