"use client";
import { LoadingDashboardSkeleton } from "@/components/common/LoadingDashboardSkeleton";
import { NameAndDescriptionTab } from "@/components/dashboards/eventDashboard/tabs/NameAndDescriptionTab";
import { TicketsTab } from "@/components/dashboards/eventDashboard/tabs/TicketsTab";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

type TabId = keyof typeof TAB_PARAMS_MAP;

interface AppDashboardContentProps {
  currentTabIndex: number;
  onTabChange: (index: number) => void;
  eventData?: IEvent;
  appId: string;
  eventId: string;
  isLoading: boolean;
}

const TAB_PARAMS_MAP = {
  "name-and-description": 0,
  tickets: 1,
} as const;

const DEFAULT_TAB = "name-and-description";

export const EventDashboardContent = ({ currentTabIndex, onTabChange, eventData, isLoading, eventId, appId }: AppDashboardContentProps) => {
  const searchParams = useSearchParams();
  const currentTab = (searchParams.get("tab") || DEFAULT_TAB) as TabId;

  const contentPerTab: Record<number, JSX.Element> = {
    0: (
      <NameAndDescriptionTab
        defaultValues={{ name: eventData?.name, description: eventData?.description, logo: eventData?.logoUrl }}
        appId={appId}
        eventId={eventId}
      />
    ),
    1: <TicketsTab appId={appId} eventId={eventId} />,
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