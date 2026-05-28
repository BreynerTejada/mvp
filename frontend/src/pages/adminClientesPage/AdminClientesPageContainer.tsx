import React, { useCallback, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { getClients, createClient, deleteClient } from '../../api/client';
import { Client } from '../../api/types';
import { ClientFormData } from './types';
import AdminClientesPageView from './AdminClientesPageView';

const buildEmptyForm = (): ClientFormData => ({
  first_name: '',
  last_name: '',
  phone: '',
  email: '',
  password: '',
});

const AdminClientesPageContainer: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<ClientFormData>(buildEmptyForm());
  const [formError, setFormError] = useState<string | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const loadClients = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getClients();
      setClients(response.data);
    } catch {
      setErrorMessage('No se pudieron cargar los clientes.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadClients();
  }, [loadClients]);

  const handleOpenCreate = () => {
    setFormData(buildEmptyForm());
    setFormError(null);
    setShowPassword(false);
    setModalOpen(true);
  };

  const handleFormChange = (field: keyof ClientFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      setFormSubmitting(true);
      setFormError(null);
      const payload: Record<string, string> = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
        email: formData.email,
      };
      if (formData.password) {
        payload.password = formData.password;
      }
      await createClient(payload);
      setModalOpen(false);
      await loadClients();
    } catch (err) {
      const errorResponse = (err as AxiosError<Record<string, string[]>>).response?.data;
      const detail = errorResponse
        ? Object.values(errorResponse).flat().join(' ')
        : 'No se pudo crear el cliente.';
      setFormError(detail);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDelete = useCallback(async (client: Client) => {
    const confirmed = window.confirm(`¿Eliminar al cliente ${client.full_name}?`);
    if (!confirmed) return;
    try {
      await deleteClient(client.id);
      await loadClients();
    } catch {
      setErrorMessage('No se pudo eliminar el cliente.');
    }
  }, [loadClients]);

  return (
    <AdminClientesPageView
      clients={clients}
      loading={loading}
      errorMessage={errorMessage}
      modalOpen={modalOpen}
      formData={formData}
      formError={formError}
      formSubmitting={formSubmitting}
      showPassword={showPassword}
      onClearError={() => setErrorMessage(null)}
      onOpenCreate={handleOpenCreate}
      onCloseModal={() => setModalOpen(false)}
      onFormChange={handleFormChange}
      onToggleShowPassword={() => setShowPassword((prev) => !prev)}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
    />
  );
};

export default AdminClientesPageContainer;
