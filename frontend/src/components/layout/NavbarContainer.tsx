import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useMediaQuery, useTheme } from '@mui/material';
import NavbarView, { NavbarLink } from './NavbarView';
import { UserRole } from '../../api/types';

const navLinks: NavbarLink[] = [
  { label: 'SERVICIOS', path: '/servicios' },
  { label: 'NOSOTROS', path: '/#nosotros' },
  { label: 'CONTACTO', path: '/#contacto' },
];

const PORTAL_PATH_BY_ROLE: Record<UserRole, string | null> = {
  admin: '/admin/citas',
  barber: '/barbero/horario',
  client: '/cliente/historial',
  guest: null,
};

const PORTAL_LABEL_BY_ROLE: Record<UserRole, string | null> = {
  admin: 'PANEL ADMIN',
  barber: 'MI HORARIO',
  client: 'MI HISTORIAL',
  guest: null,
};

const NavbarContainer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const authContext = useContext(AuthContext);

  const user = authContext?.user;
  const portalPath = user ? PORTAL_PATH_BY_ROLE[user.role] : null;
  const portalLabel = user ? PORTAL_LABEL_BY_ROLE[user.role] : null;

  const handleNavClick = (path: string) => {
    setDrawerOpen(false);
    if (path.startsWith('/#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(path.replace('/#', ''));
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById(path.replace('/#', ''));
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  const handleLogout = () => {
    setDrawerOpen(false);
    authContext?.logout();
    navigate('/');
  };

  return (
    <NavbarView
      navLinks={navLinks}
      isMobile={isMobile}
      drawerOpen={drawerOpen}
      setDrawerOpen={setDrawerOpen}
      user={user}
      portalPath={portalPath}
      portalLabel={portalLabel}
      handleNavClick={handleNavClick}
      handleLogout={handleLogout}
    />
  );
};

export default NavbarContainer;
