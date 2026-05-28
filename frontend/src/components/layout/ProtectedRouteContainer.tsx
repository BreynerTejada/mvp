import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { UserRole } from '../../api/types';
import ProtectedRouteView from './ProtectedRouteView';

interface ProtectedRouteContainerProps {
  allowedRoles?: UserRole[];
  adminOnly?: boolean;
}

const ProtectedRouteContainer: React.FC<ProtectedRouteContainerProps> = ({
  allowedRoles,
  adminOnly = false,
}) => {
  const authContext = useContext(AuthContext);

  const roles: UserRole[] | undefined = adminOnly ? ['admin'] : allowedRoles;

  return (
    <ProtectedRouteView
      loading={authContext?.loading || false}
      user={authContext?.user || null}
      allowedRoles={roles}
    />
  );
};

export default ProtectedRouteContainer;
