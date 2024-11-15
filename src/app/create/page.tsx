import { Suspense } from "react";
import { CreateDashboard } from "@/components/dashboards/createDashboard/CreateDashboard";
import { Navigation } from "@/components/navigation/Navigation";

export default function CreatePage() {
  return (
    <div className="flex w-full flex-col">
      <Navigation />
      <Suspense>
        <CreateDashboard />
      </Suspense>
    </div>
  );
}
