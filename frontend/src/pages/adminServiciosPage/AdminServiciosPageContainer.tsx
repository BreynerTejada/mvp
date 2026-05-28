import React, { useState } from 'react';
import { useServices } from '../../hooks/useServices';
import AdminServiciosPageView from './AdminServiciosPageView';

const AdminServiciosPageContainer: React.FC = () => {
  const { services, loading, error } = useServices();
  const [dismissed, setDismissed] = useState(false);

  return (
    <AdminServiciosPageView
      services={services}
      loading={loading}
      errorMessage={dismissed ? null : error}
      onClearError={() => setDismissed(true)}
    />
  );
};

export default AdminServiciosPageContainer;
