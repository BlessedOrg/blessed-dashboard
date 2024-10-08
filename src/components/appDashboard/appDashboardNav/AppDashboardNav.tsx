import Link from "next/link";
import Image from "next/image";
import { CustomButton } from "../../CustomComponents";
import { MobileNavigation } from "../../homeDashboard/navigation/MobileNavigation";
import { AppSelect } from "./AppSelect";
import { Button } from "@/components/ui";
import { AvatarMenu } from "@/components/ui/avatar-menu";

export const AppDashboardNav = ({ appId }) => {
  return (
    <nav className="flex justify-between w-full py-6 bg-background px-6 sticky top-0 left-0 right-0 z-20">
      <div className="flex gap-2">
        <Link href={"/"} className="p-2 rounded-full bg-white h-[3.25rem] flex items-center justify-center">
          <Image src={"/logo-small.svg"} alt="logo blessed" width={36} height={36} className="h-[36px]" />
        </Link>
        <AppSelect currentAppId={appId} />
      </div>
      <div className="hidden gap-2 md:flex">
        <CustomButton className="bg-white">App</CustomButton>
        <CustomButton className="bg-transparent">Analyze</CustomButton>
      </div>
      <div className="hidden gap-2 items-center md:flex">
        <Button variant="green" asChild className="px-10 rounded-full" size="lg">
          <Link href={"https://docs.blessed.fan/"}>Docs</Link>
        </Button>
        <AvatarMenu />
      </div>
      <MobileNavigation />
    </nav>
  );
};
