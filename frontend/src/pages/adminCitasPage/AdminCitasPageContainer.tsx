import React, { useCallback, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from '../../api/client';
import { useBarbers } from '../../hooks/useBarbers';
import { useServices } from '../../hooks/useServices';
import { Appointment } from '../../api/types';
import { AppointmentFormData } from './types';
import AdminCitasPageView from './AdminCitasPageView';

const buildEmptyForm = (): AppointmentFormData => ({
  client_first_name: '',
  client_last_name: '',
  client_phone: '',
  client_email: '',
  barber_id: '',
  service_id: '',
  date: new Date().toISOString().split('T')[0],
  start_time: '10:00',
  notes: '',
});

const AdminCitasPageContainer: React.FC = () => {
  const { barbers } = useBarbers();
  const { services } = useServices();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [formData, setFormData] = useState<AppointmentFormData>(buildEmptyForm());
  const [formError, setFormError] = useState<string | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const loadAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAppointments();
      setAppointments(response.data);
    } catch {
      setErrorMessage('No se pudieron cargar las citas.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  const handleOpenCreate = () => {
    setModalMode('create');
    setFormData(buildEmptyForm());
    setFormError(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (appointment: Appointment) => {
    setModalMode('edit');
    setFormError(null);
    setFormData({
      id: appointment.id,
      client_first_name: appointment.client.first_name,
      client_last_name: appointment.client.last_name,
      client_phone: appointment.client.phone,
      client_email: appointment.client.email || '',
      barber_id: appointment.barber.id,
      service_id: appointment.service.id,
      date: appointment.date,
      start_time: appointment.start_time.slice(0, 5),
      notes: appointment.notes,
    });
    setModalOpen(true);
  };

  const handleFormChange = (
    field: keyof AppointmentFormData,
    value: string | number,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.barber_id || !formData.service_id) {
      setFormError('Selecciona barbero y servicio.');
      return;
    }
    if (!formData.date || !formData.start_time) {
      setFormError('Selecciona fecha y hora.');
      return;
    }
    try {
      setFormSubmitting(true);
      setFormError(null);
      if (modalMode === 'create') {
        await createAppointment({
          client_first_name: formData.client_first_name,
          client_last_name: formData.client_last_name,
          client_phone: formData.client_phone,
          client_email: formData.client_email,
          barber_id: Number(formData.barber_id),
          service_id: Number(formData.service_id),
          date: formData.date,
          start_time: formData.start_time,
          notes: formData.notes,
        });
      } else if (formData.id) {
        await updateAppointment(formData.id, {
          barber_id: Number(formData.barber_id),
          service_id: Number(formData.service_id),
          date: formData.date,
          start_time: formData.start_time,
          notes: formData.notes,
        });
      }
      setModalOpen(false);
      await loadAppointments();
    } catch (err) {
      const message =
        (err as AxiosError<{ error?: string }>).response?.data?.error ||
        'No se pudo guardar la cita. Revisa los campos.';
      setFormError(message);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDelete = async (appointment: Appointment) => {
    const confirmed = window.confirm(
      `¿Eliminar la cita de ${appointment.client.full_name} el ${appointment.date}?`,
    );
    if (!confirmed) return;
    try {
      await deleteAppointment(appointment.id);
      await loadAppointments();
    } catch {
      setErrorMessage('No se pudo eliminar la cita.');
    }
  };

  return (
    <AdminCitasPageView
      appointments={appointments}
      barbers={barbers}
      services={services}
      loading={loading}
      errorMessage={errorMessage}
      modalOpen={modalOpen}
      modalMode={modalMode}
      formData={formData}
      formError={formError}
      formSubmitting={formSubmitting}
      onOpenCreate={handleOpenCreate}
      onOpenEdit={handleOpenEdit}
      onCloseModal={() => setModalOpen(false)}
      onFormChange={handleFormChange}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      onClearError={() => setErrorMessage(null)}
    />
  );
};

export default AdminCitasPageContainer;
