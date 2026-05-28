import { Service } from '../../api/types';

export interface ServiceFormData {
  name: string;
  description: string;
  price: string;
  duration_minutes: string;
  popularity_badge: string;
}

export interface AdminServiciosPageViewProps {
  services: Service[];
  loading: boolean;
  errorMessage: string | null;
  modalOpen: boolean;
  formData: ServiceFormData;
  formError: string | null;
  formSubmitting: boolean;
  onClearError: () => void;
  onOpenCreate: () => void;
  onCloseModal: () => void;
  onFormChange: (field: keyof ServiceFormData, value: string) => void;
  onSubmit: () => void;
  onDelete: (service: Service) => void;
}
