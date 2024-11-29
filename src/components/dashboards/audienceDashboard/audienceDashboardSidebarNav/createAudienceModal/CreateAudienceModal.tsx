"use client";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Form, Input } from "@/components/ui";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { createAudience } from "@/app/api/audience";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters")
});
export const CreateAudienceModal = ({
  appId,
  onSuccess,
  mode = "yellow"
}: {
  mode?: "yellow" | "green";
  appId: string;
  onSuccess: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "" }
  });

  async function onSubmit(values) {
    setIsLoading(true);
    try {
      const res = await createAudience({ ...values, appId });

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
        <Button variant={mode} className="w-full text-black">
          Add new audience
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[330px]" customCloseHandler={() => setIsOpen(false)}>
        <DialogHeader>
          <DialogTitle className="uppercase text-5xl text-center">Create new Audience</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Audience name</FormLabel>
                  <FormControl>
                    <Input placeholder="Audience A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size="base" type="submit" variant="green" className="self-center" isLoading={isLoading}>
              Create audience
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
