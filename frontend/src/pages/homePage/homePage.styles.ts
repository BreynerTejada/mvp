import { SxProps, Theme } from '@mui/material';

export const heroSectionSx: SxProps<Theme> = {
  position: 'relative',
  minHeight: '85vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  overflow: 'hidden',
  background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1510 50%, #0d0d0d 100%)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      'radial-gradient(ellipse at center, rgba(196,163,90,0.06) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
};

export const heroContainerSx: SxProps<Theme> = {
  position: 'relative',
  zIndex: 1,
};

export const heroTitleSx: SxProps<Theme> = {
  fontFamily: "'Playfair Display', serif",
  fontSize: { xs: '2.5rem', md: '4.5rem' },
  fontWeight: 400,
  mb: 1,
  lineHeight: 1.2,
  color: '#fff',
};

export const heroTitleAccentSx: SxProps<Theme> = {
  fontFamily: "'Playfair Display', serif",
  fontSize: { xs: '2.5rem', md: '4.5rem' },
  fontWeight: 400,
  fontStyle: 'italic',
  display: 'block',
  mb: 5,
  background: 'linear-gradient(135deg, #c4a35a 0%, #d4b36a 50%, #e8c96a 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

export const heroButtonGroupSx: SxProps<Theme> = {
  display: 'flex',
  gap: 2,
  justifyContent: 'center',
  flexWrap: 'wrap',
};

export const outlinedGoldButtonSx: SxProps<Theme> = {
  background: 'transparent',
  color: '#c4a35a',
  border: '1px solid #c4a35a',
  '&:hover': {
    background: 'rgba(196, 163, 90, 0.08)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 20px rgba(196, 163, 90, 0.2)',
  },
};

export const heroBottomLineSx: SxProps<Theme> = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: 2,
  background: 'linear-gradient(90deg, transparent 0%, #c4a35a 50%, transparent 100%)',
};

export const featuresSectionSx: SxProps<Theme> = {
  py: 10,
  background: '#0d0d0d',
};

export const featuresTitleSx: SxProps<Theme> = {
  textAlign: 'center',
  mb: 1,
  fontFamily: "'Playfair Display', serif",
  fontSize: { xs: '1.8rem', md: '2.5rem' },
};

export const titleUnderlineSx: SxProps<Theme> = {
  width: 60,
  height: 3,
  background: '#c4a35a',
  mx: 'auto',
  mb: 6,
  borderRadius: 2,
};

export const featureCardSx: SxProps<Theme> = {
  textAlign: 'center',
  p: 4,
  borderRadius: 2,
  border: '1px solid rgba(196, 163, 90, 0.1)',
  backgroundColor: '#1a1a1a',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: 'rgba(196, 163, 90, 0.3)',
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
  },
};

export const ctaSectionSx: SxProps<Theme> = {
  py: 8,
  textAlign: 'center',
  background: 'linear-gradient(135deg, #1a1510 0%, #0d0d0d 100%)',
  borderTop: '1px solid rgba(196, 163, 90, 0.1)',
};

export const ctaTitleSx: SxProps<Theme> = {
  mb: 2,
  fontFamily: "'Playfair Display', serif",
  fontSize: { xs: '1.5rem', md: '2rem' },
};
