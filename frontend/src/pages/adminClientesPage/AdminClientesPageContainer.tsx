import React, { useEffect, useState } from 'react';
import { getClients } from '../../api/client';
import { Client } from '../../api/types';
import AdminClientesPageView from './AdminClientesPageView';

const AdminClientesPageContainer: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const response = await getClients();
        setClients(response.data);
      } catch {
        setErrorMessage('No se pudieron cargar los clientes.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <AdminClientesPageView
      clients={clients}
      loading={loading}
      errorMessage={errorMessage}
      onClearError={() => setErrorMessage(null)}
    />
  );
};

export default AdminClientesPageContainer;
