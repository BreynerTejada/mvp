import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { getMyAppointments, updateAppointmentStatus } from '../../api/client';
import { Appointment } from '../../api/types';
import { AuthContext } from '../../context/AuthContext';
import BarberHorarioPageView from './BarberHorarioPageView';

const BarberHorarioPageContainer: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getMyAppointments();
      setAppointments(response.data);
    } catch {
      setErrorMessage('No se pudieron cargar tus citas.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleStatusChange = async (appointment: Appointment, nextStatus: string) => {
    try {
      await updateAppointmentStatus(appointment.id, nextStatus);
      await load();
    } catch (err) {
      const message =
        (err as AxiosError<{ error?: string }>).response?.data?.error ||
        'No se pudo cambiar el estado.';
      setErrorMessage(message);
    }
  };

  return (
    <BarberHorarioPageView
      appointments={appointments}
      loading={loading}
      errorMessage={errorMessage}
      welcomeName={authContext?.user?.full_name || 'Barbero'}
      onStatusChange={handleStatusChange}
      onClearError={() => setErrorMessage(null)}
    />
  );
};

export default BarberHorarioPageContainer;
