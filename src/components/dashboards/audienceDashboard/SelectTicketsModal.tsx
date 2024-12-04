"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Check, MapPin, Settings2, Ticket as TicketIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Image from "next/image";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface SelectedTicket {
  id: string;
  name: string;
  imageUrl?: string;
  event: {
    name: string;
    startDate: string;
    location: string;
  };
  price: number;
  available: number;
}

interface SelectTicketsModalProps {
  tickets: SelectedTicket[];
  onTicketsSelect: (selectedTickets: string[]) => void;
}

export function SelectTicketsModal({ tickets, onTicketsSelect }: SelectTicketsModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState<Set<string>>(new Set());

  const handleTicketToggle = (ticketId: string) => {
    const newSelection = new Set(selectedTickets);
    if (newSelection.has(ticketId)) {
      newSelection.delete(ticketId);
    } else {
      newSelection.add(ticketId);
    }
    setSelectedTickets(newSelection);
  };

  const handleSubmit = () => {
    onTicketsSelect(Array.from(selectedTickets));
    setIsOpen(false);
    setSelectedTickets(new Set());
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="gap-2"
      >
        <Settings2 className="w-4 h-4" />
        Configure Requirements
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Select Tickets</DialogTitle>
          </DialogHeader>

          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-4">
              {tickets.map((ticket) => (
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
                      selectedTickets.has(ticket.id) && "ring-2 ring-blue-500"
                    )}
                    onClick={() => handleTicketToggle(ticket.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                        {ticket.imageUrl ? (
                          <Image
                            src={ticket.imageUrl}
                            alt={ticket.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <TicketIcon className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-lg">{ticket.name}</h3>
                            <p className="text-sm text-gray-500 mt-1">
                              {ticket.event.name}
                            </p>
                          </div>
                          {selectedTickets.has(ticket.id) && (
                            <Badge className="bg-blue-500">
                              <Check className="w-4 h-4" />
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {format(new Date(ticket.event.startDate), "MMM d, yyyy")}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {ticket.event.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <TicketIcon className="w-4 h-4" />
                            {ticket.available} available
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </ScrollArea>

          <DialogFooter>
            <div className="flex justify-between items-center w-full">
              <p className="text-sm text-gray-500">
                {selectedTickets.size} ticket{selectedTickets.size !== 1 ? "s" : ""} selected
              </p>
              <Button
                onClick={handleSubmit}
                disabled={selectedTickets.size === 0}
                className="gap-2"
              >
                Configure Requirements
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
