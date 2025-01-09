import { Label } from "@/components/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { Coins, CreditCard } from "lucide-react";
import { useFieldArray } from 'react-hook-form';

const paymentTypes = [
  {
    id: "CRYPTO",
    label: "Crypto payments",
    icon: <Coins className="w-5 h-5 text-purple-500" />,
    description: "Enable payment for cryptocurrency payments",
  },
  {
    id: "FIAT",
    label: "Fiat payments",
    icon: <CreditCard className="w-5 h-5 text-blue-500" />,
    description: "Enable payment for traditional currency payments",
  },
];

export const TicketPaymentMethods = ({ form }) => {

	const paymentMethods = form.watch("paymentMethods") || [];
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "paymentMethods",
	});
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
                <Switch id={type.id} checked={paymentMethods.includes(type.id)} onCheckedChange={() => {
                  if(paymentMethods.includes(type.id)) {
                    remove(paymentMethods.indexOf(type.id))
                  } else {
                    append(type.id)
                  }
                }} />
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
