"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { LoadingDashboardSkeleton } from "@/components/common/LoadingDashboardSkeleton";
import { ApiKeyTab } from "@/components/dashboards/appDashboard/tabs/ApiKeyTab";
import { AppOverview } from "@/components/dashboards/appDashboard/tabs/appOverview/AppOverview";
import { AppEventsTab } from "@/components/dashboards/appDashboard/tabs/events/AppEventsTab";

type TabId = keyof typeof TAB_PARAMS_MAP;

interface AppDashboardContentProps {
  currentTabIndex: number;
  onTabChange: (index: number) => void;
  appData?: IAppData;
  appId?: string;
  isLoading: boolean;
}

const TAB_PARAMS_MAP = {
  overview: 0,
  events: 1,
  "api-key": 3
} as const;

const DEFAULT_TAB = "overview";

export const AppDashboardContent = ({ currentTabIndex, onTabChange, appData, isLoading }: AppDashboardContentProps) => {
  const searchParams = useSearchParams();
  const currentTab = (searchParams.get("tab") || DEFAULT_TAB) as TabId;

  const contentPerTab: Record<number, JSX.Element> = {
    0: <AppOverview appId={appData?.slug} />,
    1: <AppEventsTab appId={appData?.slug} />,
    3: <ApiKeyTab appId={appData?.slug} apiTokens={appData?.ApiTokens} />
  };

  useEffect(() => {
    const activeTabIndex = TAB_PARAMS_MAP[currentTab];
    onTabChange(activeTabIndex);
  }, [currentTab, onTabChange]);

  if (isLoading) {
    return <LoadingDashboardSkeleton />;
  }

  return contentPerTab[currentTabIndex] || null;
};
