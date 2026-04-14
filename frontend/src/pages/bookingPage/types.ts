import { Service, BarberListItem, Slot } from '../../api/types';
import { ClientData } from '../../components/appointment/types';

export interface BookingPageViewProps {
  activeStep: number;
  selectedService: Service | null;
  selectedBarber: BarberListItem | null;
  selectedDate: string;
  selectedSlot: Slot | null;
  clientData: ClientData;
  confirmed: boolean;
  loading: boolean;
  error: string | null;
  canGoNext: boolean;
  onServiceSelect: (service: Service) => void;
  onBarberSelect: (barber: BarberListItem) => void;
  onDateChange: (date: string) => void;
  onSlotSelect: (slot: Slot) => void;
  onClientDataChange: (data: ClientData) => void;
  onNext: () => void;
  onBack: () => void;
  onConfirm: () => void;
  onBookAnother: () => void;
}
