import { DatePicker } from "@/components/dashboards/eventDashboard/selects/DatePicker";
import { TimezoneSelect } from "@/components/dashboards/eventDashboard/selects/TimezoneSelect";
import { FormField } from "@/components/common/FormFields";
import { Calendar, Clock } from "lucide-react";
import React from "react";
import { Label } from "@/components/ui";

export const DateRangeSelect = ({
  control,
  isDisabled = false
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-6 md:grid-cols-2">
        <FormField id="start-date" label="Start">
          <DatePicker
            name="startsAt"
            control={control}
            isDisabled={isDisabled}
            icon={<Calendar />}
          />
        </FormField>
        <FormField id="end-date" label="End">
          <DatePicker
            name="endsAt"
            control={control}
            isDisabled={isDisabled}
            icon={<Clock />}
          />
        </FormField>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Timezone</Label>
        <TimezoneSelect
          name="timezoneIdentifier"
          control={control}
        />
      </div>
    </div>
  );
};