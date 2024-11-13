import { docsUrl } from "@/variables/variables";

export const appDashboardSidebarNavItems = [
  {
    id: 0,
    label: "API key",
    href: "?tab=api-key"
  },
  {
    id: 1,
    label: "Name and description",
    href: "?tab=name-and-description"
  },
  {
    id: 2,
    label: "Campaigns & Audience",
    href: "?tab=campaigns-and-audience"
  },
  {
    id: 4,
    label: "Docs",
    target: "_blank",
    href: docsUrl
  }

];
