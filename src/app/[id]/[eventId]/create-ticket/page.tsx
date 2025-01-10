import { CreateTicket } from '@/components/dashboards/createTicket/CreateTicket';

export default async function CreateTicketPage({ params }: { params: { id: string; eventId: string } }) {
  return (
    <CreateTicket params={params} />
  );
}
