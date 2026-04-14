import { useBarbers } from '../../../hooks/useBarbers';
import BarberStepView from './BarberStepView';
import { BarberStepContainerProps } from '../types';

function BarberStepContainer({ selectedBarber, onBarberSelect }: BarberStepContainerProps) {
  const { barbers, loading } = useBarbers();

  return (
    <BarberStepView
      barbers={barbers}
      selectedId={selectedBarber?.id}
      onSelect={onBarberSelect}
      loading={loading}
    />
  );
}

export default BarberStepContainer;
