import React, { useState, useEffect } from 'react';
import { getBarbers, createBarber } from '../../api/client';
import { BarberListItem } from '../../api/types';
import { BarberFormData, FormMessage } from './types';
import AdminBarbersPageView from './AdminBarbersPageView';

const AdminBarbersPageContainer: React.FC = () => {
  const [barbers, setBarbers] = useState<BarberListItem[]>([]);
  const [formData, setFormData] = useState<BarberFormData>({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    specialty: '',
  });
  const [message, setMessage] = useState<FormMessage | null>(null);

  useEffect(() => {
    loadBarbers();
  }, []);

  const loadBarbers = async () => {
    try {
      const response = await getBarbers();
      setBarbers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createBarber(formData);
      setMessage({ type: 'success', text: 'Barbero creado correctamente' });
      setFormData({ first_name: '', last_name: '', phone: '', email: '', specialty: '' });
      loadBarbers();
    } catch {
      setMessage({ type: 'error', text: 'Error al crear barbero. Verifique los datos.' });
    }
  };

  return (
    <AdminBarbersPageView
      barbers={barbers}
      formData={formData}
      message={message}
      onFormChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export default AdminBarbersPageContainer;
