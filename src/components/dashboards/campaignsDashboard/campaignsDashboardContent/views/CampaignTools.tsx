import { deleteCampaign, distributeCampaign, updateCampaignName } from "@/app/api/campaigns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TextEdit } from "@/components/ui/text-edit";
import { Trash } from "lucide-react";
import { toast } from "react-toastify";

interface CampaignToolsProps {
  currentCampaign: any;
  appId: string;
  mutateCampaigns: () => void;
  setDistributing: (distributing: boolean) => void;
  campaignDistribution: any;
  allAudienceUsers: any;
  allUniqueAudienceUsers: any;
  onSaveCampaign: () => void;
  selectedCampaignType: "reward" | "ticket" | null;
  selectedTicketsIds: { eventId: string; ticketId: string }[];
  selectedRewards: { rewardId: string; eventId?: string }[];
}

export const CampaignTools = ({
  currentCampaign,
  appId,
  mutateCampaigns,
  setDistributing,
  campaignDistribution,
  allAudienceUsers,
  allUniqueAudienceUsers,
  onSaveCampaign,
  selectedCampaignType,
  selectedTicketsIds,
  selectedRewards,
}: CampaignToolsProps) => {
  const onCampaignDelete = async () => {
    try {
      const res = await deleteCampaign({ id: currentCampaign.id, appId });
      if (res?.id) {
        await mutateCampaigns();
        toast("Successfully deleted", { type: "success" });
      }
    } catch (e) {
      toast(e?.message || "Something went wrong", { type: "error" });
    }
  };

  const onCampaignNameChange = async (name: string) => {
    try {
      const res = await updateCampaignName({ appId, id: currentCampaign.id, name });
      if (res?.id) {
        await mutateCampaigns();
        toast("Successfully updated", { type: "success" });
      }
    } catch (e) {
      toast(e?.message || "Something went wrong", { type: "error" });
    }
  };

  const onDistribute = async () => {
    setDistributing(true);
    try {
      const res = await distributeCampaign({ id: currentCampaign.id, appId, campaignType: currentCampaign.type });
      if (res?.distributions || res?.success) {
        await mutateCampaigns();
        toast("Campaign distributed", { type: "success" });
      }
    } catch (e) {
      toast(e.message || "Something went wrong", { type: "error" });
    }
    setDistributing(false);
  };

  const disabledSave =
    !allAudienceUsers?.count || !(selectedCampaignType === "reward" ? selectedRewards.length : selectedTicketsIds.length);

  const disabledDistribute = campaignDistribution?.id;

  return (
    <>
      <div className="flex w-full justify-between gap-2">
        <div className="flex gap-2">
          {currentCampaign?.isDraft ? (
            <Button variant="green" size="xl" onClick={onSaveCampaign} disabled={disabledSave}>
              Save campaign
            </Button>
          ) : (
            <Button variant="green" size="xl" onClick={onDistribute} disabled={disabledDistribute}>
              Distribute
            </Button>
          )}
        </div>
        <Button onClick={onCampaignDelete} size="xl">
          <Trash color="red" />
        </Button>
      </div>
      <Card>
        <CardContent className="flex flex-col gap-2">
          <TextEdit defaultValue={currentCampaign.name} handleSubmit={onCampaignNameChange} canEdit={!campaignDistribution} />
          {!!campaignDistribution && (
            <div className="bg-green-500 py-2 px-5 rounded-2xl">
              <p className="font-semibold">
                Sent to {allUniqueAudienceUsers.count} users at {new Date(campaignDistribution.createdAt).toLocaleDateString()}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};
