import Link from "next/link";
import { dashboardNavItems } from "./dashboardNavItems";

export const HomeDashboardSidebarNav = ({ currentTabIndex, className }: { currentTabIndex: number; className?: string }) => {
  return (
    <div className={`flex flex-col gap-4 lg:sticky lg:top-[6.25rem] lg:h-[calc(100vh-6.25rem)] lg:min-w-[13rem] ${className || ""}`}>
      <ul className="bg-white p-2 rounded-3xl">
        {dashboardNavItems.map((nav, index) => {
          const isActive = nav.id === currentTabIndex;
          return (
            <li key={nav.label + index}>
              <Link
                href={nav.href}
                className={`rounded-full px-5 py-2 font-semibold hover:bg-gray-300 ${
                  isActive ? "bg-root-background" : ""
                } w-full text-left my-1 block`}
              >
                {nav.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
