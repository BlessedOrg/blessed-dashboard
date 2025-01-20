"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, UserPlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AddPersonFormData, RevenueEntry } from "./types";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  feePercentage: z.number()
    .min(0.01, "Percentage must be greater than 0")
    .max(100, "Percentage cannot exceed 100")
});

interface AddPersonModalProps {
  onSubmit: (entry: RevenueEntry) => void;
  currentTotal: number;
}

export function AddPersonModal({ onSubmit, currentTotal }: AddPersonModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AddPersonFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      feePercentage: 0
    }
  });


  const handleSubmit = async (data: AddPersonFormData) => {
    if (currentTotal + data.feePercentage > 100) {
      form.setError("feePercentage", {
        type: "manual",
        message: "Total percentage cannot exceed 100%"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSubmit({
        id: Math.random().toString(36).substr(2, 9),
        ...data
      });
      
      setIsOpen(false);
      form.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="bg-green-600 hover:bg-green-700"
        disabled={currentTotal >= 100}
      >
        <UserPlus className="w-4 h-4 mr-2" />
        Add Person
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Revenue Distribution</DialogTitle>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  className={form.formState.errors.email ? "border-red-500" : ""}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="percentage">Revenue Percentage</Label>
                <div className="relative">
                  <Input
                    id="percentage"
                    type="number"
                    step="0.01"
                    {...form.register("feePercentage", { valueAsNumber: true })}
                    className={form.formState.errors.feePercentage ? "border-red-500 pr-8" : "pr-8"}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    %
                  </span>
                </div>
                {form.formState.errors.feePercentage && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.feePercentage.message}
                  </p>
                )}
                <p className="text-sm text-gray-500">
                  Remaining: {(100 - currentTotal).toFixed(2)}%
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? (
                  <motion.div className="flex items-center">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding...
                  </motion.div>
                ) : (
                  <motion.div className="flex items-center">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Person
                  </motion.div>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}