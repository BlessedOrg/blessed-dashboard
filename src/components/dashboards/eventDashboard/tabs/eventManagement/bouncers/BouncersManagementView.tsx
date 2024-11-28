"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { AddBouncerForm } from "./AddBouncerForm";
import { BouncersList } from "./BouncersList";
import { LoadingBouncersSkeleton } from "./LoadingBouncersSkeleton";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import { createEventBouncer } from "@/app/api/events";
import { ViewEnterAnimation } from "@/components/ui/view-enter-animation";

interface BouncersManagementViewProps {
  appId: string;
  eventId: string;
  mutateEventData: () => void;
  bouncers: IEventBouncer[];
  isLoading: boolean;
}

export function BouncersManagementView({ appId, eventId, bouncers, mutateEventData, isLoading }: BouncersManagementViewProps) {
  const handleAddBouncer = async (email: string) => {
    try {
      const res = await createEventBouncer(appId, eventId, { email });
      if (res?.id) {
        mutateEventData();
        toast("Bouncer added successfully", { type: "success" });
      }
    } catch (e) {
      toast(e?.message || "Error adding bouncer", { type: "error" });
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-5xl">
      <ViewEnterAnimation>
        <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 border-none mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-6 h-6 text-indigo-600" />
              <h1 className="text-4xl font-bold text-gray-900">Event Bouncers</h1>
            </div>
            <p className="text-gray-600">
              Manage access control for your event by adding and managing bouncers
            </p>
          </CardContent>
        </Card>
      </ViewEnterAnimation>

      <div className="space-y-6">
        <ViewEnterAnimation duration={0.6}>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Add New Bouncer</h3>
              <AddBouncerForm onSubmit={handleAddBouncer} />
            </CardContent>
          </Card>
        </ViewEnterAnimation>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LoadingBouncersSkeleton />
            </motion.div>
          ) : !!bouncers?.length ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <BouncersList bouncers={bouncers} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}