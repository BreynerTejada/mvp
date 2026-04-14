import React from 'react';
import { useServices } from '../../hooks/useServices';
import ServicesPageView from './ServicesPageView';

const ServicesPageContainer: React.FC = () => {
  const { services, loading } = useServices();

  return <ServicesPageView services={services} loading={loading} />;
};

export default ServicesPageContainer;
