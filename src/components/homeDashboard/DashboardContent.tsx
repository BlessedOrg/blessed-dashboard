"use client";
import { Dashboard } from "./tabs/Dashboard";
import { AppsView } from "./views/AppsView";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const paramsIndexPerId = {
  dashboard: 0,
  apps: 1
};

const contentPerTab = {
  0: <Dashboard />,
  1: <AppsView />
};

export const DashboardContent = ({ currentTabIndex, onTabChange }) => {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "dashboard";

  useEffect(() => {
    const activeTabIndex = paramsIndexPerId[currentTab];
    onTabChange(activeTabIndex);
  }, [currentTab]);

  return contentPerTab[currentTabIndex];
};
