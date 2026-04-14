import { Typography, Grid, Box, CircularProgress } from '@mui/material';
import DarkCard from '../../styled/DarkCard';
import { ServiceStepViewProps } from '../types';
import {
  loadingWrapperSx,
  spinnerSx,
  titleSx,
  serviceNameSx,
  priceRowSx,
  priceSx,
  durationSx,
} from './serviceStep.styles';

function ServiceStepView({ services, selectedId, onSelect, loading }: ServiceStepViewProps) {
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
        Selecciona un servicio
      </Typography>
      <Grid container spacing={2}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} key={service.id}>
            <DarkCard
              selected={selectedId === service.id}
              onClick={() => onSelect(service)}
              id={`service-card-${service.id}`}
            >
              <Typography variant="h6" sx={serviceNameSx}>
                {service.name}
              </Typography>
              <Box sx={priceRowSx}>
                <Typography variant="body1" sx={priceSx}>
                  ${Number(service.price).toLocaleString('es-CO')}
                </Typography>
                <Typography variant="body2" sx={durationSx}>
                  {service.duration_minutes} min
                </Typography>
              </Box>
            </DarkCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ServiceStepView;
