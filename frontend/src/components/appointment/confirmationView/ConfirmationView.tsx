import { Box, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import GoldButton from '../../styled/GoldButton';
import DarkCard from '../../styled/DarkCard';
import { ConfirmationViewProps } from '../types';
import {
  wrapperSx,
  iconSx,
  headingSx,
  credentialsSx,
} from './confirmationView.styles';

function ConfirmationView({ onBookAnother, credentials }: ConfirmationViewProps) {
  return (
    <Box sx={wrapperSx}>
      <CheckCircleOutlineIcon sx={iconSx} />
      <Typography variant="h2" sx={headingSx}>
        Cita Confirmada!
      </Typography>
      {credentials && (
        <DarkCard sx={credentialsSx}>
          <Typography variant="h6" color="primary" gutterBottom>
            Tu acceso a la plataforma
          </Typography>
          <Typography variant="body2">
            Usuario: <strong>{credentials.phone}</strong>
          </Typography>
          <Typography variant="body2">
            Contraseña temporal: <strong>{credentials.temp_password}</strong>
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Inicia sesión con tu número de teléfono y esta contraseña.
          </Typography>
        </DarkCard>
      )}
      <GoldButton
        variant="contained"
        onClick={onBookAnother}
        id="book-another-button"
      >
        AGENDAR OTRA CITA
      </GoldButton>
    </Box>
  );
}

export default ConfirmationView;
