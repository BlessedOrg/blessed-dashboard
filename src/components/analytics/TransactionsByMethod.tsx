"use client";

import { Card, CardContent } from "@/components/ui/card";
import { formatUsd } from "@/lib/format";
import { motion } from "framer-motion";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface TransactionsByMethodProps {
  eventsData: TransactionData[];
  ticketsData: TransactionData[];
}

export function TransactionsByMethod({
  eventsData,
  ticketsData
}: TransactionsByMethodProps) {
  const methods = new Set([
    ...eventsData.map((tx) => tx.method),
    ...ticketsData.map((tx) => tx.method)
  ]);

  const chartData = Array.from(methods).map((method) => {
    const eventTxs = eventsData.filter((tx) => tx.method === method);
    const ticketTxs = ticketsData.filter((tx) => tx.method === method);

    return {
      method: method || "Unknown",
      events: eventTxs.reduce((acc, tx) => acc + Number(tx.usdCost), 0),
      tickets: ticketTxs.reduce((acc, tx) => acc + Number(tx.usdCost), 0)
    };
  });

  return (
    <Card>
      <CardContent>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="method" />
              <YAxis tickFormatter={(value) => formatUsd(value)} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 rounded-lg shadow-lg border">
                        <p className="font-medium">{label}</p>
                        {payload.map((entry: any, index) => (
                          <p
                            key={index}
                            className="text-sm"
                            style={{ color: entry.color }}
                          >
                            {entry.name}: {formatUsd(entry.value)}
                          </p>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Bar dataKey="events" fill="#818cf8" name="Events" />
              <Bar dataKey="tickets" fill="#34d399" name="Tickets" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </CardContent>
    </Card>
  );
}