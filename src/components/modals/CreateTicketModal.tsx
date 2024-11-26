"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ImageUploader } from "@/components/ui/image-uploader";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "@/components/common/FormFields";
import { createTicket } from "@/app/api/events";
import { LoadingModal } from "@/components/ui/loading-modal";
import { toast } from "react-toastify";

const formFields = [
  { id: "name", label: "Name", type: "text", required: true, placeholder: "VIP TICKET" },
  { id: "initialSupply", label: "Initial Capacity", type: "number", required: true },
  { id: "maxSupply", label: "Max Capacity", type: "number", required: true },
  { id: "price", label: "Price", type: "number", required: false },
  { id: "symbol", label: "Symbol", type: "text", required: true, placeholder: "VIP" }
];
const ticketSchema = z.object({
  name: z.string().min(1, "Name is required"),
  symbol: z.string().min(2, "Symbol must be at least 2 characters").max(5, "Symbol cannot exceed 5 characters"),
  initialSupply: z.coerce.number().min(1, "Initial supply must be at least 1"),
  maxSupply: z.coerce.number().min(1, "Max supply must be at least 1"),
  price: z.coerce.number().min(1, "Price must be greater than or equal to 0"),
  imageUrl: z.string().optional()
}).refine(
  (data) => data.maxSupply >= data.initialSupply,
  {
    message: "Max capacity must be greater than or equal to initial capacity",
    path: ["maxSupply"]
  }
);
export default function CreateTicketModal({ appId, eventId, mutateTickets }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { setValue, register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      initialSupply: 100,
      maxSupply: 100,
      price: 0
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await createTicket(appId, eventId, { ...data, transferable: true, whitelistOnly: false });
      if (res?.success) {
        await mutateTickets();
        toast("Successfully created ticket!", { type: "success" });
        setIsOpen(false);
      }
    } catch (e) {
      console.log(e);
      toast(e?.message || "Something went wrong!", { type: "error" });
    }
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Ticket</Button>
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[425px] ${isLoading ? "opacity-0" : ""}`}>
        <DialogHeader>
          <DialogTitle>Create New Ticket</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2 w-full">
              <Label htmlFor="cover-image">Cover Image</Label>
              <div className="w-full">
                <ImageUploader setValue={setValue} defaultValue={null} name={"imageUrl"} />
              </div>
            </div>
            {formFields.map(field => {
              return <FormField isDisabled={isLoading} label={field.label} type={field.type} register={register} id={field.id} placeholder={field.placeholder} isInvalid={!!errors?.[field.id]} errorMessage={errors?.[field.id]?.message} />;
            })}
          </div>
          <div className="flex justify-end">
            <Button type="submit" variant="green" isLoading={isLoading}>Create Ticket</Button>
          </div>
        </form>
        <LoadingModal isOpen={isLoading} title={"Creating ticket..."} />
      </DialogContent>
    </Dialog>
  );
}