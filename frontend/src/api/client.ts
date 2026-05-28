import axios, { InternalAxiosRequestConfig } from 'axios';
import {
  AuthResponse,
  UserMe,
  Service,
  Barber,
  BarberListItem,
  BarberSchedule,
  Slot,
  Appointment,
  AppointmentCreatePayload,
  AppointmentUpdatePayload,
  AgendaResponse,
  Client,
} from './types';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('access_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginApi = (username: string, password: string) =>
  apiClient.post<AuthResponse>('/token/', { username, password });

export const fetchMeApi = () =>
  apiClient.get<UserMe>('/auth/me/');

export const getServices = () =>
  apiClient.get<Service[]>('/services/');

export const createService = (data: Partial<Service>) =>
  apiClient.post<Service>('/services/', data);

export const getBarbers = () =>
  apiClient.get<BarberListItem[]>('/barbers/');

export const createBarber = (data: Partial<Barber>) =>
  apiClient.post<Barber>('/barbers/', data);

export const getBarber = (id: number) =>
  apiClient.get<Barber>(`/barbers/${id}/`);

export const getBarberSchedules = (id: number) =>
  apiClient.get<BarberSchedule[]>(`/barbers/${id}/schedules/`);

export const getBarberAvailability = (id: number, date: string, serviceId: number) =>
  apiClient.get<{ available_slots: Slot[] }>(`/barbers/${id}/availability/`, {
    params: { date, service_id: serviceId },
  });

export const getBarberAgenda = (id: number, date: string) =>
  apiClient.get<AgendaResponse>(`/barbers/${id}/agenda/`, { params: { date } });

export const createAppointment = (data: AppointmentCreatePayload) =>
  apiClient.post<Appointment>('/appointments/', data);

export const getAppointments = (params?: Record<string, string | number>) =>
  apiClient.get<Appointment[]>('/appointments/', { params });

export const getMyAppointments = () =>
  apiClient.get<Appointment[]>('/appointments/mine/');

export const updateAppointment = (id: number, data: AppointmentUpdatePayload) =>
  apiClient.patch<Appointment>(`/appointments/${id}/`, data);

export const deleteAppointment = (id: number) =>
  apiClient.delete(`/appointments/${id}/`);

export const updateAppointmentStatus = (id: number, status: string) =>
  apiClient.patch<Appointment>(`/appointments/${id}/status/`, { status });

export const getClients = () =>
  apiClient.get<Client[]>('/clients/');

export const createClient = (data: Partial<Client>) =>
  apiClient.post<Client>('/clients/', data);

export default apiClient;
