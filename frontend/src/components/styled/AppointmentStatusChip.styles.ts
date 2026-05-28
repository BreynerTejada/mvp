import { SxProps, Theme } from '@mui/material/styles';

const palette: Record<string, { bg: string; color: string; border: string }> = {
  PENDING: {
    bg: 'rgba(255, 183, 77, 0.12)',
    color: '#ffb74d',
    border: 'rgba(255, 183, 77, 0.4)',
  },
  CONFIRMED: {
    bg: 'rgba(76, 175, 80, 0.12)',
    color: '#4caf50',
    border: 'rgba(76, 175, 80, 0.4)',
  },
  COMPLETED: {
    bg: 'rgba(100, 181, 246, 0.12)',
    color: '#64b5f6',
    border: 'rgba(100, 181, 246, 0.4)',
  },
  CANCELLED: {
    bg: 'rgba(244, 67, 54, 0.12)',
    color: '#ef5350',
    border: 'rgba(244, 67, 54, 0.4)',
  },
};

const fallback = {
  bg: 'rgba(255, 255, 255, 0.08)',
  color: '#cccccc',
  border: 'rgba(255, 255, 255, 0.2)',
};

export const chipSx = (status: string): SxProps<Theme> => {
  const tones = palette[status] || fallback;
  return {
    backgroundColor: tones.bg,
    color: tones.color,
    border: `1px solid ${tones.border}`,
    fontWeight: 600,
    letterSpacing: '0.04em',
    height: 26,
    px: 1,
    '& .MuiChip-label': {
      fontSize: '0.72rem',
      px: 1.25,
    },
  };
};
