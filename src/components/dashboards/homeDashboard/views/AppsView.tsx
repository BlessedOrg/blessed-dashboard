"use client";
import { Card, CardContent } from "../../../ui/card";
import { CreateAppModal } from "@/components/modals/CreateAppModal";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/store/UserContext";
import { LoadingDashboardSkeleton } from "@/components/common/LoadingDashboardSkeleton";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { getAppGradient } from "@/utils/colorGenerate";

export const AppsView = () => {
  const {
    appsData: { isAppsLoading, apps },
    isLoading
  } = useUserContext();

  return (
    <div className="flex flex-col gap-4 w-full">
      {(isAppsLoading || isLoading) && <LoadingDashboardSkeleton />}
      {!apps.length && !isAppsLoading && !isLoading && (
        <Card className="py-10">
          <p className="font-semibold text-lg text-gray-500 text-center">No apps yet</p>
        </Card>
      )}
      {!!apps?.length && <p className="font-semibold">My apps</p>}
      {apps.map((app, index) => {
        return (
          <Card key={app.name + index} className="relative" variant="rounded">
            <CardContent className="flex gap-4 justify-between items-center ">
              <Link href={`/${app.slug}`} className="absolute w-full h-full" />
              <div className="flex gap-4 w-full">
                <div className={`w-[100px] h-[100px] rounded-[1rem]`} style={getAppGradient(app.colors)}></div>

                <div className="flex flex-col gap-1">
                  <div>
                    <p className="text-sm text-gray-500 uppercase font-semibold">{new Date(app?.createdAt).toLocaleDateString()}</p>
                    <h3 className="font-semibold text-lg">{app.name}</h3>
                    <p className="text-sm font-semibold text-gray-500">{app.description}</p>
                  </div>
                </div>
              </div>
              <ChevronRight size={32} />
            </CardContent>
          </Card>
        );
      })}
      {!!apps?.length && <div className="flex gap-4 justify-center">
        <Button variant="outline">See more</Button>
        <CreateAppModal variant="yellow" label="Add new app" />
      </div>}
    </div>
  );
};
