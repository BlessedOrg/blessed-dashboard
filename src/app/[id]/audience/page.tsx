import { AudienceDashboard } from "@/components/dashboards/audienceDashboard/AudienceDashboard";
import { Navigation } from "@/components/navigation/Navigation";

export default async function AudiencePage({ params }: { params: { id: string } }) {
  return (
    <div className="flex w-full flex-col">
      <Navigation appId={params.id} />
      <AudienceDashboard appId={params.id} />
    </div>
  );
}
