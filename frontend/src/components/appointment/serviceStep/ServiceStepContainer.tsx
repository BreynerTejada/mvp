import { useServices } from '../../../hooks/useServices';
import ServiceStepView from './ServiceStepView';
import { ServiceStepContainerProps } from '../types';

function ServiceStepContainer({ selectedService, onServiceSelect }: ServiceStepContainerProps) {
  const { services, loading } = useServices();

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
