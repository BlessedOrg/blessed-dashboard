import { updateCampaignAudiences } from "@/app/api/campaigns";
import { Card, CardContent } from "@/components/ui/card";
import { Trash } from "lucide-react";
import { toast } from "react-toastify";
import { AudiencesPreviewModal } from "../modals/AudiencesPreviewModal";
import { SelectAudienceModal } from "../modals/SelectAudienceModal";

interface AudienceSelectCardProps {
  campaignDistribution: boolean;
  currentCampaign: any;
  appId: string;
  mutateCampaigns: () => void;
	allAudienceUsers: any;
	allUniqueAudienceUsers: any;
}

export const AudienceSelectCard = ({
  campaignDistribution,
  currentCampaign,
  appId,
  mutateCampaigns,
	allAudienceUsers,
	allUniqueAudienceUsers
}: AudienceSelectCardProps) => {
	const isDraft = currentCampaign?.isDraft;
  const onAudienceDelete = async (id: string) => {
    try {
      const res = await updateCampaignAudiences({ appId, id: currentCampaign.id, audiencesToRemove: [id] });
      if (res?.id) {
        await mutateCampaigns();
        toast("Successfully deleted", { type: "success" });
      }
    } catch (e) {
      toast(e?.meassage || "Something went wrong", { type: "error" });
    }
  };

	const onSubmit = async (selectedAudience, audiencesToRemove) => {
    try {
      const res = await updateCampaignAudiences({
        appId,
        id: currentCampaign.id,
        audiences: selectedAudience.filter((i) => !(currentCampaign?.Audiences || []).map((i) => i.id).includes(i)),
        audiencesToRemove,
      });
      if (res?.id) {
        await mutateCampaigns();
        toast("Successfully updated", { type: "success" });
      }
    } catch (e) {
      toast(e?.message || "Something went wrong", { type: "error" });
    }
  };

  return (
    <Card>
      <CardContent>
        <p className="font-semibold mb-2">{!!campaignDistribution ? "Selected audiences" : "Audience"}</p>
        {!currentCampaign?.Audiences?.length && (
          <p className="font-semibold text-lg text-gray-500 text-center py-5">No audiences, add one!</p>
        )}
        {(currentCampaign?.Audiences || [])
          .filter((audience) => !!audience.AudienceUsers.length)
          .map((audience) => {
            return (
              <div className="flex flex-col gap-2" key={audience.id}>
                <div className="flex gap-2 w-full">
                  <div className="w-full py-2 flex items-center gap-2 justify-between">
                    <div>
                      <p className="font-semibold">{audience.name}</p>
                      <p>{audience.AudienceUsers.length} users</p>
                    </div>
                    <div className="flex gap-4">
                      <AudiencesPreviewModal audience={audience} />
                      {!campaignDistribution && isDraft && (
                        <button onClick={() => onAudienceDelete(audience.id)}>
                          <Trash color="red" size={32} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="h-[1px] bg-gray-400 w-full"></div>
              </div>
            );
          })}
        <div className="flex justify-between w-full mt-5">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <span>
                <span className="font-semibold">Total</span>: {allAudienceUsers.count} users
              </span>
              <AudiencesPreviewModal audience={allAudienceUsers.users} />
            </div>
            <div className="flex gap-2 items-center">
              <span>
                <span className="font-semibold">Unique</span>: {allUniqueAudienceUsers.count} users
              </span>
              <AudiencesPreviewModal audience={allUniqueAudienceUsers.users} />
            </div>
          </div>
          {!campaignDistribution && isDraft && (
            <SelectAudienceModal
              appId={appId}
              onHandleSubmit={onSubmit}
              defaultValues={(currentCampaign?.Audiences || []).map((i) => i.id)}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};
