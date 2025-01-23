"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatEth, formatUsd } from "@/utils/format";
import { motion } from "framer-motion";

interface CostOverviewProps {
  data: AnalyticsData;
}

export function CostOverview({ data }: CostOverviewProps) {
  const totalEthCost = Object?.values(data?.costsByOperatorType || {})?.reduce(
    (acc, curr) => acc + parseFloat(curr.ethCost),
    0
  ) || 0;

  const totalUsdCost = Object?.values(data?.costsByOperatorType || {})?.reduce(
    (acc, curr) => acc + curr.usdCost,
    0
  ) || 0;

  const costItems = [
    {
      title: "Total Cost",
      ethCost: totalEthCost,
      usdCost: totalUsdCost,
      description: "Across all transactions and deployments"
    },
    {
      title: "Events Transactions",
      ethCost: parseFloat(data?.eventsTransactions?.ethCost || "0"),
      usdCost: data?.eventsTransactions?.usdCost || 0,
      description: "Cost of event-related transactions"
    },
    {
      title: "Tickets Transactions",
      ethCost: parseFloat(data?.ticketsTransactions?.ethCost || "0"),
      usdCost: data?.ticketsTransactions?.usdCost || 0,
      description: "Cost of ticket-related transactions"
    },
    {
      title: "Tickets Deploy",
      ethCost: parseFloat(data?.ticketsDeploy?.ethCost || "0"),
      usdCost: data?.ticketsDeploy?.usdCost || 0,
      description: "Cost of deploying tickets"
    },
    {
      title: "Events Deploy",
      ethCost: parseFloat(data?.eventsDeploy?.ethCost || "0"),
      usdCost: data?.eventsDeploy?.usdCost || 0,
      description: "Cost of deploying events"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {costItems?.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={index === 0 ? "md:col-span-2" : ""}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pl-6">
              <div className={`grid grid-cols-2 gap-4`}>
                <div>
                  <div className="text-xl font-bold">
                    {formatEth(item.ethCost)}
                  </div>
                  <p className="text-xs text-muted-foreground">ETH Cost</p>
                </div>
                <div>
                  <div className="text-xl font-bold">
                    {formatUsd(item.usdCost)}
                  </div>
                  <p className="text-xs text-muted-foreground">USD Cost</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {item.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}