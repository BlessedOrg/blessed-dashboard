"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Check, MapPin, Settings2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Image from "next/image";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { formatLocation, getTicketImage, SelectedTicket } from "./types";

interface SelectTicketsModalProps {
  events: IEvent[];
  selectedTickets: SelectedTicket[];
  onTicketsSelect: (selectedTickets: SelectedTicket[]) => void;
}

export function SelectTicketsModal({
  events,
  selectedTickets,
  onTicketsSelect
}: SelectTicketsModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleTicketToggle = (eventId: string, ticketId: string) => {
    const existingTicket = selectedTickets.find(t => t.ticketId === ticketId);
    let newSelection: SelectedTicket[];

    if (existingTicket) {
      newSelection = selectedTickets.filter(t => t.ticketId !== ticketId);
    } else {
      newSelection = [
        ...selectedTickets,
        { eventId, ticketId, requirement: "holders" }
      ];
    }

    onTicketsSelect(newSelection);
  };

  const isTicketSelected = (ticketId: string) => {
    return selectedTickets.some(t => t.ticketId === ticketId);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="gap-2"
      >
        <Settings2 className="w-4 h-4" />
        Select Tickets
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Select Tickets</DialogTitle>
          </DialogHeader>

          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-6">
              {events.map((event) => (
                <div key={event.id} className="space-y-4">
                  <h3 className="font-semibold text-lg text-gray-900">{event.name}</h3>
                  <div className="space-y-3">
                    {event.Tickets.map((ticket) => (
                      <motion.div
                        key={ticket.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <Card
                          className={cn(
                            "p-4 cursor-pointer transition-all",
                            "hover:shadow-md",
                            isTicketSelected(ticket.id) && "ring-2 ring-blue-500"
                          )}
                          onClick={() => handleTicketToggle(event.id, ticket.id)}
                        >
                          <div className="flex items-start gap-4">
                            <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                              <Image
                                src={getTicketImage(ticket)}
                                alt={ticket.name}
                                fill
                                className="object-cover"
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-medium text-lg">{ticket.name}</h4>
                                    <Badge variant="outline" className="shrink-0">
                                      {ticket.metadataPayload.symbol}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-gray-500 mt-1">
                                    {event.name}
                                  </p>
                                </div>
                                {isTicketSelected(ticket.id) && (
                                  <Badge className="bg-blue-500">
                                    <Check className="w-4 h-4" />
                                  </Badge>
                                )}
                              </div>

                              <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {format(new Date(event.startsAt), "MMM d, yyyy")}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {formatLocation(event.EventLocation)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <DialogFooter>
            <div className="flex justify-between items-center w-full">
              <p className="text-sm text-gray-500">
                {selectedTickets.length} ticket{selectedTickets.length !== 1 ? "s" : ""} selected
              </p>
              <Button
                onClick={() => setIsOpen(false)}
                disabled={selectedTickets.length === 0}
                className="gap-2"
              >
                Continue
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}