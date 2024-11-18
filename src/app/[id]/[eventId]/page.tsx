import { Navigation } from "@/components/navigation/Navigation";
import { EventDashboard } from "@/components/dashboards/eventDashboard/EventDashboard";

export default async function EventPage({ params }: { params: { id: string; eventId: string } }) {
  return (
    <div className="flex w-full flex-col bg-background">
      <Navigation appId={params.id} eventId={params.eventId} />
      <EventDashboard appId={params.id} eventId={params.eventId} />
    </div>
  );
}
