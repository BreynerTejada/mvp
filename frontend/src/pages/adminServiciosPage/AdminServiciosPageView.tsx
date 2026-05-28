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
  Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PageHeader from '../../components/styled/PageHeader';
import GoldButton from '../../components/styled/GoldButton';
import DataTable, { Column } from '../../components/styled/DataTable';
import RowActions from '../../components/styled/RowActions';
import { Service } from '../../api/types';
import { AdminServiciosPageViewProps } from './types';
import {
  namePrimarySx,
  descriptionSx,
  priceSx,
  dialogPaperSx,
  dialogTitleSx,
  dialogContentSx,
  fieldRowSx,
  dialogActionsSx,
} from './adminServiciosPage.styles';

const AdminServiciosPageView: React.FC<AdminServiciosPageViewProps> = ({
  services,
  loading,
  errorMessage,
  modalOpen,
  formData,
  formError,
  formSubmitting,
  onClearError,
  onOpenCreate,
  onCloseModal,
  onFormChange,
  onSubmit,
  onDelete,
}) => {
  const columns: Column<Service>[] = [
    {
      key: 'name',
      header: 'Servicio',
      render: (row) => (
        <Box>
          <Typography sx={namePrimarySx}>
            {row.name}
            {row.popularity_badge && (
              <Chip
                label={row.popularity_badge}
                size="small"
                sx={{
                  ml: 1,
                  bgcolor: 'rgba(196, 163, 90, 0.15)',
                  color: 'primary.main',
                  fontSize: '0.65rem',
                  letterSpacing: '0.08em',
                }}
              />
            )}
          </Typography>
          {row.description && (
            <Typography sx={descriptionSx}>{row.description}</Typography>
          )}
        </Box>
      ),
    },
    {
      key: 'duration',
      header: 'Duración',
      render: (row) => `${row.duration_minutes} min`,
    },
    {
      key: 'price',
      header: 'Precio',
      align: 'right',
      render: (row) => (
        <Typography sx={priceSx}>
          ${Number(row.price).toLocaleString('es-CO')}
        </Typography>
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
        title="Servicios"
        subtitle="Catálogo de servicios disponibles para reservar."
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
          rows={services}
          rowKey={(s) => s.id}
          emptyMessage="No hay servicios."
        />
      )}

      <Dialog open={modalOpen} onClose={onCloseModal} PaperProps={{ sx: dialogPaperSx }}>
        <DialogTitle sx={dialogTitleSx}>Crear servicio</DialogTitle>
        <DialogContent sx={dialogContentSx}>
          {formError && <Alert severity="error">{formError}</Alert>}
          <TextField
            label="Nombre"
            value={formData.name}
            onChange={(e) => onFormChange('name', e.target.value)}
            required
          />
          <TextField
            label="Descripción"
            value={formData.description}
            onChange={(e) => onFormChange('description', e.target.value)}
            multiline
            rows={2}
          />
          <Box sx={fieldRowSx}>
            <TextField
              label="Precio (COP)"
              type="number"
              value={formData.price}
              onChange={(e) => onFormChange('price', e.target.value)}
              required
            />
            <TextField
              label="Duración (min)"
              type="number"
              value={formData.duration_minutes}
              onChange={(e) => onFormChange('duration_minutes', e.target.value)}
              required
            />
          </Box>
          <TextField
            label="Badge de popularidad (opcional)"
            value={formData.popularity_badge}
            onChange={(e) => onFormChange('popularity_badge', e.target.value)}
            placeholder="Ej: Más popular, Nuevo…"
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

export default AdminServiciosPageView;
