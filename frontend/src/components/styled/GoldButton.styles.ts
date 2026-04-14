import { SxProps, Theme } from '@mui/material/styles';

export const buttonStyle: SxProps<Theme> = {
  background: (theme) => theme.palette.primary.main,
  color: (theme) => theme.palette.primary.contrastText,
  fontWeight: 600,
  letterSpacing: '0.1em',
  padding: '12px 32px',
  borderRadius: 2,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: (theme) => theme.palette.primary.light,
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 20px rgba(196, 163, 90, 0.4)',
  },
  '&:disabled': {
    background: 'rgba(196, 163, 90, 0.3)',
    color: 'rgba(0, 0, 0, 0.4)',
  },
};
