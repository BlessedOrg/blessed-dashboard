import { AppDashboard } from "@/components/dashboards/appDashboard/AppDashboard";
import { Navigation } from "@/components/navigation/Navigation";

export default async function AppPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex w-full flex-col bg-background">
      <Navigation appId={params.id} />
      <AppDashboard appId={params.id} />
    </div>
  );
}
