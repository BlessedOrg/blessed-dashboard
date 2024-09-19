"use client";
import { DashboardSidebar } from "../homeDashboard/DashboardSidebar";
import { AppDashboardSidebarNav } from "./appDashboardSidebarNav/AppDashboardSidebarNav";
import { Suspense, useState } from "react";
import { LoadingDashboardSkeleton } from "../homeDashboard/LoadingDashboardSkeleton";
import { AppDashboardContent } from "./appDashboardContent/AppDashboardContent";

export const AppDashboard = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const onTabChange = (index) => {
    setCurrentTabIndex(index);
  };
  return (
    <main className="flex xl:flex-row flex-col-reverse md:flex-col gap-6 w-full px-[1.5rem] max-w-[90rem] self-center">
      <AppDashboardSidebarNav onTabChange={onTabChange} currentTabIndex={currentTabIndex} className="hidden md:block" />
      <Suspense fallback={<LoadingDashboardSkeleton />}>
        <AppDashboardContent currentTabIndex={currentTabIndex} onTabChange={onTabChange} />
      </Suspense>
      <DashboardSidebar />
    </main>
  );
};
