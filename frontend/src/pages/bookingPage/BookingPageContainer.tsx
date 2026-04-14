import React, { useState } from 'react';
import { useAppointments } from '../../hooks/useAppointments';
import { Service, BarberListItem, Slot } from '../../api/types';
import { ClientData } from '../../components/appointment/types';
import BookingPageView from './BookingPageView';

const BookingPageContainer: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<BarberListItem | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [clientData, setClientData] = useState<ClientData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });
  const [confirmed, setConfirmed] = useState(false);

  const { bookAppointment, loading, error } = useAppointments();

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const canGoNext = (): boolean => {
    switch (activeStep) {
      case 0: return !!selectedService;
      case 1: return !!selectedBarber;
      case 2: return !!selectedDate && !!selectedSlot;
      case 3: return !!(clientData.firstName && clientData.lastName && clientData.phone);
      default: return false;
    }
  };

  const handleConfirm = async () => {
    if (!selectedBarber || !selectedService || !selectedSlot) return;
    try {
      await bookAppointment({
        client_first_name: clientData.firstName,
        client_last_name: clientData.lastName,
        client_phone: clientData.phone,
        client_email: clientData.email,
        barber_id: selectedBarber.id,
        service_id: selectedService.id,
        date: selectedDate,
        start_time: selectedSlot.start_time,
      });
      setConfirmed(true);
    } catch {
      // error is handled by useAppointments hook
    }
  };

  const handleBookAnother = () => {
    setActiveStep(0);
    setSelectedService(null);
    setSelectedBarber(null);
    setSelectedDate('');
    setSelectedSlot(null);
    setClientData({ firstName: '', lastName: '', phone: '', email: '' });
    setConfirmed(false);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  return (
    <BookingPageView
      activeStep={activeStep}
      selectedService={selectedService}
      selectedBarber={selectedBarber}
      selectedDate={selectedDate}
      selectedSlot={selectedSlot}
      clientData={clientData}
      confirmed={confirmed}
      loading={loading}
      error={error}
      canGoNext={canGoNext()}
      onServiceSelect={setSelectedService}
      onBarberSelect={setSelectedBarber}
      onDateChange={handleDateChange}
      onSlotSelect={setSelectedSlot}
      onClientDataChange={setClientData}
      onNext={handleNext}
      onBack={handleBack}
      onConfirm={handleConfirm}
      onBookAnother={handleBookAnother}
    />
  );
};

export default BookingPageContainer;
