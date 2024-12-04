"use client";

import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Ticket as TicketIcon } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { formatLocation, getTicketImage, TicketRequirement } from "./types";

interface TicketRequirementCardProps {
  ticket: ITicket;
  event: IEvent;
  requirement: TicketRequirement;
  onRequirementChange: (requirement: TicketRequirement) => void;
}

export function TicketRequirementCard({
  ticket,
  event,
  requirement,
  onRequirementChange
}: TicketRequirementCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card className="p-4">
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
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-lg">{ticket.name}</h3>
                  <Badge variant="secondary" className="shrink-0">
                    ${ticket.price}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {event.name}
                </p>
              </div>
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
              <span className="flex items-center gap-1">
                <TicketIcon className="w-4 h-4" />
                {ticket.ticketSupply} available
              </span>
            </div>

            <div className="mt-4">
              <Select
                value={requirement}
                onValueChange={(value: TicketRequirement) => onRequirementChange(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select requirement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="holders">Ticket Holders</SelectItem>
                  <SelectItem value="attendees">Verified Attendees</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}