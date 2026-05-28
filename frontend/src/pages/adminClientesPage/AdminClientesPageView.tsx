import React from 'react';
import { Box, Alert, CircularProgress, Typography } from '@mui/material';
import PageHeader from '../../components/styled/PageHeader';
import DataTable, { Column } from '../../components/styled/DataTable';
import PersonAvatar from '../../components/styled/PersonAvatar';
import { Client } from '../../api/types';
import { AdminClientesPageViewProps } from './types';
import { clientCellSx, secondaryTextSx } from './adminClientesPage.styles';

const AdminClientesPageView: React.FC<AdminClientesPageViewProps> = ({
  clients,
  loading,
  errorMessage,
  onClearError,
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
  ];

  return (
    <Box>
      <PageHeader
        title="Clientes"
        subtitle="Listado de clientes con cuenta registrada y los creados al reservar."
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
    </Box>
  );
};

export default AdminClientesPageView;
