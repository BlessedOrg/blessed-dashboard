"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Calendar, Check, MapPin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface SelectEventModalProps {
  onEventSelect: (eventId: string) => void;
  events: IEvent[];
  children: React.ReactNode;
}

export function SelectEventModal({ onEventSelect, events, children }: SelectEventModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const handleEventSelect = (eventId: string) => {
    if (selectedEventId === eventId) {
      setSelectedEventId(null);
    } else {
      setSelectedEventId(eventId);
    }
  };

  const handleSubmit = () => {
    onEventSelect(selectedEventId);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogTitle className="text-5xl uppercase text-center font-ttBluescreens">Select Event</DialogTitle>

        <div className="space-y-4 max-h-[50vh] overflow-y-auto">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-2"
            >
              <Card
                className={cn(
                  "p-4 cursor-pointer transition-all",
                  "hover:shadow-md",
                  selectedEventId === event.id && "ring-2 ring-blue-500"
                )}
                onClick={() => handleEventSelect(event.id)}
              >
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={event.logoUrl || "/img/placeholder_image.jpeg"}
                      alt={event.name}
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{event.name}</h3>
                        <p className="text-sm text-gray-500 line-clamp-2 mt-1">{event.description}</p>
                      </div>
                      {selectedEventId === event.id && (
                        <Badge className="bg-blue-500">
                          <Check className="w-4 h-4" />
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(event.startsAt), "MMM d, yyyy")}
                      </span>
                      {event.EventLocation && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {event.EventLocation.city}, {event.EventLocation.country}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <DialogFooter>
          <div className="flex justify-between items-center w-full">
            <p className="text-sm text-gray-500">{selectedEventId ? "1 event selected" : "No event selected"}</p>
            <Button onClick={handleSubmit} className="gap-2">
              Submit
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
