"use client";
import { LoadingDashboardSkeleton } from "@/components/homeDashboard/LoadingDashboardSkeleton";
import { Badge, Card, Checkbox } from "@/components/ui";
import { Trash } from "lucide-react";
import { SelectEventTicketModal } from "@/components/modals/SelectEventTicketModal";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { apiUrl } from "@/variables/variables";
import { fetcherWithToken } from "@/requests/requests";
import { toast } from "react-toastify";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const CreateAudiencesView = ({
  isLoading,
  handleEligibleUsersChange,
}: {
  isLoading: boolean;
  handleEligibleUsersChange: (data: any) => void;
}) => {
  const [isFetching, setIsFetching] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<(ISelectedEvent & { type?: "holders" | "attendees" })[]>([]);
  const [snapshotData, setSnapshotData] = useState(null);

  const handleEvents = (data: ISelectedEvent[]) => {
    setSelectedEvents(data);
  };

  const getSnapshot = async () => {
    setIsFetching(true);
    try {
      const response = await fetcherWithToken(`${apiUrl}/private/tickets/snapshot`, {
        method: "POST",
        body: JSON.stringify({
          airdrop: selectedEvents.map((i) => {
            return {
              eventSlug: i.eventSlug,
              ticketSlug: i.ticketSlug,
              type: i?.type,
            };
          }),
        }),
      });
      if (response?.all) {
        const pyaload = {
          userIds: response?.eligibleUsers?.map((i) => i.id),
          externalAddresses: response?.eligibleExternalAddresses.map((i) => i.walletAddress),
        };
        handleEligibleUsersChange(pyaload);
        setSnapshotData(response?.all || []);
      }
    } catch (e) {
      toast(e?.message || "Something went wrong", { type: "error" });
    }
    setIsFetching(false);
  };

  useEffect(() => {
    if (selectedEvents.length > 0) {
      getSnapshot();
    } else {
      setSnapshotData(null);
    }
  }, [selectedEvents]);

  const onRequirementChange = (ticketId: string, requirement: "holders" | "attendees") => {
    setSelectedEvents((prev) => {
      return prev.map((event) => {
        if (event.ticketId === ticketId) {
          return { ...event, type: requirement };
        }
        return event;
      });
    });
  };

  const onTicketDelete = (id: string) => {
    setSelectedEvents((prev) => {
      return prev.filter((event) => event.ticketId !== id);
    });
  };

  return (
    <div className="w-full flex flex-col gap-4 pb-10">
      {!isLoading ? (
        <Card className="flex flex-col gap-4">
          <p className="font-semibold">Ticket requirements</p>
          {selectedEvents.map((selectedEvent) => {
            const entranceExists = !!selectedEvent?.Entrance;
            return (
              <div className="flex flex-col gap-4" key={selectedEvent.ticketId}>
                <div className="flex gap-2">
                  <div className="w-full p-4 bg-gray-200 flex items-center rounded-2xl gap-4">
                    <Image
                      src={selectedEvent.logoUrl || "/img/placeholder_image.jpeg"}
                      width={50}
                      height={50}
                      alt={selectedEvent.eventName}
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold uppercase text-sm text-gray-500">{selectedEvent.eventName}</span>
                      <p className="font-bold text-lg">{selectedEvent.ticketName}</p>
                    </div>
                  </div>
                  <button onClick={() => onTicketDelete(selectedEvent.ticketId)}>
                    <Trash size={32} color="red" />
                  </button>
                </div>
                <div className="flex gap-2 w-full">
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex gap-2 w-full">
                      <TooltipProvider delayDuration={10}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Checkbox
                              size="lg"
                              checked={selectedEvent.type === "attendees"}
                              disabled={selectedEvent.type === "attendees" || !entranceExists}
                              onCheckedChange={() => onRequirementChange(selectedEvent.ticketId, "attendees")}
                            />
                          </TooltipTrigger>
                          <TooltipContent hidden={entranceExists}>{<p>No entrance created!</p>}</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <div className="flex flex-col gap1">
                        <p className="font-semibold">Verified attendee</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full">
                    <Checkbox
                      size="lg"
                      checked={selectedEvent.type === "holders"}
                      disabled={selectedEvent.type === "holders"}
                      onCheckedChange={() => onRequirementChange(selectedEvent.ticketId, "holders")}
                    />
                    <div className="flex flex-col gap1">
                      <p className="font-semibold">Holder</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="h-[1px] bg-gray-400 w-full"></div>
          <div className="flex gap-2">
            <div className="w-full bg-gray-200 py-6 px-2 flex items-center justify-center rounded-2xl">
              <span className="font-semibold">Add ticket</span>
            </div>
            <SelectEventTicketModal defaultTickets={selectedEvents.map((i) => i.ticketId)} handleEvents={handleEvents} />
          </div>
        </Card>
      ) : (
        <LoadingDashboardSkeleton />
      )}
      <Card>
        <div className="flex gap-2 justify-between items-center mb-4">
          <p className="font-semibold">Eligible Audiences</p>
          <p className="font-semibold">{snapshotData?.length || 0} users</p>
        </div>

        <div className="flex flex-col gap-2 max-h-[25rem] overflow-y-auto">
          {isFetching && <LoadingDashboardSkeleton items={3} size="sm" />}
          {!isFetching &&
            snapshotData?.map((user) => {
              return (
                <div key={user.id} className="flex gap-2 items-center border-2 p-2 rounded-xl">
                  {!!user?.external ? (
                    <div className="flex flex-col gap-2">
                      <Badge className="bg-red-300 w-fit">EXTERNAL</Badge>
                      <p>Wallet address: {user.walletAddress}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1">
                      <p>{user?.email}</p>
                      <p>{user?.walletAddress}</p>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </Card>
    </div>
  );
};
