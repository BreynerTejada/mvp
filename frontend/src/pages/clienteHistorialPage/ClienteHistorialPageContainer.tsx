import React, { useContext, useEffect, useState } from 'react';
import { getMyAppointments } from '../../api/client';
import { Appointment } from '../../api/types';
import { AuthContext } from '../../context/AuthContext';
import ClienteHistorialPageView from './ClienteHistorialPageView';

const ClienteHistorialPageContainer: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const response = await getMyAppointments();
        setAppointments(response.data);
      } catch {
        setErrorMessage('No se pudo cargar tu historial.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <ClienteHistorialPageView
      appointments={appointments}
      loading={loading}
      errorMessage={errorMessage}
      welcomeName={authContext?.user?.full_name || 'Cliente'}
      onClearError={() => setErrorMessage(null)}
    />
  );
};

export default ClienteHistorialPageContainer;
