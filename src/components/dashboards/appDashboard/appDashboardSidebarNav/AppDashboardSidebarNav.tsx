import Link from "next/link";
import { appDashboardSidebarNavItems } from "./appDashboardSidebarNavItems";
import { ArrowUpRight } from "lucide-react";

export const AppDashboardSidebarNav = ({ currentTabIndex, className }) => {
  return (
    <div className={`flex flex-col gap-4 lg:sticky lg:top-[6.25rem] lg:h-[calc(100vh-6.25rem)] lg:min-w-[16.5rem] ${className || ""}`}>
      <ul className="bg-white p-2 rounded-3xl">
        {appDashboardSidebarNavItems.map((nav) => {
          const isActive = nav.id === currentTabIndex;
          return nav?.divider ? (
            <div className="h-[2px] my-4 w-full bg-gray-200" key={nav.id} />
          ) : (
            <li key={nav.label + nav.id}>
              <Link
                href={nav.href}
                target={nav.target}
                className={`flex gap-1 items-center rounded-full px-5 py-2 font-semibold hover:bg-gray-300 w-full text-left my-1 ${isActive ? "bg-gray-200" : ""}`}
              >
                {nav.label} {nav?.target === "_blank" && <ArrowUpRight />}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
