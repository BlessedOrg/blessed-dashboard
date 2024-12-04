"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Mail, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { EligibleUser } from "@/components/dashboards/audienceDashboard/audienceDashboardContent/test/audience/types";
import { shortenWalletAddress } from "@/utils/shortenWalletAddress";

interface EligibleUsersListProps {
  users: EligibleUser[];
  isLoading: boolean;
}

export function EligibleUsersList({ users, isLoading }: EligibleUsersListProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Eligible Users ({users.length})</h3>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Wallet Address</TableHead>
              <TableHead>Account Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group hover:bg-gray-50"
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    {user.email ? (
                      <>
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{user.email}</span>
                      </>
                    ) : (
                      <span className="text-gray-500 italic">No email provided</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-gray-400" />
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                      {user.external ? shortenWalletAddress(user.walletAddress) : shortenWalletAddress(user.smartWalletAddress)}
                    </code>
                  </div>
                </TableCell>
                <TableCell>
                  {user.external ? (
                    <Badge variant="outline" className="flex items-center gap-1 w-fit">
                      <ExternalLink className="w-3 h-3" />
                      External
                    </Badge>
                  ) : (
                    <Badge className="bg-green-100 text-green-700 flex items-center gap-1 w-fit">
                      Registered
                    </Badge>
                  )}
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}