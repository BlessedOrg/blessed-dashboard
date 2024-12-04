"use client";

import { AnimatePresence } from "framer-motion";
import { TicketRequirementCard } from "./TicketRequirementCard";
import { SelectedTicket, TicketRequirement } from "../../types";

interface TicketRequirementsListProps {
  tickets: Array<ITicket & { event: IEvent }>;
  selectedTickets: SelectedTicket[];
  onRequirementChange: (ticketId: string, requirement: TicketRequirement) => void;
}

export function TicketRequirementsList({
  tickets,
  selectedTickets,
  onRequirementChange
}: TicketRequirementsListProps) {
  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {tickets.map((ticket) => {
          const selectedTicket = selectedTickets.find(t => t.ticketId === ticket.id);
          if (!selectedTicket) return null;

          return (
            <TicketRequirementCard
              key={ticket.id}
              ticket={ticket}
              event={ticket.event}
              requirement={selectedTicket.requirement}
              onRequirementChange={(requirement) => onRequirementChange(ticket.id, requirement)}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}