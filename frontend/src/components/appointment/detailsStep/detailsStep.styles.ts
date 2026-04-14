import { SxProps, Theme } from '@mui/material';

export const titleSx: SxProps<Theme> = {
  mb: 3,
  fontWeight: 600,
};

export const errorAlertSx: SxProps<Theme> = {
  mb: 2,
};

export const summaryCardSx: SxProps<Theme> = {
  backgroundColor: '#2a2a2a',
  borderRadius: 2,
  p: 3,
  mb: 3,
  border: '1px solid rgba(196, 163, 90, 0.15)',
};

export const summaryTitleSx: SxProps<Theme> = {
  color: 'primary.main',
  mb: 2,
  fontSize: '1rem',
};

export const summaryGridSx: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 1.5,
};

export const labelSx: SxProps<Theme> = {
  color: 'text.secondary',
};

export const valueSx: SxProps<Theme> = {
  fontWeight: 500,
};

export const priceValueSx: SxProps<Theme> = {
  fontWeight: 500,
  color: 'primary.main',
};

export const dividerSx: SxProps<Theme> = {
  my: 2,
  borderColor: 'rgba(196, 163, 90, 0.15)',
};

export const formSectionTitleSx: SxProps<Theme> = {
  mb: 2,
  fontSize: '1rem',
};

export const formWrapperSx: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

export const nameRowSx: SxProps<Theme> = {
  display: 'flex',
  gap: 2,
};
