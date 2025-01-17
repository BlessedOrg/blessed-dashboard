import { RewardsListView } from "@/components/dashboards/rewards/RewardsListView";
import { fetcherWithToken } from "@/requests/requests";
import { apiUrl } from "@/variables/variables";
import useSWR from "swr";

interface IRewardsSelectCardProps {
  appId: string;
  onSelectReward: (rewardId: string, eventId?: string) => void;
  selectedRewards: {rewardId: string, eventId?: string}[]
  onAssignEventIdToReward?: (rewardId: string, eventId?: string) => void;
  onRemoveEventIdFromReward?: (rewardId: string, eventId?: string) => void;
	withEventSelect?: boolean;
}

export const RewardsSelectCard = ({ appId, onSelectReward, selectedRewards, onAssignEventIdToReward, onRemoveEventIdFromReward, withEventSelect }: IRewardsSelectCardProps) => {
  const { data } = useSWR(`${apiUrl}/private/apps/${appId}/discounts`, fetcherWithToken);
  const rewards = Array.isArray(data) ? data : [];

  return (
    <div>
      <RewardsListView
        rewards={rewards}
        appId={appId}
        onSelectReward={onSelectReward}
        selectedRewards={selectedRewards}
        onAssignEventIdToReward={onAssignEventIdToReward}
        onRemoveEventIdFromReward={onRemoveEventIdFromReward}
				withEventSelect={withEventSelect}
      />
    </div>
  );
};
