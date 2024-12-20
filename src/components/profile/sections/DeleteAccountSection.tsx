"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { DeleteAccountModal } from "../modals/DeleteAccountModal";
import { fetcherWithToken } from "@/requests/requests";
import { apiUrl } from "@/variables/variables";
import { toast } from "react-toastify";

export function DeleteAccountSection() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      const data = await fetcherWithToken(`${apiUrl}/private/developers/account`, {
        method: "DELETE"
      });
      if (data?.deleted) {
        toast("Account deleted, you will be redirected", { type: "success" });
        window.location.reload();
      }
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting account:", error);
      toast(error?.message || "Error deleting account", { type: "error" });
    }
  };

  return (
    <>
      <Card className="border-red-100">
        <CardHeader>
          <CardTitle className="text-red-600 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="font-medium">Delete Account</p>
              <p className="text-sm text-gray-500">
                Permanently delete your account and all associated data
              </p>
            </div>
            <Button
              variant="destructive"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>

      <DeleteAccountModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
      />
    </>
  );
}