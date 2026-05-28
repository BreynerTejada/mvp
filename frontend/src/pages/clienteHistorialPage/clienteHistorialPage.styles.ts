import { SxProps, Theme } from '@mui/material/styles';

export const dateCellSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 0.5,
  fontWeight: 600,
};

export const timeRowSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 0.5,
  color: 'text.secondary',
  fontSize: '0.82rem',
  mt: 0.5,
};

export const serviceCellSx: SxProps<Theme> = {
  fontWeight: 600,
};
