"use client";
import { DashboardSidebar } from "../homeDashboard/DashboardSidebar";
import { CampaignsDashboardSidebarNav } from "@/components/campaignsDashboard/campaignsDashboardSidebarNav/CampaignsDashboardSidebarNav";
import { useState } from "react";
import useSWR from "swr";
import { fetcherWithToken } from "@/requests/requests";
import { apiUrl } from "@/variables/variables";
import { isArray } from "lodash-es";
import { CampaignsDashboardContent } from "@/components/campaignsDashboard/campaignsDashboardContent/CampaignsDashboardContent";
import { Card } from "@/components/ui";
import { CreateCampaignModal } from "@/components/campaignsDashboard/campaignsDashboardSidebarNav/createCampaignModal/CreateCampaignModal";

export const CampaignsDashboard = ({ appId }) => {
  const { data: campaignsData, isLoading, mutate } = useSWR(`${apiUrl}/private/apps/${appId}/campaigns`, fetcherWithToken);
  const campaigns = (isArray(campaignsData) ? campaignsData : []) as ICampaign[];

  const [currentTabId, setCurrentTabId] = useState(null);
  const onTabChange = (index) => {
    setCurrentTabId(index);
  };

  const currentCampaign = campaigns?.find((campaign) => campaign.slug === currentTabId) || campaigns?.[0];

  return (
    <main className="flex lg:flex-row flex-col-reverse md:flex-col gap-6 w-full px-[1.5rem] max-w-[90rem] self-center">
      <CampaignsDashboardSidebarNav
        onTabChange={onTabChange}
        currentTabId={currentTabId}
        className="hidden md:flex"
        campaigns={campaigns}
        appId={appId}
        mutateCampaigns={mutate}
      />
      {currentCampaign && (
        <CampaignsDashboardContent currentCampaign={currentCampaign} isLoading={isLoading} appId={appId} mutateCampaigns={mutate} />
      )}
      {!currentCampaign && (
        <Card className="w-full flex h-fit items-center flex-col gap-2">
          <p className="font-semibold text-2xl">Create new campaign</p>
          <CreateCampaignModal appId={appId} onSuccess={mutate} mode="green" />
        </Card>
      )}
      <DashboardSidebar />
    </main>
  );
};
