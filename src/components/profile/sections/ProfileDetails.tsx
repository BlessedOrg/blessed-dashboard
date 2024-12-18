"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Plus, Wallet } from "lucide-react";
import { useUserContext } from "@/store/UserContext";
import { Button } from "@/components/ui";
import { AddEmailModal } from "@/components/profile/modals/AddEmailModal";
import { useState } from "react";
import { VerifyEmailModal } from "@/components/profile/modals/VerifyEmailModal";
import { fetcherWithToken } from "@/requests/requests";
import { apiUrl } from "@/variables/variables";
import { toast } from "react-toastify";

export function ProfileDetails() {
  const { email, walletAddress, mutate } = useUserContext();

  const [showAddEmailModal, setShowAddEmailModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [emailToVerify, setEmailToVerify] = useState("");

  const handleAddEmail = async (email: string) => {
    try {
      const res = await fetcherWithToken(`${apiUrl}/private/developers/add-email`, {
        method: "POST",
        body: JSON.stringify({
          email
        })
      });
      if (res?.success) {
        toast("Successfully send verification code, please check your inbox!", { type: "success" });
        setEmailToVerify(email);
        setShowAddEmailModal(false);
        setShowVerifyModal(true);
      }
    } catch (e) {
      toast(e?.message || "Something went wrong", { type: "error" });
    }
  };

  const handleVerifyEmail = async (code: string) => {
    try {
      const res = await fetcherWithToken(`${apiUrl}/private/developers/verify-email`, {
        method: "POST",
        body: JSON.stringify({
          code
        })
      });
      if (res?.id) {
        await mutate();
        toast("Successfully added email address!", { type: "success" });
      }
    } catch (e) {
      toast(e?.message || "Something went wrong", { type: "error" });
    }
    setShowVerifyModal(false);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-gray-500 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500">Email Address</p>
            {email ? (
              <div className="flex items-center gap-2 mt-1">
                <p className="font-medium">{email}</p>
              </div>
            ) : (
              <div className="flex items-center gap-3 mt-1">
                <p className="text-sm text-gray-500 italic">No email address added</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddEmailModal(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Email
                </Button>
              </div>
            )}
          </div>
          <Badge>Verified</Badge>
        </div>

        <div className="flex items-start gap-3">
          <Wallet className="w-5 h-5 text-gray-500 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500">Wallet Address</p>
            <p className="mt-1 font-medium font-mono text-sm break-all">
              {walletAddress}
            </p>
          </div>
          <Badge variant="outline">Pre generated</Badge>
        </div>
      </CardContent>

      <AddEmailModal
        isOpen={showAddEmailModal}
        onClose={() => setShowAddEmailModal(false)}
        onSubmit={handleAddEmail}
      />

      <VerifyEmailModal
        isOpen={showVerifyModal}
        onClose={() => setShowVerifyModal(false)}
        email={emailToVerify}
        onVerify={handleVerifyEmail}
      />
    </Card>
  );
}