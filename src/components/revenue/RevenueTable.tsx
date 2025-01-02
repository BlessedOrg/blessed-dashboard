"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { shortenWalletAddress } from '@/utils/shortenWalletAddress';
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Bell, CheckCircle2, Loader2, Mail, Percent, Trash2, Wallet } from "lucide-react";
import { RevenueEntry } from "./types";

interface RevenueTableProps {
  entries: RevenueEntry[];
  onRemove: (id: string) => void;
  onNotify: (id: string) => void;
  isLoading: boolean;
	isStateManaged: boolean;
}

export function RevenueTable({ entries, onRemove, onNotify, isLoading, isStateManaged }: RevenueTableProps) {
  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Loader2 className="w-12 h-12 mx-auto mb-4 opacity-50 animate-spin" />
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Percent className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p className="text-lg font-medium">No entries yet</p>
        <p className="text-sm">Add your first revenue distribution entry</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Wallet Address</TableHead>
            <TableHead>Gets %</TableHead>
            {!isStateManaged && <TableHead>Notified</TableHead>}
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry, index) => (
            <motion.tr
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group hover:bg-gray-50"
            >
              <TableCell>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">{entry?.User?.email || entry?.email}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-gray-400" />
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                    {shortenWalletAddress(entry.walletAddress)}
                  </code>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Percent className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">{entry.feePercentage}%</span>
                </div>
              </TableCell>
              {!isStateManaged && <TableCell>
                {entry?.notifiedAt ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-sm">
                      {format(new Date(entry.notifiedAt), "PPp")}
                    </span>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNotify(entry.id)}
                    className="gap-2"
                  >
                    <Bell className="w-4 h-4" />
                    Notify
                  </Button>
                )}
              </TableCell>}
              <TableCell className='px-2'>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemove(entry.id)}
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