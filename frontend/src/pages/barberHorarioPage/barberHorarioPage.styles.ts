import { SxProps, Theme } from '@mui/material/styles';

export const dateCellSx: SxProps<Theme> = {
  fontWeight: 600,
};

export const timeSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 0.5,
  color: 'text.secondary',
  fontSize: '0.82rem',
  mt: 0.5,
};

export const clientCellSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  color: 'text.primary',
  fontWeight: 600,
};

export const actionButtonSx: SxProps<Theme> = {
  textTransform: 'none',
  letterSpacing: '0.02em',
  fontWeight: 500,
  borderRadius: 1.5,
  px: 2,
  py: 0.75,
  fontSize: '0.78rem',
  borderColor: 'rgba(196, 163, 90, 0.4)',
  color: 'text.primary',
  bgcolor: 'rgba(20,20,20,0.6)',
  '&:hover': {
    borderColor: 'primary.main',
    bgcolor: 'rgba(196,163,90,0.08)',
  },
};
