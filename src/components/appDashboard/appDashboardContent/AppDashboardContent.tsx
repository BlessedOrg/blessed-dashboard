"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { ApiKeyTab } from "../tabs/ApiKeyTab";
import { NameAndDescriptionTab } from "../tabs/NameAndDescriptionTab";
import { Card } from "../../ui/card";
import { CampaignsAndAudience } from "@/components/appDashboard/tabs/campaignsAndAudience/CampaignsAndAudience";
import { LoadingDashboardSkeleton } from "@/components/homeDashboard/LoadingDashboardSkeleton";

const paramsIndexPerId = {
  "api-key": 0,
  "name-and-description": 1,
  "campaigns-and-audience": 2
};

export const AppDashboardContent = ({ currentTabIndex, onTabChange, appData, appId, isLoading }) => {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "name-and-description";

  const contentPerTab = {
    0: <ApiKeyTab appId={appData?.id} apiTokens={appData?.ApiTokens} />,
    1: <NameAndDescriptionTab appData={appData} />,
    2: <CampaignsAndAudience appId={appId} />,
    3: <Card className="w-full h-fit" />
  };

  useEffect(() => {
    const activeTabIndex = paramsIndexPerId[currentTab];
    onTabChange(activeTabIndex);
  }, [currentTab]);

  return isLoading ? <LoadingDashboardSkeleton /> : contentPerTab[currentTabIndex];
};
