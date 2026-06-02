import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppointments } from '../../hooks/useAppointments';
import { Service, BarberListItem, Slot, ClientCredentials } from '../../api/types';
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
  const [credentials, setCredentials] = useState<ClientCredentials | null>(null);
  const [hasHandledPreselection, setHasHandledPreselection] = useState(false);
  const [searchParams] = useSearchParams();

  const { bookAppointment, loading, error } = useAppointments();

  const preselectedServiceId = useMemo(() => {
    const rawServiceId = searchParams.get('serviceId');
    if (!rawServiceId) {
      return undefined;
    }

    const parsedServiceId = Number.parseInt(rawServiceId, 10);
    if (Number.isNaN(parsedServiceId) || parsedServiceId <= 0) {
      return undefined;
    }

    return parsedServiceId;
  }, [searchParams]);

  const pendingPreselectedServiceId = hasHandledPreselection
    ? undefined
    : preselectedServiceId;

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
      const appointment = await bookAppointment({
        client_first_name: clientData.firstName,
        client_last_name: clientData.lastName,
        client_phone: clientData.phone,
        client_email: clientData.email,
        barber_id: selectedBarber.id,
        service_id: selectedService.id,
        date: selectedDate,
        start_time: selectedSlot.start_time,
      });
      setCredentials(appointment.client_credentials ?? null);
      setConfirmed(true);
    } catch {
    }
  };

  const handlePreselectedServiceResolved = (service: Service | null) => {
    if (hasHandledPreselection) {
      return;
    }

    setHasHandledPreselection(true);

    if (service) {
      setSelectedService(service);
      setActiveStep(1);
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
    setCredentials(null);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  return (
    <BookingPageView
      activeStep={activeStep}
      selectedService={selectedService}
      preselectedServiceId={pendingPreselectedServiceId}
      selectedBarber={selectedBarber}
      selectedDate={selectedDate}
      selectedSlot={selectedSlot}
      clientData={clientData}
      confirmed={confirmed}
      credentials={credentials}
      loading={loading}
      error={error}
      canGoNext={canGoNext()}
      onServiceSelect={setSelectedService}
      onPreselectedServiceResolved={handlePreselectedServiceResolved}
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
