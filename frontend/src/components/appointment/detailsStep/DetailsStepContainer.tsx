import DetailsStepView from './DetailsStepView';
import { DetailsStepContainerProps } from '../types';

function DetailsStepContainer({
  service,
  barber,
  date,
  slot,
  clientData,
  onClientDataChange,
  error,
}: DetailsStepContainerProps) {
  return (
    <DetailsStepView
      service={service}
      barber={barber}
      date={date}
      slot={slot}
      clientData={clientData}
      onClientDataChange={onClientDataChange}
      error={error}
    />
  );
}

export default DetailsStepContainer;
