import React from 'react';
import { Box, Alert, CircularProgress, Typography, Chip } from '@mui/material';
import PageHeader from '../../components/styled/PageHeader';
import DataTable, { Column } from '../../components/styled/DataTable';
import { Service } from '../../api/types';
import { AdminServiciosPageViewProps } from './types';
import { namePrimarySx, descriptionSx, priceSx } from './adminServiciosPage.styles';

const AdminServiciosPageView: React.FC<AdminServiciosPageViewProps> = ({
  services,
  loading,
  errorMessage,
  onClearError,
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
  ];

  return (
    <Box>
      <PageHeader
        title="Servicios"
        subtitle="Catálogo de servicios disponibles para reservar."
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
    </Box>
  );
};

export default AdminServiciosPageView;
