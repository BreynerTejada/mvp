import { Service, BarberListItem, Slot } from '../../api/types';

export interface ClientData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface ServiceStepContainerProps {
  selectedService: Service | null;
  onServiceSelect: (service: Service) => void;
  preselectedServiceId?: number;
  onPreselectedServiceResolved?: (service: Service | null) => void;
}

export interface ServiceStepViewProps {
  services: Service[];
  selectedId: number | undefined;
  onSelect: (service: Service) => void;
  loading: boolean;
}

export interface BarberStepContainerProps {
  selectedBarber: BarberListItem | null;
  onBarberSelect: (barber: BarberListItem) => void;
}

export interface BarberStepViewProps {
  barbers: BarberListItem[];
  selectedId: number | undefined;
  onSelect: (barber: BarberListItem) => void;
  loading: boolean;
}

export interface DateTimeStepContainerProps {
  barber: BarberListItem | null;
  service: Service | null;
  selectedDate: string;
  onDateChange: (date: string) => void;
  selectedSlot: Slot | null;
  onSlotSelect: (slot: Slot) => void;
}

export interface DateTimeStepViewProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  slots: Slot[];
  selectedSlot: Slot | null;
  onSlotSelect: (slot: Slot) => void;
  loading: boolean;
  error: string | null;
}

export interface DetailsStepContainerProps {
  service: Service | null;
  barber: BarberListItem | null;
  date: string;
  slot: Slot | null;
  clientData: ClientData;
  onClientDataChange: (data: ClientData) => void;
  error: string | null;
}

export interface DetailsStepViewProps {
  service: Service | null;
  barber: BarberListItem | null;
  date: string;
  slot: Slot | null;
  clientData: ClientData;
  onClientDataChange: (data: ClientData) => void;
  error: string | null;
}

export interface ConfirmationViewProps {
  onBookAnother: () => void;
}
