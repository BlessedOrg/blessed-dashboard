import { CreateCampaignModal } from "@/components/dashboards/campaignsDashboard/campaignsDashboardSidebarNav/createCampaignModal/CreateCampaignModal";
import { Badge } from "@/components/ui";
import { countAllAudienceUsers } from "@/utils/countAllCampaignUsers";

export const CampaignsDashboardSidebarNav = ({
  currentTabId,
  className,
  campaigns,
  onTabChange,
  appId,
  mutateCampaigns,
}: {
  currentTabId: string;
  className?: string;
  campaigns: ICampaign[];
  onTabChange: (index: string) => void;
  appId: string;
  mutateCampaigns: any;
}) => {
  const onSuccessCampaignCreate = (newSlug: string) => {
    mutateCampaigns();
    onTabChange(newSlug);
  };
  return (
    <div className={`flex flex-col gap-4 lg:sticky lg:top-[6.25rem] lg:h-[calc(100vh-6.25rem)] lg:min-w-[20.5rem] ${className || ""}`}>
      <CreateCampaignModal appId={appId} onSuccess={onSuccessCampaignCreate} />
      {!!campaigns?.length && (
        <ul className="bg-white py-2 rounded-3xl overflow-hidden">
          {campaigns.map((campaign) => {
            const isActive = campaign.slug === currentTabId;
            return (
              <li key={campaign.id} className={`px-5 py-2 hover:bg-[#FAFAFA] transition-all w-full  ${isActive ? "bg-[#FAFAFA]" : ""}`}>
                <button
                  onClick={() => onTabChange(campaign.slug)}
                  className={`flex gap-1 w-full items-center justify-between text-left my-1`}
                >
                  <div>
                    <h3 className="font-semibold text-lg">{campaign.name}</h3>
                    <p className="text-sm">Created at {new Date(campaign.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className='text-right'>
                    <p>{countAllAudienceUsers(campaign).count} users</p>
                    {campaign.isDraft && <Badge className="bg-orange-400 text-white">Draft</Badge>}
										{!!campaign.CampaignDistribution && <Badge className="bg-green-500">Distributed</Badge>}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
