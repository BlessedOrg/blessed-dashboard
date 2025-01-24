import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import { StripeCredentialsCard } from './StripeCredentialsCard';

export const PaymentsSettingsTab = () => {
  return (
    <div className="w-full flex-col flex gap-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-none">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Settings className="w-6 h-6 text-yellow-600" />
              <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
            </div>
            <p className="text-gray-600">Setup payment providers credentials</p>
          </CardContent>
        </Card>
      </motion.div>
      <StripeCredentialsCard onSave={async (data) => {
        console.log(data);
      }} />
    </div>
  );
};
