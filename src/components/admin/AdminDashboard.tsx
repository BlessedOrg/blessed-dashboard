"use client";
import { CostByOperator } from "@/components/analytics/CostByOperator";
import { CostOverview } from "@/components/analytics/CostOverview";
import { AnalyticsFilters } from "@/components/analytics/filters/AnalyticsFilters";
import { TransactionsByMethod } from "@/components/analytics/TransactionsByMethod";
import { TransactionsCount } from "@/components/analytics/TransactionsCount";
import { Badge, Card, Select } from "@/components/ui";
import { fetcherWithToken } from "@/requests/requests";
import { apiUrl } from "@/variables/variables";
import { motion } from "framer-motion";
import { ChartBar } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";
import { CardContent } from "../ui/card";
import {
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

export const AdminDashboard = ({
  hardcodedParam,
  isTicketsView,
  tickets,
}: {
  hardcodedParam?: string;
  isTicketsView?: boolean;
  tickets?: ITicket[];
}) => {
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(
    tickets?.[0]?.id || null
  );
  const defaultParams = `?getBy=all`;
  const [selectedParam, setSelectedParam] = useState(
    hardcodedParam || defaultParams
  );

  const { data: filterData, isLoading: filtersLoading } = useSWR(
    `${apiUrl}/private/analytics/filters`,
    fetcherWithToken
  );

  const { data: analyticsDataResponse } = useSWR(
    filterData?.filters
      ? `${apiUrl}/private/analytics${
          isTicketsView
            ? `?getBy=ticket&ticketId=${selectedTicketId}`
            : selectedParam
        }`
      : null,
    fetcherWithToken
  );

  const analyticsData = analyticsDataResponse?.expense;
  return (
    <div className="container mx-auto pb-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-none">
          <CardContent className="p-6">
            <div className="flex justify-between gap-2 items-center">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <ChartBar className="w-6 h-6 text-purple-600" />
                  <div className="flex gap-4 items-center">
                    <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
                    {filterData?.isAdmin && (
                      <Badge variant="outline" className="bg-yellow-300">
                        ADMIN
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-gray-600">
                  Track your{" "}
                  {!!hardcodedParam && hardcodedParam.includes("event")
                    ? "event's"
                    : isTicketsView
                    ? "ticket's"
                    : "app's"}{" "}
                  performance and user engagement.
                </p>
              </div>
            </div>
            {isTicketsView && !!tickets.length && (
              <Select
                value={selectedTicketId}
                onValueChange={setSelectedTicketId}
                disabled={false}
              >
                <SelectTrigger className="w-fit min-w-[200px] mt-4">
                  <SelectValue placeholder="Select a ticket" />
                </SelectTrigger>
                <SelectContent>
                  {tickets.map((ticket) => (
                    <SelectItem
                      key={ticket.id}
                      value={ticket.id}
                      defaultValue={selectedTicketId}
                    >
                      {ticket.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </CardContent>
        </Card>

        {isTicketsView && !tickets.length && (
          <Card className="bg-yellow-500 rounded-3xl p-6 mb-8">
            <p className="font-semibold text-xl">Warning</p>
            <p>
              No tickets found. Please create a ticket first to view analytics.
            </p>
          </Card>
        )}
        {!filtersLoading && !hardcodedParam && !isTicketsView && (
          <AnalyticsFilters
            filtersData={filterData}
            onChange={(a) => setSelectedParam(a)}
          />
        )}
        {((isTicketsView && !!tickets.length) || !isTicketsView) && (
          <>
            <Card className="p-6 lg:col-span-2">
              <h2 className="text-lg font-semibold mb-4">Cost Overview</h2>
              <CostOverview data={analyticsData} />
            </Card>

            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
              <Card className="p-6 h-full">
                <h2 className="text-lg font-semibold mb-4">
                  Transactions count
                </h2>
                <TransactionsCount {...analyticsData?.count} />
              </Card>
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">3rd Party Costs</h2>
                <CostByOperator data={analyticsData?.costsByOperatorType} />
              </Card>
            </div>

            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">
                Transactions by Method
              </h2>
              <TransactionsByMethod
                eventsData={analyticsData?.eventsTransactions?.data || []}
                ticketsData={analyticsData?.ticketsTransactions?.data || []}
              />
            </Card>
          </>
        )}
      </motion.div>
    </div>
  );
};
