"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Tag, Trash2 } from "lucide-react";
import { PromoCode } from "./types";

interface PromoCodesListProps {
  promoCodes: PromoCode[];
  onDelete: (id: string) => void;
}

export function PromoCodesList({ promoCodes, onDelete }: PromoCodesListProps) {
  if (promoCodes.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Tag className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p className="text-lg font-medium">No promo codes yet</p>
        <p className="text-sm">Create your first promotional code</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Usage</TableHead>
            <TableHead>Expires</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {promoCodes.map((code, index) => (
            <motion.tr
              key={code.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group hover:bg-gray-50"
            >
              <TableCell>
                <code className="bg-purple-50 text-purple-700 px-2 py-1 rounded font-mono">
                  {code.code}
                </code>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {code.discountPercentage}%
                </Badge>
              </TableCell>
              <TableCell>
                <span className="text-gray-600">
                  {code.usedCount} / {code.maxUses}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-gray-600">
                  {format(code.expiresAt, "MMM d, yyyy")}
                </span>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(code.id)}
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