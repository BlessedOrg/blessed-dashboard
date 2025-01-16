import { RewardsListView } from "@/components/dashboards/rewards/RewardsListView";
import { fetcherWithToken } from "@/requests/requests";
import { apiUrl } from "@/variables/variables";
import useSWR from "swr";

export const RewardsSelectCard = ({ appId, onSelectReward, selectedRewards, onAssignEventIdToReward, onRemoveEventIdFromReward }) => {
  const { data } = useSWR(`${apiUrl}/private/apps/${appId}/discounts`, fetcherWithToken);
  const rewards = Array.isArray(data) ? data : [];

  return (
    <div>
      <RewardsListView
        rewards={rewards}
        appId={appId}
        onSelectReward={onSelectReward}
        selectedRewards={selectedRewards}
        withEventSelect
        onAssignEventIdToReward={onAssignEventIdToReward}
        onRemoveEventIdFromReward={onRemoveEventIdFromReward}
      />
    </div>
  );
};
