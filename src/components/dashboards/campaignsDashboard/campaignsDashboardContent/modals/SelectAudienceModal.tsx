"use client";
import React, { useEffect, useState } from "react";
import { Button, Checkbox, Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui";
import { PlusCircle } from "lucide-react";
import useSWR from "swr";
import { apiUrl } from "@/variables/variables";
import { fetcherWithToken } from "@/requests/requests";
import { isArray } from "lodash-es";
import { LoadingDashboardSkeleton } from "@/components/common/LoadingDashboardSkeleton";
import { toast } from "react-toastify";
import Link from "next/link";

export const SelectAudienceModal = ({
  appId,
  defaultValues,
  customTriggerButton,
  onHandleSubmit
}: {
  appId: string;
  customTriggerButton?: React.ReactNode;
  defaultValues: string[];
  onHandleSubmit: (selected, toDelete) => any
}) => {
  const { data: audienceData, isLoading } = useSWR(`${apiUrl}/private/apps/${appId}/audiences`, fetcherWithToken);
  const audiences = (isArray(audienceData) ? audienceData : []) as IAudience[];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAudience, setSelectedAudience] = useState(defaultValues);
  const [audiencesToRemove, setAudiencesToRemove] = useState<string[]>([]);

  const onSelectAudience = (audience: string) => {
    const isDefault = defaultValues.includes(audience);
    const isSelected = selectedAudience.includes(audience);

    setSelectedAudience((prev) => {
      const newSet = new Set(prev);
      isSelected ? newSet.delete(audience) : newSet.add(audience);
      return Array.from(newSet);
    });

    setAudiencesToRemove((prev) => {
      const newSet = new Set(prev);
      if (isDefault) {
        isSelected ? newSet.add(audience) : newSet.delete(audience);
      } else {
        newSet.delete(audience);
      }
      return Array.from(newSet);
    });
  };
  const onSubmit = async () => {
    try {
      await onHandleSubmit(selectedAudience, audiencesToRemove);
      setIsOpen(false);
    } catch (e) {
      toast(e?.message || "Something went wrong", { type: "error" });
    }
  };

  useEffect(() => {
    setSelectedAudience(defaultValues);
  }, [defaultValues]);

  const filteredAudiences = audiences?.filter((audience) => !!audience.AudienceUsers.length);
  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild onClick={() => setIsOpen((prev) => !prev)}>
        {customTriggerButton ? (
          customTriggerButton
        ) : (
          <button>
            <PlusCircle size={32} />
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-[530px]" customCloseHandler={() => setIsOpen(false)}>
        <DialogHeader>
          <DialogTitle className="uppercase text-5xl text-center">Select audience</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto">
          {isLoading && <LoadingDashboardSkeleton />}
          {filteredAudiences.map((audience) => {
            return (
              <div
                key={audience.id}
                className="cursor-pointer p-2 border-2 rounded-xl flex gap-4 items-center justify-between"
                onClick={() => onSelectAudience(audience.id)}
              >
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">{audience.name}</p>
                  <p className="font-medium">{audience.AudienceUsers.length} users</p>
                  <p className="text-sm">Created at {new Date(audience.createdAt).toLocaleDateString()}</p>
                </div>
                <Checkbox checked={selectedAudience.some((i) => i === audience.id)} />
              </div>
            );
          })}
          {!filteredAudiences?.length && (
            <div className="flex flex-col gap-4 items-center">
              <p className="text-center">No audiences found</p>
              <Link href={`/${appId}/audience`} className="underline text-gray-500">
                Create one!
              </Link>
            </div>
          )}
        </div>
        <DialogFooter className="flex gap-2 items-center justify-end">
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          {!!filteredAudiences?.length && (
            <Button variant="green" onClick={onSubmit}>
              Save
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
