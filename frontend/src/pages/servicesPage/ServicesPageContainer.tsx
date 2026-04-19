import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useServices } from '../../hooks/useServices';
import ServicesPageView from './ServicesPageView';

const ServicesPageContainer: React.FC = () => {
  const { services, loading } = useServices();
  const navigate = useNavigate();

  const handleBookService = (serviceId: number) => {
    navigate(`/agendar?serviceId=${serviceId}`);
  };

  return (
    <ServicesPageView
      services={services}
      loading={loading}
      onBookService={handleBookService}
    />
  );
};

export default ServicesPageContainer;
