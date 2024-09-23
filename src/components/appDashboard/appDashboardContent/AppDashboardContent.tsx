"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { ApiKeyTab } from "../tabs/ApiKeyTab";
import { NameAndDescriptionTab } from "../tabs/NameAndDescriptionTab";
import { Card } from "../../ui/card";

const paramsIndexPerId = {
  "api-key": 0,
  "name-and-description": 1,
  "ticket-management": 2,
  "token-management": 3,
};

export const AppDashboardContent = ({ currentTabIndex, onTabChange, appData }) => {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "name-and-description";

  const contentPerTab = {
    0: <ApiKeyTab appId={appData?.id} />,
    1: <NameAndDescriptionTab appData={appData} />,
    2: <Card className="w-full h-fit" />,
    3: <Card className="w-full h-fit" />,
  };

  useEffect(() => {
    const activeTabIndex = paramsIndexPerId[currentTab];
    onTabChange(activeTabIndex);
  }, [currentTab]);

  return contentPerTab[currentTabIndex];
};
