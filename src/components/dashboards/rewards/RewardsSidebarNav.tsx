import { CreateRewardModal } from '@/components/rewards/CreateRewardModal';
import { Button } from "@/components/ui";
import { Plus } from 'lucide-react';
import { useState } from 'react';

export const RewardsSidebarNav = ({
  className,
	appId
}: {
  className?: string;
	appId: string;
}) => {
	const [open, setOpen] = useState(false)
  return (
    <div className={`flex flex-col gap-4 lg:sticky lg:top-[6.25rem] lg:h-[calc(100vh-6.25rem)] lg:min-w-[20.5rem] ${className || ""}`}>
      <Button variant={"yellow"} className="w-full text-black" onClick={() => setOpen(true)}>
        <Plus size={24} className='mr-2' /> New reward
      </Button>

			<CreateRewardModal appSlug={appId} open={open} setOpen={setOpen} />	
    </div>
  );
};