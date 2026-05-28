import React from 'react';
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PageHeader from '../../components/styled/PageHeader';
import GoldButton from '../../components/styled/GoldButton';
import DataTable, { Column } from '../../components/styled/DataTable';
import RowActions from '../../components/styled/RowActions';
import AppointmentStatusChip from '../../components/styled/AppointmentStatusChip';
import { Appointment } from '../../api/types';
import { AdminCitasPageViewProps } from './types';
import {
  cellPrimarySx,
  cellSecondarySx,
  dialogPaperSx,
  dialogTitleSx,
  dialogContentSx,
  fieldRowSx,
  dialogActionsSx,
} from './adminCitasPage.styles';

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

const AdminCitasPageView: React.FC<AdminCitasPageViewProps> = ({
  appointments,
  barbers,
  services,
  loading,
  errorMessage,
  modalOpen,
  modalMode,
  formData,
  formError,
  formSubmitting,
  onOpenCreate,
  onOpenEdit,
  onCloseModal,
  onFormChange,
  onSubmit,
  onDelete,
  onClearError,
}) => {
  const columns: Column<Appointment>[] = [
    {
      key: 'date',
      header: 'Fecha y Hora',
      render: (row) => (
        <Box>
          <Typography sx={cellPrimarySx}>{formatDate(row.date)}</Typography>
          <Typography sx={cellSecondarySx}>
            <AccessTimeIcon fontSize="inherit" />
            {formatTime(row.start_time)}
          </Typography>
        </Box>
      ),
    },
    {
      key: 'client',
      header: 'Cliente',
      render: (row) => row.client?.full_name || '—',
    },
    {
      key: 'barber',
      header: 'Barbero',
      render: (row) => row.barber?.full_name || '—',
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
      key: 'actions',
      header: 'Acciones',
      align: 'right',
      render: (row) => (
        <RowActions
          onEdit={() => onOpenEdit(row)}
          onDelete={() => onDelete(row)}
        />
      ),
    },
  ];

  return (
    <Box>
      <PageHeader
        title="Citas"
        subtitle="Maneja las citas y los horarios de los barberos."
        action={
          <GoldButton startIcon={<AddIcon />} onClick={onOpenCreate}>
            Crear
          </GoldButton>
        }
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
          emptyMessage="Aún no hay citas registradas."
        />
      )}

      <Dialog
        open={modalOpen}
        onClose={onCloseModal}
        PaperProps={{ sx: dialogPaperSx }}
      >
        <DialogTitle sx={dialogTitleSx}>
          {modalMode === 'create' ? 'Crear cita' : 'Editar cita'}
        </DialogTitle>
        <DialogContent sx={dialogContentSx}>
          {formError && <Alert severity="error">{formError}</Alert>}

          <Box sx={fieldRowSx}>
            <TextField
              label="Nombre del cliente"
              value={formData.client_first_name}
              onChange={(e) => onFormChange('client_first_name', e.target.value)}
              disabled={modalMode === 'edit'}
              required
            />
            <TextField
              label="Apellido del cliente"
              value={formData.client_last_name}
              onChange={(e) => onFormChange('client_last_name', e.target.value)}
              disabled={modalMode === 'edit'}
              required
            />
          </Box>

          <Box sx={fieldRowSx}>
            <TextField
              label="Teléfono"
              value={formData.client_phone}
              onChange={(e) => onFormChange('client_phone', e.target.value)}
              disabled={modalMode === 'edit'}
              required
            />
            <TextField
              label="Email"
              type="email"
              value={formData.client_email}
              onChange={(e) => onFormChange('client_email', e.target.value)}
              disabled={modalMode === 'edit'}
            />
          </Box>

          <Box sx={fieldRowSx}>
            <TextField
              select
              label="Barbero"
              value={formData.barber_id}
              onChange={(e) => onFormChange('barber_id', Number(e.target.value))}
              required
            >
              {barbers.map((b) => (
                <MenuItem key={b.id} value={b.id}>
                  {b.full_name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Servicio"
              value={formData.service_id}
              onChange={(e) => onFormChange('service_id', Number(e.target.value))}
              required
            >
              {services.map((s) => (
                <MenuItem key={s.id} value={s.id}>
                  {s.name} — {s.duration_minutes} min
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box sx={fieldRowSx}>
            <TextField
              type="date"
              label="Fecha"
              value={formData.date}
              onChange={(e) => onFormChange('date', e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              type="time"
              label="Hora de inicio"
              value={formData.start_time}
              onChange={(e) => onFormChange('start_time', e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Box>

          <TextField
            label="Notas"
            multiline
            minRows={2}
            value={formData.notes}
            onChange={(e) => onFormChange('notes', e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={dialogActionsSx}>
          <Button onClick={onCloseModal} disabled={formSubmitting}>
            Cancelar
          </Button>
          <GoldButton onClick={onSubmit} disabled={formSubmitting}>
            {formSubmitting ? 'Guardando…' : 'Guardar'}
          </GoldButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminCitasPageView;
