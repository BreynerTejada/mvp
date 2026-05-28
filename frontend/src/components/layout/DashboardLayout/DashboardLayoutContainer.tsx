import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DashboardLayoutProps } from './types';
import DashboardLayoutView from './DashboardLayoutView';

const DashboardLayoutContainer: React.FC<DashboardLayoutProps> = ({
  brand,
  brandIcon,
  navItems,
  children,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <DashboardLayoutView
      brand={brand}
      brandIcon={brandIcon}
      navItems={navItems}
      currentPath={location.pathname}
      drawerOpen={drawerOpen}
      onDrawerToggle={() => setDrawerOpen((prev) => !prev)}
      onNavigate={(path) => navigate(path)}
      onBackToSite={() => navigate('/')}
    >
      {children}
    </DashboardLayoutView>
  );
};

export default DashboardLayoutContainer;
