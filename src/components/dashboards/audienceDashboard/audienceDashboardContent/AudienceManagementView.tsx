"use client";

import { createAudience } from "@/app/api/audience";
import { AudienceNameEdit } from "@/components/dashboards/audienceDashboard/audienceDashboardContent/views/AudienceNameEdit";
import { SelectAudienceModal } from "@/components/dashboards/campaignsDashboard/campaignsDashboardContent/modals/SelectAudienceModal";
import { SelectTicketsModal } from "@/components/modals/selectTickets/SelectTicketsModal";
import { Button, Checkbox } from "@/components/ui";
import { Card, CardContent } from "@/components/ui/card";
import { fetcherWithToken } from "@/requests/requests";
import { apiUrl } from "@/variables/variables";
import { motion } from "framer-motion";
import { isArray, uniqBy } from "lodash-es";
import { Settings2, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import { EligibleUser, SelectedTicket, TicketRequirement } from "./types";
import { EligibleUsersList } from "./views/EligibleUsersList";
import { TicketRequirementsList } from "./views/requirements/TicketRequirementsList";

interface AudienceManagementViewProps {
  appId: string;
  mutate: any;
  onTabChange: (index: string) => void;
  allAudiences: IAudience[];
}

export function AudienceManagementView({
  appId,
  mutate,
  onTabChange,
  allAudiences,
}: AudienceManagementViewProps) {
  const { data: publicEvents, isLoading: publicEventsLoading } = useSWR<
    IEvent[]
  >(`${apiUrl}/events/public`, fetcherWithToken);
  const { data: myEvents, isLoading: myEventsLoading } = useSWR<IEvent[]>(
    `${apiUrl}/private/events`,
    fetcherWithToken
  );
  const isLoading = publicEventsLoading || myEventsLoading;
  const [audienceName, setAudienceName] = useState("My audience 1");
  const [isFetching, setIsFetching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState<SelectedTicket[]>([]);
  const [eligibleUsers, setEligibleUsers] = useState([]);
  const [eligibleAudienceUsers, setEligibleAudienceUsers] = useState([]);
  const [selectedAudiences, setSelectedAudiences] = useState([]);
  const [isEachTicketRequirementMet, setIsEachTicketRequirementMet] =
    useState(false);

  const onEachTicketRequirementMetChange = (value: any) => {
    console.log(value);
    setIsEachTicketRequirementMet(value);
  };
  const handleRequirementChange = (
    ticketId: string,
    requirement: TicketRequirement
  ) => {
    setSelectedTickets((prev) =>
      prev.map((ticket) =>
        ticket.ticketId === ticketId ? { ...ticket, requirement } : ticket
      )
    );
  };
  const eventsWithTickets = (
    isArray(myEvents) && isArray(publicEvents)
      ? [...myEvents, ...publicEvents.map((i) => ({ ...i, isPublic: true }))]
      : []
  ).filter((event) => !!event.Tickets.length);
  const allTickets = eventsWithTickets.flatMap((event) =>
    event.Tickets.map((ticket) => ({
      ...ticket,
      event,
    }))
  );

  const getEligibleAudiences = async () => {
    setIsFetching(true);
    try {
      const response = await fetcherWithToken(
        `${apiUrl}/private/tickets/snapshot`,
        {
          method: "POST",
          body: JSON.stringify({
            isEachTicketRequirementMet,
            snapshot: selectedTickets.map((i) => {
              return {
                eventId: i.eventId,
                ticketId: i.ticketId,
                type: i?.requirement,
              };
            }),
          }),
        }
      );
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
      const users = uniqueUsersArray([
        ...eligibleUsers,
        ...eligibleAudienceUsers,
      ]);
      const pyaload = {
        userIds: users?.filter((i) => !!i?.id)?.map((i) => i.id),
        externalAddresses: users
          ?.filter((i) => i?.external)
          ?.map((i) => i.walletAddress),
      };
      const response = await createAudience({
        name: audienceName,
        appId,
        data: pyaload,
      });

      if (response?.id) {
        await mutate();
        toast(response?.message, { type: "success" });
        onTabChange(response.id);
      }
    } catch (e) {
      toast(e?.message || "Something went wrong", { type: "error" });
    }
    setIsSaving(false);
  };

  const onSelectAudiences = (selected: string[], toDelete: string[]) => {
    setSelectedAudiences(selected);
    const formatSelectedAudienceUsers = (users: IAudienceUser[]) => {
      const uniqueUsers = new Map();

      users.forEach((i) => {
        const isExternal = !!i?.externalWalletAddress;
        let formattedUser;

        if (isExternal) {
          formattedUser = {
            walletAddress: i.externalWalletAddress,
            external: true,
          };
        } else {
          formattedUser = {
            smartWalletAddress: i.User.smartWalletAddress,
            walletAddress: i.User.walletAddress,
            id: i.User.id,
            email: i.User?.email,
          };
        }

        const key =
          formattedUser.walletAddress || formattedUser.smartWalletAddress;
        if (!uniqueUsers.has(key)) {
          uniqueUsers.set(key, formattedUser);
        }
      });

      return Array.from(uniqueUsers.values());
    };
    const selectedEligible = formatSelectedAudienceUsers(
      allAudiences
        .filter((i) => selected.includes(i.id))
        .flatMap((i) => i.AudienceUsers)
    );

    setEligibleAudienceUsers(selectedEligible);
  };

  useEffect(() => {
    if (!!selectedTickets.length) {
      getEligibleAudiences();
    } else {
      setEligibleUsers([]);
    }
  }, [selectedTickets, isEachTicketRequirementMet]);

  const uniqueTickets = uniqBy(allTickets, "id");
  const handleAudienceNameChange = (name: string) => {
    setAudienceName(name);
  };

  const uniqueUsersArray = (users: EligibleUser[]) => {
    const uniqueUsers = new Map();

    users.forEach((formattedUser) => {
      const key =
        formattedUser.walletAddress || formattedUser.smartWalletAddress;
      if (!uniqueUsers.has(key)) {
        uniqueUsers.set(key, formattedUser);
      }
    });

    return Array.from(uniqueUsers.values());
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
              <h3 className="text-2xl font-bold text-gray-900">
                Audience Management
              </h3>
            </div>
            <p className="text-gray-600">
              Define ticket requirements and view eligible users for your events
            </p>
          </CardContent>
        </Card>
      </motion.div>
      <div className="w-full flex justify-between gap-4 items-center mb-6">
        <AudienceNameEdit
          currentName={audienceName}
          onAudienceNameChange={handleAudienceNameChange}
        />
        <Button
          variant="green"
          onClick={onSaveHandler}
          isLoading={isSaving}
          disabled={!eligibleUsers?.length}
        >
          Create Audience
        </Button>
      </div>
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Setup Requirements</h2>
              <div className="flex gap-2">
                <SelectAudienceModal
                  customTriggerButton={
                    <Button size="sm" variant="outline" className="gap-2">
                      <Settings2 className="w-4 h-4" />
                      Select Audiences
                    </Button>
                  }
                  appId={appId}
                  defaultValues={selectedAudiences}
                  onHandleSubmit={onSelectAudiences}
                />
                <SelectTicketsModal
                  events={eventsWithTickets}
                  selectedTickets={selectedTickets}
                  onTicketsSelect={setSelectedTickets}
                />
              </div>
            </div>
            <div className="flex items-center gap-2 my-4">
              <Checkbox
                size="lg"
                checked={isEachTicketRequirementMet}
                onCheckedChange={onEachTicketRequirementMetChange}
              />
              <p>All tickets requirements have to be met together.</p>
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
            <EligibleUsersList
              users={uniqueUsersArray([
                ...eligibleUsers,
                ...eligibleAudienceUsers,
              ])}
              isLoading={isFetching}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
