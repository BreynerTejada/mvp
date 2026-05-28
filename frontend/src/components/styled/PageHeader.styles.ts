import { SxProps, Theme } from '@mui/material/styles';

export const wrapperSx: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: { xs: 'flex-start', md: 'center' },
  flexDirection: { xs: 'column', md: 'row' },
  gap: 2,
  mb: 4,
};

export const titleSx: SxProps<Theme> = {
  fontFamily: "'Playfair Display', serif",
  fontWeight: 700,
  color: 'text.primary',
  letterSpacing: '0.01em',
  fontSize: { xs: '1.8rem', md: '2.1rem' },
};

export const subtitleSx: SxProps<Theme> = {
  color: 'text.secondary',
  mt: 0.5,
  fontSize: '0.92rem',
};

export const actionSx: SxProps<Theme> = {
  display: 'flex',
  gap: 1.5,
};
