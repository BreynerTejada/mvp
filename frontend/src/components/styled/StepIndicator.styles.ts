import { SxProps, Theme } from '@mui/material/styles';

export const container: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 0,
  mb: 4,
};

export const stepWrapper: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
};

export const stepContentWrapper: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export const getCircleStyle = (active: boolean): SxProps<Theme> => ({
  width: 36,
  height: 36,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 600,
  fontSize: '0.9rem',
  transition: 'all 0.3s ease',
  ...(active
    ? {
        backgroundColor: '#c4a35a',
        color: '#0d0d0d',
        boxShadow: '0 2px 10px rgba(196, 163, 90, 0.4)',
      }
    : {
        backgroundColor: 'transparent',
        border: '2px solid rgba(196, 163, 90, 0.3)',
        color: 'rgba(255, 255, 255, 0.4)',
      }),
});

export const getLabelStyle = (active: boolean): SxProps<Theme> => ({
  mt: 0.5,
  fontSize: '0.65rem',
  letterSpacing: '0.1em',
  color: active ? '#c4a35a' : 'rgba(255,255,255,0.3)',
  fontWeight: active ? 600 : 400,
});

export const getConnectorStyle = (completed: boolean): SxProps<Theme> => ({
  width: 60,
  height: 2,
  mx: 1,
  mb: 2,
  backgroundColor: completed ? '#c4a35a' : 'rgba(196, 163, 90, 0.15)',
  transition: 'background-color 0.3s ease',
});
