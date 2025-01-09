"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AddPromoCodeModal } from "./AddPromoCodeModal";
import { PromoCodesList } from "./PromoCodesList";
import { PromoCode } from "./types";

interface PromoCodesCardProps {
  promoCodes: any[];
  onAdd: (promoCode: PromoCode) => void;
  onDelete: (id: string) => void;
}

export function PromoCodesCard({ promoCodes, onAdd, onDelete }: PromoCodesCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold">Promo Codes</h2>
            <p className="text-sm text-gray-500">
              Create and manage promotional codes
            </p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Code
          </Button>
        </div>

        <PromoCodesList promoCodes={promoCodes} onDelete={onDelete} />

        <AddPromoCodeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={onAdd}
        />
      </CardContent>
    </Card>
  );
}