"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { createApplication } from "@/src/api/createApplication";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/src/store/UserContext";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  description: z.string().optional(),
});
export const CreateAppModal = ({
  variant = "outline",
  label = "Create app",
  size = "lg",
}: {
  variant?: "green" | "outline";
  label?: string;
  size?: "default" | "sm" | "lg" | "icon" | "xl";
}) => {
  const {
    appsData: { mutate },
  } = useUserContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values) {
    setIsLoading(true);
    try {
      const res = await createApplication(values);

      if (res?.id) {
        mutate();
        router.push(`/${res.id}`);
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant} className="rounded-full w-fit" size={size}>
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create App</DialogTitle>
          <DialogDescription>Quickly create application and get API key to start.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Modular summit" {...field} />
                  </FormControl>
                  <FormDescription>This is your app name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Lorem ipsum dolor sit amet" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="self-end" isLoading={isLoading}>
              Create application
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
