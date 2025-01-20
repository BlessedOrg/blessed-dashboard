"use client";
import { LoadingDashboardSkeleton } from "@/components/common/LoadingDashboardSkeleton";
import { Card, Label, Select } from "@/components/ui";
import { LoadingModal } from "@/components/ui/loading-modal";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetcherWithToken } from "@/requests/requests";
import { countAllAudienceUsers, countAllUniqueAudienceUsers } from "@/utils/countAllCampaignUsers";
import { apiUrl } from "@/variables/variables";
import { useState } from "react";
import { DiscountCodesView } from '../../rewards/RewardsPreviewList';
import { AudienceSelectCard } from "./views/AudienceSelectCard";
import { CampaignTools } from "./views/CampaignTools";
import { RewardsSelectCard } from "./views/RewardsSelectCard";
import { TicketSelectCard } from "./views/TicketSelectCard";

export const CampaignsDashboardContent = ({
  currentCampaign,
  appId,
  isLoading,
  mutateCampaigns,
	visible
}: {
  currentCampaign: ICampaign;
  appId: string;
  isLoading: boolean;
  mutateCampaigns: any;
	visible: boolean;
}) => {
  const [selectedCampaignType, setSelectedCampaignType] = useState<"reward" | "ticket" | null>(currentCampaign?.type === "TICKET" ? "ticket" : "reward");
  const [selectedTicketsIds, setSelectedTicketsIds] = useState<{ eventId: string; ticketId: string }[]>(
    currentCampaign?.Tickets?.map((i) => ({ eventId: i.Event.id, ticketId: i.id })) || []
  );
  const [selectedRewards, setSelectedRewards] = useState<{ rewardId: string; eventId?: string }[] | null>([]);

  const [distributing, setDistributing] = useState(false);

  const allAudienceUsers = countAllAudienceUsers(currentCampaign);
  const allUniqueAudienceUsers = countAllUniqueAudienceUsers(currentCampaign);

  const campaignDistribution = currentCampaign?.CampaignDistribution;

  const onSaveCampaign = async () => {
    setDistributing(true);
    try {
      const res = await fetcherWithToken(`${apiUrl}/private/apps/${appId}/campaigns/${currentCampaign.id}/save`, {
        method: "PATCH",
        body: JSON.stringify({
          campaignType: selectedCampaignType.toLocaleUpperCase(),
          ticketsIds: selectedTicketsIds,
          rewardsIds: selectedRewards,
        }),
      });
      if (res?.success) {
        mutateCampaigns();
      }
    } catch (error) {
      console.log(error);
    }
    setDistributing(false);
  };

  const onTicketSelect = (eventId: string, ticketId: string) => {
    setSelectedTicketsIds((prev) => [...prev, { eventId, ticketId }]);
  };

  const onTicketDelete = (id: string) => {
    setSelectedTicketsIds((prev) => prev.filter((i) => i.ticketId !== id));
  };

  const onSelectReward = (rewardId: string, eventId?: string) => {
    if (selectedRewards?.some((reward) => reward.rewardId === rewardId)) {
      setSelectedRewards(selectedRewards.filter((reward) => reward.rewardId !== rewardId));
    } else {
      setSelectedRewards([...(selectedRewards || []), { rewardId, eventId }]);
    }
  };

  const onAssignEventIdToReward = (rewardId: string, eventId: string) => {
    setSelectedRewards(selectedRewards.map((reward) => (reward.rewardId === rewardId ? { ...reward, eventId } : reward)));
  };

  const onRemoveEventIdFromReward = (rewardId: string) => {
    setSelectedRewards(selectedRewards.map((reward) => (reward.rewardId === rewardId ? { ...reward, eventId: null } : reward)));
  };

	const isTicketCampaign = selectedCampaignType === "ticket" || currentCampaign?.type === "TICKET"

  return (
    <div className={`w-full pb-10 ${visible ? "block" : "hidden"}`}>
      {!isLoading ? (
        <div className="flex flex-col gap-4">
          <CampaignTools
            currentCampaign={currentCampaign}
            appId={appId}
            mutateCampaigns={mutateCampaigns}
            setDistributing={setDistributing}
            campaignDistribution={campaignDistribution}
            allAudienceUsers={allAudienceUsers}
            allUniqueAudienceUsers={allUniqueAudienceUsers}
            selectedCampaignType={selectedCampaignType}
            selectedTicketsIds={selectedTicketsIds}
            selectedRewards={selectedRewards || []}
            onSaveCampaign={onSaveCampaign}
          />
          <AudienceSelectCard
            campaignDistribution={!!campaignDistribution}
            currentCampaign={currentCampaign}
            appId={appId}
            mutateCampaigns={mutateCampaigns}
            allAudienceUsers={allAudienceUsers}
            allUniqueAudienceUsers={allUniqueAudienceUsers}
          />
          {!currentCampaign?.isDraft && currentCampaign.type === "REWARD" && (
            <DiscountCodesView rewards={currentCampaign?.Discounts} />
          )}
          {currentCampaign?.isDraft && (
            <Card className="p-4">
              <Label className="text-sm font-medium">Campaign Type</Label>
              <Select
                value={selectedCampaignType}
                onValueChange={(value) => setSelectedCampaignType(value as "reward" | "ticket")}
                disabled={false}
              >
                <SelectTrigger className="w-fit min-w-[200px] mt-4">
                  <SelectValue placeholder="Select a campaign type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key="reward" value="reward">
                    Reward
                  </SelectItem>
                  <SelectItem key="ticket" value="ticket">
                    Ticket
                  </SelectItem>
                </SelectContent>
              </Select>
            </Card>
          )}
          {isTicketCampaign && (
            <TicketSelectCard
              campaignDistribution={!!campaignDistribution}
              currentCampaign={currentCampaign}
              selectedTicketsIds={selectedTicketsIds}
              onTicketSelect={onTicketSelect}
              onTicketDelete={onTicketDelete}
            />
          )}
          {!isTicketCampaign && currentCampaign?.isDraft && (
            <RewardsSelectCard
              appId={appId}
              onSelectReward={onSelectReward}
              selectedRewards={selectedRewards}
              onAssignEventIdToReward={onAssignEventIdToReward}
              onRemoveEventIdFromReward={onRemoveEventIdFromReward}
            />
          )}
        </div>
      ) : (
        <LoadingDashboardSkeleton />
      )}
      <LoadingModal
        isOpen={distributing}
        title={
          <>
            Distributing campaign <br /> Please wait
          </>
        }
      />
    </div>
  );
};
