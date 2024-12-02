"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address")
});

type FormData = z.infer<typeof formSchema>;

interface AddBouncerFormProps {
  onSubmit: (email: string) => Promise<void>;
}

export function AddBouncerForm({ onSubmit }: AddBouncerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ""
    }
  });

  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data.email);
      form.reset();
    } catch (error) {
      console.error("Error adding bouncer:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Bouncer Email</Label>
        <div className="flex gap-2 items-center">
          <div className="flex-1">
            <Input
              id="email"
              type="email"
              placeholder="Enter bouncer's email address"
              {...form.register("email")}
              className={form.formState.errors.email ? "border-red-500" : ""}
              disabled={isSubmitting}
            />
            {form.formState.errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="green"
          >
            {isSubmitting ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center"
              >
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Adding...
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add Bouncer
              </motion.div>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}