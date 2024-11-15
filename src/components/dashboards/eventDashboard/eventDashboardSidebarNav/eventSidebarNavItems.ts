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
    label: "Name and description",
    href: "?tab=name-and-description",
  },
  {
    id: 1,
    label: "Tickets",
    href: "?tab=tickets",
  },
  // {
  //   id: 2,
  //   label: "Templates",
  //   href: "?tab=templates",
  // },
] as NavItem[];
