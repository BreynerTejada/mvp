import React from 'react';
import { Outlet } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DashboardLayoutContainer from '../DashboardLayout/DashboardLayoutContainer';
import { DashboardNavItem } from '../DashboardLayout/types';

const navItems: DashboardNavItem[] = [
  { label: 'Mi Horario', path: '/barbero/horario', icon: <CalendarMonthIcon fontSize="small" /> },
  { label: 'Disponibilidad', path: '/barbero/disponibilidad', icon: <AccessTimeIcon fontSize="small" /> },
];

const BarberLayout: React.FC = () => (
  <DashboardLayoutContainer
    brand="BARBER PORTAL"
    brandIcon={<ContentCutIcon fontSize="small" />}
    navItems={navItems}
  >
    <Outlet />
  </DashboardLayoutContainer>
);

export default BarberLayout;
