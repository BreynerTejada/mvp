import { SxProps, Theme } from '@mui/material/styles';

export const footerContainer: SxProps<Theme> = {
  backgroundColor: '#0a0a0a',
  borderTop: '1px solid rgba(196, 163, 90, 0.1)',
  py: 4,
  px: 3,
  mt: 'auto',
};

export const footerContent: SxProps<Theme> = {
  maxWidth: 1200,
  mx: 'auto',
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 2,
};

export const copyrightText: SxProps<Theme> = {
  fontFamily: "'Playfair Display', serif",
  color: 'text.secondary',
  letterSpacing: '0.05em',
};

export const socialBox: SxProps<Theme> = {
  display: 'flex',
  gap: 1,
};

export const iconButton: SxProps<Theme> = {
  color: 'text.secondary',
  '&:hover': { color: 'primary.main' },
};

export const taglineText: SxProps<Theme> = {
  color: 'text.secondary',
  fontSize: '0.75rem',
};
