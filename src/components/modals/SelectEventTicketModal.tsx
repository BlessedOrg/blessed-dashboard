import { EventTicketSelectTable } from "@/components/modals/EventTicketSelectTable";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui";
import { PlusCircle } from "lucide-react";

export const SelectEventTicketModal = ({
  defaultTickets,
  onTicketSelect,
	events
}: {
  defaultTickets: string[];
  onTicketSelect: (eventId: string, ticketId: string) => void;
	events: IEvent[];
}) => {
  const onSaveTickets = (data: ISelectedEvent[]) => {
    data.forEach((i) => onTicketSelect(i.eventId, i.ticketId));
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
          <DialogTitle asChild className="uppercase text-5xl text-center">
            <h2>Select tickets</h2>
          </DialogTitle>
        </DialogHeader>
        <div className="h-[1px] bg-gray-400 w-full"></div>
        <EventTicketSelectTable
          myEvents={events || []}
          publicEvents={events || []}
          onSaveEvents={onSaveTickets}
          defaultTickets={defaultTickets}
        />
      </DialogContent>
    </Dialog>
  );
};
