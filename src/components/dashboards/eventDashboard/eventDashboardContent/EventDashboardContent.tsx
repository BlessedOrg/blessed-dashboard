"use client";
import { LoadingDashboardSkeleton } from "@/components/common/LoadingDashboardSkeleton";
import { TicketsTab } from "@/components/dashboards/eventDashboard/tabs/TicketsTab";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { EventDetails } from "@/components/dashboards/eventDashboard/tabs/EventDetails";

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
  "event-details": 0,
  tickets: 1
} as const;

const DEFAULT_TAB = "event-details";

export const EventDashboardContent = ({ currentTabIndex, onTabChange, eventData, isLoading, eventId, appId }: AppDashboardContentProps) => {
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
    1: <TicketsTab appId={appId} eventId={eventId} />
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
