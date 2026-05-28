import React, { useCallback, useState } from 'react';
import { AxiosError } from 'axios';
import { createService, deleteService } from '../../api/client';
import { Service } from '../../api/types';
import { useServices } from '../../hooks/useServices';
import { ServiceFormData } from './types';
import AdminServiciosPageView from './AdminServiciosPageView';

const buildEmptyForm = (): ServiceFormData => ({
  name: '',
  description: '',
  price: '',
  duration_minutes: '',
  popularity_badge: '',
});

const AdminServiciosPageContainer: React.FC = () => {
  const { services, loading, error, refetch } = useServices();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<ServiceFormData>(buildEmptyForm());
  const [formError, setFormError] = useState<string | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const displayError = errorMessage || error;

  const handleOpenCreate = () => {
    setFormData(buildEmptyForm());
    setFormError(null);
    setModalOpen(true);
  };

  const handleFormChange = (field: keyof ServiceFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      setFormSubmitting(true);
      setFormError(null);
      await createService({
        name: formData.name,
        description: formData.description,
        price: formData.price,
        duration_minutes: Number(formData.duration_minutes),
        popularity_badge: formData.popularity_badge,
        is_active: true,
      });
      setModalOpen(false);
      await refetch();
    } catch (err) {
      const errorResponse = (err as AxiosError<Record<string, string[]>>).response?.data;
      const detail = errorResponse
        ? Object.values(errorResponse).flat().join(' ')
        : 'No se pudo crear el servicio.';
      setFormError(detail);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDelete = useCallback(async (service: Service) => {
    const confirmed = window.confirm(`¿Eliminar el servicio "${service.name}"?`);
    if (!confirmed) return;
    try {
      await deleteService(service.id);
      await refetch();
    } catch {
      setErrorMessage('No se pudo eliminar el servicio.');
    }
  }, [refetch]);

  return (
    <AdminServiciosPageView
      services={services}
      loading={loading}
      errorMessage={displayError}
      modalOpen={modalOpen}
      formData={formData}
      formError={formError}
      formSubmitting={formSubmitting}
      onClearError={() => setErrorMessage(null)}
      onOpenCreate={handleOpenCreate}
      onCloseModal={() => setModalOpen(false)}
      onFormChange={handleFormChange}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
    />
  );
};

export default AdminServiciosPageContainer;
