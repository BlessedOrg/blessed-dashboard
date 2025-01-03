interface NavItem {
  id: number;
  label?: string;
  href?: string;
  target?: string;
  divider?: boolean;
	deepLink?: boolean;
}
export const eventSidebarNavItems = [
  {
    id: 0,
    label: "Event Details",
    href: "?tab=event-details"
  },
  {
    id: 1,
    label: "Entrance Management",
    href: "?tab=event-management"
  },
  {
    id: 2,
    label: "Tickets",
    href: "tickets",
		deepLink: true
  },
	{
    id: 3,
    divider: true,
  },
  {
    id: 4,
    label: "Analytics",
    href: "?tab=analytics",
  },
  {
    id: 5,
    label: "Revenue Distribution",
    href: "?tab=revenue-distribution",
  },
] as NavItem[];
