import { Appointment } from '../../api/types';

export interface BarberHorarioPageViewProps {
  appointments: Appointment[];
  loading: boolean;
  errorMessage: string | null;
  welcomeName: string;
  onStatusChange: (appointment: Appointment, nextStatus: string) => void;
  onClearError: () => void;
}
