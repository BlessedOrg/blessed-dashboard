import { Button, Card } from "@/components/ui";
import { CreateEventButton } from "@/components/common/CreateEventButton";
import useSWR from "swr";
import { apiUrl } from "@/variables/variables";
import { isArray } from "lodash-es";
import { fetcherWithToken } from "@/requests/requests";
import { LoadingDashboardSkeleton } from "@/components/common/LoadingDashboardSkeleton";
import Link from "next/link";
import { EventCard } from "@/components/cards/EventCard";

export const AppOverview = ({ appId }) => {
  const { data: eventsData, isLoading } = useSWR(`${apiUrl}/private/events/${appId}`, fetcherWithToken);
  const events = isArray(eventsData) ? eventsData : [];
  return (
    <div className="w-full flex-col flex gap-4">
      <Card className="bg-primary flex flex-col gap-10 bg-gradient-to-r to-yellow-500 from-green-500">
        <div>
          <h2 className="font-bold text-5xl uppercase">Start creating</h2>
          <p className="text-sm">Create and manage your event in just three steps.</p>
        </div>
        <CreateEventButton appId={appId} />
      </Card>
      <div className="flex flex-col gap-4 mt-4">
        <p className="font-semibold">Recent events</p>
        {isLoading && <LoadingDashboardSkeleton />}
        {events.slice(0, 3).map((event) => {
          return <EventCard event={event} key={event.id} appId={appId} />;
        })}
        {!isLoading && (
          <div className="flex gap-2 justify-center">
            <Button asChild variant="outline">
              <Link href={`/${appId}?tab=events`}>See more</Link>
            </Button>
            <CreateEventButton appId={appId} label="Add new event" variant="green" />
          </div>
        )}
      </div>
    </div>
  );
};
