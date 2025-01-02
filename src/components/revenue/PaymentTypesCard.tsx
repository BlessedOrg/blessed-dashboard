"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { Coins, CreditCard } from "lucide-react";

interface PaymentType {
  id: "crypto" | "fiat";
  label: string;
  icon: React.ReactNode;
  description: string;
}

const paymentTypes: PaymentType[] = [
  {
    id: "crypto",
    label: "Crypto payments",
    icon: <Coins className="w-5 h-5 text-purple-500" />,
    description: "Enable distribution for cryptocurrency payments"
  },
  {
    id: "fiat",
    label: "Fiat payments",
    icon: <CreditCard className="w-5 h-5 text-blue-500" />,
    description: "Enable distribution for traditional currency payments"
  }
];

interface PaymentTypesCardProps {
  enabledTypes: Set<string>;
  onToggle: (type: string) => void;
}

export function PaymentTypesCard({ enabledTypes, onToggle }: PaymentTypesCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4">Payment Types</h2>
        <div className="space-y-6">
          {paymentTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-start gap-3">
                {type.icon}
                <div>
                  <Label htmlFor={type.id} className="text-base font-medium">
                    {type.label}
                  </Label>
                  <p className="text-sm text-gray-500">{type.description}</p>
                </div>
              </div>
              <Switch
                id={type.id}
                checked={enabledTypes.has(type.id)}
                onCheckedChange={() => onToggle(type.id)}
              />
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}