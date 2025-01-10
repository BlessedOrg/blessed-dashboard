"use client";

import { Card, CardContent } from "@/components/ui/card";
import { fetcherWithToken } from "@/requests/requests";
import { apiUrl } from "@/variables/variables";
import { motion } from "framer-motion";
import { isArray } from "lodash-es";
import { DollarSign } from "lucide-react";
import { useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { toast } from "react-toastify";
import useSWR from "swr";
import { Select } from "../ui";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { AddPersonModal } from "./AddPersonModal";
import { PaymentTypesCard } from "./PaymentTypesCard";
import { RevenueTable } from "./RevenueTable";
import { RevenueEntry } from "./types";

type RevenueDistributionViewProps = {
  appId: string;
  eventId?: string;
  // For state-managed mode
  isStateManaged?: boolean;
  stakeholders?: RevenueEntry[];
  form?: UseFormReturn<FieldValues, any, undefined>;
  tickets?: ITicket[];
  isTicketsView?: boolean;
};

export function RevenueDistributionView({
  appId,
  eventId,
  isStateManaged = true,
  stakeholders: externalStakeholders,
  form,
  tickets,
  isTicketsView = false,
}: RevenueDistributionViewProps) {
	const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<string[]>([])
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(tickets?.[0]?.id || null);
  const ticketId = selectedTicketId || tickets?.[0]?.id;

  const [localStakeholders, setLocalStakeholders] = useState<RevenueEntry[]>(externalStakeholders || []);

  const {
    data: stakeholdersData,
    isLoading: isStakeholdersLoading,
    mutate: mutateStakeholders,
  } = useSWR(
    !isStateManaged ? `${apiUrl}/private/stakeholders/${appId}${eventId ? `/${eventId}` : ""}${ticketId ? `/${ticketId}` : ""}` : null,
    fetcherWithToken
  );

  const stakeholders = isStateManaged ? localStakeholders : isArray(stakeholdersData) ? stakeholdersData : [];

  const handleAddEntry = async (entry: RevenueEntry) => {
    if (isStateManaged) {
      const newStakeholders = [...localStakeholders, {...entry, paymentMethods: selectedPaymentMethods}];
      setLocalStakeholders(newStakeholders);
      form.setValue("stakeholders", newStakeholders);
      return;
    }

    try {
      const response = await fetcherWithToken(
        `${apiUrl}/private/stakeholders/add/${appId}${eventId ? `/${eventId}` : ""}${ticketId ? `/${ticketId}` : ""}`,
        {
          method: "POST",
          body: JSON.stringify({
            stakeholders: [{...entry, paymentMethods: selectedPaymentMethods}],
          }),
        }
      );
      if (response.success) {
        await mutateStakeholders();
        toast("Stakeholder added successfully", { type: "success" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveEntry = async (id: string) => {
    if (isStateManaged) {
      const newStakeholders = localStakeholders.filter((s) => s.id !== id);
      setLocalStakeholders(newStakeholders);
      form.setValue("stakeholders", newStakeholders);
      return;
    }

    try {
      const response = await fetcherWithToken(
        `${apiUrl}/private/stakeholders/${id}/${appId}${eventId ? `/${eventId}` : ""}${ticketId ? `/${ticketId}` : ""}`,
        { method: "DELETE" }
      );
      if (response.id) {
        await mutateStakeholders();
        toast("Stakeholder removed successfully", { type: "success" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNotify = async (id: string) => {
    if (isStateManaged) {
      return;
    }

    try {
      const response = await fetcherWithToken(
        `${apiUrl}/private/stakeholders/${appId}/notify${eventId ? `/${eventId}` : ""}${ticketId ? `/${ticketId}` : ""}`,
        {
          method: "POST",
          body: JSON.stringify({
            stakeholdersIds: [id],
          }),
        }
      );
      if (response.success) {
        await mutateStakeholders();
        toast("Stakeholder notified successfully", { type: "success" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePaymentTypeToggle = (type: string) => {
    setSelectedPaymentMethods((prev) => {
			if(prev.includes(type)) {
				return prev.filter((method) => method !== type)
			}
			return [...prev, type]
		})
		if(!!stakeholders.length) {
			form.setValue("stakeholders", stakeholders.map((stakeholder) => ({
				...stakeholder,
				paymentMethods: stakeholder.paymentMethods.includes(type) ? stakeholder.paymentMethods.filter((method) => method !== type) : [...stakeholder.paymentMethods, type]
			})))
		}
  };

  const totalPercentage = stakeholders.reduce((sum, entry) => sum + entry.feePercentage, 0);
console.log(form.getValues())
  return (
    <div className="w-full pb-8 px-4 overflow-hidden">
      {isTicketsView && !tickets?.length && (
        <>
          <div className="bg-yellow-500 rounded-3xl p-6 mb-8">
            <p className="font-semibold text-xl">Warning</p>
            <p>No tickets found. Please create a ticket first.</p>
          </div>
        </>
      )}
      {((!isTicketsView || (isTicketsView && !!tickets?.length)) && (
          <>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-none mb-8">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="w-6 h-6 text-green-600" />
                    <h1 className="text-2xl font-bold text-gray-900">Revenue Distribution</h1>
                  </div>
                  <p className="text-gray-600">Manage revenue sharing and distributions among team members</p>
                  {!!tickets?.length && (
                    <Select value={selectedTicketId} onValueChange={setSelectedTicketId} disabled={false} >
                      <SelectTrigger className="w-fit min-w-[200px] mt-4">
                        <SelectValue placeholder="Select a ticket" />
                      </SelectTrigger>
                      <SelectContent>
                        {tickets.map((ticket) => (
                          <SelectItem key={ticket.id} value={ticket.id} defaultValue={selectedTicketId}>
                            {ticket.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {(!!ticketId || !!eventId) && (
              <div className="bg-yellow-500 rounded-3xl p-6 mb-8">
                <p className="font-semibold text-xl">Warning</p>
                <p>
                  This will override the distribution set at the {ticketId ? "event" : eventId ? "app" : ""} level. Changes are allowed
                  until the first ticket is sold.
                </p>
              </div>
            )}

            <div className="space-y-6">
              <PaymentTypesCard enabledTypes={new Set(selectedPaymentMethods)} onToggle={handlePaymentTypeToggle} />

              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center mb-6 gap-4">
                    <div>
                      <h2 className="text-lg font-semibold">Distribution List</h2>
                      <p className="text-sm text-gray-500">Total allocated: {totalPercentage}%</p>
                    </div>
                    <AddPersonModal onSubmit={handleAddEntry} currentTotal={totalPercentage} />
                  </div>

                  <RevenueTable
                    isStateManaged={isStateManaged}
                    entries={stakeholders}
                    onRemove={handleRemoveEntry}
                    onNotify={handleNotify}
                    isLoading={isStakeholdersLoading}
                  />
                </CardContent>
              </Card>
            </div>
          </>
        ))}
    </div>
  );
}
