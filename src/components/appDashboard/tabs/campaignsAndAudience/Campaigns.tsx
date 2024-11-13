import { LoadingDashboardSkeleton } from "@/components/homeDashboard/LoadingDashboardSkeleton";
import { Button, Card } from "@/components/ui";
import { fetcherWithToken } from "@/requests/requests";
import useSWR from "swr";
import { apiUrl } from "@/variables/variables";
import { isArray } from "lodash-es";
import Link from "next/link";

export const Campaigns = ({ appId }: { appId: string }) => {
  const { data: campaignsData, isLoading: isCampaignsLoading } = useSWR(`${apiUrl}/private/apps/${appId}/campaigns`, fetcherWithToken);
  const isLoading = false;
  const campaigns = (isArray(campaignsData) ? campaignsData : []) as ICampaign[];
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-4">
        <h3 className="font-semibold text-xl">Campaigns</h3>
        {isLoading && <LoadingDashboardSkeleton />}
        {!campaigns.length && !isLoading && (
          <Card>
            <p className="font-semibold text-lg text-gray-500 text-center">No campaigns, create one!</p>
          </Card>
        )}
        {campaigns.map((campaign, index) => {
          return (
            <Card key={campaign.name + index} className="flex gap-4 justify-between items-center relative">
              <div className="flex flex-col gap-1">
                <div>
                  <h3 className="font-semibold text-lg">{campaign.name}</h3>
                  <p className="text-sm font-semibold text-gray-500">Created at {new Date(campaign.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      <div className="flex gap-4 justify-center">
        <Button variant="outline" className="rounded-full" size="lg">
          See more
        </Button>
        <Button asChild variant="green" size="lg">
          <Link href={`/${appId}/campaigns`}>Add new campaign</Link>
        </Button>
      </div>
    </div>
  );
};
