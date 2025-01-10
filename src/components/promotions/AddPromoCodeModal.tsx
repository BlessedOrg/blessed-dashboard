"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Tag } from "lucide-react";
import { useState } from "react";
import { UseFieldArrayAppend, useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  code: z.string().min(3, "Code must be at least 3 characters"),
  discountPercentage: z.number()
    .min(1, "Discount must be at least 1%")
    .max(100, "Discount cannot exceed 100%"),
  maxUses: z.number()
    .min(1, "Maximum uses must be at least 1"),
  expiresAt: z.string()
    .refine(val => new Date(val) > new Date(), "Expiry date must be in the future"),
});

interface AddPromoCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: UseFieldArrayAppend<any, "promoCodes">;
}

export function AddPromoCodeModal({
  isOpen,
  onClose,
  onAdd,
}: AddPromoCodeModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      discountPercentage: 10,
      maxUses: 100,
      expiresAt: "",
    },
  });

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const promoCode = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        usedCount: 0,
        expiresAt: new Date(data.expiresAt),
      };
      onAdd(promoCode);
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
          <DialogTitle>Create Promo Code</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Code</Label>
            <Input
              placeholder="e.g., SUMMER2024"
              {...form.register("code")}
              className="uppercase"
            />
            {form.formState.errors.code && (
              <p className="text-sm text-red-500">
                {form.formState.errors.code.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Discount Percentage</Label>
            <div className="relative">
              <Input
                type="number"
                {...form.register("discountPercentage", { valueAsNumber: true })}
                className="pr-8"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                %
              </span>
            </div>
            {form.formState.errors.discountPercentage && (
              <p className="text-sm text-red-500">
                {form.formState.errors.discountPercentage.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Maximum Uses</Label>
            <Input
              type="number"
              {...form.register("maxUses", { valueAsNumber: true })}
            />
            {form.formState.errors.maxUses && (
              <p className="text-sm text-red-500">
                {form.formState.errors.maxUses.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Expires At</Label>
            <Input
              type="datetime-local"
              {...form.register("expiresAt")}
            />
            {form.formState.errors.expiresAt && (
              <p className="text-sm text-red-500">
                {form.formState.errors.expiresAt.message}
              </p>
            )}
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Tag className="w-4 h-4 mr-2" />
                  Create Code
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}