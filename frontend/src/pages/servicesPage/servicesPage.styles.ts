import { SxProps, Theme } from '@mui/material';

export const pageSx: SxProps<Theme> = {
  py: { xs: 7, md: 10 },
  minHeight: '76vh',
  background: '#0d0d0d',
};

export const contentWrapperSx: SxProps<Theme> = {
  position: 'relative',
  zIndex: 1,
};

export const titleSx: SxProps<Theme> = {
  textAlign: 'center',
  mb: 1,
  fontFamily: "'Playfair Display', serif",
  fontSize: { xs: '2.4rem', md: '4.1rem' },
  lineHeight: 1.08,
  letterSpacing: '0.015em',
};

export const titleUnderlineSx: SxProps<Theme> = {
  width: 96,
  height: 3,
  background: '#c4a35a',
  mx: 'auto',
  mb: { xs: 5, md: 7 },
  borderRadius: 2,
};

export const loaderSx: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  py: 6,
};

export const spinnerSx: SxProps<Theme> = {
  color: 'primary.main',
};

export const cardsGridSx: SxProps<Theme> = {
  alignItems: 'stretch',
};

export const serviceCardSx: SxProps<Theme> = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: 3,
  height: '100%',
  p: { xs: 2.5, md: 3 },
  border: '1px solid rgba(196, 163, 90, 0.26)',
  background:
    'linear-gradient(180deg, rgba(27, 27, 27, 0.96) 0%, rgba(15, 15, 15, 0.98) 100%)',
  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.04)',
  cursor: 'default',
  '&:hover': {
    transform: 'translateY(-6px)',
    borderColor: 'rgba(212, 179, 106, 0.62)',
    boxShadow:
      '0 18px 42px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
  },
};

export const cardTopSx: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1.5,
};

export const iconWrapperSx: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'primary.main',
};

export const iconSx: SxProps<Theme> = {
  fontSize: 24,
};

export const badgeSx: SxProps<Theme> = {
  position: 'absolute',
  top: 10,
  right: 10,
  px: 1,
  py: 0.2,
  borderRadius: 0.6,
  backgroundColor: 'primary.main',
  color: 'primary.contrastText',
  fontSize: '0.56rem',
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
};

export const serviceNameSx: SxProps<Theme> = {
  fontWeight: 600,
  fontSize: { xs: '1.55rem', md: '1.72rem' },
  lineHeight: 1.2,
};

export const serviceDescriptionSx: SxProps<Theme> = {
  color: 'text.secondary',
  minHeight: { xs: 'auto', md: 84 },
  lineHeight: 1.55,
};

export const cardBottomSx: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

export const metaRowSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
};

export const priceSx: SxProps<Theme> = {
  color: 'primary.main',
  fontWeight: 700,
  fontSize: { xs: '1.72rem', md: '1.86rem' },
};

export const durationSx: SxProps<Theme> = {
  color: 'text.secondary',
  fontSize: '0.84rem',
};

export const bookButtonSx = (isPopular: boolean): SxProps<Theme> => ({
  width: '100%',
  ...(isPopular
    ? {
        background: '#c4a35a',
        color: '#0d0d0d',
      }
    : {
        background: 'transparent',
        color: 'primary.main',
        border: '1px solid rgba(196, 163, 90, 0.45)',
        boxShadow: 'none',
        '&:hover': {
          background: 'rgba(196, 163, 90, 0.08)',
          border: '1px solid rgba(212, 179, 106, 0.75)',
          boxShadow: '0 4px 20px rgba(196, 163, 90, 0.18)',
        },
      }),
});
