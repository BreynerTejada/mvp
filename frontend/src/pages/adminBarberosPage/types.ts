import { BarberListItem } from '../../api/types';

export interface BarberFormData {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  specialty: string;
}

export interface AdminBarberosPageViewProps {
  barbers: BarberListItem[];
  loading: boolean;
  errorMessage: string | null;
  modalOpen: boolean;
  formData: BarberFormData;
  formError: string | null;
  formSubmitting: boolean;
  onOpenCreate: () => void;
  onCloseModal: () => void;
  onFormChange: (field: keyof BarberFormData, value: string) => void;
  onSubmit: () => void;
  onDelete: (barber: BarberListItem) => void;
  onClearError: () => void;
}
