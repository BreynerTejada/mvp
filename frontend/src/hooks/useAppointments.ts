import { useState, useCallback } from 'react';
import { createAppointment, getBarberAgenda, updateAppointmentStatus } from '../api/client';
import { Appointment, AppointmentCreatePayload } from '../api/types';
import { AxiosError } from 'axios';

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const bookAppointment = useCallback(async (data: AppointmentCreatePayload) => {
    try {
      setLoading(true);
      setError(null);
      const response = await createAppointment(data);
      return response.data;
    } catch (err: unknown) {
      const errorMsg = (err as AxiosError<{ error: string }>).response?.data?.error || 'Error al crear la cita.';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAgenda = useCallback(async (barberId: number, date: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getBarberAgenda(barberId, date);
      setAppointments(response.data.appointments || []);
    } catch (err) {
      setError('Error al cargar la agenda.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const changeStatus = useCallback(async (appointmentId: number, status: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await updateAppointmentStatus(appointmentId, status);
      setAppointments((prev) =>
        prev.map((a) => (a.id === appointmentId ? response.data : a))
      );
      return response.data;
    } catch (err: unknown) {
      const errorMsg = (err as AxiosError<{ error: string }>).response?.data?.error || 'Error al cambiar el estado.';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    appointments,
    loading,
    error,
    bookAppointment,
    fetchAgenda,
    changeStatus,
    clearError: () => setError(null),
  };
}
