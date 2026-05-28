import React from 'react';
import { Outlet } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardLayoutContainer from '../DashboardLayout/DashboardLayoutContainer';
import { DashboardNavItem } from '../DashboardLayout/types';

const navItems: DashboardNavItem[] = [
  { label: 'Horario', path: '/admin/citas', icon: <CalendarMonthIcon fontSize="small" /> },
  { label: 'Clientes', path: '/admin/clientes', icon: <PeopleAltIcon fontSize="small" /> },
  { label: 'Servicios', path: '/admin/servicios', icon: <ContentCutIcon fontSize="small" /> },
  { label: 'Barberos', path: '/admin/barberos', icon: <GroupIcon fontSize="small" /> },
];

const AdminLayout: React.FC = () => (
  <DashboardLayoutContainer
    brand="ADMIN"
    brandIcon={<SettingsIcon fontSize="small" />}
    navItems={navItems}
  >
    <Outlet />
  </DashboardLayoutContainer>
);

export default AdminLayout;
