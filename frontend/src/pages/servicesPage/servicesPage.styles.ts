import { SxProps, Theme } from '@mui/material';

export const pageSx: SxProps<Theme> = {
  py: 8,
  minHeight: '70vh',
};

export const titleSx: SxProps<Theme> = {
  textAlign: 'center',
  mb: 1,
  fontFamily: "'Playfair Display', serif",
  fontSize: { xs: '1.8rem', md: '2.5rem' },
};

export const titleUnderlineSx: SxProps<Theme> = {
  width: 60,
  height: 3,
  background: '#c4a35a',
  mx: 'auto',
  mb: 6,
  borderRadius: 2,
};

export const loaderSx: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  py: 6,
};

export const serviceCardSx: SxProps<Theme> = {
  cursor: 'default',
  '&:hover': { transform: 'translateY(-4px)' },
};
