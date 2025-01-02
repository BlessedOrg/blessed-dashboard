"use client";
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Dashboard } from "../tabs/Dashboard";
import { AppsView } from "../views/AppsView";

const paramsIndexPerId = {
  dashboard: 0,
  apps: 1,
  analytics: 2
};

const contentPerTab = {
  0: <Dashboard />,
  1: <AppsView />,
  2: <AdminDashboard />
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
