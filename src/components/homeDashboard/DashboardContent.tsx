"use client";
import { Analyticts } from "./tabs/Analyticts";
import { Dashboard } from "./tabs/Dashboard";
import { Templates } from "./tabs/Templates";
import { AppsView } from "./views/AppsView";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const paramsIndexPerId = {
  dashboard: 0,
  apps: 1,
  analytics: 2,
  templates: 3,
};

const contentPerTab = {
  0: <Dashboard />,
  1: <AppsView />,
  2: <Analyticts />,
  3: <Templates />,
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
