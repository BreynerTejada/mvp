import { Box, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import GoldButton from '../../styled/GoldButton';
import { ConfirmationViewProps } from '../types';
import { wrapperSx, iconSx, headingSx } from './confirmationView.styles';

function ConfirmationView({ onBookAnother }: ConfirmationViewProps) {
  return (
    <Box sx={wrapperSx}>
      <CheckCircleOutlineIcon sx={iconSx} />
      <Typography variant="h2" sx={headingSx}>
        Cita Confirmada!
      </Typography>
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
