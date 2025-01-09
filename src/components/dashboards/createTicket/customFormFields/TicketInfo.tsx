import { Card } from "@/components/ui";
import { ImageUploader } from "@/components/ui/image-uploader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export const TicketInfo = ({ form, defaultValues, setValue }) => {
  const [imageTab, setImageTab] = useState("upload");

  const onImageTabChange = (value: string) => {
    setImageTab(value);
    form.setValue("imageUrl", "");
  };

  return (
    <Card className="p-6 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex gap-4 items-center">
          <div className="space-y-2 w-full">
            <Label htmlFor="name">Ticket Name</Label>
            <Input id="name" {...form.register("name")} placeholder="e.g., VIP Access Pass" />
          </div>
          <div className="space-y-2 w-[25%]">
            <Label htmlFor="symbol">Symbol</Label>
            <Input id="symbol" {...form.register("symbol")} placeholder="e.g., VIP" />
          </div>
        </div>
        {form.formState.errors.name && <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>}
        {form.formState.errors.symbol && <p className="text-sm text-red-500">{form.formState.errors.symbol.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input id="description" {...form.register("description")} placeholder="Brief description of the ticket" />
      </div>

      <div className="space-y-4">
        <Label>Ticket Image</Label>
        <Tabs value={imageTab} onValueChange={onImageTabChange}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload Image</TabsTrigger>
            <TabsTrigger value="url">Image URL</TabsTrigger>
          </TabsList>
          <TabsContent value="upload" className="mt-4">
            <ImageUploader setValue={form.setValue} defaultValue={form.watch("imageUrl")} name="imageUrl" />
          </TabsContent>
          <TabsContent value="url" className="mt-4">
            <div className="space-y-2">
              <div className="flex">
                <Input placeholder="https://..." {...form.register("imageUrl")} className="rounded-r-none" />
              </div>
              {form.formState.errors.imageUrl && <p className="text-sm text-red-500">{form.formState.errors.imageUrl.message}</p>}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};
