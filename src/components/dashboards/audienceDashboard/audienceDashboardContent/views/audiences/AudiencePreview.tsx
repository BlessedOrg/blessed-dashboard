import { Button, Card } from "@/components/ui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Globe2, Lock, Mail, Trash, Trash2, Users, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { CardContent } from "@/components/ui/card";
import { shortenWalletAddress } from "@/utils/shortenWalletAddress";
import { deleteAudience, deleteAudienceUser, updateAudience } from "@/app/api/audience";
import { toast } from "react-toastify";
import { TextEdit } from "@/components/ui/text-edit";
import { AudiencePagination } from "@/components/dashboards/audienceDashboard/audienceDashboardContent/views/audiences/AudiencePagination";
import { DeleteAudienceUserDialog } from "@/components/dashboards/audienceDashboard/audienceDashboardContent/views/audiences/DeleteAudienceUserDialog";
import { useState } from "react";
import * as uuid from "uuid";

const ITEMS_PER_PAGE = 5;
export const AudiencePreview = ({ audience, mutate, onTabChange }: { audience: IAudience, mutate: () => Promise<void>, onTabChange: (tab: string) => void }) => {
  const onDeleteAudience = async () => {
    try {
      const res = await deleteAudience({ appId: audience.appId, id: audience.id });
      if (res?.deletedAt) {
        await mutate();
        onTabChange("create");
        toast("Audience deleted", { type: "success" });
      }
    } catch (e) {
      toast("Audience delete fail", { type: "error" });
    }
  };

  const onNameChange = async (newName: string) => {
    try {
      const res = await updateAudience({ name: newName, appId: audience.appId, audienceId: audience.id });
      if (res?.id) {
        await mutate();
        toast("Name changed successfully", { type: "success" });
      }
    } catch (e) {
      toast("Name change fail", { type: "error" });
    }
  };

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
              <h2 className="text-2xl font-bold text-gray-900"><TextEdit defaultValue={audience.name} handleSubmit={onNameChange} /></h2>
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
          <div className="flex justify-between gap-2 mt-2">
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
              <span>Created {format(new Date(audience.createdAt), "PPP")}</span>
              <span>•</span>
              <span>{audience.AudienceUsers.length} members</span>
            </div>
            <button onClick={onDeleteAudience}><Trash color="red" /></button>
          </div>
        </CardContent>
      </Card>
    </motion.div>

    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-6">Audience Members</h2>
        <AudienceUsersList users={audience.AudienceUsers} audienceId={audience.id} appId={audience.appId} mutate={mutate} />
      </CardContent>
    </Card>
  </div>;
};

export function AudienceUsersList({ users, appId, audienceId, mutate }: { users: IAudienceUser[], appId: string, audienceId: string, mutate: () => Promise<void> }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [userToDelete, setUserToDelete] = useState<IAudienceUser | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = users.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeleteClick = (audienceUser: IAudienceUser) => {
    setUserToDelete(audienceUser);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;

    setIsDeleting(true);
    try {
      await deleteAudienceUser({ appId, audienceUserId: userToDelete.id, id: audienceId });
      setUserToDelete(null);
      await mutate();
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Wallet Address</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedUsers.map((user, index) => (
            <motion.tr
              key={user.id + uuid.v4()}
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
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteClick(user)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <AudiencePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <DeleteAudienceUserDialog
        isOpen={!!userToDelete}
        isDeleting={isDeleting}
        user={userToDelete}
        onClose={() => setUserToDelete(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}