import { Card } from "@/components/ui";
import { CreateEventButton } from "@/components/common/CreateEventButton";
import { CardContent } from "@/components/ui/card";
import { AppEventsTab } from "@/components/dashboards/appDashboard/tabs/events/AppEventsTab";

export const AppOverview = ({ appId }) => {
  return (
    <div className="w-full flex-col flex gap-4">
      <Card className="bg-primary bg-gradient-to-r to-yellow-500 from-green-500" variant="rounded">
        <CardContent className="flex flex-col gap-10 ">
          <div>
            <h2 className="font-bold text-5xl uppercase">Start creating</h2>
            <p className="text-sm">Create and manage your event in just three steps.</p>
          </div>
          <CreateEventButton appId={appId} />
        </CardContent>
      </Card>
      <AppEventsTab appId={appId} items={3} />
    </div>
  );
};
