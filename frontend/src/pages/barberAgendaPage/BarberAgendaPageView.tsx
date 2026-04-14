import React from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  MenuItem,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import DarkCard from '../../components/styled/DarkCard';
import GoldButton from '../../components/styled/GoldButton';
import { BarberAgendaPageViewProps, STATUS_LABELS } from './types';
import {
  pageWrapperSx,
  pageTitleSx,
  titleUnderlineSx,
  filterBarSx,
  loadingWrapperSx,
  emptyStateSx,
  appointmentListSx,
  appointmentRowSx,
  actionButtonGroupSx,
  cancelButtonSx,
  smallActionButtonSx,
} from './barberAgendaPage.styles';

const BarberAgendaPageView: React.FC<BarberAgendaPageViewProps> = ({
  barbers,
  appointments,
  loading,
  isAdmin,
  selectedBarberId,
  selectedDate,
  actionError,
  onBarberChange,
  onDateChange,
  onStatusChange,
  onClearActionError,
}) => {
  return (
    <Box sx={pageWrapperSx}>
      <Container maxWidth="md">
        <Typography variant="h2" sx={pageTitleSx}>
          AGENDA DEL BARBERO
        </Typography>
        <Box sx={titleUnderlineSx} />

        <Box sx={filterBarSx}>
          {isAdmin && (
            <TextField
              select
              label="Barbero"
              value={selectedBarberId}
              onChange={(e) => onBarberChange(e.target.value)}
              sx={{ minWidth: 250 }}
              id="agenda-barber-select"
            >
              {barbers.map((b) => (
                <MenuItem key={b.id} value={b.id}>
                  {b.full_name} — {b.specialty}
                </MenuItem>
              ))}
            </TextField>
          )}
          <TextField
            type="date"
            label="Fecha"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            InputLabelProps={{ shrink: true }}
            id="agenda-date-picker"
          />
        </Box>

        {actionError && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={onClearActionError}>
            {actionError}
          </Alert>
        )}

        {loading && (
          <Box sx={loadingWrapperSx}>
            <CircularProgress sx={{ color: 'primary.main' }} />
          </Box>
        )}

        {!loading && selectedBarberId && appointments.length === 0 && (
          <Typography sx={emptyStateSx}>
            No hay citas para esta fecha.
          </Typography>
        )}

        {!loading && !selectedBarberId && (
          <Typography sx={emptyStateSx}>
            Selecciona un barbero para ver su agenda.
          </Typography>
        )}

        <Box sx={appointmentListSx}>
          {appointments.map((appt) => {
            const status = STATUS_LABELS[appt.status] || { label: appt.status, color: 'default' as const };
            return (
              <DarkCard key={appt.id} sx={{ cursor: 'default' }}>
                <Box sx={appointmentRowSx}>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {appt.start_time?.slice(0, 5)} - {appt.end_time?.slice(0, 5)}
                      </Typography>
                      <Chip
                        label={status.label}
                        color={status.color}
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>
                    <Typography variant="body1">
                      <strong>Cliente:</strong> {appt.client?.first_name} {appt.client?.last_name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {appt.service?.name} — ${Number(appt.service?.price).toLocaleString('es-CO')} — {appt.service?.duration_minutes} min
                    </Typography>
                    {appt.client?.phone && (
                      <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                        Tel: {appt.client.phone}
                      </Typography>
                    )}
                  </Box>

                  <Box sx={actionButtonGroupSx}>
                    {appt.status === 'PENDING' && (
                      <>
                        <GoldButton
                          size="small"
                          onClick={() => onStatusChange(appt.id, 'CONFIRMED')}
                          sx={smallActionButtonSx}
                        >
                          Confirmar
                        </GoldButton>
                        <GoldButton
                          size="small"
                          onClick={() => onStatusChange(appt.id, 'CANCELLED')}
                          sx={cancelButtonSx}
                        >
                          Cancelar
                        </GoldButton>
                      </>
                    )}
                    {appt.status === 'CONFIRMED' && (
                      <>
                        <GoldButton
                          size="small"
                          onClick={() => onStatusChange(appt.id, 'COMPLETED')}
                          sx={smallActionButtonSx}
                        >
                          Completar
                        </GoldButton>
                        <GoldButton
                          size="small"
                          onClick={() => onStatusChange(appt.id, 'CANCELLED')}
                          sx={cancelButtonSx}
                        >
                          Cancelar
                        </GoldButton>
                      </>
                    )}
                  </Box>
                </Box>
              </DarkCard>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default BarberAgendaPageView;
