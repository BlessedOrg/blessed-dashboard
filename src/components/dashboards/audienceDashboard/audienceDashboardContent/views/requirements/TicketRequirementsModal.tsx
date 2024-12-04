"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Plus, Settings2, Ticket, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { format } from "date-fns";
import { formatLocation, getTicketImage, TicketRequirement } from "../../types";

interface TicketRequirementsModalProps {
  appId: string;
  eventId: string;
  event: IEvent;
  currentRequirements: Record<string, TicketRequirement>;
  onRequirementsChange: (requirements: Record<string, TicketRequirement>) => void;
}

export function TicketRequirementsModal({
  appId,
  eventId,
  event,
  currentRequirements,
  onRequirementsChange
}: TicketRequirementsModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  const handleRequirementChange = (ticketId: string, requirement: TicketRequirement) => {
    onRequirementsChange({
      ...currentRequirements,
      [ticketId]: requirement
    });
  };

  const handleRemoveRequirement = (ticketId: string) => {
    const newRequirements = { ...currentRequirements };
    delete newRequirements[ticketId];
    onRequirementsChange(newRequirements);
  };

  const handleAddTicket = () => {
    if (selectedTicketId) {
      handleRequirementChange(selectedTicketId, "Verified Attendee");
      setSelectedTicketId(null);
    }
  };

  const availableTickets = event.Tickets.filter(ticket => !currentRequirements[ticket.id]);
  const selectedTicket = availableTickets.find(ticket => ticket.id === selectedTicketId);

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
            <DialogTitle className="text-2xl mb-4">Ticket Requirements</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Existing Requirements */}
            <AnimatePresence mode="popLayout">
              {Object.entries(currentRequirements).map(([ticketId, requirement]) => {
                const ticket = event.Tickets.find(t => t.id === ticketId);
                if (!ticket) return null;

                return (
                  <motion.div
                    key={ticketId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Card className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={getTicketImage(ticket)}
                            alt={ticket.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-medium text-base truncate">
                                {ticket.name}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">
                                {event.name}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="shrink-0"
                              onClick={() => handleRemoveRequirement(ticketId)}
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>

                          <Select
                            value={requirement}
                            onValueChange={(value: TicketRequirement) =>
                              handleRequirementChange(ticketId, value)
                            }
                          >
                            <SelectTrigger className="mt-3">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Verified Attendee">Verified Attendee</SelectItem>
                              <SelectItem value="Ticket Holder">Ticket Holder</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Add New Requirement */}
            {availableTickets.length > 0 && (
              <Card className="p-4 border-dashed">
                <div className="space-y-4">
                  <Select
                    value={selectedTicketId || ""}
                    onValueChange={setSelectedTicketId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a ticket" />
                    </SelectTrigger>
                    <SelectContent>
                      <ScrollArea className="max-h-[300px]">
                        {availableTickets.map(ticket => (
                          <SelectItem key={ticket.id} value={ticket.id}>
                            {ticket.name}
                          </SelectItem>
                        ))}
                      </ScrollArea>
                    </SelectContent>
                  </Select>

                  {/* Selected Ticket Details */}
                  <AnimatePresence mode="wait">
                    {selectedTicket && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="pt-2"
                      >
                        <Card className="p-3 bg-gray-50">
                          <div className="flex items-start gap-3">
                            <div className="relative w-12 h-12 rounded overflow-hidden shrink-0">
                              <Image
                                src={getTicketImage(selectedTicket)}
                                alt={selectedTicket.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{selectedTicket.name}</p>
                                <Badge variant="secondary" className="shrink-0">
                                  ${selectedTicket.price}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-500 mt-1">
                                {event.name}
                              </p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {format(new Date(event.startsAt), "MMM d, yyyy")}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {formatLocation(event.EventLocation)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Ticket className="w-3 h-3" />
                                  {selectedTicket.ticketSupply} available
                                </span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex justify-end">
                    <Button
                      onClick={handleAddTicket}
                      disabled={!selectedTicketId}
                      className="gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Requirement
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Empty State */}
            {Object.keys(currentRequirements).length === 0 && (
              <div className="text-center py-6 text-gray-500">
                <p>No requirements configured</p>
                <p className="text-sm">Select a ticket to add requirements</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
