import DatePickerReact from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui";
import { ReactNode } from "react";

interface Props {
  name: string;
  control: any;
  isDisabled?: boolean;
  icon?: ReactNode;
  showIcon?: boolean;
}

export const DatePicker = ({ name, control, isDisabled = false, icon: Icon }: Props) => {
  return (
    <Controller
      render={({ field }) => {
        return (
          //@ts-ignore
          <DatePickerReact
            disabled={isDisabled}
            startDate={new Date()}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={60}
            timeCaption="Time"
            dateFormat="dd.MM.yyyy, HH:mm"
            maxDate={null}
            minDate={new Date(new Date().setHours(new Date().getHours() + 1, 0))}
            fixedHeight
            popperPlacement="top"
            customInput={<Input disabled={isDisabled} />}
            onChange={date => field.onChange(date)}
            selected={new Date(field.value)}
            icon={Icon}
            showIcon={!!Icon}
          />
        );
      }}
      name={name}
      control={control}
    />
  );
};
