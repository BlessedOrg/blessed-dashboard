import { AppDashboard } from "../../components/appDashboard/AppDashboard";
import { AppDashboardNav } from "../../components/appDashboard/appDashboardNav/AppDashboardNav";

export default async function AppPage({ params }: { params: { id: string } }) {

  return (
    <div className="flex w-full flex-col bg-background">
      <AppDashboardNav appId={params.id} />
      <AppDashboard appId={params.id} />
    </div>
  );
}
