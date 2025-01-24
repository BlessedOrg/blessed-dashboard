"use client";
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { LoadingDashboardSkeleton } from "@/components/common/LoadingDashboardSkeleton";
import { ApiKeyTab } from "@/components/dashboards/appDashboard/tabs/ApiKeyTab";
import { AppOverview } from "@/components/dashboards/appDashboard/tabs/appOverview/AppOverview";
import { AppEventsTab } from "@/components/dashboards/appDashboard/tabs/events/AppEventsTab";
import { RevenueDistributionView } from '@/components/revenue/RevenueDistributionView';
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { PaymentsSettingsTab } from '../tabs/PaymentsSettingsTab';

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
	revenue: 2,
	analytics: 3,
  "api-key": 5,
	payments: 7
} as const;

const DEFAULT_TAB = "overview";

export const AppDashboardContent = ({ currentTabIndex, onTabChange, appData, isLoading }: AppDashboardContentProps) => {
  const searchParams = useSearchParams();
  const currentTab = (searchParams.get("tab") || DEFAULT_TAB) as TabId;

  const contentPerTab: Record<number, JSX.Element> = {
    0: <AppOverview appId={appData?.slug} />,
    1: <AppEventsTab appId={appData?.slug} />,
		2: <RevenueDistributionView appId={appData?.id} isStateManaged={false}/>,
		3: <AdminDashboard hardcodedParam={`?getBy=app&appId=${appData?.id}`} />,
    5: <ApiKeyTab appId={appData?.slug} apiTokens={appData?.ApiTokens} />,
		7: <PaymentsSettingsTab />
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
