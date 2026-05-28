import { SxProps, Theme } from '@mui/material/styles';

export const namePrimarySx: SxProps<Theme> = {
  fontWeight: 600,
};

export const descriptionSx: SxProps<Theme> = {
  color: 'text.secondary',
  fontSize: '0.82rem',
  mt: 0.5,
  maxWidth: 360,
};

export const priceSx: SxProps<Theme> = {
  color: 'primary.main',
  fontWeight: 600,
};
