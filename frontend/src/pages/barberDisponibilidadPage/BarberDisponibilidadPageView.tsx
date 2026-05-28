import React from 'react';
import { Box, Typography, Switch, TextField, Alert, Stack, CircularProgress } from '@mui/material';
import GoldButton from '../../components/styled/GoldButton';
import PageHeader from '../../components/styled/PageHeader';
import { BarberDisponibilidadPageViewProps } from './types';
import {
  pageTitleSx,
  subtitleSx,
  dayRowSx,
  dayNameSx,
  timeFieldSx,
  timesSx,
  saveRowSx,
} from './barberDisponibilidadPage.styles';

const BarberDisponibilidadPageView: React.FC<BarberDisponibilidadPageViewProps> = ({
  days,
  loading,
  saving,
  error,
  success,
  onToggleDay,
  onChangeTime,
  onSave,
  onClearMessages,
}) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box>
      <PageHeader
        title="Mi Disponibilidad"
        subtitle="Define los días y horarios en que atiendes clientes."
      />

      {error && (
        <Alert severity="error" onClose={onClearMessages} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" onClose={onClearMessages} sx={{ mb: 2 }}>
          Horario guardado correctamente.
        </Alert>
      )}

      <Stack spacing={1.5}>
        {days.map((day) => (
          <Box key={day.dayOfWeek} sx={dayRowSx(day.enabled)}>
            <Switch
              checked={day.enabled}
              onChange={() => onToggleDay(day.dayOfWeek)}
              color="primary"
            />
            <Typography sx={dayNameSx}>{day.dayName}</Typography>
            {day.enabled ? (
              <Box sx={timesSx}>
                <TextField
                  label="Desde"
                  type="time"
                  value={day.startTime}
                  onChange={(e) => onChangeTime(day.dayOfWeek, 'startTime', e.target.value)}
                  size="small"
                  sx={timeFieldSx}
                  InputLabelProps={{ shrink: true }}
                />
                <Typography color="text.secondary">—</Typography>
                <TextField
                  label="Hasta"
                  type="time"
                  value={day.endTime}
                  onChange={(e) => onChangeTime(day.dayOfWeek, 'endTime', e.target.value)}
                  size="small"
                  sx={timeFieldSx}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
            ) : (
              <Typography color="text.disabled" variant="body2">
                No disponible
              </Typography>
            )}
          </Box>
        ))}
      </Stack>

      <Box sx={saveRowSx}>
        <GoldButton onClick={onSave} disabled={saving}>
          {saving ? 'GUARDANDO...' : 'GUARDAR HORARIO'}
        </GoldButton>
      </Box>
    </Box>
  );
};

export default BarberDisponibilidadPageView;
