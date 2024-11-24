"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TicketPreview } from "@/components/modals/tickets/TicketPreview";
import { createTicket } from "@/app/api/events";
import { toast } from "react-toastify";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUploader } from "@/components/ui/image-uploader";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  initialSupply: z.coerce
    .number()
    .min(1, "Initial capacity must be at least 1"),
  maxSupply: z.coerce
    .number()
    .min(1, "Maximum capacity must be at least 1"),
  price: z.coerce
    .number()
    .min(0, "Price must be greater than or equal to 0"),
  imageUrl: z.string().url("Please enter a valid URL").optional(),
  logoFile: z.any().optional()
}).refine(
  (data) => data.maxSupply >= data.initialSupply,
  {
    message: "Maximum capacity must be greater than or equal to initial capacity",
    path: ["maxCapacity"]
  }
);

type FormData = z.infer<typeof formSchema>;

interface CreateTicketModalProps {
  appId: string;
  eventId: string;
  mutateTickets: any;
}

export function CreateTicketModal({ appId, eventId, mutateTickets }: CreateTicketModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [imageTab, setImageTab] = useState("url");
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Amazing Event 2024",
      imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2940",
      initialSupply: 100,
      maxSupply: 100,
      price: 0
    }
  });

  const onSubmit = async (data: any) => {
    const { logoFile, ...rest } = data;
    setIsLoading(true);
    try {
      const res = await createTicket(appId, eventId, { ...rest, transferable: true, whitelistOnly: false });
      if (res?.success) {
        await mutateTickets();
        toast("Successfully created ticket!", { type: "success" });
        setIsOpen(false);
      }
    } catch (e) {
      console.log(e);
      toast(e?.message || "Something went wrong!", { type: "error" });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Ticket</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Create Event Ticket</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Ticket Name</Label>
              <Input
                id="name"
                {...form.register("name")}
                placeholder="e.g., VIP Access Pass"
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                {...form.register("description")}
                placeholder="Brief description of the ticket"
              />
            </div>

            <div className="space-y-4">
              <Label>Ticket Image</Label>
              <Tabs value={imageTab} onValueChange={setImageTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">Upload Image</TabsTrigger>
                  <TabsTrigger value="url">Image URL</TabsTrigger>
                </TabsList>
                <TabsContent value="upload" className="mt-4">
                  <ImageUploader
                    setValue={form.setValue}
                    defaultValue={form.watch("imageUrl")}
                    name="imageUrl"
                  />
                </TabsContent>
                <TabsContent value="url" className="mt-4">
                  <div className="space-y-2">
                    <div className="flex">
                      <Input
                        placeholder="https://..."
                        {...form.register("imageUrl")}
                        className="rounded-r-none"
                      />
                    </div>
                    {form.formState.errors.imageUrl && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.imageUrl.message}
                      </p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="initialCapacity">Initial Capacity</Label>
                <Input
                  id="initialCapacity"
                  type="number"
                  {...form.register("initialSupply", { valueAsNumber: true })}
                />
                {form.formState.errors.initialSupply && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.initialSupply.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxCapacity">Maximum Capacity</Label>
                <Input
                  id="maxCapacity"
                  type="number"
                  {...form.register("maxSupply", { valueAsNumber: true })}
                />
                {form.formState.errors.maxSupply && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.maxSupply.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (USD)</Label>
              <Input
                id="price"
                type="number"
                {...form.register("price", { valueAsNumber: true })}
              />
              {form.formState.errors.price && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.price.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-400"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Ticket...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Create Ticket
                </>
              )}
            </Button>
          </form>

          <div className="lg:pl-6 border-t lg:border-t-0 lg:border-l pt-6 lg:pt-0">
            <div className="text-sm font-medium text-gray-500 mb-4">Preview</div>
            <TicketPreview
              name={form.watch("name") || "Ticket Name"}
              description={form.watch("description")}
              price={form.watch("price")}
              imageUrl={form.watch("imageUrl")}
              initialCapacity={form.watch("initialSupply")}
              maxCapacity={form.watch("maxSupply")}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}