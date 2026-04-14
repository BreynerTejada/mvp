import { SxProps, Theme } from '@mui/material';

export const pageWrapperSx: SxProps<Theme> = {
  py: 6,
  minHeight: '80vh',
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

export const filterBarSx: SxProps<Theme> = {
  display: 'flex',
  gap: 2,
  mb: 4,
  flexWrap: 'wrap',
};

export const loadingWrapperSx: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  py: 6,
};

export const emptyStateSx: SxProps<Theme> = {
  textAlign: 'center',
  color: 'text.secondary',
  py: 4,
};

export const appointmentListSx: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

export const appointmentRowSx: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  gap: 2,
};

export const actionButtonGroupSx: SxProps<Theme> = {
  display: 'flex',
  gap: 1,
  flexWrap: 'wrap',
};

export const cancelButtonSx: SxProps<Theme> = {
  fontSize: '0.7rem',
  py: 0.5,
  px: 2,
  background: 'transparent',
  color: '#f44336',
  border: '1px solid #f44336',
  '&:hover': {
    background: 'rgba(244, 67, 54, 0.1)',
    boxShadow: 'none',
    transform: 'none',
  },
};

export const smallActionButtonSx: SxProps<Theme> = {
  fontSize: '0.7rem',
  py: 0.5,
  px: 2,
};
