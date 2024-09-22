import { HomeDashboard } from "../components/homeDashboard/HomeDashboard";
import { Navigation } from "../components/homeDashboard/navigation/Navigation";
import { Suspense } from "react";

export default function HomePage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  return (
    <div className="flex w-full flex-col">
      <Suspense>
        <Navigation searchParams={searchParams} />
      </Suspense>
      <HomeDashboard />
    </div>
  );
}
