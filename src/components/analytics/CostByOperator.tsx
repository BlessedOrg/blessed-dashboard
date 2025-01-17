"use client";

import { Card, CardContent } from "@/components/ui/card";
import { formatUsd } from "@/utils/format";
import { motion } from "framer-motion";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = {
  irys: "#818cf8",
  biconomy: "#34d399",
  operator: "#f43f5e"
};

interface CostByOperatorProps {
  data: Record<string, CostByOperator>;
}

export function CostByOperator({ data }: CostByOperatorProps) {
  const chartData = Object?.entries(data || [])?.map(([name, data]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value: data.usdCost,
    label: data.label,
    color: COLORS[name as keyof typeof COLORS]
  }));

  const totalCost = chartData?.reduce((acc, item) => acc + item.value, 0) || 0;

  return (
    <Card>
      <CardContent>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="h-[220px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-2 rounded-lg shadow-lg border">
                        <p className="font-medium">{data.name}</p>
                        <p className="text-sm text-gray-500">
                          {formatUsd(data.value)}
                        </p>
                        <p className="text-xs text-gray-400">
                          {((data.value / totalCost) * 100).toFixed(1)}% of total
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <div className="grid grid-cols-3 gap-2 mt-4">
          {chartData.map((item) => (
            <div
              key={item.name}
              className="flex flex-col items-center text-center p-2 rounded-lg bg-gray-50"
            >
              <div
                className="w-3 h-3 rounded-full mb-1"
                style={{ backgroundColor: item.color }}
              />
              <p className="text-xs font-medium">{item.label}</p>
              <p className="text-sm">{formatUsd(item.value)}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}