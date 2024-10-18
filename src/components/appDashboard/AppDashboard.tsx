"use client";
import { DashboardSidebar } from "../homeDashboard/DashboardSidebar";
import { AppDashboardSidebarNav } from "./appDashboardSidebarNav/AppDashboardSidebarNav";
import { Suspense, useState } from "react";
import { LoadingDashboardSkeleton } from "../homeDashboard/LoadingDashboardSkeleton";
import { AppDashboardContent } from "./appDashboardContent/AppDashboardContent";
import useSWR from "swr";
import { fetcherWithToken } from "@/requests/requests";
import { apiUrl } from "@/variables/variables";

export const AppDashboard = ({ appId }) => {
  const {data: appData, isLoading} = useSWR(`${apiUrl}/applications/${appId}`, fetcherWithToken);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const onTabChange = (index) => {
    setCurrentTabIndex(index);
  };
  return (
    <main className="flex xl:flex-row flex-col-reverse md:flex-col gap-6 w-full px-[1.5rem] max-w-[90rem] self-center">
      <AppDashboardSidebarNav currentTabIndex={currentTabIndex} className="hidden md:block" />
      <Suspense fallback={<LoadingDashboardSkeleton />}>
        <AppDashboardContent currentTabIndex={currentTabIndex} onTabChange={onTabChange} appData={appData} />
      </Suspense>
      <DashboardSidebar />
    </main>
  );
};
