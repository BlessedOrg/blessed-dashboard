"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Tag } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import { DiscountsCard } from "./DiscountsCard";
import { PromoCodesCard } from "./PromoCodesCard";
import { Discount, PromoCode } from "./types";

// Define the form schema
interface PromotionsFormData {
  promoCodes: PromoCode[];
  discounts: Discount[];
}

export function PromotionsView({form}) {
  const { fields: promoCodes, append: appendPromoCode, remove: removePromoCode } = 
    useFieldArray({
      control: form.control,
      name: "promoCodes",
    });

  const { fields: discounts, append: appendDiscount, remove: removeDiscount } = 
    useFieldArray({
      control: form.control,
      name: "discounts",
    });


  return (
    <div className="container pb-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-none mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Tag className="w-6 h-6 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900">Promotions</h1>
            </div>
            <p className="text-gray-600">
              Manage promotional codes and discounts for your tickets
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <div className="flex flex-col gap-6">
        <PromoCodesCard
          promoCodes={promoCodes}
          onAdd={appendPromoCode}
          onDelete={(id) => {
            const index = promoCodes.findIndex(code => code.id === id);
            if (index !== -1) removePromoCode(index);
          }}
        />
        <DiscountsCard
          discounts={discounts as Discount[]}
          onAdd={appendDiscount}
          onDelete={(id) => {
            const index = discounts.findIndex(d => d.id === id);
            if (index !== -1) removeDiscount(index);
          }}
        />
      </div>
    </div>
  );
}