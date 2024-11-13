import { CampaignsDashboardNav } from "@/components/campaignsDashboard/campaignsDashboardNav/CampaignsDashboardNav";
import { AudienceDashboard } from "@/components/audienceDashboard/AudienceDashboard";

export default async function AudiencePage({ params }: { params: { id: string } }) {
  return (
    <div className="flex w-full flex-col bg-background">
      <CampaignsDashboardNav type="audience" appId={params.id} />
      <AudienceDashboard appId={params.id} />
    </div>
  );
}
