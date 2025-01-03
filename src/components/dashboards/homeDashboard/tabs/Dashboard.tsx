import { AppsView } from "@/components/dashboards/homeDashboard/views/AppsView";
import { CreateAppModal } from '@/components/modals/CreateAppModal';
import { motion } from "framer-motion";
import { AppWindow } from "lucide-react";
import { Card, CardContent } from "../../../ui/card";

export const Dashboard = () => {
  return (
    <div className="w-full flex flex-col gap-10 pb-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-none">
          <CardContent className="flex flex-col gap-6 p-6">
						<div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <AppWindow className="w-6 h-6 text-purple-600" />
                <h3 className="text-2xl font-bold text-gray-900">Create Your App</h3>
              </div>
              <p className="text-gray-600">Start building your app with the essential setup</p>
            </div>
						<CreateAppModal />
          </CardContent>
        </Card>
      </motion.div>
      <AppsView />
    </div>
  );
};
