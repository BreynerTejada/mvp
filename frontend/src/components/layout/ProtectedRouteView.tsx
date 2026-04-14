import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import * as styles from './ProtectedRoute.styles';
import { UserMe } from '../../api/types';

interface ProtectedRouteViewProps {
  loading: boolean;
  user: UserMe | null;
  isAdmin: boolean;
  adminOnly: boolean;
}

const ProtectedRouteView: React.FC<ProtectedRouteViewProps> = ({
  loading,
  user,
  isAdmin,
  adminOnly,
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

  if (adminOnly && !isAdmin) {
    return <Navigate to="/agenda" replace />;
  }

  return <Outlet />;
};

export default ProtectedRouteView;
