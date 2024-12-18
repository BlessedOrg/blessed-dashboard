"use client";

import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";
import { motion } from "framer-motion";
import { ProfileHeader } from "./sections/ProfileHeader";
import { ProfileDetails } from "./sections/ProfileDetails";
import { DeleteAccountSection } from "./sections/DeleteAccountSection";

export function ProfileView() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-none mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <User className="w-6 h-6 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
            </div>
            <p className="text-gray-600">
              Manage your account settings and preferences
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <div className="space-y-6">
        <ProfileHeader />
        <ProfileDetails />
        <DeleteAccountSection />
      </div>
    </div>
  );
}