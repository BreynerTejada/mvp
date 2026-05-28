import { SxProps, Theme } from '@mui/material';

export const wrapperSx: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '50vh',
  textAlign: 'center',
  animation: 'fadeIn 0.6s ease-in',
  '@keyframes fadeIn': {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
};

export const iconSx: SxProps<Theme> = {
  fontSize: 100,
  color: 'primary.main',
  mb: 3,
  filter: 'drop-shadow(0 4px 20px rgba(196, 163, 90, 0.4))',
};

export const headingSx: SxProps<Theme> = {
  fontFamily: "'Playfair Display', serif",
  mb: 4,
  background: 'linear-gradient(135deg, #c4a35a 0%, #d4b36a 50%, #c4a35a 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

export const credentialsSx: SxProps<Theme> = {
  mb: 3,
  textAlign: 'left',
  width: '100%',
  maxWidth: 400,
};
