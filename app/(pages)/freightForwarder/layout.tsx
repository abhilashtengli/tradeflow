import Sidebar from "@/components/freightforwarder/sidebarComponent";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { Bell } from "lucide-react";

import { UserMenu } from "./components/UseMenu";
import axios from "axios";
import { baseUrl } from "@/app/config";
import { createAuthorizedAxios } from "@/lib/authHelper";
const layout = async ({ children }: { children: React.ReactNode }) => {
  let data;
  try {
    const api = await createAuthorizedAxios();
    const response = await api.get(`${baseUrl}/freight/freightForwarder`);
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
              Freight Forwarder Dashboard
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
