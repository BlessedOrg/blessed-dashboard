"use client";
import { DashboardSidebar } from '@/components/common/globalSidebar/DashboardSidebar';
import { AudienceDashboardSidebarNav } from "@/components/dashboards/audienceDashboard/AudienceDashboardSidebarNav";
import { AudienceManagementView } from "@/components/dashboards/audienceDashboard/audienceDashboardContent/AudienceManagementView";
import { AudiencePreview } from "@/components/dashboards/audienceDashboard/audienceDashboardContent/views/audiences/AudiencePreview";
import { Card } from "@/components/ui";
import { fetcherWithToken } from "@/requests/requests";
import { apiUrl } from "@/variables/variables";
import { isArray } from "lodash-es";
import { useState } from "react";
import useSWR from "swr";

export const AudienceDashboard = ({ appId }) => {
  const { data: audienceData, isLoading, mutate } = useSWR(`${apiUrl}/private/apps/${appId}/audiences`, fetcherWithToken);
  const audiences = (isArray(audienceData) ? audienceData : []) as IAudience[];

  const [currentTabId, setCurrentTabId] = useState("create");
  const onTabChange = (index) => {
    setCurrentTabId(index);
  };

  return (
    <main className="flex lg:flex-row flex-col-reverse md:flex-col gap-6 w-full px-[1.5rem] max-w-[90rem] self-center">
      <AudienceDashboardSidebarNav
        onTabChange={onTabChange}
        currentTabId={currentTabId}
        className="hidden md:flex"
        audiences={audiences}
      />
      <AudienceViewPerTab tab={currentTabId} audiences={audiences} appId={appId} mutate={mutate} onTabChange={onTabChange} />
      <DashboardSidebar appSlug={appId} />
    </main>
  );
};

const AudienceViewPerTab = ({ tab, audiences, appId, mutate, onTabChange }) => {
  if (tab === "create") return <AudienceManagementView appId={appId} mutate={mutate} onTabChange={onTabChange} allAudiences={audiences} />;

  const audience = audiences.find(audience => audience.id === tab);
  if (!audience) return <div className="w-full">
    <Card className="p-6">
      <p className="font-semibold text-center">Audience you are looking for is not exist</p>
    </Card>
  </div>;
  return <AudiencePreview audience={audience} mutate={mutate} onTabChange={onTabChange} />;
};