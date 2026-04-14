import { Typography, Grid, Box, CircularProgress } from '@mui/material';
import DarkCard from '../../styled/DarkCard';
import { BarberStepViewProps } from '../types';
import {
  loadingWrapperSx,
  spinnerSx,
  titleSx,
  barberNameSx,
  specialtySx,
} from './barberStep.styles';

function BarberStepView({ barbers, selectedId, onSelect, loading }: BarberStepViewProps) {
  if (loading) {
    return (
      <Box sx={loadingWrapperSx}>
        <CircularProgress sx={spinnerSx} />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" sx={titleSx}>
        Escoge a tu Barbero
      </Typography>
      <Grid container spacing={2}>
        {barbers.map((barber) => (
          <Grid item xs={12} sm={6} key={barber.id}>
            <DarkCard
              selected={selectedId === barber.id}
              onClick={() => onSelect(barber)}
              id={`barber-card-${barber.id}`}
            >
              <Typography variant="h6" sx={barberNameSx}>
                {barber.full_name}
              </Typography>
              {barber.specialty && (
                <Typography variant="body2" sx={specialtySx}>
                  {barber.specialty}
                </Typography>
              )}
            </DarkCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default BarberStepView;
