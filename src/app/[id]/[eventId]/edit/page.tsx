import { apiUrl } from "@/variables/variables";
import { serverFetcherWithToken } from "@/requests/serverFetcher";
import { EditEvent } from "@/components/dashboards/createEventDashboard/createOrEditEvent/EditEvent";

const getEventData = async (eventId, appId) => {
  return await serverFetcherWithToken(`${apiUrl}/private/events/${appId}/${eventId}`);
};
export default async function EditEventPage({ params }: { params: { id: string; eventId: string } }) {
  const data = await getEventData(params.eventId, params.id);
  const formattedDefaultValues = {
    ...data,
    eventLocation: data?.EventLocation,
    startsAt: new Date(data?.startsAt),
    endsAt: new Date(data?.endsAt),
    logoUrl: !!data?.logoUrl ? data.logoUrl : "/img/placeholder_image.jpeg"
  };
  return (
    <EditEvent params={params} eventData={formattedDefaultValues} />
  );
}
