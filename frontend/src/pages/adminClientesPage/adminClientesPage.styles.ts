import { SxProps, Theme } from '@mui/material/styles';

export const clientCellSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1.5,
};

export const secondaryTextSx: SxProps<Theme> = {
  color: 'text.secondary',
  fontSize: '0.85rem',
};

export const dialogPaperSx: SxProps<Theme> = {
  bgcolor: '#141414',
  border: '1px solid rgba(196, 163, 90, 0.2)',
  backgroundImage: 'none',
  width: { xs: '100%', sm: 480 },
};

export const dialogTitleSx: SxProps<Theme> = {
  fontFamily: "'Playfair Display', serif",
  color: 'primary.main',
  borderBottom: '1px solid rgba(196, 163, 90, 0.15)',
};

export const dialogContentSx: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  pt: 3,
};

export const fieldRowSx: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
  gap: 2,
};

export const dialogActionsSx: SxProps<Theme> = {
  borderTop: '1px solid rgba(196, 163, 90, 0.15)',
  px: 3,
  py: 2,
};
