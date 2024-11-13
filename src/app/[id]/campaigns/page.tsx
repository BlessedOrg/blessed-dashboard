import { CampaignsDashboardNav } from "@/components/campaignsDashboard/campaignsDashboardNav/CampaignsDashboardNav";
import { CampaignsDashboard } from "@/components/campaignsDashboard/CampaignsDashboard";

export default async function CampaignsPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex w-full flex-col bg-background">
      <CampaignsDashboardNav type="campaign" appId={params.id} />
      <CampaignsDashboard appId={params.id} />
    </div>
  );
}
