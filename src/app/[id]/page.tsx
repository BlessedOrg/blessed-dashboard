import { AppDashboard } from "../../components/appDashboard/AppDashboard";
import { AppDashboardNav } from "../../components/appDashboard/appDashboardNav/AppDashboardNav";
import { apiUrl } from "@/variables/variables";
import { notFound } from "next/navigation";
import { fetcherWithToken } from "@/requests/requests";

async function getAppData(id: string) {
  const appData = await fetcherWithToken(`${apiUrl}/api/app/${id}`);
  if (!appData || !!appData?.error) notFound();
  return appData;
}
export default async function AppPage({ params }: { params: { id: string } }) {
  const appData = await getAppData(params.id);

  return (
    <div className="flex w-full flex-col bg-background">
      <AppDashboardNav appId={params.id} />
      <AppDashboard appData={appData} />
    </div>
  );
}
