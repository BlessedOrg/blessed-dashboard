import { TicketsDashboard } from '@/components/dashboards/ticketsDashboard/TicketsDashboard';
import { Navigation } from "@/components/navigation/Navigation";

export default async function EventPage({ params }: { params: { id: string; eventId: string } }) {
  return (
    <div className="flex w-full flex-col ">
      <Navigation appId={params.id} eventId={params.eventId} />
      <TicketsDashboard appId={params.id} eventId={params.eventId} />
    </div>
  );
}
