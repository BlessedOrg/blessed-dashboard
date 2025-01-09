"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useState } from "react";
import { UseFieldArrayAppend } from "react-hook-form";
import { AddDiscountModal } from "./AddDiscountModal";
import { DiscountsList } from "./DiscountsList";
import { Discount } from "./types";
interface DiscountsCardProps {
  discounts: Discount[];
  onAdd: UseFieldArrayAppend<any, "discounts">;
  onDelete: (id: string) => void;
}

export function DiscountsCard({ discounts, onAdd, onDelete }: DiscountsCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold">Discounts</h2>
            <p className="text-sm text-gray-500">
              Set up automatic discounts for tickets
            </p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-pink-600 hover:bg-pink-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Discount
          </Button>
        </div>

        <DiscountsList discounts={discounts} onDelete={onDelete} />

        <AddDiscountModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={onAdd}
        />
      </CardContent>
    </Card>
  );
}