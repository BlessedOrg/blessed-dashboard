"use client";
import { Card } from "../../ui/card";
import Image from "next/image";
import { CreateAppModal } from "@/components/createAppModal/CreateAppModal";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/store/UserContext";
import { LoadingDashboardSkeleton } from "@/components/homeDashboard/LoadingDashboardSkeleton";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const AppsView = () => {
  const {
    appsData: { apps, isAppsLoading },
    isLoading,
  } = useUserContext();
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-4">
        <h3 className="font-semibold text-xl">Recent apps</h3>
        {(isAppsLoading || isLoading) && <LoadingDashboardSkeleton />}
        {!apps.length && !isAppsLoading && !isLoading && (
          <Card>
            <p className="font-semibold text-lg text-gray-500 text-center">No apps, create one!</p>
          </Card>
        )}
        {apps.map((app, index) => {
          return (
            <Card key={app.name + index} className="flex gap-4 justify-between items-center relative">
              <Link href={`/${app.slug}`} className="absolute w-full h-full" />
              <div className="flex gap-4 w-full">
                {!!app.imageUrl ? (
                  <Image
                    src={app.imageUrl}
                    alt=""
                    width={175}
                    height={99}
                    className="rounded-2xl w-full max-w-[175px] h-[100px] object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center bg-gradient-to-r from-[#FFFACD] to-[#EFEFEF] rounded-2xl w-full max-w-[175px] h-[100px]">
                    <Image src={"/img/icons/party-popper.svg"} width={80} height={80} alt="" />
                  </div>
                )}

                <div className="flex flex-col gap-1">
                  <div>
                    <p className="text-sm text-gray-500 uppercase font-semibold">Festivals</p>
                    <h3 className="font-semibold text-lg">{app.name}</h3>
                    <p className="text-sm font-semibold text-gray-500">{app.description}</p>
                  </div>
                </div>
              </div>
              <ChevronRight size={32} />
            </Card>
          );
        })}
      </div>
      <div className="flex gap-4 justify-center">
        <Button variant="outline" className="rounded-full" size="lg">
          See more
        </Button>
        <CreateAppModal variant="green" label="Add new app" />
      </div>
    </div>
  );
};
