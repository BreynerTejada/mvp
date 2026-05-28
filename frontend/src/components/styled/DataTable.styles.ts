import { SxProps, Theme } from '@mui/material/styles';

export const tableContainerSx: SxProps<Theme> = {
  bgcolor: 'rgba(20, 20, 20, 0.6)',
  border: '1px solid rgba(196, 163, 90, 0.18)',
  borderRadius: 2,
  overflow: 'hidden',
  backdropFilter: 'blur(6px)',
};

export const headerCellSx: SxProps<Theme> = {
  color: 'text.secondary',
  fontWeight: 600,
  fontSize: '0.82rem',
  letterSpacing: '0.04em',
  borderBottom: '1px solid rgba(196, 163, 90, 0.18)',
  py: 2,
  bgcolor: 'transparent',
};

export const bodyCellSx: SxProps<Theme> = {
  color: 'text.primary',
  fontSize: '0.92rem',
  borderBottom: '1px solid rgba(196, 163, 90, 0.08)',
  py: 2,
};

export const rowSx: SxProps<Theme> = {
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(196, 163, 90, 0.04)',
  },
  '&:last-of-type td': {
    borderBottom: 'none',
  },
};

export const emptyStateSx: SxProps<Theme> = {
  textAlign: 'center',
  color: 'text.secondary',
  py: 6,
  fontSize: '0.92rem',
  fontStyle: 'italic',
};
