import { CreateEventButton } from "@/components/common/CreateEventButton";
import { AppEventsTab } from "@/components/dashboards/appDashboard/tabs/events/AppEventsTab";
import { Card } from "@/components/ui";
import { CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Calendar1 } from "lucide-react";

export const AppOverview = ({ appId }) => {
  return (
    <div className="w-full flex-col flex gap-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="bg-gradient-to-l from-yellow-500 to-green-500 border-none">
          <CardContent className="flex flex-col gap-6 p-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <Calendar1 className="w-6 h-6" />
                  <h3 className="text-2xl font-bold text-gray-900">Create Your Event</h3>
                </div>
                <p className="text-gray-600">Set up your event with all the essential details.</p>
              </div>
              <CreateEventButton appId={appId} />
          </CardContent>
        </Card>
      </motion.div>

      <AppEventsTab appId={appId} items={3} />
    </div>
  );
};
