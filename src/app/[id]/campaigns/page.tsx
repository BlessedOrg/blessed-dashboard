import { CampaignsDashboard } from "@/components/dashboards/campaignsDashboard/CampaignsDashboard";
import { Navigation } from "@/components/navigation/Navigation";

export default async function CampaignsPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex w-full flex-col ">
      <Navigation appId={params.id} />
      <CampaignsDashboard appId={params.id} />
    </div>
  );
}
