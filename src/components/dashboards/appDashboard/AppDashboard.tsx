"use client";
import { fetcherWithToken } from "@/requests/requests";
import { apiUrl } from "@/variables/variables";
import { Suspense, useState } from "react";
import useSWR from "swr";
import { DashboardSidebar } from "../../common/DashboardSidebar";
import { LoadingDashboardSkeleton } from "../../common/LoadingDashboardSkeleton";
import { AppDashboardContent } from "./appDashboardContent/AppDashboardContent";
import { AppDashboardSidebarNav } from "./appDashboardSidebarNav/AppDashboardSidebarNav";

export const AppDashboard = ({ appId }) => {
  const { data: appData, isLoading } = useSWR(`${apiUrl}/private/apps/${appId}`, fetcherWithToken);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const onTabChange = (index) => {
    setCurrentTabIndex(index);
  };
  return (
    <main className="flex lg:flex-row flex-col-reverse md:flex-col gap-6 w-full px-[1.5rem] max-w-[90rem] self-center">
      <AppDashboardSidebarNav currentTabIndex={currentTabIndex} className="hidden md:block" />
      <Suspense fallback={<LoadingDashboardSkeleton />}>
        <AppDashboardContent
          currentTabIndex={currentTabIndex}
          onTabChange={onTabChange}
          isLoading={isLoading}
          appData={appData}
          appId={appId}
        />
      </Suspense>
      <DashboardSidebar appSlug={appData?.slug} />
    </main>
  );
};
