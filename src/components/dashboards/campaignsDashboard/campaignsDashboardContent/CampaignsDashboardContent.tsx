"use client";
import { LoadingDashboardSkeleton } from "@/components/common/LoadingDashboardSkeleton";
import { Button, Card } from "@/components/ui";
import { Trash } from "lucide-react";
import { deleteCampaign, distributeCampaign, updateCampaignAudiences, updateCampaignName, updateCampaignTickets } from "@/app/api/campaigns";
import { toast } from "react-toastify";
import { SelectAudienceModal } from "@/components/dashboards/campaignsDashboard/campaignsDashboardContent/modals/SelectAudienceModal";
import { countAllAudienceUsers, countAllUniqueAudienceUsers } from "@/utils/countAllCampaignUsers";
import { AudiencesPreviewModal } from "@/components/dashboards/campaignsDashboard/campaignsDashboardContent/modals/AudiencesPreviewModal";
import { TextEdit } from "@/components/ui/text-edit";
import { SelectEventTicketModal } from "@/components/modals/SelectEventTicketModal";
import React, { useState } from "react";
import Image from "next/image";
import { LoadingModal } from "@/components/ui/loading-modal";
import { CardContent } from "@/components/ui/card";

export const CampaignsDashboardContent = ({
  currentCampaign,
  appId,
  isLoading,
  mutateCampaigns
}: {
  currentCampaign: ICampaign;
  appId: string;
  isLoading: boolean;
  mutateCampaigns: any;
}) => {
  const [distributing, setDistributing] = useState(false);
  const onDistribute = async () => {
    setDistributing(true);
    try {
      const res = await distributeCampaign({ id: currentCampaign.id, appId });
      if (res?.distributions) {
        await mutateCampaigns();
        toast("Campaign distributed", { type: "success" });
      }
    } catch (e) {
      toast(e.message || "Something went wrong", { type: "error" });
    }
    setDistributing(false);
  };
  const handleEvents = async (data: ISelectedEvent[]) => {
    try {
      const toRemove = currentCampaign.Tickets.filter((i) => !data.some((b) => b.ticketId === i.id));
      const toAdd = data.filter((i) => !currentCampaign.Tickets.some((b) => b.Event.id === i.ticketId));
      const res = await updateCampaignTickets({
        appId,
        id: currentCampaign.id,
        tickets: toAdd.map((i) => i.ticketId),
        ticketsToRemove: toRemove.map((i) => i.id)
      });
      if (res?.id) {
        await mutateCampaigns();
        toast("Tickets updated", { type: "success" });
      }
    } catch (e) {
      toast(e?.message || "Something went wrong", { type: "error" });
    }
  };
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
  const onTicketDelete = async (id: string) => {
    try {
      const res = await updateCampaignTickets({ appId, id: currentCampaign.id, ticketsToRemove: [id] });
      if (res?.id) {
        await mutateCampaigns();
        toast("Successfully deleted", { type: "success" });
      }
    } catch (e) {
      toast(e?.meassage || "Something went wrong", { type: "error" });
    }
  };
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

  const allAudienceUsers = countAllAudienceUsers(currentCampaign);
  const allUniqueAudienceUsers = countAllUniqueAudienceUsers(currentCampaign);

  const campaignDistribution = currentCampaign?.CampaignDistribution;
  return (
    <div className="w-full pb-10">
      {!isLoading ? (
        <div className="flex flex-col gap-4">
          <div className="flex w-full justify-between gap-2">
            <div className="flex gap-2">
              <Button
                variant="green"
                size="xl"
                onClick={onDistribute}
                disabled={!!campaignDistribution || (!allAudienceUsers.count || !currentCampaign?.Tickets?.length)}
              >
                Distribute
              </Button>
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
                    Distributed to {allUniqueAudienceUsers.count} users at {new Date(campaignDistribution.createdAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
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
                            {!campaignDistribution && (
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
                {!campaignDistribution && (
                  <SelectAudienceModal
                    appId={appId}
                    campaignId={currentCampaign.id}
                    defaultValues={(currentCampaign?.Audiences || []).map((i) => i.id)}
                    mutateCampaigns={mutateCampaigns}
                  />
                )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex-col flex gap-4">
              <p className="font-semibold">{!!campaignDistribution ? "Distributed tickets" : "Choose tickets to airdrop to your audience"}</p>
              {currentCampaign?.Tickets?.map((selectedEvent) => {
                return (
                  <div className="flex flex-col gap-4" key={selectedEvent.id}>
                    <div className="flex gap-2">
                      <div className="w-full p-4 bg-gray-200 flex items-center rounded-2xl gap-4">
                        <Image
                          src={selectedEvent.Event.logoUrl || "/img/placeholder_image.jpeg"}
                          width={50}
                          height={50}
                          alt={selectedEvent.Event.name}
                        />
                        <div className="flex flex-col">
                          <span className="font-semibold uppercase text-sm text-gray-500">{selectedEvent.Event.name}</span>
                          <p className="font-bold text-lg">{selectedEvent.name}</p>
                        </div>
                      </div>
                      {!campaignDistribution && (
                        <button onClick={() => onTicketDelete(selectedEvent.id)}>
                          <Trash size={32} color="red" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
              {!campaignDistribution && (
                <>
                  <div className="h-[1px] bg-gray-400 w-full"></div>
                  <div className="flex gap-2">
                    <div className="w-full bg-gray-200 py-6 px-2 flex items-center justify-center rounded-2xl">
                      <span className="font-semibold">Add ticket</span>
                    </div>
                    <SelectEventTicketModal defaultTickets={currentCampaign?.Tickets?.map((i) => i.id)} handleEvents={handleEvents} />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <LoadingDashboardSkeleton />
      )}
      <LoadingModal
        isOpen={distributing}
        title={
          <>
            Distributing tickets <br /> Please wait
          </>
        }
      />
    </div>
  );
};
