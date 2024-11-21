import { Card } from "@/components/ui";
import { UseFormReturn } from "react-hook-form";
import { DateRangeSelect } from "@/components/dashboards/eventDashboard/selects/DateRangeSelect";
import { AddressForm } from "@/components/dashboards/createEventDashboard/views/addressForm/AddressForm";

export const DateRangeAndVenue = ({ form }: { form: UseFormReturn<any, undefined>; }) => {
  const { control, watch } = form;
  return (
    <Card className="flex flex-col gap-2">
      <p className="font-semibold text-lg">Select date range & venue</p>
      <DateRangeSelect control={control} />
      <div className="h-[1px] bg-gray-300 w-full my-4"></div>
      <AddressForm form={form} />
    </Card>
  );
};