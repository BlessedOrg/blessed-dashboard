"use client";
import { DashboardSidebar } from "@/components/common/globalSidebar/DashboardSidebar";
import { LoadingDashboardSkeleton } from "@/components/common/LoadingDashboardSkeleton";
import { useUserContext } from "@/store/UserContext";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { GenerateContent } from "../creationView/GenerateContent";
import { SidebarNavigation } from "../creationView/SidebarNavigation";

interface IProps {
  createViewItems: any;
  form: any;
  defaultCategory: string;
  defaultTab: string;
  eventId?: string;
  appId?: string;
}
export const Dashboard = ({ createViewItems, form, defaultCategory, defaultTab, eventId, appId }: IProps) => {
  const { isLoading } = useUserContext();
  const selectedCategory = useSearchParams().get("category") || defaultCategory;
  const selectedTab = useSearchParams().get("tab") || defaultTab;

  const [isProcessing, setIsProcessing] = useState(false);

  const toggleProcessingState = (state: boolean) => {
    setIsProcessing(state);
  };
	
  return (
    <main className="flex xl:flex-row flex-col-reverse md:flex-col gap-6 w-full px-[1.5rem] max-w-[90rem] self-center">
      <SidebarNavigation
        isProcessing={isProcessing}
        selectedCategory={selectedCategory}
        selectedTab={selectedTab}
        createViewItems={createViewItems}
        form={form}
      />
      {!isLoading && (
        <GenerateContent
          isProcessing={isProcessing}
          form={form}
          selectedTab={selectedTab}
          createViewItems={createViewItems}
          eventId={eventId}
          appId={appId}
          toggleProcessingState={toggleProcessingState}
        />
      )}
      {isLoading && <LoadingDashboardSkeleton />}
      <DashboardSidebar appSlug={appId} eventSlug={eventId} />
    </main>
  );
};
