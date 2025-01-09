"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Tag } from "lucide-react";
import { useState } from "react";
import { UseFieldArrayAppend, useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  type: z.enum(["percentage", "fixed"]),
  value: z.number()
    .min(0.01, "Value must be greater than 0")
    .refine(val => val <= 100, "Percentage cannot exceed 100%"),
  startDate: z.string(),
  endDate: z.string(),
});

interface AddDiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: UseFieldArrayAppend<any, "discounts">;
}

export function AddDiscountModal({
  isOpen,
  onClose,
  onAdd,
}: AddDiscountModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "percentage",
      value: 10,
      startDate: "",
      endDate: "",
    },
  });

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const discount = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      };
      onAdd(discount);
      onClose();
      form.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Discount</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              placeholder="e.g., Early Bird Discount"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Type</Label>
              <Select
                onValueChange={val => form.setValue("type", val as "percentage" | "fixed")}
                defaultValue={form.getValues("type")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage</SelectItem>
                  <SelectItem value="fixed">Fixed Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Value</Label>
              <div className="relative">
                <Input
                  type="number"
                  step="0.01"
                  {...form.register("value", { valueAsNumber: true })}
                  className="pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  {form.watch("type") === "percentage" ? "%" : "$"}
                </span>
              </div>
              {form.formState.errors.value && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.value.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input
                type="datetime-local"
                {...form.register("startDate")}
              />
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <Input
                type="datetime-local"
                {...form.register("endDate")}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-pink-600 hover:bg-pink-700 text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Tag className="w-4 h-4 mr-2" />
                  Create Discount
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}