"use client";
import { useUserContext } from "@/store/UserContext";
import { CreateEventDashboardSidebarFields } from "@/components/dashboards/createEventDashboard/createDashboardSidebarFields/CreateEventDashboardSidebarFields";
import { CreateEventDashboardContent } from "@/components/dashboards/createEventDashboard/createEventDashboardContent/CreateEventDashboardContent";
import { LoadingDashboardSkeleton } from "@/components/common/LoadingDashboardSkeleton";
import { DashboardSidebar } from "@/components/common/DashboardSidebar";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

interface IProps {
  createViewItems: any;
  form: any;
  defaultCategory: string;
  defaultTab: string;
  eventId?: string;
  appId?: string;
}
export const CreateEventDashboard = ({ createViewItems, form, defaultCategory, defaultTab, eventId, appId }: IProps) => {
  const { isLoading } = useUserContext();
  const selectedCategory = useSearchParams().get("category") || defaultCategory;
  const selectedTab = useSearchParams().get("tab") || defaultTab;

  const [isProcessing, setIsProcessing] = useState(false);

  const toggleProcessingState = (state: boolean) => {
    setIsProcessing(state);
  };
  return (
    <main className="flex xl:flex-row flex-col-reverse md:flex-col gap-6 w-full px-[1.5rem] max-w-[90rem] self-center">
      <CreateEventDashboardSidebarFields isProcessing={isProcessing} selectedCategory={selectedCategory} selectedTab={selectedTab} createViewItems={createViewItems} />
      {!isLoading && <CreateEventDashboardContent isProcessing={isProcessing} form={form} selectedTab={selectedTab} createViewItems={createViewItems} eventId={eventId} appId={appId} toggleProcessingState={toggleProcessingState} />}
      {isLoading && <LoadingDashboardSkeleton />}
      <DashboardSidebar />
    </main>
  );
};
