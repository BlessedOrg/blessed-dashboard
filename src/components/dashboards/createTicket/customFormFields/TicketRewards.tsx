import { useFieldArray } from "react-hook-form";
import { RewardsSelectCard } from "../../campaignsDashboard/campaignsDashboardContent/views/RewardsSelectCard";

export const TicketRewards = ({ form, appId }) => {
  const selectedRewards = form.getValues("ticketRewards") || [];
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "ticketRewards",
  });
  const onSelectReward = (reward) => {
    if (selectedRewards.includes(reward)) {
      remove(reward);
    } else {
      append(reward);
    }
  };

  return (
    <RewardsSelectCard
      appId={appId}
      onSelectReward={onSelectReward}
      selectedRewards={selectedRewards.map((id) => ({ rewardId: id }))}
      withEventSelect={false}
    />
  );
};
