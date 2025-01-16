"use client";
import { DashboardSidebar } from "@/components/common/globalSidebar/DashboardSidebar";
import { CreateRewardModal } from "@/components/rewards/CreateRewardModal";
import { fetcherWithToken } from "@/requests/requests";
import { apiUrl } from "@/variables/variables";
import { useState } from "react";
import useSWR from "swr";
import { RewardsPreviewList } from './RewardsPreviewList';
import { RewardsSidebarNav } from "./RewardsSidebarNav";

export const RewardsDashboard = ({ appId }) => {
  const { data } = useSWR(`${apiUrl}/private/apps/${appId}/discounts`, fetcherWithToken);
  const rewards = Array.isArray(data) ? data : [];

  const [open, setOpen] = useState(false);


  return (
    <main className="flex lg:flex-row flex-col-reverse md:flex-col gap-6 w-full px-[1.5rem] max-w-[90rem] self-center">
      <RewardsSidebarNav className="hidden md:flex" appId={appId} />
      <div className="w-full">
        <RewardsPreviewList rewards={rewards} appId={appId}/>
        <CreateRewardModal appSlug={appId} open={open} setOpen={setOpen} />
      </div>
      <DashboardSidebar appSlug={appId} />
    </main>
  );
};
