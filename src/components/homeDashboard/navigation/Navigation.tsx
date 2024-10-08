"use client";
import Image from "next/image";
import Link from "next/link";
import { MobileNavigation } from "./MobileNavigation";
import { CreateAppModal } from "@/components/createAppModal/CreateAppModal";
import { useEffect } from "react";
import { setCookie } from "cookies-next";
import { AvatarMenu } from "@/components/ui/avatar-menu";

export const Navigation = ({ searchParams }) => {
  useEffect(() => {
    if (!!searchParams?.token) {
      setCookie("accessToken", `${searchParams.token}`);
      window.location.replace(new URL(window.location.origin))
    }
  }, [searchParams]);
  return (
    <nav className="flex justify-between w-full py-6 bg-background px-6 sticky top-0 left-0 right-0 z-20">
      <Link href={"/"} className="p-2 pr-4 rounded-full bg-white h-[3.25rem] flex items-center justify-center">
        <Image src={"/logo.svg"} alt="logo blessed" width={119} height={36} className="h-[36px]" />
      </Link>
      <div className="hidden md:flex gap-5 items-center">
        <AvatarMenu />
        <CreateAppModal label="Add new app" variant="green" size="xl" />
      </div>
      <MobileNavigation />
    </nav>
  );
};
