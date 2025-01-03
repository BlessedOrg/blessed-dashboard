"use client";
import { DashboardSidebar } from '@/components/common/globalSidebar/DashboardSidebar';
import { CampaignsDashboardContent } from "@/components/dashboards/campaignsDashboard/campaignsDashboardContent/CampaignsDashboardContent";
import { CampaignsDashboardSidebarNav } from "@/components/dashboards/campaignsDashboard/campaignsDashboardSidebarNav/CampaignsDashboardSidebarNav";
import { CreateCampaignModal } from "@/components/dashboards/campaignsDashboard/campaignsDashboardSidebarNav/createCampaignModal/CreateCampaignModal";
import { Card } from "@/components/ui";
import { fetcherWithToken } from "@/requests/requests";
import { apiUrl } from "@/variables/variables";
import { isArray } from "lodash-es";
import { LandPlot } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";

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
        <Card className="p-8 text-center text-gray-500 w-full">
          <LandPlot className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">No campaigns available yet</p>
          <p className="text-sm mb-4">Create your first campaign to get started</p>
          <CreateCampaignModal appId={appId} onSuccess={mutate} mode="green" />
        </Card>
      )}
      <DashboardSidebar appSlug={appId} />
    </main>
  );
};
