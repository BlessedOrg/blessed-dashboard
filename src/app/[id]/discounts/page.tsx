import { CreateDiscountReward } from '@/components/rewards/discount/CreateDiscountReward';

export default async function CreateDiscountPage({ params }: { params: { id: string; eventId: string } }) {
  return (
    <CreateDiscountReward params={params} />
  );
}

