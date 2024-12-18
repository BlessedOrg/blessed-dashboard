"use client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useUserContext } from "@/store/UserContext";
import Link from "next/link";
import { PersonIcon } from "@radix-ui/react-icons";

export const AvatarMenu = () => {
  const { onLogout, avatarUrl } = useUserContext();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {!!avatarUrl ? <Image src={avatarUrl} alt="avatar" width={52} height={52} className="h-[3.25rem] rounded-full" /> : <div className="inset-0 flex items-center justify-center bg-gray-200 rounded-full w-[3.25rem] h-[3.25rem]">
          <PersonIcon className="w-6 h-6 text-gray-400" />
        </div>}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={"/profile"}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button className="w-full" onClick={onLogout}>
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
