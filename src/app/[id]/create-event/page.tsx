import { CreateEvent } from "@/components/dashboards/createEventDashboard/createOrEditEvent/CreateEvent";

export default async function CreateEventPage({ params }: { params: { id: string; eventId: string } }) {
  return (
    <CreateEvent params={params} />
  );
}
