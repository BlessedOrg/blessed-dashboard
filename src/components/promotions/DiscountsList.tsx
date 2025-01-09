"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Tag, Trash2 } from "lucide-react";
import { Discount } from "./types";

interface DiscountsListProps {
  discounts: Discount[];
  onDelete: (id: string) => void;
}

export function DiscountsList({ discounts, onDelete }: DiscountsListProps) {
  if (discounts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Tag className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p className="text-lg font-medium">No discounts yet</p>
        <p className="text-sm">Create your first discount</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Period</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {discounts.map((discount, index) => (
            <motion.tr
              key={discount.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group hover:bg-gray-50"
            >
              <TableCell>
                  <div className="font-medium">{discount.name}</div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {discount.type === "percentage" ? (
                    `${discount.value}%`
                  ) : (
                    `$${discount.value} OFF`
                  )}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="text-sm text-gray-600">
                  <div>{format(discount.startDate, "MMM d")}</div>
                  <div>{format(discount.endDate, "MMM d")}</div>
                </div>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(discount.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}