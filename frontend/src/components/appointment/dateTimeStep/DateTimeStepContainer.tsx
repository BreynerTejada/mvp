import { useEffect } from 'react';
import { useAvailability } from '../../../hooks/useAvailability';
import DateTimeStepView from './DateTimeStepView';
import { DateTimeStepContainerProps } from '../types';

function DateTimeStepContainer({
  barber,
  service,
  selectedDate,
  onDateChange,
  selectedSlot,
  onSlotSelect,
}: DateTimeStepContainerProps) {
  const { slots, loading, error, fetchAvailability, clearSlots } = useAvailability();

  useEffect(() => {
    if (barber?.id && service?.id && selectedDate) {
      fetchAvailability(barber.id, selectedDate, service.id);
    } else {
      clearSlots();
    }
  }, [barber?.id, service?.id, selectedDate, fetchAvailability, clearSlots]);

  return (
    <DateTimeStepView
      selectedDate={selectedDate}
      onDateChange={onDateChange}
      slots={slots}
      selectedSlot={selectedSlot}
      onSlotSelect={onSlotSelect}
      loading={loading}
      error={error}
    />
  );
}

export default DateTimeStepContainer;
