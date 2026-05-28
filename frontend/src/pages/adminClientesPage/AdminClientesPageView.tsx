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
  IconButton,
  InputAdornment,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PageHeader from '../../components/styled/PageHeader';
import GoldButton from '../../components/styled/GoldButton';
import DataTable, { Column } from '../../components/styled/DataTable';
import RowActions from '../../components/styled/RowActions';
import PersonAvatar from '../../components/styled/PersonAvatar';
import { Client } from '../../api/types';
import { AdminClientesPageViewProps } from './types';
import {
  clientCellSx,
  secondaryTextSx,
  dialogPaperSx,
  dialogTitleSx,
  dialogContentSx,
  fieldRowSx,
  dialogActionsSx,
} from './adminClientesPage.styles';

const AdminClientesPageView: React.FC<AdminClientesPageViewProps> = ({
  clients,
  loading,
  errorMessage,
  modalOpen,
  formData,
  formError,
  formSubmitting,
  showPassword,
  onClearError,
  onOpenCreate,
  onCloseModal,
  onFormChange,
  onToggleShowPassword,
  onSubmit,
  onDelete,
}) => {
  const columns: Column<Client>[] = [
    {
      key: 'name',
      header: 'Cliente',
      render: (row) => (
        <Box sx={clientCellSx}>
          <PersonAvatar name={row.full_name} />
          <Box>
            <Typography sx={{ fontWeight: 600 }}>{row.full_name}</Typography>
            {row.email && (
              <Typography sx={secondaryTextSx}>{row.email}</Typography>
            )}
          </Box>
        </Box>
      ),
    },
    {
      key: 'phone',
      header: 'Teléfono',
      render: (row) => row.phone,
    },
    {
      key: 'created_at',
      header: 'Cliente desde',
      render: (row) => new Date(row.created_at).toLocaleDateString('es-CO'),
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
        title="Clientes"
        subtitle="Listado de clientes con cuenta registrada y los creados al reservar."
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
          rows={clients}
          rowKey={(r) => r.id}
          emptyMessage="No hay clientes registrados."
        />
      )}

      <Dialog open={modalOpen} onClose={onCloseModal} PaperProps={{ sx: dialogPaperSx }}>
        <DialogTitle sx={dialogTitleSx}>Crear cliente</DialogTitle>
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
              label="Email (opcional)"
              type="email"
              value={formData.email}
              onChange={(e) => onFormChange('email', e.target.value)}
            />
          </Box>
          <TextField
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => onFormChange('password', e.target.value)}
            helperText="Si no defines una, se usará el número de teléfono como contraseña."
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={onToggleShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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

export default AdminClientesPageView;
