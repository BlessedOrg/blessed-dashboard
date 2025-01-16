import { SelectEventTicketModal } from "@/components/modals/SelectEventTicketModal";
import { Card, CardContent } from "@/components/ui/card";
import { fetcherWithToken } from '@/requests/requests';
import { apiUrl } from '@/variables/variables';
import { isArray } from 'lodash-es';
import { Trash } from "lucide-react";
import Image from "next/image";
import useSWR from 'swr';

interface TicketSelectCardProps {
  campaignDistribution: boolean;
  currentCampaign: any;
	selectedTicketsIds: {ticketId: string, eventId: string}[];
	onTicketSelect: (eventId: string, ticketId: string) => void;
	onTicketDelete: (id: string) => void;
}

export const TicketSelectCard = ({
  campaignDistribution,
  currentCampaign,
	selectedTicketsIds,
	onTicketSelect,
	onTicketDelete,
}: TicketSelectCardProps) => {
	const isDraft = currentCampaign?.isDraft
	const { data, isLoading } = useSWR<IEvent[]>(`${apiUrl}/private/events`, fetcherWithToken);
  const myEvents = isArray(data) ? data : [];
  const selectedTickets = myEvents.filter(i => i.Tickets.some(t => selectedTicketsIds.some(st => st.ticketId === t.id))).flatMap(i => i.Tickets.filter(t => selectedTicketsIds.some(st => st.ticketId === t.id))).map(t => ({
    ...t,
    Event: myEvents.find(i => i.id === t.eventId)
  }));

  return (
    <Card>
      <CardContent className="flex-col flex gap-4">
        <p className="font-semibold">{!!campaignDistribution ? "Distributed tickets" : isDraft ? "Choose tickets to airdrop to your audience" : "Selected tickets to distribute"}</p>
        {selectedTickets?.map((selectedTicket) => {
          return (
            <div className="flex flex-col gap-4" key={selectedTicket.id}>
              <div className="flex gap-2">
                <div className="w-full p-4 bg-gray-200 flex items-center rounded-2xl gap-4">
                  <Image
                    src={selectedTicket?.metadataPayload?.metadataImageUrl || "/img/placeholder_image.jpeg"}
                    width={50}
                    height={50}
                    alt={selectedTicket.Event.name}
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold uppercase text-sm text-gray-500">{selectedTicket.Event.name}</span>
                    <p className="font-bold text-lg">{selectedTicket.name}</p>
                  </div>
                </div>
                {!campaignDistribution && isDraft && (
                  <button onClick={() => onTicketDelete(selectedTicket.id)}>
                    <Trash size={32} color="red" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
        {!campaignDistribution && isDraft && (
          <>
            <div className="h-[1px] bg-gray-400 w-full"></div>
            <div className="flex gap-2">
              <div className="w-full bg-gray-200 py-6 px-2 flex items-center justify-center rounded-2xl">
                <span className="font-semibold">Add ticket</span>
              </div>
              <SelectEventTicketModal events={myEvents || []} defaultTickets={selectedTicketsIds.map(i => i.ticketId)} onTicketSelect={onTicketSelect} />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
