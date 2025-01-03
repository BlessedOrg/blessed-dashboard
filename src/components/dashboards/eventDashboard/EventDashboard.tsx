"use client";
import { DashboardSidebar } from '@/components/common/globalSidebar/DashboardSidebar';
import { LoadingDashboardSkeleton } from "@/components/common/LoadingDashboardSkeleton";
import { EventDashboardContent } from "@/components/dashboards/eventDashboard/eventDashboardContent/EventDashboardContent";
import { EventDashboardSidebarNav } from "@/components/dashboards/eventDashboard/eventDashboardSidebarNav/EventDashboardSidebarNav";
import { fetcherWithToken } from "@/requests/requests";
import { apiUrl } from "@/variables/variables";
import { Suspense, useState } from "react";
import useSWR from "swr";

export const EventDashboard = ({ appId, eventId }) => {
  const { data: eventData, isLoading, mutate } = useSWR(`${apiUrl}/private/events/${appId}/${eventId}`, fetcherWithToken);

  const [currentTabId, setCurrentTabId] = useState(null);
  const onTabChange = (index) => {
    setCurrentTabId(index);
  };

  return (
    <main className="flex lg:flex-row flex-col-reverse md:flex-col gap-6 w-full px-[1.5rem] max-w-[90rem] self-center">
      <EventDashboardSidebarNav currentTabIndex={currentTabId} />
      <Suspense fallback={<LoadingDashboardSkeleton />}>
        <EventDashboardContent
          currentTabIndex={currentTabId}
          onTabChange={onTabChange}
          isLoading={isLoading}
          eventData={eventData}
          eventId={eventId}
          appId={appId}
          mutateEventData={mutate}
        />
      </Suspense>
      <DashboardSidebar appSlug={appId} eventSlug={eventData?.slug}/>
    </main>
  );
};
