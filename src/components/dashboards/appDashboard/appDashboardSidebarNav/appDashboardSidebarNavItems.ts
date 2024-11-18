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
  // {
  //   id: 2,
  //   label: "Templates",
  //   href: "?tab=templates",
  // },
  {
    id: 3,
    divider: true,
  },
  {
    id: 4,
    label: "API key",
    href: "?tab=api-key",
  },
  {
    id: 6,
    label: "Docs",
    target: "_blank",
    href: docsUrl,
  },
] as NavItem[];
