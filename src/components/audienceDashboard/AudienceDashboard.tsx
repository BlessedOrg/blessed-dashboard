"use client";
import { DashboardSidebar } from "../homeDashboard/DashboardSidebar";
import { useState } from "react";
import useSWR from "swr";
import { fetcherWithToken } from "@/requests/requests";
import { apiUrl } from "@/variables/variables";
import { isArray } from "lodash-es";
import { AudienceDashboardSidebarNav } from "@/components/audienceDashboard/audienceDashboardSidebarNav/AudienceDashboardSidebarNav";
import { AudienceDashboardContent } from "@/components/audienceDashboard/audienceDashboardContent/AudienceDashboardContent";
import { Card } from "@/components/ui";
import { CreateAudienceModal } from "@/components/audienceDashboard/audienceDashboardSidebarNav/createAudienceModal/CreateAudienceModal";

export const AudienceDashboard = ({ appId }) => {
  const { data: audienceData, isLoading, mutate } = useSWR(`${apiUrl}/private/apps/${appId}/audiences`, fetcherWithToken);
  const audiences = (isArray(audienceData) ? audienceData : []) as IAudience[];

  const [currentTabId, setCurrentTabId] = useState(null);
  const onTabChange = (index) => {
    setCurrentTabId(index);
  };

  const currentAudience = audiences?.find((campaign) => campaign.slug === currentTabId) || audiences?.[0];

  return (
    <main className="flex lg:flex-row flex-col-reverse md:flex-col gap-6 w-full px-[1.5rem] max-w-[90rem] self-center">
      <AudienceDashboardSidebarNav
        onTabChange={onTabChange}
        currentTabId={currentTabId}
        className="hidden md:flex"
        audiences={audiences}
        appId={appId}
        mutateAudience={mutate}
      />
      {currentAudience && (
        <AudienceDashboardContent currentAudience={currentAudience} isLoading={isLoading} appId={appId} mutateAudience={mutate} />
      )}
      {!currentAudience && (
        <Card className="w-full flex h-fit items-center flex-col gap-2">
          <p className="font-semibold text-2xl">Create new audience</p>
          <CreateAudienceModal appId={appId} onSuccess={mutate} mode="green" />
        </Card>
      )}
      <DashboardSidebar />
    </main>
  );
};
