import { docsUrl } from "@/variables/variables";

export const appDashboardSidebarNavItems = [
  {
    id: 0,
    label: "API key",
    href: "?tab=api-key",
  },
  {
    id: 1,
    label: "Name and description",
    href: "?tab=name-and-description",
  },
  //TODO hidden temporary
  // {
  //   id: 2,
  //   label: "Ticket management",
  //   href: "?tab=ticket-management",
  // },
  // {
  //   id: 3,
  //   label: "Token management",
  //   href: "?tab=token-management",
  // },
  {
    id: 4,
    label: "Docs",
    target: "_blank",
    href: docsUrl,
  },
];
