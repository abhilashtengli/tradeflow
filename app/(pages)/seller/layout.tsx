import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/seller/sidebarComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Search } from "lucide-react";
import { UserMenu } from "./components/UseMenu";
import axios from "axios";
import { baseUrl } from "@/app/config";
import { Toaster } from "@/components/ui/toaster";
import { cookies } from "next/headers"; // Import Next.js cookie handling
import { getToken } from "next-auth/jwt";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  let data;
  try {
    const token = await getToken({
      req: { headers: { cookie: cookies().toString() } }, // Use cookies from `next/headers`
      secret: process.env.AUTH_SECRET,
      cookieName: "authjs.session-token" // Adjust this if you use a different cookie name
    });

    if (!token) {
      throw new Error("Authentication token not found or invalid.");
    }

    // Pass the decoded token in your API request
    const response = await axios.get(`${baseUrl}/user/getSigninUser`, {
      headers: {
        Authorization: `Bearer ${token}` // If your API expects a bearer token
      }
    });

    data = response.data.data;
    console.log(data);
  } catch (err) {
    console.log(err);
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100 w-full">
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
                <UserMenu data={data} />
              </div>
            </div>
          </header>
          {children}
          <Toaster />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
