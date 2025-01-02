"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { Calendar, DollarSign, MoreVertical, Package, Send, Users } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { SendTicketModal } from "./SendTicketModal";

interface TicketCardProps {
  ticket: any;
  eventId: string;
  appId: string;
  mutate: any;
}

export function TicketCard({ ticket, appId, eventId, mutate }: TicketCardProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  const onTicketModalOpen = () => {
    setIsTicketModalOpen(true);
    setIsDropdownOpen(false);
  };

  return (
    <Card className="group shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image Section */}
          <div className="relative w-full md:w-48 h-48 shrink-0">
            <Image
              src={ticket?.metadataPayload?.metadataImageUrl || "/img/placeholder_image.jpeg"}
              alt={ticket.name}
              fill
              className="rounded-xl object-cover"
            />
            {ticket.ticketSupply === 0 && <Badge className="absolute top-2 right-2 bg-red-500">Sold Out</Badge>}
          </div>

          {/* Content Section */}
          <div className="flex-1 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{ticket.name}</h3>
                <p className="text-sm text-gray-500">
                  <Calendar className="inline-block w-4 h-4 mr-1 mb-1" />
                  Created {format(new Date(ticket.createdAt), "MMM d, yyyy")}
                </p>
              </div>
              <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="cursor-pointer" asChild>
                    <Button size="sm" onClick={onTicketModalOpen}>
                      <Send className="mr-2 h-4 w-4" />
                      Send Ticket
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-gray-700">
                <Package className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Available</p>
                  <p className="text-lg font-semibold">{ticket.ticketSupply || "∞"}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <Users className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Owners</p>
                  <p className="text-lg font-semibold">{ticket.ticketOwners.length}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <DollarSign className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium">Price</p>
                  <p className="text-lg font-semibold">{typeof ticket.price === "number" ? `$${ticket.price.toFixed(2)}` : "Free"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SendTicketModal
          ticketId={ticket.id}
          appId={appId}
          eventId={eventId}
          ticketName={ticket.name}
          maxAmount={ticket.ticketSupply}
          mutate={mutate}
          closeDropdown={() => setIsDropdownOpen(false)}
          isOpen={isTicketModalOpen}
          setIsOpen={setIsTicketModalOpen}
        />
      </CardContent>
    </Card>
  );
}
