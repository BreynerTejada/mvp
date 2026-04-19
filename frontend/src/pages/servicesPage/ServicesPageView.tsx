import React from 'react';
import { Container, Typography, Grid, Box, CircularProgress } from '@mui/material';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import DarkCard from '../../components/styled/DarkCard';
import GoldButton from '../../components/styled/GoldButton';
import { Service } from '../../api/types';
import {
  pageSx,
  contentWrapperSx,
  titleSx,
  titleUnderlineSx,
  loaderSx,
  spinnerSx,
  cardsGridSx,
  serviceCardSx,
  cardTopSx,
  iconWrapperSx,
  iconSx,
  badgeSx,
  serviceNameSx,
  serviceDescriptionSx,
  cardBottomSx,
  metaRowSx,
  priceSx,
  durationSx,
  bookButtonSx,
} from './servicesPage.styles';

interface ServicesPageViewProps {
  services: Service[];
  loading: boolean;
  onBookService: (serviceId: number) => void;
}

const ServicesPageView: React.FC<ServicesPageViewProps> = ({
  services,
  loading,
  onBookService,
}) => {
  return (
    <Box sx={pageSx}>
      <Container maxWidth="lg" sx={contentWrapperSx}>
        <Typography variant="h2" sx={titleSx}>
          NUESTROS SERVICIOS
        </Typography>
        <Box sx={titleUnderlineSx} />

        {loading ? (
          <Box sx={loaderSx}>
            <CircularProgress sx={spinnerSx} />
          </Box>
        ) : (
          <Grid container spacing={3} sx={cardsGridSx}>
            {services.map((service) => (
              <Grid item xs={12} sm={6} md={4} key={service.id}>
                <DarkCard sx={serviceCardSx}>
                  {service.popularity_badge && (
                    <Box sx={badgeSx}>{service.popularity_badge}</Box>
                  )}

                  <Box sx={cardTopSx}>
                    <Box sx={iconWrapperSx}>
                      <ContentCutIcon sx={iconSx} />
                    </Box>

                    <Typography variant="h5" sx={serviceNameSx}>
                      {service.name}
                    </Typography>

                    <Typography variant="body2" sx={serviceDescriptionSx}>
                      {service.description}
                    </Typography>
                  </Box>

                  <Box sx={cardBottomSx}>
                    <Box sx={metaRowSx}>
                      <Typography variant="h5" sx={priceSx}>
                        ${Number(service.price).toLocaleString('es-CO')}
                      </Typography>
                      <Typography variant="body2" sx={durationSx}>
                        {service.duration_minutes} min
                      </Typography>
                    </Box>

                    <GoldButton
                      onClick={() => onBookService(service.id)}
                      sx={bookButtonSx(Boolean(service.popularity_badge))}
                    >
                      AGENDAR
                    </GoldButton>
                  </Box>
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
