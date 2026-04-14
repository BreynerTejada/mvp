import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import * as styles from './Navbar.styles';

export interface NavbarLink {
  label: string;
  path: string;
}

interface NavbarViewProps {
  navLinks: NavbarLink[];
  isMobile: boolean;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  user: any;
  isAdmin: boolean;
  handleNavClick: (path: string) => void;
  handleLogout: () => void;
}

const NavbarView: React.FC<NavbarViewProps> = ({
  navLinks,
  isMobile,
  drawerOpen,
  setDrawerOpen,
  user,
  isAdmin,
  handleNavClick,
  handleLogout,
}) => {
  return (
    <AppBar position="sticky" id="navbar">
      <Toolbar sx={styles.toolbar}>
        {/* Logo */}
        <Typography
          variant="h6"
          onClick={() => handleNavClick('/')}
          sx={styles.logoText}
        >
          BARBER SHOP
        </Typography>

        {/* Desktop Menu */}
        {!isMobile && (
          <Box sx={styles.navLinksContainer}>
            {navLinks.map((link) => (
              <Button
                key={link.label}
                onClick={() => handleNavClick(link.path)}
                sx={styles.navButton}
              >
                {link.label}
              </Button>
            ))}

            {user && isAdmin && (
              <Button onClick={() => handleNavClick('/admin/barberos')} sx={styles.highlightNavButton}>
                PANEL ADMIN
              </Button>
            )}

            {user && (
              <Button onClick={() => handleNavClick('/agenda')} sx={styles.highlightNavButton}>
                MI AGENDA
              </Button>
            )}

            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleNavClick('/agendar')}
              sx={styles.agendaButton}
            >
              AGENDA AHORA
            </Button>

            {!user ? (
              <Button onClick={() => handleNavClick('/login')} sx={styles.loginButton}>
                Iniciar sesion
              </Button>
            ) : (
              <Button onClick={handleLogout} sx={styles.logoutButton}>
                Salir
              </Button>
            )}
          </Box>
        )}

        {/* Mobile Menu Toggle */}
        {isMobile && (
          <IconButton
            color="inherit"
            onClick={() => setDrawerOpen(true)}
            aria-label="Abrir menú"
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{
            sx: styles.drawerPaper,
          }}
        >
          <List>
            {navLinks.map((link) => (
              <ListItem
                key={link.label}
                onClick={() => handleNavClick(link.path)}
                sx={styles.drawerListItem}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{
                    sx: styles.drawerListItemText,
                  }}
                />
              </ListItem>
            ))}

            {user && isAdmin && (
              <ListItem onClick={() => handleNavClick('/admin/barberos')} sx={{ cursor: 'pointer' }}>
                <ListItemText
                  primary="PANEL ADMIN"
                  primaryTypographyProps={{ sx: styles.drawerHighlightText }}
                />
              </ListItem>
            )}

            {user && (
              <ListItem onClick={() => handleNavClick('/agenda')} sx={{ cursor: 'pointer' }}>
                <ListItemText
                  primary="MI AGENDA"
                  primaryTypographyProps={{ sx: styles.drawerHighlightText }}
                />
              </ListItem>
            )}

            <ListItem
              onClick={() => handleNavClick('/agendar')}
              sx={styles.drawerActionItem}
            >
              <Button variant="outlined" color="primary" fullWidth>
                AGENDA AHORA
              </Button>
            </ListItem>

            <ListItem sx={styles.drawerFooterItem}>
              {!user ? (
                <Button onClick={() => handleNavClick('/login')} sx={{ color: 'text.secondary' }}>
                  Iniciar sesion
                </Button>
              ) : (
                <Button onClick={handleLogout} sx={{ color: 'error.main' }}>
                  Cerrar Sesión
                </Button>
              )}
            </ListItem>
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarView;
