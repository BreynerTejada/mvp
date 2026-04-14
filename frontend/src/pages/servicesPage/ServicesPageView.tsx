import React from 'react';
import { Container, Typography, Grid, Box, CircularProgress } from '@mui/material';
import DarkCard from '../../components/styled/DarkCard';
import { Service } from '../../api/types';
import {
  pageSx,
  titleSx,
  titleUnderlineSx,
  loaderSx,
  serviceCardSx,
} from './servicesPage.styles';

interface ServicesPageViewProps {
  services: Service[];
  loading: boolean;
}

const ServicesPageView: React.FC<ServicesPageViewProps> = ({ services, loading }) => {
  return (
    <Box sx={pageSx}>
      <Container maxWidth="md">
        <Typography variant="h2" sx={titleSx}>
          NUESTROS SERVICIOS
        </Typography>
        <Box sx={titleUnderlineSx} />

        {loading ? (
          <Box sx={loaderSx}>
            <CircularProgress sx={{ color: 'primary.main' }} />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {services.map((service) => (
              <Grid item xs={12} sm={6} md={4} key={service.id}>
                <DarkCard sx={serviceCardSx}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {service.name}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ color: 'primary.main', fontWeight: 700, mb: 0.5 }}
                  >
                    ${Number(service.price).toLocaleString('es-CO')}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {service.duration_minutes} min
                  </Typography>
                </DarkCard>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default ServicesPageView;
