import { Service } from '../../api/types';

export interface AdminServiciosPageViewProps {
  services: Service[];
  loading: boolean;
  errorMessage: string | null;
  onClearError: () => void;
}
