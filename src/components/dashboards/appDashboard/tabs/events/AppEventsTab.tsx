import { LoadingDashboardSkeleton } from "@/components/common/LoadingDashboardSkeleton";
import { CreateEventModal } from "@/components/modals/CreateEventModal";
import useSWR from "swr";
import { apiUrl } from "@/variables/variables";
import { fetcherWithToken } from "@/requests/requests";
import { isArray } from "lodash-es";
import { EventCard } from "@/components/cards/EventCard";

export const AppEventsTab = ({ appId }) => {
  const { data: eventsData, isLoading } = useSWR(`${apiUrl}/private/events/${appId}`, fetcherWithToken);
  const events = isArray(eventsData) ? eventsData : [];
  return (
    <div className="flex flex-col gap-4 w-full">
      {isLoading && <LoadingDashboardSkeleton />}
      {events.map((event) => {
        return <EventCard event={event} key={event.id} appId={appId} />;
      })}
      {!isLoading && (
        <div className="flex gap-2 justify-center">
          <CreateEventModal appId={appId} label="Add new event" variant="green" />
        </div>
      )}
    </div>
  );
};
