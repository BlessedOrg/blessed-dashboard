"use client";
import { CostByOperator } from "@/components/analytics/CostByOperator";
import { CostOverview } from "@/components/analytics/CostOverview";
import { AnalyticsFilters } from "@/components/analytics/filters/AnalyticsFilters";
import { TransactionsByMethod } from "@/components/analytics/TransactionsByMethod";
import { TransactionsCount } from "@/components/analytics/TransactionsCount";
import { Badge, Card } from "@/components/ui";
import { fetcherWithToken } from "@/requests/requests";
import { apiUrl } from "@/variables/variables";
import { motion } from "framer-motion";
import { ChartBar } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";
import { CardContent } from "../ui/card";

export const AdminDashboard = ({hardcodedParam}: {hardcodedParam?: string}) => {
  const defaultParams = `?getBy=all`;
  const [selectedParam, setSelectedParam] = useState(hardcodedParam || defaultParams);

  const { data: filterData, isLoading: filtersLoading } = useSWR(`${apiUrl}/private/analytics/filters`, fetcherWithToken);

  const { data: analyticsData } = useSWR(filterData?.filters ? `${apiUrl}/private/analytics${selectedParam}` : null, fetcherWithToken);

	console.log(selectedParam)

  return (
    <div className="container mx-auto pb-8 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
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
                <p className="text-gray-600">Track your app's performance and user engagement.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {!filtersLoading && !hardcodedParam && <AnalyticsFilters filtersData={filterData} onChange={(a) => setSelectedParam(a)} />}
        <Card className="p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Cost Overview</h2>
          <CostOverview data={analyticsData} />
        </Card>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <Card className="p-6 h-full">
            <h2 className="text-lg font-semibold mb-4">Transactions count</h2>
            <TransactionsCount {...analyticsData?.count} />
          </Card>
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">3rd Party Costs</h2>
            <CostByOperator data={analyticsData?.costsByOperatorType} />
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Transactions by Method</h2>
          <TransactionsByMethod
            eventsData={analyticsData?.eventsTransactions?.data || []}
            ticketsData={analyticsData?.ticketsTransactions?.data || []}
          />
        </Card>
      </motion.div>
    </div>
  );
};
