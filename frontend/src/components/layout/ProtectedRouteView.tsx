import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import * as styles from './ProtectedRoute.styles';
import { UserMe, UserRole } from '../../api/types';

interface ProtectedRouteViewProps {
  loading: boolean;
  user: UserMe | null;
  allowedRoles?: UserRole[];
}

const DEFAULT_ROUTE_BY_ROLE: Record<UserRole, string> = {
  admin: '/admin/citas',
  barber: '/barbero/horario',
  client: '/cliente/historial',
  guest: '/login',
};

const ProtectedRouteView: React.FC<ProtectedRouteViewProps> = ({
  loading,
  user,
  allowedRoles,
}) => {
  if (loading) {
    return (
      <Box sx={styles.loadingContainer}>
        <CircularProgress sx={styles.spinner} />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    const fallback = DEFAULT_ROUTE_BY_ROLE[user.role] || '/';
    return <Navigate to={fallback} replace />;
  }

  return <Outlet />;
};

export default ProtectedRouteView;
