"use client";
import { LoadingDashboardSkeleton } from "@/components/common/LoadingDashboardSkeleton";
import { Button, Card } from "@/components/ui";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import { TextEdit } from "@/components/ui/text-edit";
import { toast } from "react-toastify";
import { updateAudience } from "@/app/api/audience";
import { fetcherWithToken } from "@/requests/requests";
import { apiUrl } from "@/variables/variables";
import { CardContent } from "@/components/ui/card";
import { AudienceManagementView } from "@/components/dashboards/audienceDashboard/audienceDashboardContent/test/audience/AudienceManagementView";

export const AudienceDashboardContent = ({
  appId,
  isLoading,
  mutateAudience,
  currentAudience
}: {
  currentAudience: IAudience;
  appId: string;
  isLoading: boolean;
  mutateAudience: any;
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [eligibleUsers, setEligibleUsers] = useState<{ userIds: string[]; externalAddresses: string[] }>(null);
  const users = currentAudience?.AudienceUsers || [];

  const onAudienceNameChange = async (name: string) => {
    try {
      const res = await updateAudience({ appId, audienceId: currentAudience.id, name });
      if (res?.id) {
        await mutateAudience();
        toast("Successfully updated", { type: "success" });
      }
    } catch (e) {
      toast(e?.message || "Something went wrong", { type: "error" });
    }
  };

  const handleEligibleUsersChange = (data: { userIds: string[]; externalAddresses: string[] }) => {
    setEligibleUsers(data);
  };

  const onSaveHandler = async () => {
    setIsSaving(true);
    try {
      const response = await fetcherWithToken(`${apiUrl}/private/apps/${appId}/audiences/${currentAudience.id}/assign`, {
        method: "POST",
        body: JSON.stringify(eligibleUsers)
      });
      if (response?.message) {
        await mutateAudience();
        toast(response?.message, { type: "success" });
      }
    } catch (e) {
      toast(e?.message || "Something went wrong", { type: "error" });
    }
    setIsSaving(false);
  };

  const isDraft = !currentAudience?.AudienceUsers?.length;
  const onAudienceDelete = async (id: string) => {};

  return (
    <div className="w-full">
      {!isLoading ? (
        <div className="flex flex-col gap-4">
          <div className="flex w-full justify-between gap-2">
            <Button
              variant="green"
              size="xl"
              onClick={onSaveHandler}
              isLoading={isSaving}
              disabled={!eligibleUsers?.userIds?.length && !eligibleUsers?.externalAddresses?.length}
              className={`${!isDraft ? "invisible" : ""}`}
            >
              Save
            </Button>
            <Button size="xl">
              <Trash color="red" />
            </Button>
          </div>
          <Card>
            <CardContent>
              <TextEdit defaultValue={currentAudience.name} handleSubmit={onAudienceNameChange} />
            </CardContent>
          </Card>
          {isDraft && (
            <div className="bg-yellow-500 px-5 py-2 rounded-3xl flex flex-col gap-4">
              <p className="font-semibold">Once u save audience, you can't change audience details</p>
            </div>
          )}
          {!isDraft && (
            <Card>
              <CardContent className="flex gap-2 items-center justify-between font-semibold">
                <p>Total audience</p>
                <p>{currentAudience?.AudienceUsers?.length || 0} users</p>
              </CardContent>
            </Card>
          )}
          {isDraft && <AudienceManagementView appId={appId} />}
          {!isDraft && (
            <Card>
              <CardContent className="flex flex-col gap-4">
                <p className="font-semibold">Audience users</p>

                <div className="flex flex-col gap-2">
                  {users.map((user) => {
                    return (
                      <div key={user.id} className="flex gap-2 items-center border-2 p-2 rounded-xl">
                        {!!user?.externalWalletAddress ? (
                          <p>External wallet address: {user.externalWalletAddress}</p>
                        ) : (
                          <div className="flex flex-col gap-1">
                            <p>{user.User.email}</p>
                            <p>{user.User.walletAddress}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <LoadingDashboardSkeleton />
      )}
    </div>
  );
};
