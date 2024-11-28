"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Calendar, CheckCircle2, Mail, XCircle } from "lucide-react";
import { motion } from "framer-motion";

interface BouncersListProps {
  bouncers: IEventBouncer[];
}

export function BouncersList({ bouncers }: BouncersListProps) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Added</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bouncers.map((bouncer, index) => (
              <motion.tr
                key={bouncer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group hover:bg-gray-50"
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">{bouncer.User.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(bouncer.createdAt), "MMM d, yyyy")}
                  </div>
                </TableCell>
                <TableCell>
                  {!bouncer?.deletedAt ? (
                    <Badge className="bg-green-100 text-green-700 flex items-center gap-1 w-fit">
                      <CheckCircle2 className="w-3 h-3" />
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                      <XCircle className="w-3 h-3" />
                      Inactive
                    </Badge>
                  )}
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}