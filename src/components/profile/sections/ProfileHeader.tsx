"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ProfileAvatar } from "../ui/ProfileAvatar";
import { format } from "date-fns";
import { useUserContext } from "@/store/UserContext";
import { shortenWalletAddress } from "@/utils/shortenWalletAddress";

export function ProfileHeader() {
  const { email, walletAddress, createdAt } = useUserContext();

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <ProfileAvatar />
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl font-semibold text-gray-900">{email || shortenWalletAddress(walletAddress)}</h2>
            <p className="text-sm text-gray-500">
              Member since {format(new Date(createdAt), "MMMM yyyy")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}