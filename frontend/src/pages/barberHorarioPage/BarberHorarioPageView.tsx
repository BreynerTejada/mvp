import React from 'react';
import { Box, Typography, Button, Alert, CircularProgress } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/PersonOutline';
import PageHeader from '../../components/styled/PageHeader';
import DataTable, { Column } from '../../components/styled/DataTable';
import AppointmentStatusChip from '../../components/styled/AppointmentStatusChip';
import { Appointment } from '../../api/types';
import { BarberHorarioPageViewProps } from './types';
import {
  dateCellSx,
  timeSx,
  clientCellSx,
  actionButtonSx,
} from './barberHorarioPage.styles';

const formatDate = (iso: string) => {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${d}-${m}-${y}`;
};

const formatTime = (raw: string) => {
  if (!raw) return '';
  const [h, m] = raw.split(':');
  const hour = parseInt(h, 10);
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const display = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${String(display).padStart(2, '0')}:${m} ${suffix}`;
};

const nextStatusFor = (status: string): { label: string; next: string } | null => {
  if (status === 'PENDING') return { label: 'Confirmar', next: 'CONFIRMED' };
  if (status === 'CONFIRMED') return { label: 'Completar', next: 'COMPLETED' };
  return null;
};

const BarberHorarioPageView: React.FC<BarberHorarioPageViewProps> = ({
  appointments,
  loading,
  errorMessage,
  welcomeName,
  onStatusChange,
  onClearError,
}) => {
  const columns: Column<Appointment>[] = [
    {
      key: 'date',
      header: 'Fecha y Hora',
      render: (row) => (
        <Box>
          <Typography sx={dateCellSx}>{formatDate(row.date)}</Typography>
          <Typography sx={timeSx}>
            <AccessTimeIcon fontSize="inherit" />
            {formatTime(row.start_time)}
          </Typography>
        </Box>
      ),
    },
    {
      key: 'client',
      header: 'Cliente',
      render: (row) => (
        <Box sx={clientCellSx}>
          <PersonIcon fontSize="small" />
          {row.client?.full_name || '—'}
        </Box>
      ),
    },
    {
      key: 'service',
      header: 'Servicio',
      render: (row) => row.service?.name || '—',
    },
    {
      key: 'status',
      header: 'Estado',
      render: (row) => <AppointmentStatusChip status={row.status} />,
    },
    {
      key: 'change',
      header: 'Cambiar Estado',
      align: 'right',
      render: (row) => {
        const next = nextStatusFor(row.status);
        if (!next) {
          return (
            <Button variant="outlined" sx={actionButtonSx} disabled>
              {row.status_display}
            </Button>
          );
        }
        return (
          <Button
            variant="outlined"
            sx={actionButtonSx}
            onClick={() => onStatusChange(row, next.next)}
          >
            {next.label}
          </Button>
        );
      },
    },
  ];

  return (
    <Box>
      <PageHeader
        title={`Hola, ${welcomeName}`}
        subtitle="Maneja el estado de tus citas."
      />

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={onClearError}>
          {errorMessage}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <CircularProgress sx={{ color: 'primary.main' }} />
        </Box>
      ) : (
        <DataTable
          columns={columns}
          rows={appointments}
          rowKey={(r) => r.id}
          emptyMessage="No tienes citas asignadas."
        />
      )}
    </Box>
  );
};

export default BarberHorarioPageView;
