import { SxProps, Theme } from '@mui/material/styles';

export const rootSx: SxProps<Theme> = {
  display: 'flex',
  minHeight: '100vh',
  background:
    'radial-gradient(circle at 0% 0%, rgba(196,163,90,0.10), transparent 35%), radial-gradient(circle at 100% 100%, rgba(196,163,90,0.06), transparent 40%), #0a0a0a',
};

export const sidebarSx: SxProps<Theme> = {
  width: 260,
  flexShrink: 0,
  display: { xs: 'none', md: 'flex' },
  flexDirection: 'column',
  borderRight: '1px solid rgba(196, 163, 90, 0.15)',
  bgcolor: 'rgba(13, 13, 13, 0.6)',
  backdropFilter: 'blur(8px)',
  py: 3,
  px: 2,
};

export const brandSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1.25,
  px: 1.5,
  py: 1,
  mb: 4,
};

export const brandTextSx: SxProps<Theme> = {
  fontFamily: "'Inter', sans-serif",
  fontWeight: 700,
  letterSpacing: '0.18em',
  fontSize: '0.95rem',
  color: 'text.primary',
};

export const navListSx: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 0.5,
  flex: 1,
};

export const navItemSx = (active: boolean): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  gap: 1.5,
  px: 1.75,
  py: 1.25,
  borderRadius: 1.5,
  cursor: 'pointer',
  color: active ? 'primary.main' : 'text.secondary',
  bgcolor: active ? 'rgba(196, 163, 90, 0.12)' : 'transparent',
  border: active
    ? '1px solid rgba(196, 163, 90, 0.35)'
    : '1px solid transparent',
  fontSize: '0.88rem',
  fontWeight: active ? 600 : 500,
  letterSpacing: '0.02em',
  transition: 'all 0.2s ease',
  '&:hover': {
    bgcolor: active ? 'rgba(196, 163, 90, 0.18)' : 'rgba(255,255,255,0.05)',
    color: 'primary.main',
  },
});

export const sidebarFooterSx: SxProps<Theme> = {
  borderTop: '1px solid rgba(196, 163, 90, 0.15)',
  pt: 2,
  mt: 1,
};

export const backLinkSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  color: 'text.secondary',
  cursor: 'pointer',
  fontSize: '0.85rem',
  px: 1.5,
  py: 1,
  borderRadius: 1,
  '&:hover': { color: 'primary.main', bgcolor: 'rgba(255,255,255,0.03)' },
};

export const mobileHeaderSx: SxProps<Theme> = {
  display: { xs: 'flex', md: 'none' },
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid rgba(196, 163, 90, 0.15)',
  px: 2,
  py: 1.5,
  position: 'sticky',
  top: 0,
  zIndex: 10,
  bgcolor: 'rgba(13,13,13,0.92)',
  backdropFilter: 'blur(8px)',
};

export const mainSx: SxProps<Theme> = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

export const contentSx: SxProps<Theme> = {
  flex: 1,
  px: { xs: 2.5, md: 5 },
  py: { xs: 3, md: 4 },
  maxWidth: 1400,
  width: '100%',
  mx: 'auto',
};

export const drawerPaperSx: SxProps<Theme> = {
  bgcolor: '#0d0d0d',
  borderRight: '1px solid rgba(196, 163, 90, 0.15)',
  width: 260,
  px: 2,
  py: 3,
};
