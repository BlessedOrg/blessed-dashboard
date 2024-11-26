import { allTimezones, useTimezoneSelect } from "react-timezone-select";

interface TimezoneOption {
  value: string;
  label: string;
  offset?: number;
  abbrev?: string;
  altName?: string;
}

export const useTimezones = (currentTimezone?: string) => {
  const localeTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const timezones = {
    ...allTimezones,
    "Europe/Berlin": "Frankfurt",
    [localeTimezone]: localeTimezone
  };

  const { options } = useTimezoneSelect({
    labelStyle: "original",
    timezones
  });

  const getCurrentTimezone = (): TimezoneOption | undefined => {
    if (!currentTimezone) return undefined;
    return options.find(option => option.value === currentTimezone);
  };

  return {
    options,
    currentTimezoneDetails: getCurrentTimezone(),
    defaultTimezone: options.find(option => option.value === localeTimezone)
  };
};