interface NavItem {
  id: number;
  label?: string;
  href?: string;
  target?: string;
  divider?: boolean;
}
export const ticketsSidebarNavItems = [
  {
    id: 0,
    label: "Tickets",
    href: "?tab=tickets"
  },
	{
		id: 1,
    divider: true,
  },
  {
    id: 2,
    label: "Analytics",
    href: "?tab=analytics",
  },
  {
    id: 3,
    label: "Revenue Distribution",
    href: "?tab=revenue-distribution",
  },
] as NavItem[];
