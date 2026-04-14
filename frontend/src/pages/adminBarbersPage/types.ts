import { BarberListItem } from '../../api/types';

export interface BarberFormData {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  specialty: string;
}

export interface FormMessage {
  type: 'success' | 'error';
  text: string;
}

export interface AdminBarbersPageViewProps {
  barbers: BarberListItem[];
  formData: BarberFormData;
  message: FormMessage | null;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
