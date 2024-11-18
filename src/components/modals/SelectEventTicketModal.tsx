import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui";
import { PlusCircle } from "lucide-react";
import React from "react";
import useSWR from "swr";
import { fetcherWithToken } from "@/requests/requests";
import { apiUrl } from "@/variables/variables";
import { EventSelectTable } from "@/components/modals/EventsSelectTable";

export const SelectEventTicketModal = ({
  defaultTickets,
  handleEvents,
}: {
  defaultTickets: string[];
  handleEvents: (data: { eventId: string; ticketId: string }[]) => void;
}) => {
  const { data: publicEvents, isLoading: publicEventsLoading } = useSWR<IEvent[]>(`${apiUrl}/events/public`, fetcherWithToken);
  const { data: myEvents, isLoading: myEventsLoading } = useSWR<IEvent[]>(`${apiUrl}/private/events`, fetcherWithToken);
  const isLoading = publicEventsLoading || myEventsLoading;

  const onSaveTickets = (data: ISelectedEvent[]) => {
    handleEvents(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <PlusCircle size={32} />
        </button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[35rem]">
        <DialogHeader>
          <DialogTitle className="uppercase text-5xl text-center">Select tickets</DialogTitle>
        </DialogHeader>
        <div className="h-[1px] bg-gray-400 w-full"></div>
        <EventSelectTable
          myEvents={myEvents || []}
          publicEvents={(publicEvents || []).filter((i) => !myEvents?.some((j) => j.id === i.id)) || []}
          onSaveEvents={onSaveTickets}
          defaultTickets={defaultTickets}
        />
      </DialogContent>
    </Dialog>
  );
};
