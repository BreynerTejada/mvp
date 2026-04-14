import { Typography, Box, CircularProgress, TextField, Chip } from '@mui/material';
import { DateTimeStepViewProps } from '../types';
import {
  titleSx,
  datePickerWrapperSx,
  dateFieldSx,
  loadingWrapperSx,
  spinnerSx,
  errorSx,
  noSlotsSx,
  slotsLabelSx,
  slotsWrapperSx,
  slotChipSx,
} from './dateTimeStep.styles';

function DateTimeStepView({
  selectedDate,
  onDateChange,
  slots,
  selectedSlot,
  onSlotSelect,
  loading,
  error,
}: DateTimeStepViewProps) {
  const today = new Date().toISOString().split('T')[0];

  return (
    <Box>
      <Typography variant="h5" sx={titleSx}>
        Elige fecha y hora
      </Typography>

      <Box sx={datePickerWrapperSx}>
        <TextField
          type="date"
          label="Fecha"
          value={selectedDate || ''}
          onChange={(e) => onDateChange(e.target.value)}
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: today }}
          fullWidth
          sx={dateFieldSx}
          id="date-picker"
        />
      </Box>

      {loading && (
        <Box sx={loadingWrapperSx}>
          <CircularProgress sx={spinnerSx} />
        </Box>
      )}

      {error && (
        <Typography color="error" sx={errorSx}>
          {error}
        </Typography>
      )}

      {!loading && selectedDate && slots.length === 0 && !error && (
        <Typography sx={noSlotsSx}>
          No hay horarios disponibles para esta fecha. Intenta con otra fecha.
        </Typography>
      )}

      {!loading && slots.length > 0 && (
        <Box>
          <Typography variant="body2" sx={slotsLabelSx}>
            Horarios disponibles:
          </Typography>
          <Box sx={slotsWrapperSx}>
            {slots.map((slot) => {
              const isSelected = selectedSlot?.start_time === slot.start_time;
              return (
                <Chip
                  key={slot.start_time}
                  label={slot.start_time}
                  onClick={() => onSlotSelect(slot)}
                  variant={isSelected ? 'filled' : 'outlined'}
                  sx={slotChipSx(isSelected)}
                  id={`slot-${slot.start_time}`}
                />
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default DateTimeStepView;
