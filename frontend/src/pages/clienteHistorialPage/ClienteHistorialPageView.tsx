import React from 'react';
import { Box, Typography, Alert, CircularProgress } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PageHeader from '../../components/styled/PageHeader';
import DataTable, { Column } from '../../components/styled/DataTable';
import AppointmentStatusChip from '../../components/styled/AppointmentStatusChip';
import { Appointment } from '../../api/types';
import { ClienteHistorialPageViewProps } from './types';
import {
  dateCellSx,
  timeRowSx,
  serviceCellSx,
} from './clienteHistorialPage.styles';

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

const ClienteHistorialPageView: React.FC<ClienteHistorialPageViewProps> = ({
  appointments,
  loading,
  errorMessage,
  welcomeName,
  onClearError,
}) => {
  const columns: Column<Appointment>[] = [
    {
      key: 'date',
      header: 'Fecha y Hora',
      render: (row) => (
        <Box>
          <Typography sx={dateCellSx}>
            <CalendarTodayIcon fontSize="inherit" />
            {formatDate(row.date)}
          </Typography>
          <Typography sx={timeRowSx}>
            <AccessTimeIcon fontSize="inherit" />
            {formatTime(row.start_time)}
          </Typography>
        </Box>
      ),
    },
    {
      key: 'service',
      header: 'Servicio',
      render: (row) => (
        <Typography sx={serviceCellSx}>{row.service?.name || '—'}</Typography>
      ),
    },
    {
      key: 'barber',
      header: 'Barbero',
      render: (row) => row.barber?.full_name || '—',
    },
    {
      key: 'status',
      header: 'Estado',
      align: 'right',
      render: (row) => <AppointmentStatusChip status={row.status} />,
    },
  ];

  return (
    <Box>
      <PageHeader
        title={`Bienvenido, ${welcomeName}`}
        subtitle="Visualiza tus visitas anteriores y tus citas confirmadas."
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
          emptyMessage="Aún no tienes citas. Agenda una desde el sitio principal."
        />
      )}
    </Box>
  );
};

export default ClienteHistorialPageView;
