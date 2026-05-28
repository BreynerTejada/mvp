import React from 'react';
import { Outlet } from 'react-router-dom';
import HistoryIcon from '@mui/icons-material/History';
import AccountCircleIcon from '@mui/icons-material/AccountCircleOutlined';
import DashboardLayoutContainer from '../DashboardLayout/DashboardLayoutContainer';
import { DashboardNavItem } from '../DashboardLayout/types';

const navItems: DashboardNavItem[] = [
  { label: 'Mi Historial', path: '/cliente/historial', icon: <HistoryIcon fontSize="small" /> },
];

const ClientLayout: React.FC = () => (
  <DashboardLayoutContainer
    brand="CLIENT PORTAL"
    brandIcon={<AccountCircleIcon fontSize="small" />}
    navItems={navItems}
  >
    <Outlet />
  </DashboardLayoutContainer>
);

export default ClientLayout;
