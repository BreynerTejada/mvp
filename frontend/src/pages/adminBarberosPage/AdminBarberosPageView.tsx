import React from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PageHeader from '../../components/styled/PageHeader';
import GoldButton from '../../components/styled/GoldButton';
import DataTable, { Column } from '../../components/styled/DataTable';
import RowActions from '../../components/styled/RowActions';
import PersonAvatar from '../../components/styled/PersonAvatar';
import { BarberListItem } from '../../api/types';
import { AdminBarberosPageViewProps } from './types';
import {
  barberCellSx,
  roleCellSx,
  dialogPaperSx,
  dialogTitleSx,
  dialogContentSx,
  fieldRowSx,
  dialogActionsSx,
} from './adminBarberosPage.styles';

const AdminBarberosPageView: React.FC<AdminBarberosPageViewProps> = ({
  barbers,
  loading,
  errorMessage,
  modalOpen,
  formData,
  formError,
  formSubmitting,
  onOpenCreate,
  onCloseModal,
  onFormChange,
  onSubmit,
  onDelete,
  onClearError,
}) => {
  const columns: Column<BarberListItem>[] = [
    {
      key: 'barber',
      header: 'Barbero',
      render: (row) => (
        <Box sx={barberCellSx}>
          <PersonAvatar name={row.full_name} />
          <Typography sx={{ fontWeight: 600 }}>{row.full_name}</Typography>
        </Box>
      ),
    },
    {
      key: 'role',
      header: 'Rol',
      render: (row) => (
        <Typography sx={roleCellSx}>{row.specialty || 'Barber'}</Typography>
      ),
    },
    {
      key: 'actions',
      header: 'Acciones',
      align: 'right',
      render: (row) => <RowActions onDelete={() => onDelete(row)} />,
    },
  ];

  return (
    <Box>
      <PageHeader
        title="Gestionar Barberos"
        subtitle="Gestiona al equipo de barberos."
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
          rows={barbers}
          rowKey={(b) => b.id}
          emptyMessage="No hay barberos registrados."
        />
      )}

      <Dialog open={modalOpen} onClose={onCloseModal} PaperProps={{ sx: dialogPaperSx }}>
        <DialogTitle sx={dialogTitleSx}>Crear barbero</DialogTitle>
        <DialogContent sx={dialogContentSx}>
          {formError && <Alert severity="error">{formError}</Alert>}
          <Box sx={fieldRowSx}>
            <TextField
              label="Nombres"
              value={formData.first_name}
              onChange={(e) => onFormChange('first_name', e.target.value)}
              required
            />
            <TextField
              label="Apellidos"
              value={formData.last_name}
              onChange={(e) => onFormChange('last_name', e.target.value)}
              required
            />
          </Box>
          <Box sx={fieldRowSx}>
            <TextField
              label="Teléfono"
              value={formData.phone}
              onChange={(e) => onFormChange('phone', e.target.value)}
              required
            />
            <TextField
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => onFormChange('email', e.target.value)}
              required
            />
          </Box>
          <TextField
            label="Rol / Especialidad"
            value={formData.specialty}
            onChange={(e) => onFormChange('specialty', e.target.value)}
            placeholder="Master Barber, Senior Stylist, Barber…"
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

export default AdminBarberosPageView;
