import { Appointment, BarberListItem, Service } from '../../api/types';

export interface AppointmentFormData {
  id?: number;
  client_first_name: string;
  client_last_name: string;
  client_phone: string;
  client_email: string;
  barber_id: number | '';
  service_id: number | '';
  date: string;
  start_time: string;
  notes: string;
}

export interface AdminCitasPageViewProps {
  appointments: Appointment[];
  barbers: BarberListItem[];
  services: Service[];
  loading: boolean;
  errorMessage: string | null;
  modalOpen: boolean;
  modalMode: 'create' | 'edit';
  formData: AppointmentFormData;
  formError: string | null;
  formSubmitting: boolean;
  onOpenCreate: () => void;
  onOpenEdit: (appointment: Appointment) => void;
  onCloseModal: () => void;
  onFormChange: (field: keyof AppointmentFormData, value: string | number) => void;
  onSubmit: () => void;
  onDelete: (appointment: Appointment) => void;
  onClearError: () => void;
}
