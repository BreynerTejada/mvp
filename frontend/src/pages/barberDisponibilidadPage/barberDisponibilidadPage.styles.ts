import { SxProps, Theme } from '@mui/material';

export const pageTitleSx: SxProps<Theme> = {
  color: 'primary.main',
  fontWeight: 700,
  mb: 0.5,
};

export const subtitleSx: SxProps<Theme> = {
  color: 'text.secondary',
  mb: 3,
};

export const dayRowSx = (enabled: boolean): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  p: 2,
  borderRadius: 1,
  border: '1px solid',
  borderColor: enabled ? 'primary.main' : 'divider',
  backgroundColor: enabled ? 'rgba(212,175,55,0.05)' : 'background.paper',
  transition: 'all 0.2s',
});

export const dayNameSx: SxProps<Theme> = {
  minWidth: 100,
  fontWeight: 600,
};

export const timeFieldSx: SxProps<Theme> = {
  width: 140,
};

export const timesSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  flex: 1,
};

export const saveRowSx: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'flex-end',
  mt: 3,
};
