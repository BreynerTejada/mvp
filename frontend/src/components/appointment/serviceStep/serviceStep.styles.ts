import { SxProps, Theme } from '@mui/material';

export const loadingWrapperSx: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  py: 4,
};

export const spinnerSx: SxProps<Theme> = {
  color: 'primary.main',
};

export const titleSx: SxProps<Theme> = {
  mb: 3,
  fontWeight: 600,
};

export const serviceNameSx: SxProps<Theme> = {
  fontWeight: 600,
  mb: 0.5,
};

export const priceRowSx: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const priceSx: SxProps<Theme> = {
  color: 'primary.main',
  fontWeight: 600,
};

export const durationSx: SxProps<Theme> = {
  color: 'text.secondary',
};
