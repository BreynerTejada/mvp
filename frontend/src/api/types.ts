export interface Service {
  id: number;
  name: string;
  description: string;
  popularity_badge: string;
  price: string;
  duration_minutes: number;
  is_active: boolean;
  created_at: string;
}

export interface BarberSchedule {
  id: number;
  barber: number;
  day_of_week: number;
  day_of_week_display: string;
  start_time: string;
  end_time: string;
}

export interface Barber {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  phone: string;
  email: string;
  specialty: string;
  is_active: boolean;
  schedules: BarberSchedule[];
  created_at: string;
}

export interface BarberListItem {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  specialty: string;
  is_active: boolean;
}

export interface Client {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  phone: string;
  email: string;
  created_at: string;
}

export interface Slot {
  start_time: string;
  end_time: string;
}

export interface Appointment {
  id: number;
  client: Client;
  barber: BarberListItem;
  service: Service;
  date: string;
  start_time: string;
  end_time: string;
  status: string;
  status_display: string;
  notes: string;
  created_at: string;
  updated_at: string;
  client_credentials?: ClientCredentials;
}

export interface ClientCredentials {
  username: string;
  temp_password: string;
}

export interface AppointmentCreatePayload {
  client_first_name: string;
  client_last_name: string;
  client_phone: string;
  client_email?: string;
  client_password?: string;
  barber_id: number;
  service_id: number;
  date: string;
  start_time: string;
  notes?: string;
}

export interface AgendaResponse {
  barber: BarberListItem;
  date: string;
  appointments: Appointment[];
}

export interface AuthResponse {
  access: string;
  refresh: string;
}

export type UserRole = 'admin' | 'barber' | 'client' | 'guest';

export interface UserMe {
  id: number;
  username: string;
  email: string;
  full_name: string;
  role: UserRole;
  is_staff: boolean;
  barber_id: number | null;
  client_id: number | null;
}

export interface AppointmentUpdatePayload {
  barber_id?: number;
  service_id?: number;
  date?: string;
  start_time?: string;
  notes?: string;
}
