"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui";
import { CostOverview } from "@/components/analytics/CostOverview";
import { CostByOperator } from "@/components/analytics/CostByOperator";
import { TransactionsByMethod } from "@/components/analytics/TransactionsByMethod";
import useSWR from "swr";
import { apiUrl } from "@/variables/variables";
import { fetcherWithToken } from "@/requests/requests";
import { useState } from "react";
import { AnalyticsFilters } from "@/components/analytics/filters/AnalyticsFilters";
import { TransactionsCount } from "@/components/analytics/TransactionsCount";

export const AdminDashboard = () => {
  const defaultParams = `?getBy=all`;
  const [selectedParam, setSelectedParam] = useState(defaultParams);

  const { data: filterData, isLoading: filtersLoading } = useSWR(`${apiUrl}/private/analytics/filters`, fetcherWithToken);

  const { data: analyticsData } = useSWR(filterData?.filters ? `${apiUrl}/private/analytics${selectedParam}` : null, fetcherWithToken);

  return <div className="container mx-auto py-8 px-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
      {!filtersLoading && <AnalyticsFilters filtersData={filterData} onChange={(a) => setSelectedParam(a)} />}
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
  </div>;
};