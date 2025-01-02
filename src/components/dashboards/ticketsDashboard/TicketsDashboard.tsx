"use client";
import { LoadingDashboardSkeleton } from "@/components/common/LoadingDashboardSkeleton";
import { TicketsDashboardSidebarNav } from "@/components/dashboards/ticketsDashboard/ticketsDashboardSidebarNav/TicketsDashboardSidebarNav";
import { Suspense, useState } from "react";
import { DashboardSidebar } from "../../common/DashboardSidebar";
import { TicketsDashboardContent } from './ticketsDashboardContent/TicketsDashboardContent';

export const TicketsDashboard = ({ appId, eventId }) => {

  const [currentTabId, setCurrentTabId] = useState(null);
  const onTabChange = (index) => {
    setCurrentTabId(index);
  };

  return (
    <main className="flex lg:flex-row flex-col-reverse md:flex-col gap-6 w-full px-[1.5rem] max-w-[90rem] self-center">
      <TicketsDashboardSidebarNav currentTabIndex={currentTabId} />
      <Suspense fallback={<LoadingDashboardSkeleton />}>
        <TicketsDashboardContent
          currentTabIndex={currentTabId}
          onTabChange={onTabChange}
          eventId={eventId}
          appId={appId}
        />
      </Suspense>
      <DashboardSidebar appSlug={appId} eventSlug={eventId}/>
    </main>
  );
};
