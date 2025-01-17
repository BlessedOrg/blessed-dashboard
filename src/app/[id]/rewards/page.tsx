import { RewardsDashboard } from '@/components/dashboards/rewards/RewardsDashboard';
import { Navigation } from "@/components/navigation/Navigation";

export default async function RewardsPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex w-full flex-col">
      <Navigation appId={params.id} />
      <RewardsDashboard appId={params.id} />
    </div>
  );
}
