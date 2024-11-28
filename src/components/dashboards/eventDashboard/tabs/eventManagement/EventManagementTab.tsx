import { BouncersManagementView } from "@/components/dashboards/eventDashboard/tabs/eventManagement/bouncers/BouncersManagementView";

export const EventManagementTab = ({ appId, eventId, isLoading, eventData, mutateEventData }: {
  appId: string;
  eventId: string;
  eventData: IEventDetails;
  mutateEventData: () => void;
  isLoading: boolean
}) => {

  return (
    <BouncersManagementView isLoading={isLoading} appId={appId} eventId={eventId} mutateEventData={mutateEventData} bouncers={eventData?.EventBouncers || []} />
  );
};