"use client";
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { TicketsTab } from "@/components/dashboards/ticketsDashboard/tabs/tickets/TicketsTab";
import { RevenueDistributionView } from '@/components/revenue/RevenueDistributionView';
import { fetcherWithToken } from '@/requests/requests';
import { apiUrl } from '@/variables/variables';
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import useSWR from 'swr';

type TabId = keyof typeof TAB_PARAMS_MAP;

interface AppDashboardContentProps {
  currentTabIndex: number;
  onTabChange: (index: number) => void;
  appId: string;
  eventId: string; 
}

const TAB_PARAMS_MAP = {
	tickets: 0,
	analytics: 2,
	"revenue-distribution": 3
} as const;

const DEFAULT_TAB = "tickets";

export const TicketsDashboardContent = ({ currentTabIndex, onTabChange, eventId, appId }: AppDashboardContentProps) => {
	const {
    data: ticketsData,
    isLoading: ticketsLoading,
    mutate
  } = useSWR<ITicket[]>(
    `${apiUrl}/private/tickets/${appId}/${eventId}`,
    fetcherWithToken
  );
	const searchParams = useSearchParams();
  const currentTab = (searchParams.get("tab") || DEFAULT_TAB) as TabId;

	console.log(ticketsData)

  const contentPerTab: Record<number, JSX.Element> = {
    0: <TicketsTab appId={appId} eventId={eventId} ticketsData={ticketsData} ticketsLoading={ticketsLoading} mutate={mutate} />,
    2: <AdminDashboard hardcodedParam={`?getBy=event&eventId=${eventId}`} />,
    3: <RevenueDistributionView appId={appId} eventId={eventId} isStateManaged={false} tickets={ticketsData || []} isTicketsView={true}/>
  };

  useEffect(() => {
    const activeTabIndex = TAB_PARAMS_MAP[currentTab];
    onTabChange(activeTabIndex);
  }, [currentTab, onTabChange]);


  return contentPerTab[currentTabIndex] || null;
};
