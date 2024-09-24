import Link from "next/link";
import { appDashboardSidebarNavItems } from "./appDashboardSidebarNavItems";
import { ArrowUpRight } from "lucide-react";

export const AppDashboardSidebarNav = ({ currentTabIndex, className }) => {
  return (
    <div className={`xl:sticky xl:top-[6.25rem] xl:h-[calc(100vh-6.25rem)] xl:min-w-[15.5rem] ${className || ""}`}>
      <ul className="bg-white p-2 rounded-3xl">
        {appDashboardSidebarNavItems.map((nav, index) => {
          const isActive = nav.id === currentTabIndex;
          return (
            <li key={nav.label + index}>
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
