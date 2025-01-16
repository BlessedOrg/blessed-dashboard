import { SelectEventModal } from "@/components/modals/SelectEventModal";
import { CreateRewardModal } from "@/components/rewards/CreateRewardModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { fetcherWithToken } from "@/requests/requests";
import { apiUrl } from "@/variables/variables";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";

interface RewardsListViewProps {
  rewards: any[];
  appId: string;
  withEventSelect?: boolean;
  onSelectReward: (rewardId: string, eventId?: string) => void;
  selectedRewards: { rewardId: string; eventId?: string }[] | null;
  onAssignEventIdToReward: (rewardId: string, eventId: string) => void;
  onRemoveEventIdFromReward: (rewardId: string) => void;
}

export const RewardsListView = ({
  rewards,
  appId,
  withEventSelect,
  onSelectReward,
  selectedRewards,
  onAssignEventIdToReward,
  onRemoveEventIdFromReward,
}: RewardsListViewProps) => {
  const { data: myEvents, isLoading: myEventsLoading } = useSWR<IEvent[]>(
    withEventSelect ? `${apiUrl}/private/events` : null,
    fetcherWithToken
  );

  const events = myEvents || [];
  const [open, setOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "voucher" | "discount">("all");

  const filteredRewards = rewards.filter((reward) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "voucher") return reward.isVoucher;
    if (activeFilter === "discount") return !reward.isVoucher;
    return true;
  });

  const filters = [
    { label: "All", value: "all" },
    { label: "Vouchers", value: "voucher" },
    { label: "Discounts", value: "discount" },
  ];

  const onEventSelect = (rewardId: string, eventId: string) => {
    if (eventId) {
      onAssignEventIdToReward(rewardId, eventId);
    } else {
      onRemoveEventIdFromReward(rewardId);
    }
  };

  return (
    <Card className="p-6 max-w-full flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-center">Add rewards</p>
        <button onClick={() => setOpen(true)} className="text-sm text-gray-500 underline">
          Create new reward
        </button>
      </div>

      <div className="flex gap-2 mb-4 border-b-4 border-gray-200 pb-4">
        {filters.map((filter) => (
          <Button
            key={filter.value}
            className={`${activeFilter === filter.value ? "bg-black text-white" : "bg-gray-200 text-black"}`}
            onClick={() => setActiveFilter(filter.value as "all" | "voucher" | "discount")}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {filteredRewards.map((reward) => (
          <Card
            key={reward.id}
            className={`p-4 flex gap-4 items-center rounded-2xl  border-2 shadow-none ${
              selectedRewards?.some((i) => i.rewardId === reward.id) ? "border-green-500" : ""
            }`}
          >
            <button onClick={() => onSelectReward(reward.id)} className="flex gap-4 items-center">
              <Checkbox checked={selectedRewards?.some((i) => i.rewardId === reward.id)} size="xl" />
              <div className="bg-gray-200 rounded-lg h-[4.25rem] min-w-[4.25rem] flex items-center justify-center">
                <Image src={reward.logoUrl} alt={reward.name} width={40} height={40} />
              </div>
            </button>

            <div className='w-full'>
              <div className="flex justify-between gap-2">
                <div>
                  <p className="text-sm text-gray-500 uppercase font-medium">{reward.isVoucher ? "Voucher" : "Discount"}</p>
                  <h3 className="text-lg font-semibold">{reward.name}</h3>
                </div>
                {selectedRewards?.some((i) => i.rewardId === reward.id) && withEventSelect && (
                  <SelectEventModal events={events} onEventSelect={(eventId) => onEventSelect(reward.id, eventId)}>
                    <Button variant="outline" size="sm" className="assign-event-btn">
                      {selectedRewards?.find((i) => i.rewardId === reward.id)?.eventId ? "Change event" : "Assign event (optional)"}
                    </Button>
                  </SelectEventModal>
                )}
              </div>
              <p className="text-lg text-gray-500">{reward.description}</p>
            </div>
          </Card>
        ))}
      </div>
      <CreateRewardModal appSlug={appId} open={open} setOpen={setOpen} />
    </Card>
  );
};
