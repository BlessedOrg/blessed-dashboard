"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/store/UserContext";

export const AppSelect = ({ currentAppId }) => {
  const router = useRouter();
  const {
    appsData: { apps, isAppsLoading }
  } = useUserContext();

  return (
    <Select onValueChange={(value) => router.push(`/${value}?tab=api-key`)}>
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
