import { EventCard } from "@/components/cards/EventCard";
import { CreateEventButton } from "@/components/common/CreateEventButton";
import { LoadingDashboardSkeleton } from "@/components/common/LoadingDashboardSkeleton";
import { Button, Card } from "@/components/ui";
import { CardContent } from "@/components/ui/card";
import { fetcherWithToken } from "@/requests/requests";
import { apiUrl } from "@/variables/variables";
import { isArray } from "lodash-es";
import Link from "next/link";
import useSWR from "swr";

export const AppEventsTab = ({ appId, items = 0, isMainView=false }) => {
  const { data: eventsData, isLoading } = useSWR(`${apiUrl}/private/events/${appId}`, fetcherWithToken);
  const events = isArray(eventsData) ? eventsData : [];
  return (
    <div className="flex flex-col gap-4 w-full">
      {!events?.length && <Card>
        <CardContent className="flex flex-col gap-4 mt-4 items-center">
          <p className="font-semibold">No events yet</p>
          <p className="text-sm">Create your first event to start tracking your user's activity.</p>
          <CreateEventButton appId={appId} label="Create event" variant="green" />
        </CardContent>
      </Card>}
      {!!events?.length && <div className="flex flex-col gap-4 mt-4">
        <p className="font-semibold">{isMainView ? "Recent events" : "All events"}</p>
        {isLoading && <LoadingDashboardSkeleton />}
        {(!!items ? events.slice(0, items) : events).map((event) => {
          return <EventCard event={event} key={event.id} appId={appId} />;
        })}
        {!isLoading && (
          <div className="flex gap-2 justify-center">
            {isMainView &&<Button asChild variant="outline">
              <Link href={`/${appId}?tab=events`}>See more</Link>
            </Button>}
            <CreateEventButton appId={appId} label="Add new event" variant="green" />
          </div>
        )}
      </div>}
    </div>
  );
};
