"use client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useUserContext } from "@/store/UserContext";

export const AvatarMenu = () => {
  const {onLogout} = useUserContext()
return <DropdownMenu>
  <DropdownMenuTrigger>
    <Image src={"/img/placeholder_avatar.png"} alt="avatar" width={56} height={56} className="h-[56px] rounded-full" />
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem asChild>
      <button className="w-full" onClick={onLogout}>Logout</button>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
}