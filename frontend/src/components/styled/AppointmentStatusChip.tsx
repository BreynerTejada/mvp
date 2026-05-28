import React from 'react';
import { Chip } from '@mui/material';
import { chipSx } from './AppointmentStatusChip.styles';

type StatusKey = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | string;

interface AppointmentStatusChipProps {
  status: StatusKey;
  size?: 'small' | 'medium';
}

const LABELS: Record<string, string> = {
  PENDING: 'Pendiente',
  CONFIRMED: 'Confirmado',
  COMPLETED: 'Completado',
  CANCELLED: 'Cancelado',
};

const AppointmentStatusChip: React.FC<AppointmentStatusChipProps> = ({
  status,
  size = 'small',
}) => {
  const label = LABELS[status] || status;
  return <Chip label={label} size={size} sx={chipSx(status)} />;
};

export default AppointmentStatusChip;
