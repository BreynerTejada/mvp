import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ProtectedRouteView from './ProtectedRouteView';

interface ProtectedRouteContainerProps {
  adminOnly?: boolean;
}

const ProtectedRouteContainer: React.FC<ProtectedRouteContainerProps> = ({ adminOnly = false }) => {
  const authContext = useContext(AuthContext);

  return (
    <ProtectedRouteView
      loading={authContext?.loading || false}
      user={authContext?.user || null}
      isAdmin={authContext?.isAdmin || false}
      adminOnly={adminOnly}
    />
  );
};

export default ProtectedRouteContainer;
