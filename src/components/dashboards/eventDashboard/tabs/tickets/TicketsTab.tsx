"use client";

import { Card, CardContent } from "@/components/ui/card";
import { fetcherWithToken } from "@/requests/requests";
import { apiUrl } from "@/variables/variables";
import useSWR from "swr";
import { Ticket, Users } from "lucide-react";
import { CreateTicketModal } from "@/components/modals/tickets/CreateTicketModal";
import { LoadingCards } from "@/components/common/LoadingCards";
import { TicketCard } from "@/components/dashboards/eventDashboard/tabs/tickets/TicketCard";

export const TicketsTab = ({ appId, eventId }: { appId: string; eventId: string }) => {
  const {
    data: ticketsData,
    isLoading: ticketsLoading,
    mutate
  } = useSWR<ITicket[]>(
    `${apiUrl}/private/tickets/${appId}/${eventId}`,
    fetcherWithToken
  );

  const allTicketsCount = ticketsData?.reduce((acc, ticket) => acc + ticket.ticketSupply, 0) || 0;
  const maxCapacityCount = ticketsData?.reduce((acc, ticket) => acc + ticket.maxSupply, 0) || 0;
  const allOwnersCount = ticketsData?.reduce((acc, ticket) => acc + ticket.ticketOwners.length, 0) || 0;
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
        {!ticketsLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Available Tickets</p>
                    <p className="text-xl font-semibold">{allTicketsCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-500">Total Owners</p>
                    <p className="text-xl font-semibold">{allOwnersCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-500">Max Capacity</p>
                    <p className="text-xl font-semibold">{maxCapacityCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        {ticketsData?.map((ticket) => (<TicketCard key={ticket.id} ticket={ticket} appId={appId} eventId={eventId} />))}

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