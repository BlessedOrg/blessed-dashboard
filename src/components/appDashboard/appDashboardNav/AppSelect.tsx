"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/store/UserContext";

export const AppSelect = ({ currentAppId }) => {
  const router = useRouter();
  const {
    appsData: { apps, isAppsLoading },
  } = useUserContext();

  return (
    <Select onValueChange={(value) => router.push(`/${value}?tab=api-key`)}>
      <SelectTrigger className="w-[180px]" disabled={isAppsLoading}>
        <SelectValue placeholder={apps.find((i) => i.id === currentAppId)?.name || "Select app"} />
      </SelectTrigger>
      <SelectContent>
        {apps.map((app) => {
          return (
            <SelectItem value={app.id} key={app.id}>
              {app.name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
