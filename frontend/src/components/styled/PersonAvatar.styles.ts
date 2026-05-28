import { SxProps, Theme } from '@mui/material/styles';

export const avatarSx = (size: number, bgColor: string): SxProps<Theme> => ({
  width: size,
  height: size,
  bgcolor: bgColor,
  color: '#0d0d0d',
  fontWeight: 700,
  fontSize: size * 0.4,
  letterSpacing: '0.02em',
});
