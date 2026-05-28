import { SxProps, Theme } from '@mui/material/styles';

export const actionsWrapperSx: SxProps<Theme> = {
  display: 'flex',
  gap: 0.5,
  justifyContent: 'flex-end',
};

export const actionButtonSx: SxProps<Theme> = {
  border: '1px solid rgba(196, 163, 90, 0.25)',
  borderRadius: 1,
  color: 'text.secondary',
  bgcolor: 'rgba(20,20,20,0.5)',
  width: 32,
  height: 32,
  '&:hover': {
    borderColor: 'primary.main',
    color: 'primary.main',
    bgcolor: 'rgba(196, 163, 90, 0.08)',
  },
};
