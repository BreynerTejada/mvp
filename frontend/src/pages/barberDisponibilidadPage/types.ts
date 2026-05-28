export interface DaySchedule {
  dayOfWeek: number;
  dayName: string;
  enabled: boolean;
  startTime: string;
  endTime: string;
}

export interface BarberDisponibilidadPageViewProps {
  days: DaySchedule[];
  loading: boolean;
  saving: boolean;
  error: string | null;
  success: boolean;
  onToggleDay: (dayOfWeek: number) => void;
  onChangeTime: (dayOfWeek: number, field: 'startTime' | 'endTime', value: string) => void;
  onSave: () => void;
  onClearMessages: () => void;
}
