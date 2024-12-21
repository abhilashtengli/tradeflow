"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { User, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

type User = {
  name: string;
  email: string;
};

export function UserMenu({ data }: { data: User }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userData, setUserdata] = useState(data);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleProfileClick = () => {
    setIsOpen(false);
    router.push("/seller/profile");
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/signin" }); // Redirect after sign-out

    console.log("Logging out...");
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Avatar className="ml-4 cursor-pointer hover:opacity-80">
          <AvatarFallback>
            {" "}
            {userData?.name ? userData.name.slice(0, 2).toUpperCase() : "??"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userData?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {userData?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={handleProfileClick} className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleLogout} className="text-red-600 cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
