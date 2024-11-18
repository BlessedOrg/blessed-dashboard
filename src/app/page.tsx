import { Suspense } from "react";
import { HomeDashboard } from "@/components/dashboards/homeDashboard/HomeDashboard";
import { Navigation } from "@/components/navigation/Navigation";

export default function HomePage() {
  return (
    <div className="flex w-full flex-col">
      <Suspense>
        <Navigation />
      </Suspense>
      <HomeDashboard />
    </div>
  );
}
