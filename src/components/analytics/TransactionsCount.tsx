"use client";

import { Bar, BarChart, LabelList, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export function TransactionsCount(data: TransactionCount) {
  const chartData = [
    { browser: "all", transactions: data?.all || 0, fill: "hsl(var(--chart-1))" },
    { browser: "eventsTransactions", transactions: data?.eventsTransactions || 0, fill: "hsl(var(--chart-2))" },
    { browser: "ticketsTransactions", transactions: data?.ticketsTransactions || 0, fill: "hsl(var(--chart-3))" },
    { browser: "ticketsDeploy", transactions: data?.ticketsDeploy || 0, fill: "hsl(var(--chart-4))" },
    { browser: "eventsDeploy", transactions: data?.eventsDeploy || 0, fill: "hsl(var(--chart-5))" }
  ];

  const chartConfig = {
    transactions: {
      label: "Transactions"
    },
    all: {
      label: "All",
      color: "hsl(var(--chart-1))"
    },
    eventsTransactions: {
      label: "Events Transactions",
      color: "hsl(var(--chart-2))"
    },
    ticketsTransactions: {
      label: "Tickets Transactions",
      color: "hsl(var(--chart-3))"
    },
    ticketsDeploy: {
      label: "Tickets Deploy",
      color: "hsl(var(--chart-4))"
    },
    eventsDeploy: {
      label: "Events Deploy",
      color: "hsl(var(--chart-5))"
    }
  } satisfies ChartConfig;
  return (
    <Card>
      <CardContent>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="h-[300px]"

        >
          <ResponsiveContainer width="100%" height="100%">
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{
                  left: 30,
                  right: 30
                }}
              >
                <YAxis
                  dataKey="browser"
                  type="category"
                  tickLine={false}
                  tickMargin={5}
                  axisLine={false}
                  tickFormatter={(value) =>
                    chartConfig[value as keyof typeof chartConfig]?.label
                  }
                />
                <XAxis dataKey="transactions" type="number" tickMargin={10} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="transactions" layout="vertical" radius={5}>
                  <LabelList
                    dataKey="transactions"
                    position="right"
                    offset={6}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </ResponsiveContainer>
        </motion.div>
      </CardContent>
    </Card>
  );
}
