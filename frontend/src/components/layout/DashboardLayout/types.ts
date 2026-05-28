import { ReactNode } from 'react';

export interface DashboardNavItem {
  label: string;
  path: string;
  icon: ReactNode;
}

export interface DashboardLayoutProps {
  brand: string;
  brandIcon: ReactNode;
  navItems: DashboardNavItem[];
  children: ReactNode;
}
