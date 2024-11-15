import { LoadingDashboardSkeleton } from "@/components/common/LoadingDashboardSkeleton";
import { Button, Card } from "@/components/ui";
import { fetcherWithToken } from "@/requests/requests";
import useSWR from "swr";
import { apiUrl } from "@/variables/variables";
import { isArray } from "lodash-es";
import Link from "next/link";

export const Audience = ({ appId }: { appId: string }) => {
  const { data: audienceData, isLoading: isAudienceLoading } = useSWR(`${apiUrl}/private/apps/${appId}/audiences`, fetcherWithToken);
  const isLoading = false;
  const audiences = (isArray(audienceData) ? audienceData : []) as IAudience[];
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-4">
        <h3 className="font-semibold text-xl">Audience</h3>
        {isLoading && <LoadingDashboardSkeleton />}
        {!audiences.length && !isLoading && (
          <Card>
            <p className="font-semibold text-lg text-gray-500 text-center">No audiences, create one!</p>
          </Card>
        )}
        {audiences.map((audience, index) => {
          return (
            <Card key={audience.name + index} className="flex gap-4 justify-between items-center relative">
              <Link href={`${appId}/audience`} className="absolute w-full h-full" />
              <div className="flex flex-col gap-1">
                <div>
                  <h3 className="font-semibold text-lg">{audience.name}</h3>
                  <p className="text-sm font-semibold text-gray-500">{audience?.AudienceUser?.length || 0} users</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      <div className="flex gap-4 justify-end">
        <Button asChild variant="yellow">
          <Link href={`/${appId}/audience`}>Add new audience</Link>
        </Button>
      </div>
    </div>
  );
};
