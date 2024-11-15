"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { apiUrl } from "@/variables/variables";
import { fetcherWithToken } from "@/requests/requests";
import { isArray } from "lodash-es";

export const EventSelect = ({ currentEventSlug, appId }) => {
  const router = useRouter();
  const { data: eventsData, isLoading } = useSWR(`${apiUrl}/private/events/${appId}`, fetcherWithToken);
  const events = isArray(eventsData) ? eventsData : [];

  return (
    <Select onValueChange={(value) => router.push(`/${appId}/${value}`)}>
      <SelectTrigger className="w-fit max-w-[8rem] text-left" disabled={isLoading}>
        <SelectValue placeholder={isLoading ? "Loading.." : events.find((i) => i.slug === currentEventSlug)?.name || "Select event"} />
      </SelectTrigger>
      <SelectContent>
        {events.map((app) => {
          return (
            <SelectItem value={app.slug} key={app.id}>
              {app.name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
