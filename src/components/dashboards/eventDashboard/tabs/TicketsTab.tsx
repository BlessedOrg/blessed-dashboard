"use client";

import { Card, CardContent } from "@/components/ui/card";
import { fetcherWithToken } from "@/requests/requests";
import { apiUrl } from "@/variables/variables";
import useSWR from "swr";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, Package, Ticket, Users } from "lucide-react";
import { format } from "date-fns";
import { CreateTicketModal } from "@/components/modals/tickets/CreateTicketModal";
import { LoadingCards } from "@/components/common/LoadingCards";

export const TicketsTab = ({ appId, eventId }: { appId: string; eventId: string }) => {
  const {
    data: ticketsData,
    isLoading: ticketsLoading,
    mutate
  } = useSWR<ITicket[]>(
    `${apiUrl}/private/tickets/${appId}/${eventId}`,
    fetcherWithToken
  );

  return (
    <div className="w-full space-y-6 pb-10">
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-none">
        <CardContent className="flex flex-col md:flex-row gap-6 justify-between items-center p-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">
              <Ticket className="inline-block w-6 h-6 mr-2 mb-1" />
              Ticket Management
            </h3>
            <p className="text-gray-600 max-w-xl">
              Review, edit, and organize your tickets with ease. Monitor sales, track availability,
              and manage your event's ticketing strategy all in one place.
            </p>
          </div>
          <CreateTicketModal appId={appId} eventId={eventId} mutateTickets={mutate} />
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {ticketsLoading && <LoadingCards items={3} />}
        {ticketsData?.map((ticket) => (
          <Card
            key={ticket.id}
            className="group shadow-lg"
          >
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                {/* Image Section */}
                <div className="relative w-full md:w-48 h-48 shrink-0">
                  <Image
                    src={"/img/placeholder_image.jpeg"}
                    alt={ticket.name}
                    fill
                    className="rounded-xl object-cover"
                  />
                  {ticket.ticketSupply === 0 && (
                    <Badge className="absolute top-2 right-2 bg-red-500">
                      Sold Out
                    </Badge>
                  )}
                </div>

                {/* Content Section */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {ticket.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      <Calendar className="inline-block w-4 h-4 mr-1 mb-1" />
                      Created {format(new Date(ticket.createdAt), "MMM d, yyyy")}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Package className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">Available</p>
                        <p className="text-lg font-semibold">
                          {ticket.ticketSupply || "∞"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-700">
                      <Users className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="text-sm font-medium">Owners</p>
                        <p className="text-lg font-semibold">
                          {ticket.ticketOwners.length}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-700">
                      <DollarSign className="w-5 h-5 text-yellow-600" />
                      <div>
                        <p className="text-sm font-medium">Price</p>
                        <p className="text-lg font-semibold">
                          {typeof ticket.price === "number"
                            ? `$${ticket.price.toFixed(2)}`
                            : "Free"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {ticketsData?.length === 0 && (
          <Card className="p-8 text-center text-gray-500">
            <Ticket className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No tickets available yet</p>
            <p className="text-sm">Create your first ticket to get started</p>
          </Card>
        )}
      </div>
    </div>
  );
};