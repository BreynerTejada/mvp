import { useEffect, useRef } from 'react';
import { useServices } from '../../../hooks/useServices';
import ServiceStepView from './ServiceStepView';
import { ServiceStepContainerProps } from '../types';

function ServiceStepContainer({
  selectedService,
  onServiceSelect,
  preselectedServiceId,
  onPreselectedServiceResolved,
}: ServiceStepContainerProps) {
  const { services, loading } = useServices();
  const hasResolvedPreselection = useRef(false);

  useEffect(() => {
    if (hasResolvedPreselection.current) {
      return;
    }

    if (typeof preselectedServiceId !== 'number' || loading) {
      return;
    }

    const matchedService = services.find((service) => service.id === preselectedServiceId) ?? null;

    if (matchedService && selectedService?.id !== matchedService.id) {
      onServiceSelect(matchedService);
    }

    hasResolvedPreselection.current = true;
    onPreselectedServiceResolved?.(matchedService);
  }, [
    loading,
    onPreselectedServiceResolved,
    onServiceSelect,
    preselectedServiceId,
    selectedService?.id,
    services,
  ]);

  return (
    <ServiceStepView
      services={services}
      selectedId={selectedService?.id}
      onSelect={onServiceSelect}
      loading={loading}
    />
  );
}

export default ServiceStepContainer;
