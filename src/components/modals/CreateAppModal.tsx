"use client";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createApplication } from "@/app/api/applications";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/store/UserContext";
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Form, Input, Textarea } from "@/components/ui";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  description: z.string().optional()
});
export const CreateAppModal = ({
  variant = "outline",
  label = "Create app"
}: {
  variant?: "green" | "yellow" | "outline";
  label?: string;
}) => {
  const {
    appsData: { mutate }
  } = useUserContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", description: "" }
  });

  async function onSubmit(values) {
    setIsLoading(true);
    try {
      const res = await createApplication(values);

      if (res?.id) {
        mutate();
        router.push(`/${res.id}?tab=api-key`);
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant}>{label}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[330px]">
        <DialogHeader>
          <DialogTitle asChild className="uppercase text-5xl text-center">
            <h2>Create your App</h2>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>App name</FormLabel>
                  <FormControl>
                    <Input placeholder="Modular summit" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Description <span className="text-gray-500">(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Welcome to Summer Pulse Festival 2024, a three-day immersive music and arts extravaganza set in beautiful open fields."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size="base" type="submit" variant="green" className="self-center" isLoading={isLoading}>
              Create application
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
