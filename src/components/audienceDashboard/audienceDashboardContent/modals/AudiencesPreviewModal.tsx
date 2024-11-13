import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui";
import { Eye } from "lucide-react";
import React from "react";

export const AudiencesPreviewModal = ({ audience }: { audience: IAudience }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <Eye size={32} />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[530px]">
        <DialogHeader>
          <DialogTitle className="uppercase text-5xl text-center">Audiences</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto">
          {audience.AudienceUser.map((audience) => {
            return (
              <div key={audience.id} className="px-4 py-2 border-2 rounded-xl flex gap-4 items-center justify-between">
                <div className="flex flex-col gap-1">
                  {!audience?.externalWalletAddress && (
                    <>
                      <p className="font-semibold">Email {audience?.User?.email}</p>
                    </>
                  )}
                  <p className="text-sm">Created at {new Date(audience.createdAt).toLocaleDateString()}</p>
                  {!!audience?.externalWalletAddress && <p className="text-xs">{audience?.externalWalletAddress}</p>}
                </div>
                {!!audience?.externalWalletAddress && <p className="text-amber-700 text-sm font-bold">EXTERNAL</p>}
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};
