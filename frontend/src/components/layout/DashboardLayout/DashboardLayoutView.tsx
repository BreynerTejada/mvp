import React from 'react';
import {
  Box,
  Typography,
  Drawer,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DashboardNavItem } from './types';
import {
  rootSx,
  sidebarSx,
  brandSx,
  brandTextSx,
  navListSx,
  navItemSx,
  sidebarFooterSx,
  backLinkSx,
  mobileHeaderSx,
  mainSx,
  contentSx,
  drawerPaperSx,
} from './DashboardLayout.styles';

interface DashboardLayoutViewProps {
  brand: string;
  brandIcon: React.ReactNode;
  navItems: DashboardNavItem[];
  currentPath: string;
  drawerOpen: boolean;
  onDrawerToggle: () => void;
  onNavigate: (path: string) => void;
  onBackToSite: () => void;
  children: React.ReactNode;
}

const SidebarContent: React.FC<{
  brand: string;
  brandIcon: React.ReactNode;
  navItems: DashboardNavItem[];
  currentPath: string;
  onNavigate: (path: string) => void;
  onBackToSite: () => void;
}> = ({ brand, brandIcon, navItems, currentPath, onNavigate, onBackToSite }) => (
  <>
    <Box sx={brandSx}>
      <Box sx={{ color: 'primary.main', display: 'flex', alignItems: 'center' }}>
        {brandIcon}
      </Box>
      <Typography sx={brandTextSx}>{brand}</Typography>
    </Box>

    <Box sx={navListSx}>
      {navItems.map((item) => {
        const active = currentPath.startsWith(item.path);
        return (
          <Box
            key={item.path}
            onClick={() => onNavigate(item.path)}
            sx={navItemSx(active)}
            role="button"
            aria-current={active ? 'page' : undefined}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {item.icon}
            </Box>
            <Typography component="span" sx={{ fontSize: 'inherit', fontWeight: 'inherit' }}>
              {item.label}
            </Typography>
          </Box>
        );
      })}
    </Box>

    <Box sx={sidebarFooterSx}>
      <Box sx={backLinkSx} onClick={onBackToSite} role="button">
        <ArrowBackIcon fontSize="small" />
        <Typography component="span" sx={{ fontSize: 'inherit' }}>
          Volver al Sitio
        </Typography>
      </Box>
    </Box>
  </>
);

const DashboardLayoutView: React.FC<DashboardLayoutViewProps> = ({
  brand,
  brandIcon,
  navItems,
  currentPath,
  drawerOpen,
  onDrawerToggle,
  onNavigate,
  onBackToSite,
  children,
}) => (
  <Box sx={rootSx}>
    <Box component="aside" sx={sidebarSx}>
      <SidebarContent
        brand={brand}
        brandIcon={brandIcon}
        navItems={navItems}
        currentPath={currentPath}
        onNavigate={onNavigate}
        onBackToSite={onBackToSite}
      />
    </Box>

    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={onDrawerToggle}
      PaperProps={{ sx: drawerPaperSx }}
    >
      <SidebarContent
        brand={brand}
        brandIcon={brandIcon}
        navItems={navItems}
        currentPath={currentPath}
        onNavigate={(p) => {
          onNavigate(p);
          onDrawerToggle();
        }}
        onBackToSite={() => {
          onBackToSite();
          onDrawerToggle();
        }}
      />
    </Drawer>

    <Box sx={mainSx}>
      <Box sx={mobileHeaderSx}>
        <Typography sx={brandTextSx}>{brand}</Typography>
        <IconButton aria-label="Abrir menú" onClick={onDrawerToggle}>
          <MenuIcon sx={{ color: 'primary.main' }} />
        </IconButton>
      </Box>
      <Box component="main" sx={contentSx}>
        {children}
      </Box>
    </Box>
  </Box>
);

export default DashboardLayoutView;
