"use client";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Form, Input } from "@/components/ui";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { createCampaign } from "@/api/campaigns";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
});
export const CreateCampaignModal = ({
  appId,
  onSuccess,
  mode = "yellow",
}: {
  appId: string;
  onSuccess: () => void;
  mode?: "yellow" | "green";
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values) {
    setIsLoading(true);
    try {
      const res = await createCampaign({ ...values, appId });

      if (res?.id) {
        onSuccess();
        setIsOpen(false);
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  }

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild onClick={() => setIsOpen((prev) => !prev)}>
        <Button variant={mode} size="xl" className="w-full">
          Add new campaign
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[330px]" customCloseHandler={() => setIsOpen(false)}>
        <DialogHeader>
          <DialogTitle className="uppercase text-5xl text-center">Create new Campaign</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campaign name</FormLabel>
                  <FormControl>
                    <Input placeholder="Campaign A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size="base" type="submit" variant="green" className="self-center" isLoading={isLoading}>
              Create campaign
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
