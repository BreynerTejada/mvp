import { Client } from '../../api/types';

export interface ClientFormData {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  password: string;
}

export interface AdminClientesPageViewProps {
  clients: Client[];
  loading: boolean;
  errorMessage: string | null;
  modalOpen: boolean;
  formData: ClientFormData;
  formError: string | null;
  formSubmitting: boolean;
  showPassword: boolean;
  onClearError: () => void;
  onOpenCreate: () => void;
  onCloseModal: () => void;
  onFormChange: (field: keyof ClientFormData, value: string) => void;
  onToggleShowPassword: () => void;
  onSubmit: () => void;
  onDelete: (client: Client) => void;
}
