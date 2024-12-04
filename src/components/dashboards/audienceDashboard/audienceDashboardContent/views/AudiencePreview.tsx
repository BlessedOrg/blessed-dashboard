import { Card } from "@/components/ui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Globe2, Lock, Mail, Users, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { CardContent } from "@/components/ui/card";
import { shortenWalletAddress } from "@/utils/shortenWalletAddress";

export const AudiencePreview = ({ audience }: { audience: IAudience }) => {
  return <div className="px-4 w-full">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-none mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900">{audience.name}</h1>
            </div>
            <Badge
              variant={audience.public ? "default" : "secondary"}
              className="flex items-center gap-1"
            >
              {audience.public ? (
                <>
                  <Globe2 className="w-3 h-3" />
                  Public
                </>
              ) : (
                <>
                  <Lock className="w-3 h-3" />
                  Private
                </>
              )}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
            <span>Created {format(new Date(audience.createdAt), "PPP")}</span>
            <span>•</span>
            <span>{audience.AudienceUsers.length} members</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>

    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-6">Audience Members</h2>
        <AudienceUsersList users={audience.AudienceUsers} />
      </CardContent>
    </Card>
  </div>;
};

export function AudienceUsersList({ users }: { users: IAudience["AudienceUsers"] }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Wallet Address</TableHead>
            <TableHead>Added</TableHead>
            <TableHead>Type</TableHead>
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
                  {user.User?.email ? (
                    <>
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{user.User.email}</span>
                    </>
                  ) : (
                    <span className="text-gray-500 italic">No email</span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-gray-400" />
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                    {shortenWalletAddress(user.User?.walletAddress) || shortenWalletAddress(user.externalWalletAddress)}
                  </code>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-gray-500">
                  {format(new Date(user.createdAt), "PP")}
                </span>
              </TableCell>
              <TableCell>
                {user.User ? (
                  <Badge className="bg-green-100 text-green-700">
                    Registered
                  </Badge>
                ) : (
                  <Badge variant="outline">
                    External
                  </Badge>
                )}
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}