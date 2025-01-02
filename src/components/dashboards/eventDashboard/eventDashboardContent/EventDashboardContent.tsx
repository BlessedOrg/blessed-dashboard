"use client";
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { LoadingDashboardSkeleton } from "@/components/common/LoadingDashboardSkeleton";
import { EventDetails } from "@/components/dashboards/eventDashboard/tabs/EventDetails";
import { EventManagementTab } from "@/components/dashboards/eventDashboard/tabs/eventManagement/EventManagementTab";
import { RevenueDistributionView } from '@/components/revenue/RevenueDistributionView';
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
  mutateEventData: () => void;
}

const TAB_PARAMS_MAP = {
  "event-details": 0,
  "event-management": 1,
  analytics: 4,
  "revenue-distribution": 5
} as const;

const DEFAULT_TAB = "event-details";

export const EventDashboardContent = ({ currentTabIndex, mutateEventData, onTabChange, eventData, isLoading, eventId, appId }: AppDashboardContentProps) => {
  const searchParams = useSearchParams();
  const currentTab = (searchParams.get("tab") || DEFAULT_TAB) as TabId;
  const formattedDefaultValues = {
    ...eventData,
    eventLocation: eventData?.EventLocation,
    startsAt: new Date(eventData?.startsAt),
    endsAt: new Date(eventData?.endsAt),
    logoUrl: !!eventData?.logoUrl ? eventData.logoUrl : "/img/placeholder_image.jpeg"
  } as IEventDetails;

  const contentPerTab: Record<number, JSX.Element> = {
    0: (
      <EventDetails eventData={formattedDefaultValues} />
    ),
    1: <EventManagementTab isLoading={isLoading} appId={appId} eventId={eventId} eventData={formattedDefaultValues} mutateEventData={mutateEventData} />,
    4: <AdminDashboard hardcodedParam={`?getBy=event&eventId=${eventData?.id}`} />,
    5: <RevenueDistributionView appId={appId} eventId={eventId} isStateManaged={false} />
  };

  useEffect(() => {
    const activeTabIndex = TAB_PARAMS_MAP[currentTab];
		console.log(TAB_PARAMS_MAP, currentTab)
    onTabChange(activeTabIndex);
  }, [currentTab, onTabChange]);

  if (isLoading) {
    return <LoadingDashboardSkeleton />;
  }

  return contentPerTab[currentTabIndex] || null;
};
