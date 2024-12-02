"use client";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Form, Input } from "@/components/ui";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { createCampaign } from "@/app/api/campaigns";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters")
});
export const CreateCampaignModal = ({
  appId,
  onSuccess,
  mode = "yellow"
}: {
  appId: string;
  onSuccess: (slug?: string) => void;
  mode?: "yellow" | "green";
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  async function onSubmit(values) {
    setIsLoading(true);
    try {
      const res = await createCampaign({ ...values, appId });

      if (res?.id) {
        onSuccess(res.slug);
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
        <Button variant={mode} className="w-full text-black">
          Add new campaign
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[330px]" customCloseHandler={() => setIsOpen(false)}>
        <DialogHeader>
          <DialogTitle asChild className="uppercase text-5xl text-center">
            <h2>Create new Campaign</h2>
          </DialogTitle>
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
