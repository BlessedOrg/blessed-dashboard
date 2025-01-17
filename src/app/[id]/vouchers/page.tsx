import { CreateVoucherReward } from '@/components/rewards/voucher/CreateVoucherReward';

export default async function CreateVoucherPage({ params }: { params: { id: string; eventId: string } }) {
  return (
    <CreateVoucherReward params={params} />
  );
}

