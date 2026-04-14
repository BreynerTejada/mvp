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

export const barberNameSx: SxProps<Theme> = {
  fontWeight: 600,
};

export const specialtySx: SxProps<Theme> = {
  color: 'text.secondary',
  mt: 0.5,
};
