import { Card, CardContent } from "../../../ui/card";
import { CreateAppModal } from "@/components/modals/CreateAppModal";
import { AppsView } from "@/components/dashboards/homeDashboard/views/AppsView";

export const Dashboard = () => {
  return (
    <div className="w-full flex flex-col gap-10 pb-10">
      <Card className="bg-primary bg-gradient-to-r to-yellow-500 from-white" variant="rounded">
        <CardContent className="flex flex-col gap-10">
          <div>
            <h2 className="font-bold text-5xl uppercase">Start creating</h2>
            <p className="text-sm">Expand your setup—add another app to manage more events and tickets.</p>
          </div>
          <CreateAppModal />
        </CardContent>
      </Card>
      <AppsView />
    </div>
  );
};
