import { Appointment, BarberListItem } from '../../api/types';

export interface StatusConfig {
  label: string;
  color: 'warning' | 'info' | 'success' | 'error';
}

export const STATUS_LABELS: Record<string, StatusConfig> = {
  PENDING: { label: 'Pendiente', color: 'warning' },
  CONFIRMED: { label: 'Confirmada', color: 'info' },
  COMPLETED: { label: 'Completada', color: 'success' },
  CANCELLED: { label: 'Cancelada', color: 'error' },
};

export interface BarberAgendaPageViewProps {
  barbers: BarberListItem[];
  barbersLoading: boolean;
  appointments: Appointment[];
  loading: boolean;
  isAdmin: boolean;
  selectedBarberId: number | string;
  selectedDate: string;
  actionError: string;
  onBarberChange: (barberId: string) => void;
  onDateChange: (date: string) => void;
  onStatusChange: (appointmentId: number, newStatus: string) => void;
  onClearActionError: () => void;
}
