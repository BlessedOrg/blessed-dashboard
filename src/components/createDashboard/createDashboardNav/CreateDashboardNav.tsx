import Link from "next/link";
import Image from "next/image";
import { CustomButton } from "../../CustomComponents";
import { MobileNavigation } from "../../homeDashboard/navigation/MobileNavigation";
import { ProjectSelect } from "./ProjectSelect";
import { Suspense } from "react";
import { AvatarMenu } from "@/components/ui/avatar-menu";

export const CreateDashboardNav = () => {
  return (
    <nav className="flex justify-between w-full py-6 bg-background px-6 sticky top-0 left-0 right-0 z-20">
      <div className="flex gap-2">
        <Link href={"/"} className="p-2 rounded-full bg-white h-[3.25rem] flex items-center justify-center">
          <Image src={"/logo-small.svg"} alt="logo blessed" width={36} height={36} className="h-[36px]" />
        </Link>
        <ProjectSelect />
      </div>
      <div className="flex gap-2">
        <CustomButton className="bg-white">Create</CustomButton>
        {/*TODO hidden temporary*/}
        {/*<CustomButton className="bg-transparent">Analyze</CustomButton>*/}
      </div>
      <div className="hidden md:flex gap-5 items-center">
        <AvatarMenu />
        <CustomButton>Publish</CustomButton>
      </div>
      <Suspense>
        <MobileNavigation />
      </Suspense>
    </nav>
  );
};
