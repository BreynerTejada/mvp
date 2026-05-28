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
import { UserMe } from '../../api/types';
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
  user: UserMe | null | undefined;
  portalPath: string | null;
  portalLabel: string | null;
  handleNavClick: (path: string) => void;
  handleLogout: () => void;
}

const NavbarView: React.FC<NavbarViewProps> = ({
  navLinks,
  isMobile,
  drawerOpen,
  setDrawerOpen,
  user,
  portalPath,
  portalLabel,
  handleNavClick,
  handleLogout,
}) => {
  return (
    <AppBar position="sticky" id="navbar">
      <Toolbar sx={styles.toolbar}>
        <Typography
          variant="h6"
          onClick={() => handleNavClick('/')}
          sx={styles.logoText}
        >
          BARBER SHOP
        </Typography>

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

            {user && portalPath && portalLabel && (
              <Button
                onClick={() => handleNavClick(portalPath)}
                sx={styles.highlightNavButton}
              >
                {portalLabel}
              </Button>
            )}

            <Button
              variant="contained"
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

        {isMobile && (
          <IconButton
            color="inherit"
            onClick={() => setDrawerOpen(true)}
            aria-label="Abrir menú"
          >
            <MenuIcon />
          </IconButton>
        )}

        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{ sx: styles.drawerPaper }}
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
                  primaryTypographyProps={{ sx: styles.drawerListItemText }}
                />
              </ListItem>
            ))}

            {user && portalPath && portalLabel && (
              <ListItem
                onClick={() => handleNavClick(portalPath)}
                sx={{ cursor: 'pointer' }}
              >
                <ListItemText
                  primary={portalLabel}
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
                <Button
                  onClick={() => handleNavClick('/login')}
                  sx={{ color: 'text.secondary' }}
                >
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
