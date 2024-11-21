"use client";
import { HomeDashboardSidebarNav } from "./homeDashboardSidebarNav/HomeDashboardSidebarNav";
import { DashboardSidebar } from "../../common/DashboardSidebar";
import { Suspense, useState } from "react";
import { DashboardContent } from "./homeDashboardContent/DashboardContent";
import { LoadingDashboardSkeleton } from "../../common/LoadingDashboardSkeleton";

export const HomeDashboard = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const onTabChange = (index) => {
    setCurrentTabIndex(index);
  };

  return (
    <main className="flex lg:flex-row flex-col-reverse md:flex-col gap-6 w-full px-[1.5rem] max-w-[90rem] self-center">
      <HomeDashboardSidebarNav currentTabIndex={currentTabIndex || 0} className="hidden md:block" />
      <Suspense fallback={<LoadingDashboardSkeleton />}>
        <DashboardContent currentTabIndex={currentTabIndex} onTabChange={onTabChange} />
      </Suspense>
      <DashboardSidebar />

    </main>
  );
};
