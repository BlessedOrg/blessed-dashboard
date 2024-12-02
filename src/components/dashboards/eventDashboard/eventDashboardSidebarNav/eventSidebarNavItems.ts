interface NavItem {
  id: number;
  label?: string;
  href?: string;
  target?: string;
  divider?: boolean;
}
export const eventSidebarNavItems = [
  {
    id: 0,
    label: "Event Details",
    href: "?tab=event-details"
  },
  {
    id: 1,
    label: "Event Management",
    href: "?tab=event-management"
  },
  {
    id: 2,
    label: "Tickets",
    href: "?tab=tickets"
  }
  // {
  //   id: 2,
  //   label: "Templates",
  //   href: "?tab=templates",
  // },
] as NavItem[];
