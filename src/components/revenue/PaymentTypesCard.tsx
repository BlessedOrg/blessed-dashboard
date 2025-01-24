"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useUserContext } from "@/store/UserContext";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { motion } from "framer-motion";
import { Coins, CreditCard, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

interface PaymentType {
  id: "CRYPTO" | "FIAT";
  label: string;
  icon: React.ReactNode;
  description: string;
}

const paymentTypes: PaymentType[] = [
  {
    id: "CRYPTO",
    label: "Crypto payments",
    icon: <Coins className="w-5 h-5 text-purple-500" />,
    description: "Enable distribution for cryptocurrency payments",
  },
  {
    id: "FIAT",
    label: "Fiat payments",
    icon: <CreditCard className="w-5 h-5 text-blue-500" />,
    description: "Enable distribution for traditional currency payments",
  },
];

interface PaymentTypesCardProps {
  enabledTypes: Set<string>;
  onToggle: (type: string) => void;
  disabled: boolean;
  appId: string;
}

export function PaymentTypesCard({
  enabledTypes,
  onToggle,
  disabled,
  appId,
}: PaymentTypesCardProps) {
  const { appsData } = useUserContext();
  const app = appsData?.apps.find(
    (app) => app.id === appId || app.slug === appId
  );

  const hasStripeCredentials = false; //TODO: remove hardcoded value
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4">Payment Types</h2>
        <div className="space-y-6">
          {paymentTypes.map((type, index) => {
            const disabledDueToStripeCredentials =
              !hasStripeCredentials && type.id === "FIAT";
            return (
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
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <div>
                        <Switch
                          id={type.id}
                          checked={enabledTypes.has(type.id)}
                          onCheckedChange={() => onToggle(type.id)}
                          disabled={disabled || disabledDueToStripeCredentials}
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      {disabledDueToStripeCredentials && (
                        <div className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow-lg border max-w-[200px]">
                          <p>
                            You need to add your Stripe credentials to enable
                            fiat payments
                          </p>
                          <Link
                            href={`/${app?.slug}?tab=payments`}
                            className="flex gap-2 items-center underline"
                          >
                            <LinkIcon /> Add credentials
                          </Link>
                        </div>
                      )}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {/* <Switch
                  id={type.id}
                  checked={enabledTypes.has(type.id)}
                  onCheckedChange={() => onToggle(type.id)}
                  disabled={disabled || disabledDueToStripeCredentials}
                /> */}
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
