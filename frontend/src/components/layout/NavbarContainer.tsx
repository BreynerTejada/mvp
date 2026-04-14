import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useMediaQuery, useTheme } from '@mui/material';
import NavbarView, { NavbarLink } from './NavbarView';

const navLinks: NavbarLink[] = [
  { label: 'SERVICIOS', path: '/servicios' },
  { label: 'NOSOTROS', path: '/#nosotros' },
  { label: 'CONTACTO', path: '/#contacto' },
];

const NavbarContainer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const authContext = useContext(AuthContext);

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
  };

  return (
    <NavbarView
      navLinks={navLinks}
      isMobile={isMobile}
      drawerOpen={drawerOpen}
      setDrawerOpen={setDrawerOpen}
      user={authContext?.user}
      isAdmin={authContext?.isAdmin || false}
      handleNavClick={handleNavClick}
      handleLogout={handleLogout}
    />
  );
};

export default NavbarContainer;
