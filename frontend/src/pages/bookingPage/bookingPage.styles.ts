import { SxProps, Theme } from '@mui/material';

export const confirmationWrapperSx: SxProps<Theme> = {
  minHeight: '80vh',
  background: '#0d0d0d',
};

export const pageWrapperSx: SxProps<Theme> = {
  py: 6,
  minHeight: '80vh',
  background: '#0d0d0d',
};

export const pageTitleSx: SxProps<Theme> = {
  textAlign: 'center',
  mb: 1,
  fontFamily: "'Playfair Display', serif",
  fontSize: { xs: '1.5rem', md: '2rem' },
  letterSpacing: '0.1em',
};

export const titleUnderlineSx: SxProps<Theme> = {
  width: 60,
  height: 3,
  background: '#c4a35a',
  mx: 'auto',
  mb: 4,
  borderRadius: 2,
};

export const stepContentSx: SxProps<Theme> = {
  backgroundColor: '#1a1a1a',
  borderRadius: 2,
  border: '1px solid rgba(196, 163, 90, 0.1)',
  p: { xs: 3, md: 4 },
  mb: 4,
  minHeight: 300,
};

export const navigationBarSx: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
};

export const backButtonSx = (visible: boolean): SxProps<Theme> => ({
  color: 'text.secondary',
  visibility: visible ? 'visible' : 'hidden',
});
