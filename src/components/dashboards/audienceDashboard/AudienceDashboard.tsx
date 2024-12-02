"use client";
import { DashboardSidebar } from "../../common/DashboardSidebar";
import { useState } from "react";
import useSWR from "swr";
import { fetcherWithToken } from "@/requests/requests";
import { apiUrl } from "@/variables/variables";
import { isArray } from "lodash-es";
import { AudienceDashboardSidebarNav } from "@/components/dashboards/audienceDashboard/audienceDashboardSidebarNav/AudienceDashboardSidebarNav";
import { AudienceDashboardContent } from "@/components/dashboards/audienceDashboard/audienceDashboardContent/AudienceDashboardContent";
import { Card } from "@/components/ui";
import { CreateAudienceModal } from "@/components/dashboards/audienceDashboard/audienceDashboardSidebarNav/createAudienceModal/CreateAudienceModal";
import { PersonStanding } from "lucide-react";

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
        <Card className="p-8 text-center text-gray-500 w-full">
          <PersonStanding className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">No audiences available yet</p>
          <p className="text-sm mb-4">Create your first audience to get started</p>
          <CreateAudienceModal appId={appId} onSuccess={mutate} mode="green" />
        </Card>
      )}
      <DashboardSidebar />
    </main>
  );
};
