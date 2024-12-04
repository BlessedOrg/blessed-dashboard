"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import { motion } from "framer-motion";
import { SelectTicketsModal } from "@/components/modals/selectTickets/SelectTicketsModal";
import { EligibleUsersList } from "./views/EligibleUsersList";
import { TicketRequirementsList } from "./views/requirements/TicketRequirementsList";
import { SelectedTicket, TicketRequirement } from "./types";
import { fetcherWithToken } from "@/requests/requests";
import { apiUrl } from "@/variables/variables";
import { toast } from "react-toastify";
import useSWR from "swr";
import { isArray, uniqBy } from "lodash-es";
import { AudienceNameEdit } from "@/components/dashboards/audienceDashboard/audienceDashboardContent/views/AudienceNameEdit";
import { createAudience } from "@/app/api/audience";
import { Button } from "@/components/ui";

interface AudienceManagementViewProps {
  appId: string;
  mutate: any;
  onTabChange: (index: string) => void;
}

export function AudienceManagementView({ appId, mutate, onTabChange }: AudienceManagementViewProps) {
  const { data: publicEvents, isLoading: publicEventsLoading } = useSWR<IEvent[]>(`${apiUrl}/events/public`, fetcherWithToken);
  const { data: myEvents, isLoading: myEventsLoading } = useSWR<IEvent[]>(`${apiUrl}/private/events`, fetcherWithToken);
  const isLoading = publicEventsLoading || myEventsLoading;
  const [audienceName, setAudienceName] = useState("My audience 1");
  const [isFetching, setIsFetching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState<SelectedTicket[]>([]);
  const [eligibleUsers, setEligibleUsers] = useState([]);

  const handleRequirementChange = (ticketId: string, requirement: TicketRequirement) => {
    setSelectedTickets(prev => prev.map(ticket =>
      ticket.ticketId === ticketId ? { ...ticket, requirement } : ticket
    ));
  };
  const eventsWithTickets = isArray(myEvents) && isArray(publicEvents) ? [...myEvents, ...publicEvents.map(i => ({ ...i, isPublic: true }))] : [];
  const allTickets = eventsWithTickets.flatMap(event =>
    event.Tickets.map(ticket => ({
      ...ticket,
      event
    }))
  );

  const getEligibleAudiences = async () => {
    setIsFetching(true);
    try {
      const response = await fetcherWithToken(`${apiUrl}/private/tickets/snapshot`, {
        method: "POST",
        body: JSON.stringify({
          snapshot: selectedTickets.map((i) => {
            return {
              eventId: i.eventId,
              ticketId: i.ticketId,
              type: i?.requirement
            };
          })
        })
      });
      if (response?.all) {
        setEligibleUsers(response?.all || []);
      }
    } catch (e) {
      toast(e?.message || "Something went wrong", { type: "error" });
    }
    setIsFetching(false);
  };

  const onSaveHandler = async () => {
    setIsSaving(true);
    try {
      const pyaload = {
        userIds: eligibleUsers?.filter(i => !!i?.id)?.map((i) => i.id),
        externalAddresses: eligibleUsers?.filter(i => i?.external)?.map((i) => i.walletAddress)
      };
      const response = await createAudience({ name: audienceName, appId, data: pyaload });

      if (response?.id) {
        await mutate();
        toast(response?.message, { type: "success" });
        onTabChange(response.slug);
      }
    } catch (e) {
      toast(e?.message || "Something went wrong", { type: "error" });
    }
    setIsSaving(false);
  };

  useEffect(() => {
    if (!!selectedTickets.length) {
      getEligibleAudiences();
    } else {
      setEligibleUsers([]);
    }
  }, [selectedTickets]);

  const uniqueTickets = uniqBy(allTickets, "id");
  const handleAudienceNameChange = (name: string) => {
    setAudienceName(name);
  };
  return (
    <div className="container mx-auto px-4 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-none mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-6 h-6 text-purple-600" />
              <h3 className="text-2xl font-bold text-gray-900">Audience Management</h3>
            </div>
            <p className="text-gray-600">
              Define ticket requirements and view eligible users for your events
            </p>
          </CardContent>
        </Card>
      </motion.div>
      <div className="w-full flex justify-between gap-4 items-center mb-6">
        <AudienceNameEdit currentName={audienceName} onAudienceNameChange={handleAudienceNameChange} />
        <Button variant="green" onClick={onSaveHandler} isLoading={isSaving} disabled={!eligibleUsers?.length}>Create Audience</Button>
      </div>
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Ticket Requirements</h2>
              <SelectTicketsModal
                events={eventsWithTickets}
                selectedTickets={selectedTickets}
                onTicketsSelect={setSelectedTickets}
              />
            </div>

            {selectedTickets.length > 0 ? (
              <TicketRequirementsList
                tickets={uniqueTickets}
                selectedTickets={selectedTickets}
                onRequirementChange={handleRequirementChange}
              />
            ) : (
              <div className="text-center py-6 text-gray-500">
                <p>No tickets selected</p>
                <p className="text-sm">Click Select Tickets to get started</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <EligibleUsersList users={eligibleUsers} isLoading={isFetching} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}