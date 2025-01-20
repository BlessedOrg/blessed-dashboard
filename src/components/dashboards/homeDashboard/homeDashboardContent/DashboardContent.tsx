"use client";
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Dashboard } from "../tabs/Dashboard";

const paramsIndexPerId = {
  dashboard: 0,
  analytics: 1
};

const contentPerTab = {
  0: <Dashboard />,
  1: <AdminDashboard />
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
