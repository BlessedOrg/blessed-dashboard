import Link from "next/link";
import { dashboardNavItems } from "./dashboardNavItems";

export const DashboardNav = ({ currentTabIndex, className }: { currentTabIndex: number; className?: string }) => {
  return (
    <div className={`xl:sticky xl:top-[6.25rem] xl:h-[calc(100vh-6.25rem)] xl:min-w-[15.5rem] ${className || ""}`}>
      <ul className="bg-white p-2 rounded-3xl">
        {dashboardNavItems.map((nav, index) => {
          const isActive = nav.id === currentTabIndex;
          return (
            <li key={nav.label + index}>
              <Link
                href={nav.href}
                className={`rounded-full px-5 py-2 font-semibold hover:bg-gray-300 ${
                  isActive ? "bg-background" : ""
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
