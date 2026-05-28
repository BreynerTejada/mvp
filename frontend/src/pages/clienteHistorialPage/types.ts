import { Appointment } from '../../api/types';

export interface ClienteHistorialPageViewProps {
  appointments: Appointment[];
  loading: boolean;
  errorMessage: string | null;
  welcomeName: string;
  onClearError: () => void;
}
