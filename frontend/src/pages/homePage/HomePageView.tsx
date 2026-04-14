import { Box, Typography, Container, Grid } from '@mui/material';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import GoldButton from '../../components/styled/GoldButton';
import {
  heroSectionSx,
  heroContainerSx,
  heroTitleSx,
  heroTitleAccentSx,
  heroButtonGroupSx,
  outlinedGoldButtonSx,
  heroBottomLineSx,
  featuresSectionSx,
  featuresTitleSx,
  titleUnderlineSx,
  featureCardSx,
  ctaSectionSx,
  ctaTitleSx,
} from './homePage.styles';

interface HomePageViewProps {
  onNavigateToBooking: () => void;
  onNavigateToServices: () => void;
  onNavigateToBookingCTA: () => void;
}

const features = [
  {
    icon: <ContentCutIcon sx={{ fontSize: 40 }} />,
    title: 'Experiencia Premium',
    desc: 'Barberos con años de experiencia y formación constante.',
  },
  {
    icon: <AccessTimeIcon sx={{ fontSize: 40 }} />,
    title: 'Agenda Fácil',
    desc: 'Reserva en minutos y elige el horario que mejor te convenga.',
  },
  {
    icon: <StarIcon sx={{ fontSize: 40 }} />,
    title: 'Calidad Garantizada',
    desc: 'Productos premium y atención personalizada para cada cliente.',
  },
];

const HomePageView: React.FC<HomePageViewProps> = ({
  onNavigateToBooking,
  onNavigateToServices,
  onNavigateToBookingCTA,
}) => {
  return (
    <Box>
      <Box sx={heroSectionSx}>
        <Container maxWidth="md" sx={heroContainerSx}>
          <Typography variant="h1" sx={heroTitleSx}>
            El Arte del
          </Typography>
          <Typography variant="h1" component="span" sx={heroTitleAccentSx}>
            Corte Perfecto
          </Typography>

          <Box sx={heroButtonGroupSx}>
            <GoldButton onClick={onNavigateToBooking} id="hero-book-button">
              AGENDA UNA CITA
            </GoldButton>
            <GoldButton
              variant="outlined"
              onClick={onNavigateToServices}
              sx={outlinedGoldButtonSx}
              id="hero-services-button"
            >
              NUESTROS SERVICIOS
            </GoldButton>
          </Box>
        </Container>

        <Box sx={heroBottomLineSx} />
      </Box>

      <Box sx={featuresSectionSx} id="nosotros">
        <Container maxWidth="lg">
          <Typography variant="h2" sx={featuresTitleSx}>
            ¿Por qué elegirnos?
          </Typography>
          <Box sx={titleUnderlineSx} />
          <Grid container spacing={4}>
            {features.map((feature, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Box sx={featureCardSx}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h5" sx={{ mb: 1.5, fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {feature.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={ctaSectionSx} id="contacto">
        <Container maxWidth="sm">
          <Typography variant="h3" sx={ctaTitleSx}>
            ¿Listo para un nuevo look?
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
            Agenda tu cita ahora y vive la experiencia de un corte profesional.
          </Typography>
          <GoldButton onClick={onNavigateToBookingCTA} size="large" id="cta-book-button">
            AGENDAR AHORA
          </GoldButton>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePageView;
