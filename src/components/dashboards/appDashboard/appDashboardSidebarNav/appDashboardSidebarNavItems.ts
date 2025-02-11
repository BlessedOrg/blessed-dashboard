import { docsUrl } from "@/variables/variables";

interface NavItem {
  id: number;
  label?: string;
  href?: string;
  target?: string;
  divider?: boolean;
}
export const appDashboardSidebarNavItems = [
  {
    id: 0,
    label: "Overview",
    href: "?tab=overview",
  },
  {
    id: 1,
    label: "Events",
    href: "?tab=events",
  },
  {
    id: 2,
    label: "Revenue distribution",
    href: "?tab=revenue",
  },
  {
    id: 3,
    label: "Analytics",
    href: "?tab=analytics",
  },
  {
    id: 4,
    divider: true,
  },
  {
    id: 5,
    label: "Payments",
    href: "?tab=payments",
  },
  {
    id: 6,
    label: "API key",
    href: "?tab=api-key",
  },
  {
    id: 7,
    label: "Docs",
    target: "_blank",
    href: docsUrl,
  },

] as NavItem[];
