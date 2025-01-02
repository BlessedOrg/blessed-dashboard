"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUserContext } from "@/store/UserContext";
import { useRouter, useSearchParams } from "next/navigation";

export const AppSelect = ({ currentAppId }) => {
  const router = useRouter();
  const {
    appsData: { apps, isAppsLoading }
  } = useUserContext();

	const currentTab = useSearchParams().get("tab")

  return (
    <Select onValueChange={(value) => router.push(`/${value}${currentTab ? `?tab=${currentTab}` : "?tab=overview"}`)}>
      <SelectTrigger className="w-fit max-w-[8rem] text-left" disabled={isAppsLoading} variant="pill">
        <SelectValue placeholder={isAppsLoading ? "Loading.." : apps.find((i) => i.slug === currentAppId)?.name || "Select app"} />
      </SelectTrigger>
      <SelectContent>
        {apps.map((app) => {
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
