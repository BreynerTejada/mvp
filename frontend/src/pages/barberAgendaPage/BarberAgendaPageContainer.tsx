import React, { useState, useEffect, useContext } from 'react';
import { useBarbers } from '../../hooks/useBarbers';
import { useAppointments } from '../../hooks/useAppointments';
import { AuthContext } from '../../context/AuthContext';
import BarberAgendaPageView from './BarberAgendaPageView';

const BarberAgendaPageContainer: React.FC = () => {
  const { barbers, loading: barbersLoading } = useBarbers();
  const { appointments, loading, fetchAgenda, changeStatus } = useAppointments();
  const authContext = useContext(AuthContext);

  const isAdmin = authContext?.isAdmin || false;
  const contextBarberId = authContext?.barberId;

  const [selectedBarberId, setSelectedBarberId] = useState<number | string>(
    isAdmin ? '' : (contextBarberId || '')
  );
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [actionError, setActionError] = useState('');

  useEffect(() => {
    if (selectedBarberId && selectedDate) {
      fetchAgenda(Number(selectedBarberId), selectedDate);
    }
  }, [selectedBarberId, selectedDate, fetchAgenda]);

  const handleStatusChange = async (appointmentId: number, newStatus: string) => {
    try {
      setActionError('');
      await changeStatus(appointmentId, newStatus);
    } catch (err: unknown) {
      setActionError((err as Error).message);
    }
  };

  return (
    <BarberAgendaPageView
      barbers={barbers}
      barbersLoading={barbersLoading}
      appointments={appointments}
      loading={loading}
      isAdmin={isAdmin}
      selectedBarberId={selectedBarberId}
      selectedDate={selectedDate}
      actionError={actionError}
      onBarberChange={setSelectedBarberId}
      onDateChange={setSelectedDate}
      onStatusChange={handleStatusChange}
      onClearActionError={() => setActionError('')}
    />
  );
};

export default BarberAgendaPageContainer;
