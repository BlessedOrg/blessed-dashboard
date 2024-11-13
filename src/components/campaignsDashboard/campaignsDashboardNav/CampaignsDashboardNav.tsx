"use client";
import Link from "next/link";
import Image from "next/image";
import { MobileNavigation } from "../../homeDashboard/navigation/MobileNavigation";
import { AvatarMenu } from "@/components/ui/avatar-menu";
import { Button } from "@/components/ui";

export const CampaignsDashboardNav = ({ type, appId }: { type: "campaign" | "audience"; appId: string }) => {
  const links = [
    {
      active: type === "campaign",
      href: `/${appId}/campaigns`,
      label: "Campaigns",
    },
    {
      active: type === "audience",
      href: `/${appId}/audience`,
      label: "Audience",
    },
  ];
  return (
    <nav className="flex justify-between w-full py-6 bg-background px-6 sticky top-0 left-0 right-0 z-20">
      <div className="flex gap-2">
        <Link href={"/"} className="p-2 rounded-full bg-white h-[3.25rem] flex items-center justify-center">
          <Image src={"/logo-small.svg"} alt="logo blessed" width={36} height={36} className="h-[36px]" />
        </Link>
      </div>
      <div className="hidden gap-2 md:flex">
        {links.map((link) => (
          <Button size="xl" key={link.href} className={`${link.active ? "bg-white" : "bg-transparent"}`} asChild>
            <Link href={link.href}>{link.label}</Link>
          </Button>
        ))}
      </div>
      <div className="hidden gap-2 items-center md:flex">
        <AvatarMenu />
      </div>
      <MobileNavigation />
    </nav>
  );
};
