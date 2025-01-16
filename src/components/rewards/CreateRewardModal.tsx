import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button, Card, Dialog, DialogContent } from "../ui";

export const CreateRewardModal = ({ appSlug, open, setOpen }) => {
	const router = useRouter()
  const [selectedReward, setSelectedReward] = useState<string | null>(null)
	const onSelectReward = (reward: string) => {
		setSelectedReward(reward)
	}
	const rewards = [
    {
      id: "discount",
      href: `/${appSlug}/discounts`,
      name: "Discount",
      description: "Offer savings on products or services.",
      logo: "/img/icons/discount.svg",
    },
    {
      id: "voucher",
      href: `/${appSlug}/vouchers`,
      name: "Voucher",
      description: "Provide free items, services, or perks.",
      logo: "/img/icons/gift.svg",
    },
  ];

	const onContinue = (href: string) => {
		router.push(href)
	}
	
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
			<div className='mb-4 flex flex-col gap-4 text-center items-center'>
        <h2 className='text-5xl font-bold uppercase font-ttBluescreens'>Create new Reward</h2>
        <p>Choose the type of reward you want to create.</p>
      </div>
        <div className="flex flex-col gap-4">
          {rewards.map((reward) => (
            <Card key={reward.id} className={`p-4 flex gap-4 items-center rounded-2xl cursor-pointer border-2 shadow-none ${selectedReward === reward.id ? 'border-green-500' : ''}`} onClick={() => onSelectReward(reward.id)}>
              <div className='bg-gray-200 rounded-lg h-[4.25rem] w-[4.25rem] flex items-center justify-center'>
                <Image src={reward.logo} alt={reward.name} width={40} height={40} />
              </div>
							<div>
								<h3 className='text-sm text-gray-500'>{reward.name}</h3>
								<p className='text-lg font-semibold'>{reward.description}</p>
							</div>
            </Card>
          ))}
					<div className='flex justify-between mt-4 gap-4'>
						<Button variant='outline' onClick={() => setOpen(false)}>Cancel</Button>
						<Button variant='green' disabled={!selectedReward} onClick={() => onContinue(rewards.find(reward => reward.id === selectedReward)?.href)}>Continue</Button>
					</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
