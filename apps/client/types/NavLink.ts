export interface NavLink {
  href: string;
  label: string;
}

export interface NavLinkGroup {
  heading: string;
  links: NavLink[];
}
