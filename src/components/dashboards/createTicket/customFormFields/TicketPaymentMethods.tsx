import { Label } from "@/components/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { Coins, CreditCard } from "lucide-react";
import { Controller } from 'react-hook-form';

const paymentTypes = [
  {
    id: "crypto",
    label: "Crypto payments",
    icon: <Coins className="w-5 h-5 text-purple-500" />,
    description: "Enable payment for cryptocurrency payments",
  },
  {
    id: "fiat",
    label: "Fiat payments",
    icon: <CreditCard className="w-5 h-5 text-blue-500" />,
    description: "Enable payment for traditional currency payments",
  },
];

export const TicketPaymentMethods = ({ form }) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
        </CardHeader>
        <CardContent>
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
                <Controller
                  control={form.control}
									defaultValue={false}
                  name={`paymentMethods.${type.id}`}
                  render={({ field }) => <Switch id={type.id} {...field} checked={field.value} onCheckedChange={field.onChange} />}
                />
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
