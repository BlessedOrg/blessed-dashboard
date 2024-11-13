import { Campaigns } from "@/components/appDashboard/tabs/campaignsAndAudience/Campaigns";
import { Audience } from "@/components/appDashboard/tabs/campaignsAndAudience/Audience";

export const CampaignsAndAudience = ({ appId }: { appId: string }) => {
  return <div className="flex flex-col gap-5 w-full">
    <Campaigns appId={appId} />
    <Audience appId={appId} />
  </div>;
};