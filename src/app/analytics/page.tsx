import { Suspense } from "react";
import { Navigation } from "@/components/navigation/Navigation";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default function AdminPage() {
  return (
    <div className="flex w-full flex-col">
      <Suspense>
        <Navigation />
      </Suspense>

      <AdminDashboard />
    </div>
  );
}