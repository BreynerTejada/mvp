import React, { useCallback, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import apiClient, { getBarbers, createBarber } from '../../api/client';
import { BarberListItem } from '../../api/types';
import { BarberFormData } from './types';
import AdminBarberosPageView from './AdminBarberosPageView';

const buildEmptyForm = (): BarberFormData => ({
  first_name: '',
  last_name: '',
  phone: '',
  email: '',
  specialty: '',
});

const AdminBarberosPageContainer: React.FC = () => {
  const [barbers, setBarbers] = useState<BarberListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<BarberFormData>(buildEmptyForm());
  const [formError, setFormError] = useState<string | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const loadBarbers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getBarbers();
      setBarbers(response.data);
    } catch {
      setErrorMessage('No se pudieron cargar los barberos.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBarbers();
  }, [loadBarbers]);

  const handleOpenCreate = () => {
    setFormData(buildEmptyForm());
    setFormError(null);
    setModalOpen(true);
  };

  const handleFormChange = (field: keyof BarberFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      setFormSubmitting(true);
      setFormError(null);
      await createBarber(formData);
      setModalOpen(false);
      await loadBarbers();
    } catch (err) {
      const errorResponse = (err as AxiosError<Record<string, string[]>>).response?.data;
      const detail = errorResponse
        ? Object.values(errorResponse).flat().join(' ')
        : 'No se pudo crear el barbero.';
      setFormError(detail);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDelete = async (barber: BarberListItem) => {
    const confirmed = window.confirm(
      `¿Inactivar al barbero ${barber.full_name}?`,
    );
    if (!confirmed) return;
    try {
      await apiClient.delete(`/barbers/${barber.id}/`);
      await loadBarbers();
    } catch {
      setErrorMessage('No se pudo eliminar el barbero.');
    }
  };

  return (
    <AdminBarberosPageView
      barbers={barbers}
      loading={loading}
      errorMessage={errorMessage}
      modalOpen={modalOpen}
      formData={formData}
      formError={formError}
      formSubmitting={formSubmitting}
      onOpenCreate={handleOpenCreate}
      onCloseModal={() => setModalOpen(false)}
      onFormChange={handleFormChange}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      onClearError={() => setErrorMessage(null)}
    />
  );
};

export default AdminBarberosPageContainer;
